#!/usr/bin/env python3
"""
Script to process GitHub issues related to question errors and run the appropriate
question processing scripts.
This script is designed to work with live question data.
"""
import os
import sys
import re
import json
import subprocess
import logging
import shutil
import base64 # For decoding issue body

# --- Logging Configuration ---
LOG_LEVEL = os.environ.get("LOG_LEVEL", "INFO").upper()
# Define a more detailed format, including the logger's name
logging.basicConfig(
    level=LOG_LEVEL,
    format='%(asctime)s - %(levelname)s - [%(name)s:%(funcName)s:%(lineno)d] - %(message)s'
)
# Create a logger instance for this module
logger = logging.getLogger(__name__) # Use a specific logger for this script

# --- Path Constants ---
# Determine paths dynamically based on this script's location
try:
    # Absolute path to the directory where this script (.github/scripts/process_issue.py) is located
    SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
    # Absolute path to the project root (assuming .github is at the root of the project)
    PROJECT_ROOT = os.path.dirname(os.path.dirname(SCRIPT_DIR))
except NameError:
    # __file__ is not defined if, for example, the script is run in an interactive interpreter
    # or embedded in a way that doesn't set it. Fallback or error for such cases.
    logger.error("Could not determine SCRIPT_DIR and PROJECT_ROOT dynamically. __file__ might not be defined.")
    PROJECT_ROOT = os.getcwd() # Fallback to current working directory, might not be correct
    logger.warning(f"Falling back to PROJECT_ROOT = {PROJECT_ROOT}. Paths may be incorrect if not run from project root or via standard execution.")


# Paths relative to PROJECT_ROOT (for execution with cwd=PROJECT_ROOT)
SRC_DIR_REL = "src"
ADMIN_DIR_REL = os.path.join(SRC_DIR_REL, "admin")
DB_TOOLS_DIR_REL = os.path.join(ADMIN_DIR_REL, "db-tools")

# Construct absolute paths for file operations within this script
SRC_DIR_ABS = os.path.join(PROJECT_ROOT, SRC_DIR_REL)
EXPORTED_QUESTIONS_DIR_ABS = os.path.join(SRC_DIR_ABS, "exported-questions")
METADATA_FILE_ABS = os.path.join(SRC_DIR_ABS, "questions_metadata.json")

# Script paths relative to PROJECT_ROOT (these are what get passed to python3/node with cwd=PROJECT_ROOT)
REFINE_SCRIPT_PATH_FROM_ROOT = os.path.join(ADMIN_DIR_REL, "refine_questions.py")
REVIEW_SCRIPT_PATH_FROM_ROOT = os.path.join(ADMIN_DIR_REL, "review_questions.py")
NODE_UPDATE_SCRIPT_PATH_FROM_ROOT = os.path.join(DB_TOOLS_DIR_REL, "update_questions.mjs")
NODE_EXPORT_SCRIPT_PATH_FROM_ROOT = os.path.join(DB_TOOLS_DIR_REL, "export_questions.mjs")


def extract_question_info(title, body):
    """Extract question information from issue title and body."""
    logger.info("Extracting question information from issue content.")
    logger.debug(f"Received Title: {title}")
    logger.debug(f"RAW FULL BODY FOR PARSING (first 1000 chars):\n>>>\n{body[:1000]}\n<<<")

    question_info = {
        "id": None, "domain": None, "error_type": "content",
        "needs_review": False, "question_text": None, "correct_answer": None
    }

    # --- ID Extraction ---
    id_patterns = [
        (r'#(\d+)', title, "title (#)"), (r'\bid\s*:\s*(\d+)', title, "title (id:)"),
        (r'question\s+id\s*[:#]?\s*(\d+)', body, "body (question id)"),
        (r'(?<!\w)id\s*[:#]\s*(\d+)', body, "body (id:)")
    ]
    for pattern, text_source, desc in id_patterns:
        match = re.search(pattern, text_source, re.IGNORECASE)
        if match:
            question_info["id"] = int(match.group(1))
            logger.info(f"Found potential question ID '{question_info['id']}' from {desc}.")
            break

    # --- Question Text Extraction ---
    question_pattern = re.compile(
        r'(?i)(?:\*\*Question\*\*|Question)\s*:\s*(.+?)(?=\n\s*\n|\n\s*(?:Your answer:|Correct answer:|Explanation:|Error:|Domain:|$))', re.DOTALL)
    question_match = question_pattern.search(body)
    if question_match:
        question_info["question_text"] = question_match.group(1).strip()
        logger.info(f"Extracted question text (first 100 chars): '{question_info['question_text'][:100]}...'")
    else:
        logger.warning("Could not extract question text using primary pattern.")

    # --- Correct Answer Extraction ---
    correct_answer_pattern = re.compile(
        r'(?i)(?:\*\*Correct answer\*\*|Correct answer)\s*:\s*(.+?)(?=\n\s*\n|\n\s*(?:Explanation:|Error:|Domain:|$))', re.DOTALL)
    correct_answer_match = correct_answer_pattern.search(body)
    if correct_answer_match:
        question_info["correct_answer"] = correct_answer_match.group(1).strip()
        logger.info(f"Extracted correct answer (first 100 chars): '{question_info['correct_answer'][:100]}...'")
    else:
        logger.warning("Could not extract correct answer text.")

    # --- Domain Extraction ---
    domain_pattern_body = re.compile(r'(?i)(?:\*\*Domain\*\*|Domain)\s*:\s*([^\n]+)')
    domain_match_body = domain_pattern_body.search(body)
    if domain_match_body:
        domain_raw = domain_match_body.group(1).strip()
        # Normalize: remove punctuation (except underscore/hyphen), lowercase, replace spaces
        domain_normalized = re.sub(r'[^\w\s-]', '', domain_raw).lower().replace(' ', '_')
        question_info["domain"] = domain_normalized # Store normalized for now
        logger.info(f"Found domain '{domain_normalized}' in body (raw: '{domain_raw}').")
    else:
        logger.warning("Could not extract domain from body using 'Domain:' pattern.")

    # --- Needs Review Flag ---
    if "needs full review" in body.lower() or "needs comprehensive review" in body.lower():
        question_info["needs_review"] = True
        logger.info("Issue flagged for 'full review'.")

    # --- Error Type Determination ---
    if any(keyword in title.lower() for keyword in ["answer", "correct answer"]): question_info["error_type"] = "answer"
    elif any(keyword in body.lower() for keyword in ["correct answer:", "your answer:"]): question_info["error_type"] = "answer"
    elif "explanation" in title.lower() or "explanation:" in body.lower(): question_info["error_type"] = "explanation"
    elif "question" in title.lower(): question_info["error_type"] = "question"
    logger.info(f"Determined error type: '{question_info['error_type']}'.")

    # --- Domain Mapping using metadata.json ---
    if os.path.exists(METADATA_FILE_ABS):
        try:
            with open(METADATA_FILE_ABS, "r", encoding="utf-8") as f:
                domains_data = json.load(f) # Expected: {"Proper_Case_Domain_Name": count, ...}
            
            if question_info["domain"]: # If a normalized domain was extracted
                extracted_domain_normalized = question_info["domain"] # e.g., kubernetes_security_fundamental
                mapped_domain_proper_case = None

                for proper_case_key_from_metadata in domains_data.keys():
                    # Normalize the key from metadata for comparison
                    metadata_key_normalized = proper_case_key_from_metadata.lower().replace(' ', '_')
                    if extracted_domain_normalized == metadata_key_normalized:
                        mapped_domain_proper_case = proper_case_key_from_metadata
                        break
                
                if mapped_domain_proper_case:
                    question_info["domain"] = mapped_domain_proper_case # Update to proper cased version
                    logger.info(f"Mapped extracted domain '{extracted_domain_normalized}' to proper case '{mapped_domain_proper_case}' from metadata.")
                else:
                    logger.warning(f"Normalized extracted domain '{extracted_domain_normalized}' not found as a key in metadata file {METADATA_FILE_ABS}. Domain will remain as '{question_info['domain']}'.")
            else: # No domain was extracted from body to begin with
                logger.info("No domain initially extracted from issue body to map using metadata.")
        except json.JSONDecodeError:
            logger.error(f"Error decoding JSON from metadata file: {METADATA_FILE_ABS}")
        except Exception as e:
            logger.error(f"Error loading or processing domain metadata from {METADATA_FILE_ABS}: {e}")
    else:
        logger.warning(f"Metadata file not found at {METADATA_FILE_ABS}. Cannot map domain names to proper case. Extracted domain (if any) will be used as is.")

    logger.info(f"Final extracted info (after potential mapping): {json.dumps(question_info, indent=2)}")
    return question_info


def find_question_in_files(question_id_to_find=None, text_to_find=None, answer_to_find=None, domain_to_search=None):
    """
    Finds a question by ID or text within .mjs files in EXPORTED_QUESTIONS_DIR_ABS.
    If domain_to_search is provided (expected to be proper cased from metadata), searches only there.
    Returns a tuple (domain_filename_without_ext, question_id_found) or None.
    """
    logger.info(f"Searching for question in production files. Target ID: {question_id_to_find}, Text Hint: '{str(text_to_find)[:50]}...', Domain Hint: {domain_to_search}")

    if not os.path.isdir(EXPORTED_QUESTIONS_DIR_ABS):
        logger.error(f"Exported questions directory not found: {EXPORTED_QUESTIONS_DIR_ABS}")
        return None

    files_to_scan = []
    if domain_to_search: # domain_to_search should be the proper-cased one from metadata
        # Construct filename from domain (e.g., "Kubernetes_Security_Fundamentals.mjs")
        potential_filename = f"{domain_to_search.replace(' ', '_')}.mjs"
        filepath = os.path.join(EXPORTED_QUESTIONS_DIR_ABS, potential_filename)
        if os.path.exists(filepath):
            files_to_scan.append(filepath)
            logger.info(f"Targeting specific domain file for search: {filepath}")
        else:
            logger.warning(f"Specified domain file '{potential_filename}' (derived from '{domain_to_search}') not found in {EXPORTED_QUESTIONS_DIR_ABS}. Will scan all .mjs files.")
            # Fallback to scanning all if specific domain file not found
            files_to_scan = [os.path.join(EXPORTED_QUESTIONS_DIR_ABS, f) for f in os.listdir(EXPORTED_QUESTIONS_DIR_ABS) if f.endswith('.mjs')]
    else: # No domain hint, scan all
        logger.info(f"No specific domain hint provided. Scanning all .mjs files in {EXPORTED_QUESTIONS_DIR_ABS}.")
        files_to_scan = [os.path.join(EXPORTED_QUESTIONS_DIR_ABS, f) for f in os.listdir(EXPORTED_QUESTIONS_DIR_ABS) if f.endswith('.mjs')]

    if not files_to_scan:
        logger.warning(f"No .mjs files found to scan in the determined search scope.")
        return None

    # --- Strategy 1: Find by ID (most reliable) ---
    if question_id_to_find is not None:
        logger.debug(f"Strategy 1: Searching for question_id = {question_id_to_find}")
        for filepath in files_to_scan:
            try:
                with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
                # Regex to find "id": <id>, allowing for spaces and ensuring it's part of a key-value pair
                if re.search(rf'"id"\s*:\s*{question_id_to_find}(?:\s*,|\s*\}})', content): # Ensure it's an ID value
                    domain_name_from_file = os.path.splitext(os.path.basename(filepath))[0] # e.g., Kubernetes_Security_Fundamentals
                    logger.info(f"Found question ID {question_id_to_find} in file: {filepath} (Domain from filename: {domain_name_from_file})")
                    return (domain_name_from_file, question_id_to_find)
            except Exception as e:
                logger.error(f"Error reading/searching file {filepath} for ID {question_id_to_find}: {e}")
        logger.info(f"Question ID {question_id_to_find} not found via direct ID search strategy in scanned files.")

    # --- Strategy 2: Find by Question Text (if ID not found or not provided) ---
    if text_to_find:
        normalized_text_to_find = re.sub(r'\s+', ' ', text_to_find).strip().lower()
        if not normalized_text_to_find: # Skip if text is empty after normalization
            logger.warning("Provided text_to_find is empty after normalization. Skipping text search.")
        else:
            logger.debug(f"Strategy 2: Searching by question text (normalized): '{normalized_text_to_find[:70]}...'")
            for filepath in files_to_scan:
                try:
                    with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
                    # Regex to extract all question objects with "id" and "question"
                    for match in re.finditer(r'{\s*"id"\s*:\s*(\d+)\s*,\s*"question"\s*:\s*"((?:\\.|[^"])*)"', content):
                        found_id = int(match.group(1))
                        found_question_raw = match.group(2)
                        # Unescape basic sequences like \\" to " and \\n to newline
                        found_question_unescaped = found_question_raw.replace('\\"', '"').replace('\\n', '\n').replace('\\\\', '\\')
                        normalized_file_question = re.sub(r'\s+', ' ', found_question_unescaped).strip().lower()

                        if normalized_text_to_find == normalized_file_question:
                            domain_name_from_file = os.path.splitext(os.path.basename(filepath))[0]
                            logger.info(f"Found exact question text match in {filepath} (Domain: {domain_name_from_file}, ID: {found_id})")
                            return (domain_name_from_file, found_id)
                except Exception as e:
                    logger.error(f"Error reading/searching file {filepath} for text: {e}")
            logger.info(f"Question text '{normalized_text_to_find[:70]}...' not found via exact text search strategy.")

    # Strategy 3 (Correct Answer) is omitted for brevity as it's less reliable and complex to implement robustly here.
    # Focus on ID and Question Text.

    logger.warning("Could not identify the specific question in files using available strategies (ID, Text).")
    return None


def run_script(script_path_from_root, category, question_id=None):
    """Helper to run refine or review Python scripts."""
    # Construct the absolute path to the script to check for existence
    absolute_script_path = os.path.join(PROJECT_ROOT, script_path_from_root)
    if not os.path.exists(absolute_script_path):
        logger.error(f"Target Python script not found at its absolute path: {absolute_script_path}")
        return False, f"Python script not found: {script_path_from_root}"

    cmd = ["python3", script_path_from_root, "--category", category]
    if question_id is not None:
        cmd.extend(["--question-id", str(question_id)])

    logger.info(f"Executing Python script: {' '.join(cmd)} (CWD: {PROJECT_ROOT})")
    try:
        process = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', check=False, cwd=PROJECT_ROOT)
        stdout = process.stdout
        stderr = process.stderr

        if process.returncode != 0:
            logger.error(f"Error running Python script '{os.path.basename(script_path_from_root)}'. Return code: {process.returncode}")
            if stdout: logger.error(f"STDOUT:\n{stdout}")
            if stderr: logger.error(f"STDERR:\n{stderr}")
            return False, f"Script '{os.path.basename(script_path_from_root)}' failed.\nSTDOUT:\n{stdout}\nSTDERR:\n{stderr}"
        
        logger.info(f"Python script '{os.path.basename(script_path_from_root)}' STDOUT:\n{stdout if stdout.strip() else '(empty)'}")
        if stderr.strip():
            logger.warning(f"Python script '{os.path.basename(script_path_from_root)}' STDERR (may contain warnings):\n{stderr}")
        return True, stdout
    except FileNotFoundError: # Should not happen if python3 is installed and script path is correct relative to CWD
        logger.error(f"Error: 'python3' interpreter not found or script '{script_path_from_root}' not found relative to CWD. This usually indicates a setup issue.")
        return False, "'python3' or script not found."
    except Exception as e:
        logger.error(f"An unexpected error occurred while running Python script '{script_path_from_root}': {e}")
        return False, str(e)


def run_node_scripts_wrapper():
    """Wrapper to run Node.js update and export scripts."""
    scripts_to_run_from_root = {
        "Update": NODE_UPDATE_SCRIPT_PATH_FROM_ROOT,
        "Export": NODE_EXPORT_SCRIPT_PATH_FROM_ROOT
    }
    all_success = True

    for script_name, script_path_from_root in scripts_to_run_from_root.items():
        absolute_script_path = os.path.join(PROJECT_ROOT, script_path_from_root)
        if not os.path.exists(absolute_script_path):
            logger.error(f"Node.js {script_name} script not found at its absolute path: {absolute_script_path}")
            all_success = False
            continue
        
        logger.info(f"Running Node.js {script_name} script: {script_path_from_root} (CWD: {PROJECT_ROOT})")
        try:
            process = subprocess.run(["node", script_path_from_root], capture_output=True, text=True, encoding='utf-8', check=False, cwd=PROJECT_ROOT)
            stdout = process.stdout
            stderr = process.stderr

            if process.returncode != 0:
                logger.error(f"Error running Node.js {script_name} script. Return code: {process.returncode}")
                if stdout: logger.error(f"STDOUT:\n{stdout}")
                if stderr: logger.error(f"STDERR:\n{stderr}")
                all_success = False
            else:
                logger.info(f"Node.js {script_name} script STDOUT:\n{stdout if stdout.strip() else '(empty)'}")
                if stderr.strip():
                    logger.warning(f"Node.js {script_name} script STDERR (may contain warnings):\n{stderr}")
        except FileNotFoundError:
            logger.error("'node' command not found. Please ensure Node.js is installed and in PATH for the runner.")
            all_success = False
            return False # Node itself not found is a critical failure for this function
        except Exception as e:
            logger.error(f"An unexpected error occurred running Node.js {script_name} script: {e}")
            all_success = False
            
    return all_success


def create_comment_on_issue_wrapper(issue_number, message):
    """Wrapper to create a comment on GitHub issue using 'gh' CLI."""
    logger.info(f"Attempting to add comment to GitHub issue #{issue_number}")
    
    if not shutil.which("gh"):
        logger.warning("'gh' CLI not found. Skipping comment creation. Intended message for issue #{issue_number}:\n{message}")
        return True # Non-fatal if gh is not present for local testing

    cmd = ["gh", "issue", "comment", str(issue_number), "--body", message]
    try:
        process = subprocess.run(cmd, capture_output=True, text=True, check=True, encoding='utf-8') # check=True will raise CalledProcessError on non-zero exit
        logger.info(f"Successfully commented on issue #{issue_number}. GH CLI Output:\n{process.stdout if process.stdout.strip() else '(no output)'}")
        return True
    except subprocess.CalledProcessError as e:
        logger.error(f"Error creating comment on issue #{issue_number} using 'gh' CLI. Return code: {e.returncode}")
        if e.stdout: logger.error(f"GH CLI STDOUT:\n{e.stdout}")
        if e.stderr: logger.error(f"GH CLI STDERR:\n{e.stderr}")
        return False
    except Exception as e: # Catch other potential errors like network issues if gh interacts with API
        logger.error(f"An unexpected error occurred when trying to comment on issue #{issue_number} via 'gh' CLI: {e}")
        return False

# --- Main Processing Logic ---
def main():
    logger.info(f"Script starting. Determined PROJECT_ROOT: {PROJECT_ROOT}")
    logger.info(f"Current Working Directory at script start: {os.getcwd()}") # For debugging CWD context in runner

    if len(sys.argv) < 4:
        errmsg = "Usage: python process_issue.py <issue_title> <issue_body_base64_encoded> <issue_number>"
        logger.critical(errmsg)
        print(errmsg) # Also print to stdout for runner logs if logging isn't captured early
        sys.exit(1)
        
    issue_title = sys.argv[1]
    issue_body_encoded = sys.argv[2]
    issue_number_str = sys.argv[3]

    try:
        issue_body = base64.b64decode(issue_body_encoded).decode('utf-8')
    except Exception as e:
        logger.critical(f"Failed to decode base64 issue body: {e}. Input (first 50 chars): '{issue_body_encoded[:50]}...'")
        # Cannot comment on issue yet as issue_number might also be problematic
        print(f"Error: Issue body could not be decoded from base64. {e}")
        sys.exit(1)

    try:
        issue_number = int(issue_number_str)
    except ValueError:
        logger.critical(f"Invalid issue number: '{issue_number_str}'. Must be an integer.")
        print(f"Error: Invalid issue number '{issue_number_str}'.")
        sys.exit(1) # Cannot proceed without a valid issue number for commenting
    
    logger.info(f"--- Starting processing for GitHub Issue #{issue_number}: \"{issue_title}\" ---")
    
    # 1. Extract information from the issue
    question_info = extract_question_info(issue_title, issue_body)
    
    # 2. If ID not found by direct extraction, try to find it in files
    #    Only attempt if question_text was successfully extracted, as it's key for searching
    if question_info["id"] is None and question_info["question_text"]:
        logger.info("Question ID not directly extracted. Attempting to find in files using extracted question text.")
        
        find_result = find_question_in_files(
            text_to_find=question_info["question_text"],
            # answer_to_find=question_info["correct_answer"], #  Search by answer is less reliable, focus on text
            domain_to_search=question_info["domain"] # Pass domain (potentially proper cased) as a hint
        )
        if find_result:
            found_domain_filename_no_ext, found_id = find_result
            logger.info(f"Question identified in file: {found_domain_filename_no_ext}.mjs, assigned ID: {found_id}")
            question_info["id"] = found_id
            
            # Re-confirm/update domain based on the file where the question was found,
            # ensuring it's the proper-cased version from metadata if possible.
            if os.path.exists(METADATA_FILE_ABS):
                try:
                    with open(METADATA_FILE_ABS, "r", encoding="utf-8") as f:
                        domains_data = json.load(f)
                    
                    # Normalize the domain from filename for lookup
                    normalized_domain_from_filename = found_domain_filename_no_ext.lower().replace('_', ' ')
                    
                    final_domain_for_script = found_domain_filename_no_ext # Default to filename's case/format
                    for proper_case_domain_key in domains_data.keys():
                        if normalized_domain_from_filename == proper_case_domain_key.lower().replace('_', ' '):
                            final_domain_for_script = proper_case_domain_key # Found a match, use proper case
                            break
                    
                    if question_info["domain"] != final_domain_for_script:
                        logger.info(f"Updating domain for script from '{question_info['domain']}' to '{final_domain_for_script}' based on file where ID {found_id} was found.")
                        question_info["domain"] = final_domain_for_script
                except Exception as e:
                    logger.error(f"Error during domain re-mapping using metadata after file search for {found_domain_filename_no_ext}: {e}")
                    if question_info["domain"] != found_domain_filename_no_ext: # Fallback if metadata processing fails
                        logger.warning(f"Using domain '{found_domain_filename_no_ext}' from filename as fallback.")
                        question_info["domain"] = found_domain_filename_no_ext
            elif question_info["domain"] != found_domain_filename_no_ext: # No metadata file, use domain from filename
                logger.warning(f"Metadata file not found. Updating domain to '{found_domain_filename_no_ext}' from filename where ID {found_id} was found.")
                question_info["domain"] = found_domain_filename_no_ext
        else:
            logger.warning("Could not identify specific question ID from files using extracted text.")


    # 3. Validate necessary information for proceeding
    if not question_info["domain"]:
        errmsg = ("Critical: Domain could not be determined from issue body or file search. "
                  "Please ensure the issue clearly states the domain (e.g., `Domain: Kubernetes_Security_Fundamentals`).")
        logger.critical(errmsg)
        create_comment_on_issue_wrapper(issue_number, f"❌ Automation Error for Issue #{issue_number}:\n{errmsg}")
        sys.exit(1)

    # If it's an "answer" error, a specific question ID is essential.
    if question_info["error_type"] == "answer" and question_info["id"] is None:
        errmsg = (f"An 'answer' error was reported for domain '{question_info['domain']}', "
                  "but a specific Question ID could not be identified. "
                  "This type of error requires a specific question target. "
                  "Please ensure the issue title or body contains the Question ID (e.g., `Error in #123` or `id: 123`) "
                  "or enough clear text (`Question: ...`) for the system to find it.")
        logger.critical(errmsg)
        create_comment_on_issue_wrapper(issue_number, f"❌ Automation Error for Issue #{issue_number} (Error on Answer):\n{errmsg}")
        sys.exit(1)
    
    if question_info["id"] is None:
        logger.warning(f"Proceeding for domain '{question_info['domain']}' but no specific question ID was identified. "
                       "Processing will be at the category/general level if supported by the downstream script.")


    # 4. Run the appropriate processing script (refine or review)
    script_to_run_path_from_root = REVIEW_SCRIPT_PATH_FROM_ROOT if question_info["needs_review"] else REFINE_SCRIPT_PATH_FROM_ROOT
    script_name_friendly = "Review" if question_info["needs_review"] else "Refine"
    
    logger.info(f"Preparing to run {script_name_friendly} script for domain '{question_info['domain']}'" +
                 (f" and question ID {question_info['id']}" if question_info['id'] is not None else " (general domain processing)."))

    script_success, script_output_msg = run_script(script_to_run_path_from_root,
                                                   question_info["domain"],
                                                   question_info["id"])

    if not script_success:
        err_detail = f"Details:\n```\n{script_output_msg}\n```" if script_output_msg else "Check workflow logs for details."
        comment_body = (f"❌ Automation Error for Issue #{issue_number}:\n"
                        f"The {script_name_friendly.lower()} script for domain '{question_info['domain']}' "
                        f"{('and question ID ' + str(question_info['id'])) if question_info['id'] is not None else ''} "
                        f"encountered an error.\n{err_detail}")
        logger.error(f"{script_name_friendly} script execution failed. Output: {script_output_msg}")
        create_comment_on_issue_wrapper(issue_number, comment_body)
        sys.exit(1)

    # 5. Run Node.js scripts for DB update and export
    if not run_node_scripts_wrapper():
        logger.error("Node.js scripts (update/export) failed.")
        create_comment_on_issue_wrapper(issue_number,
            f"❌ Automation Error for Issue #{issue_number}:\n"
            "The question was processed by the Python script, but there was an error during the Node.js database update or export step. "
            "Please check the workflow logs.")
        sys.exit(1)

    # 6. Success
    final_comment = (f"✅ Automated processing for Issue #{issue_number} completed successfully for domain '{question_info['domain']}'.\n"
                     f"Type of operation: {script_name_friendly} script.\n")
    if question_info["id"] is not None:
        final_comment += f"Specific Question ID targeted: #{question_info['id']}.\n"
    else:
        final_comment += "General processing was performed for the domain (no specific question ID identified for targeting).\n"
    final_comment += "Please review any generated Pull Requests and workflow logs for details."
    
    create_comment_on_issue_wrapper(issue_number, final_comment)
    logger.info(f"--- Successfully completed processing for GitHub Issue #{issue_number} ---")

if __name__ == "__main__":
    main()