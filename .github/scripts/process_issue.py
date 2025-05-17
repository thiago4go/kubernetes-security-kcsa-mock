#!/usr/bin/env python3
"""
Script to process GitHub issues related to question errors and run the appropriate
question processing scripts (like refine_questions.py or review_questions.py).
After successful Python script execution, this script will also trigger Node.js
scripts to update the database and export questions.
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
logging.basicConfig(
    level=LOG_LEVEL,
    format='%(asctime)s - %(levelname)s - [%(name)s:%(funcName)s:%(lineno)d] - %(message)s'
)
logger = logging.getLogger(__name__)

# --- Path Constants ---
# Determine paths dynamically based on this script's location
try:
    SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
    PROJECT_ROOT = os.path.dirname(os.path.dirname(SCRIPT_DIR))
except NameError:
    logger.error("Could not determine SCRIPT_DIR and PROJECT_ROOT dynamically. __file__ might not be defined.")
    PROJECT_ROOT = os.getcwd()
    logger.warning(f"Falling back to PROJECT_ROOT = {PROJECT_ROOT}. Paths may be incorrect if not run from project root.")

# Paths relative to PROJECT_ROOT
SRC_DIR_REL = "src"
ADMIN_DIR_REL = os.path.join(SRC_DIR_REL, "admin")
DB_TOOLS_DIR_REL = os.path.join(ADMIN_DIR_REL, "db-tools")

# Absolute paths for file operations within this Python script
SRC_DIR_ABS = os.path.join(PROJECT_ROOT, SRC_DIR_REL)
EXPORTED_QUESTIONS_DIR_ABS = os.path.join(SRC_DIR_ABS, "exported-questions")
METADATA_FILE_ABS = os.path.join(SRC_DIR_ABS, "questions_metadata.json")

# Script paths relative to PROJECT_ROOT (for subprocess calls with cwd=PROJECT_ROOT)
REFINE_SCRIPT_PATH_FROM_ROOT = os.path.join(ADMIN_DIR_REL, "refine_questions.py")
REVIEW_SCRIPT_PATH_FROM_ROOT = os.path.join(ADMIN_DIR_REL, "review_questions.py")
NODE_UPDATE_SCRIPT_PATH_FROM_ROOT = os.path.join(DB_TOOLS_DIR_REL, "update_questions.mjs")
NODE_EXPORT_SCRIPT_PATH_FROM_ROOT = os.path.join(DB_TOOLS_DIR_REL, "export_questions.mjs")


def extract_question_info(title, body):
    """Extract question information from issue title and body."""
    logger.info("Extracting question information from issue content.")
    # ...(rest of the function as previously defined)...
    # This function remains the same as in your provided script.
    # For brevity, its full content is not repeated here but assumed to be identical.
    # Ensure it correctly parses ID, domain, error_type, needs_review, question_text, correct_answer
    # and performs domain mapping using metadata.json.

    # --- Placeholder for the full extract_question_info logic ---
    question_info = {
        "id": None, "domain": None, "error_type": "content",
        "needs_review": False, "question_text": None, "correct_answer": None
    }
    # ID Extraction
    id_patterns = [
        (r'#(\d+)', title, "title (#)"), (r'\bid\s*:\s*(\d+)', title, "title (id:)"),
        (r'question\s+id\s*[:#]?\s*(\d+)', body, "body (question id)"),
        (r'(?<!\w)id\s*[:#]\s*(\d+)', body, "body (id:)")
    ]
    for pattern, text_source, desc in id_patterns:
        match = re.search(pattern, text_source, re.IGNORECASE)
        if match:
            try:
                question_info["id"] = int(match.group(1))
                logger.info(f"Found potential question ID '{question_info['id']}' from {desc}.")
                break
            except ValueError:
                logger.warning(f"Could not parse '{match.group(1)}' as an integer ID from {desc}.")
                question_info["id"] = None # Ensure it's None if parsing fails

    # Question Text Extraction
    question_pattern = re.compile(
        r'(?i)(?:\*\*Question\*\*|Question)\s*:\s*(.+?)(?=\n\s*\n|\n\s*(?:Your answer:|Correct answer:|Explanation:|Error:|Domain:|$))', re.DOTALL)
    question_match = question_pattern.search(body)
    if question_match:
        question_info["question_text"] = question_match.group(1).strip()
        logger.info(f"Extracted question text (first 100 chars): '{question_info['question_text'][:100]}...'")
    else:
        logger.warning("Could not extract question text using primary pattern.")

    # Correct Answer Extraction
    correct_answer_pattern = re.compile(
        r'(?i)(?:\*\*Correct answer\*\*|Correct answer)\s*:\s*(.+?)(?=\n\s*\n|\n\s*(?:Explanation:|Error:|Domain:|$))', re.DOTALL)
    correct_answer_match = correct_answer_pattern.search(body)
    if correct_answer_match:
        question_info["correct_answer"] = correct_answer_match.group(1).strip()
        logger.info(f"Extracted correct answer (first 100 chars): '{question_info['correct_answer'][:100]}...'")
    else:
        logger.warning("Could not extract correct answer text.")

    # Domain Extraction
    domain_pattern_body = re.compile(r'(?i)(?:\*\*Domain\*\*|Domain)\s*:\s*([^\n]+)')
    domain_match_body = domain_pattern_body.search(body)
    if domain_match_body:
        domain_raw = domain_match_body.group(1).strip()
        domain_normalized = re.sub(r'[^\w\s-]', '', domain_raw).lower().replace(' ', '_')
        question_info["domain"] = domain_normalized
        logger.info(f"Found domain '{domain_normalized}' in body (raw: '{domain_raw}').")
    else:
        logger.warning("Could not extract domain from body using 'Domain:' pattern.")

    # Needs Review Flag
    if "needs full review" in body.lower() or "needs comprehensive review" in body.lower():
        question_info["needs_review"] = True
        logger.info("Issue flagged for 'full review'.")

    # Error Type Determination
    if any(keyword in title.lower() for keyword in ["answer", "correct answer"]): question_info["error_type"] = "answer"
    elif any(keyword in body.lower() for keyword in ["correct answer:", "your answer:"]): question_info["error_type"] = "answer"
    elif "explanation" in title.lower() or "explanation:" in body.lower(): question_info["error_type"] = "explanation"
    elif "question" in title.lower(): question_info["error_type"] = "question"
    logger.info(f"Determined error type: '{question_info['error_type']}'.")

    # Domain Mapping using metadata.json
    if os.path.exists(METADATA_FILE_ABS):
        try:
            with open(METADATA_FILE_ABS, "r", encoding="utf-8") as f:
                domains_data = json.load(f)
            
            if question_info["domain"]:
                extracted_domain_normalized = question_info["domain"]
                mapped_domain_proper_case = None
                for proper_case_key_from_metadata in domains_data.keys():
                    metadata_key_normalized = proper_case_key_from_metadata.lower().replace(' ', '_')
                    if extracted_domain_normalized == metadata_key_normalized:
                        mapped_domain_proper_case = proper_case_key_from_metadata
                        break
                    elif extracted_domain_normalized + "s" == metadata_key_normalized:
                        mapped_domain_proper_case = proper_case_key_from_metadata
                        logger.info(f"Matched by adding 's' to extracted: {extracted_domain_normalized} -> {metadata_key_normalized}")
                        break
                    elif extracted_domain_normalized.endswith("s") and extracted_domain_normalized[:-1] == metadata_key_normalized:
                        mapped_domain_proper_case = proper_case_key_from_metadata
                        logger.info(f"Matched by removing 's' from extracted: {extracted_domain_normalized} -> {metadata_key_normalized}")
                        break
                
                if mapped_domain_proper_case:
                    question_info["domain"] = mapped_domain_proper_case
                    logger.info(f"Mapped extracted domain '{extracted_domain_normalized}' to proper case '{mapped_domain_proper_case}' from metadata.")
                else:
                    logger.warning(f"Normalized extracted domain '{extracted_domain_normalized}' not found as a key in metadata file {METADATA_FILE_ABS}. Domain will remain as '{question_info['domain']}'.")
            else:
                logger.info("No domain initially extracted from issue body to map using metadata.")
        except Exception as e:
            logger.error(f"Error loading or processing domain metadata from {METADATA_FILE_ABS}: {e}")
    else:
        logger.warning(f"Metadata file not found at {METADATA_FILE_ABS}. Cannot map domain names to proper case.")

    logger.info(f"Final extracted info: {json.dumps(question_info, indent=2)}")
    return question_info
    # --- End of placeholder ---


def find_question_in_files(question_id_to_find=None, text_to_find=None, answer_to_find=None, domain_to_search=None):
    """Finds a question by ID or text within .mjs files."""
    logger.info(f"Searching for question. Target ID: {question_id_to_find}, Text Hint: '{str(text_to_find)[:50]}...', Domain Hint: {domain_to_search}")
    # ...(rest of the function as previously defined)...
    # This function remains the same as in your provided script.
    # For brevity, its full content is not repeated here.
    # --- Placeholder for the full find_question_in_files logic ---
    if not os.path.isdir(EXPORTED_QUESTIONS_DIR_ABS):
        logger.error(f"Exported questions directory not found: {EXPORTED_QUESTIONS_DIR_ABS}")
        return None

    files_to_scan = []
    if domain_to_search:
        potential_filename = f"{domain_to_search.replace(' ', '_')}.mjs"
        filepath = os.path.join(EXPORTED_QUESTIONS_DIR_ABS, potential_filename)
        if os.path.exists(filepath):
            files_to_scan.append(filepath)
            logger.info(f"Targeting specific domain file for search: {filepath}")
        else:
            logger.warning(f"Specified domain file '{potential_filename}' not found. Scanning all .mjs files.")
            files_to_scan = [os.path.join(EXPORTED_QUESTIONS_DIR_ABS, f) for f in os.listdir(EXPORTED_QUESTIONS_DIR_ABS) if f.endswith('.mjs')]
    else:
        logger.info(f"No specific domain hint. Scanning all .mjs files in {EXPORTED_QUESTIONS_DIR_ABS}.")
        files_to_scan = [os.path.join(EXPORTED_QUESTIONS_DIR_ABS, f) for f in os.listdir(EXPORTED_QUESTIONS_DIR_ABS) if f.endswith('.mjs')]

    if not files_to_scan:
        logger.warning("No .mjs files found to scan.")
        return None

    if question_id_to_find is not None:
        logger.debug(f"Strategy 1: Searching for question_id = {question_id_to_find}")
        for filepath in files_to_scan:
            try:
                with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
                if re.search(rf'"id"\s*:\s*{question_id_to_find}(?:\s*,|\s*\}})', content):
                    domain_name_from_file = os.path.splitext(os.path.basename(filepath))[0]
                    logger.info(f"Found question ID {question_id_to_find} in file: {filepath}")
                    return (domain_name_from_file, question_id_to_find)
            except Exception as e:
                logger.error(f"Error reading/searching file {filepath} for ID {question_id_to_find}: {e}")
        logger.info(f"Question ID {question_id_to_find} not found via direct ID search.")

    if text_to_find:
        normalized_text_to_find = re.sub(r'\s+', ' ', text_to_find).strip().lower()
        if normalized_text_to_find:
            logger.debug(f"Strategy 2: Searching by question text (normalized): '{normalized_text_to_find[:70]}...'")
            for filepath in files_to_scan:
                try:
                    with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
                    for match in re.finditer(r'{\s*"id"\s*:\s*(\d+)\s*,\s*"question"\s*:\s*"((?:\\.|[^"])*)"', content):
                        found_id = int(match.group(1))
                        found_question_raw = match.group(2)
                        found_question_unescaped = found_question_raw.replace('\\"', '"').replace('\\n', '\n').replace('\\\\', '\\')
                        normalized_file_question = re.sub(r'\s+', ' ', found_question_unescaped).strip().lower()
                        if normalized_text_to_find == normalized_file_question:
                            domain_name_from_file = os.path.splitext(os.path.basename(filepath))[0]
                            logger.info(f"Found exact question text match in {filepath} (ID: {found_id})")
                            return (domain_name_from_file, found_id)
                except Exception as e:
                    logger.error(f"Error reading/searching file {filepath} for text: {e}")
            logger.info(f"Question text '{normalized_text_to_find[:70]}...' not found via exact text search.")
        else:
            logger.warning("Provided text_to_find is empty after normalization. Skipping text search.")
            
    logger.warning("Could not identify the specific question in files.")
    return None
    # --- End of placeholder ---


def run_python_script(script_path_from_root, category, question_id=None):
    """Helper to run refine or review Python scripts."""
    absolute_script_path = os.path.join(PROJECT_ROOT, script_path_from_root)
    if not os.path.exists(absolute_script_path):
        logger.error(f"Target Python script not found: {absolute_script_path}")
        return False, f"Python script not found: {script_path_from_root}"

    cmd = ["python3", script_path_from_root, "--category", category]
    if question_id is not None:
        cmd.extend(["--question-id", str(question_id)])

    script_basename = os.path.basename(script_path_from_root)
    logger.info(f"Executing Python script: {' '.join(cmd)} (CWD: {PROJECT_ROOT})")
    try:
        process = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', check=False, cwd=PROJECT_ROOT)
        stdout = process.stdout.strip()
        stderr = process.stderr.strip()

        if process.returncode != 0:
            logger.error(f"Error running Python script '{script_basename}'. Return code: {process.returncode}")
            if stdout: logger.error(f"STDOUT:\n{stdout}")
            if stderr: logger.error(f"STDERR:\n{stderr}")
            return False, f"Script '{script_basename}' failed.\nSTDOUT:\n{stdout}\nSTDERR:\n{stderr}"
        
        logger.info(f"Python script '{script_basename}' STDOUT:\n{stdout if stdout else '(empty)'}")
        if stderr:
            logger.warning(f"Python script '{script_basename}' STDERR (may contain warnings):\n{stderr}")
        return True, stdout # Return stdout for potential PR message extraction
    except FileNotFoundError:
        logger.error(f"Error: 'python3' interpreter not found or script '{script_path_from_root}' not found. Ensure Python 3 is installed and in PATH, and script path is correct.")
        return False, "'python3' or script not found."
    except Exception as e:
        logger.error(f"An unexpected error occurred while running Python script '{script_path_from_root}': {e}", exc_info=True)
        return False, str(e)


def run_node_scripts_wrapper():
    """
    Wrapper to run Node.js update and export scripts.
    Assumes CWD is PROJECT_ROOT.
    """
    scripts_to_run = {
        "Update DB": NODE_UPDATE_SCRIPT_PATH_FROM_ROOT,
        "Export Questions from DB": NODE_EXPORT_SCRIPT_PATH_FROM_ROOT
    }
    all_success = True

    for script_name, script_path_rel_to_root in scripts_to_run.items():
        absolute_script_path = os.path.join(PROJECT_ROOT, script_path_rel_to_root)
        if not os.path.exists(absolute_script_path):
            logger.error(f"Node.js {script_name} script not found: {absolute_script_path}")
            all_success = False
            continue # Try next script if one is missing, though likely both are needed
        
        logger.info(f"Running Node.js {script_name} script: node {script_path_rel_to_root} (CWD: {PROJECT_ROOT})")
        try:
            # Ensure CWD is PROJECT_ROOT for Node.js script execution
            process = subprocess.run(["node", script_path_rel_to_root], capture_output=True, text=True, encoding='utf-8', check=False, cwd=PROJECT_ROOT)
            stdout = process.stdout.strip()
            stderr = process.stderr.strip()

            if process.returncode != 0:
                logger.error(f"Error running Node.js {script_name} script. Return code: {process.returncode}")
                if stdout: logger.error(f"STDOUT:\n{stdout}")
                if stderr: logger.error(f"STDERR:\n{stderr}")
                all_success = False
            else:
                logger.info(f"Node.js {script_name} script STDOUT:\n{stdout if stdout else '(empty)'}")
                if stderr:
                    logger.warning(f"Node.js {script_name} script STDERR (may contain warnings):\n{stderr}")
        except FileNotFoundError: # For 'node' command itself
            logger.error("'node' command not found. Please ensure Node.js is installed and in PATH for the runner.")
            return False # Critical failure if Node.js is not available
        except Exception as e:
            logger.error(f"An unexpected error occurred running Node.js {script_name} script: {e}", exc_info=True)
            all_success = False
            
    return all_success


def create_comment_on_issue_wrapper(issue_number, message):
    """Wrapper to create a comment on GitHub issue using 'gh' CLI."""
    logger.info(f"Attempting to add comment to GitHub issue #{issue_number}")
    # ...(rest of the function as previously defined)...
    # This function remains the same as in your provided script.
    # For brevity, its full content is not repeated here.
    # --- Placeholder for the full create_comment_on_issue_wrapper logic ---
    if not shutil.which("gh"):
        logger.warning("'gh' CLI not found. Skipping comment creation.")
        return True 

    cmd = ["gh", "issue", "comment", str(issue_number), "--body", message]
    try:
        process = subprocess.run(cmd, capture_output=True, text=True, check=True, encoding='utf-8')
        logger.info(f"Successfully commented on issue #{issue_number}. GH CLI Output:\n{process.stdout.strip() if process.stdout.strip() else '(no output)'}")
        return True
    except subprocess.CalledProcessError as e:
        logger.error(f"Error creating comment on issue #{issue_number} using 'gh' CLI. Return code: {e.returncode}")
        if e.stdout: logger.error(f"GH CLI STDOUT:\n{e.stdout.strip()}")
        if e.stderr: logger.error(f"GH CLI STDERR:\n{e.stderr.strip()}")
        return False
    except Exception as e:
        logger.error(f"An unexpected error when trying to comment on issue #{issue_number} via 'gh' CLI: {e}", exc_info=True)
        return False
    # --- End of placeholder ---

# --- Main Processing Logic ---
def main():
    logger.info(f"Script starting. Determined PROJECT_ROOT: {PROJECT_ROOT}")
    logger.info(f"Current Working Directory at script start: {os.getcwd()}")

    if len(sys.argv) < 4:
        errmsg = "Usage: python process_issue.py <issue_title> <issue_body_base64_encoded> <issue_number>"
        logger.critical(errmsg)
        print(errmsg) 
        sys.exit(1)
        
    issue_title = sys.argv[1]
    issue_body_encoded = sys.argv[2]
    issue_number_str = sys.argv[3]

    try:
        issue_body = base64.b64decode(issue_body_encoded).decode('utf-8')
    except Exception as e:
        logger.critical(f"Failed to decode base64 issue body: {e}. Input (first 50 chars): '{issue_body_encoded[:50]}...'")
        print(f"Error: Issue body could not be decoded from base64. {e}")
        sys.exit(1)

    try:
        issue_number = int(issue_number_str)
    except ValueError:
        logger.critical(f"Invalid issue number: '{issue_number_str}'. Must be an integer.")
        print(f"Error: Invalid issue number '{issue_number_str}'.")
        sys.exit(1)
    
    logger.info(f"--- Starting processing for GitHub Issue #{issue_number}: \"{issue_title}\" ---")
    
    question_info = extract_question_info(issue_title, issue_body)
    
    if question_info["id"] is None and question_info["question_text"]:
        logger.info("Question ID not directly extracted. Attempting to find in files using extracted question text.")
        find_result = find_question_in_files(
            text_to_find=question_info["question_text"],
            domain_to_search=question_info["domain"]
        )
        if find_result:
            found_domain_filename_no_ext, found_id = find_result
            logger.info(f"Question identified in file: {found_domain_filename_no_ext}.mjs, assigned ID: {found_id}")
            question_info["id"] = found_id
            # Domain re-mapping logic (as in original script)
            if os.path.exists(METADATA_FILE_ABS):
                try:
                    with open(METADATA_FILE_ABS, "r", encoding="utf-8") as f: domains_data = json.load(f)
                    normalized_domain_from_filename = found_domain_filename_no_ext.lower().replace('_', ' ')
                    final_domain_for_script = found_domain_filename_no_ext
                    for proper_case_domain_key in domains_data.keys():
                        if normalized_domain_from_filename == proper_case_domain_key.lower().replace('_', ' '):
                            final_domain_for_script = proper_case_domain_key
                            break
                    if question_info["domain"] != final_domain_for_script:
                        logger.info(f"Updating domain for script from '{question_info['domain']}' to '{final_domain_for_script}'.")
                        question_info["domain"] = final_domain_for_script
                except Exception as e:
                    logger.error(f"Error during domain re-mapping after file search: {e}")
                    if question_info["domain"] != found_domain_filename_no_ext:
                        question_info["domain"] = found_domain_filename_no_ext
            elif question_info["domain"] != found_domain_filename_no_ext:
                question_info["domain"] = found_domain_filename_no_ext
        else:
            logger.warning("Could not identify specific question ID from files using extracted text.")

    if not question_info["domain"]:
        errmsg = ("Critical: Domain could not be determined. "
                  "Please ensure the issue clearly states the domain (e.g., `Domain: Kubernetes_Security_Fundamentals`).")
        logger.critical(errmsg)
        create_comment_on_issue_wrapper(issue_number, f"❌ Automation Error for Issue #{issue_number}:\n{errmsg}")
        sys.exit(1)

    if question_info["error_type"] == "answer" and question_info["id"] is None:
        errmsg = (f"An 'answer' error was reported for domain '{question_info['domain']}', "
                  "but a specific Question ID could not be identified. This type of error requires a specific question target.")
        logger.critical(errmsg)
        create_comment_on_issue_wrapper(issue_number, f"❌ Automation Error for Issue #{issue_number} (Error on Answer):\n{errmsg}")
        sys.exit(1)
    
    script_to_run_path_from_root = REVIEW_SCRIPT_PATH_FROM_ROOT if question_info["needs_review"] else REFINE_SCRIPT_PATH_FROM_ROOT
    script_name_friendly = "Review" if question_info["needs_review"] else "Refine"
    
    logger.info(f"Preparing to run {script_name_friendly} script for domain '{question_info['domain']}'" +
                 (f" and question ID {question_info['id']}" if question_info['id'] is not None else " (general domain processing)."))

    # Execute the Python question processing script (refine_questions.py or review_questions.py)
    python_script_success, python_script_output = run_python_script(
        script_to_run_path_from_root,
        question_info["domain"],
        question_info["id"]
    )

    if not python_script_success:
        # run_python_script already logs detailed errors
        err_detail = f"Details:\n```\n{python_script_output}\n```" if python_script_output else "Check workflow logs for details."
        comment_body = (f"❌ Automation Error for Issue #{issue_number}:\n"
                        f"The Python {script_name_friendly.lower()} script for domain '{question_info['domain']}' "
                        f"{('and question ID ' + str(question_info['id'])) if question_info['id'] is not None else ''} "
                        f"encountered an error.\n{err_detail}")
        create_comment_on_issue_wrapper(issue_number, comment_body)
        sys.exit(1) # Exit if Python script fails

    # If Python script was successful, then run Node.js scripts
    logger.info(f"Python {script_name_friendly} script completed. Now running Node.js scripts for DB update and export.")
    if not run_node_scripts_wrapper():
        logger.error("One or more Node.js scripts (update/export) failed after Python script success.")
        create_comment_on_issue_wrapper(issue_number,
            f"⚠️ Automation Warning for Issue #{issue_number}:\n"
            f"The Python {script_name_friendly.lower()} script completed successfully, but there was an error during the subsequent Node.js database update or export step. "
            "File changes from the Python script might have been made, but the database might be out of sync. Please check workflow logs.")
        sys.exit(1) # Exit if Node.js scripts fail

    # All steps successful
    final_comment = (f"✅ Automated processing for Issue #{issue_number} completed successfully for domain '{question_info['domain']}'.\n"
                     f"Type of operation: {script_name_friendly} script.\n")
    if question_info["id"] is not None:
        final_comment += f"Specific Question ID targeted: #{question_info['id']}.\n"
    else:
        final_comment += "General processing was performed for the domain (no specific question ID identified for targeting).\n"
    
    # Add PR message from Python script output if available
    # This relies on refine_questions.py printing "PR_BODY_CONTENT::..."
    if python_script_output:
        pr_body_match = re.search(r"PR_BODY_CONTENT::(.*)", python_script_output, re.DOTALL)
        if pr_body_match:
            pr_message_from_script = pr_body_match.group(1).strip()
            if pr_message_from_script:
                final_comment += f"\n**Refinement Summary from AI:**\n{pr_message_from_script}\n"
    
    final_comment += "\nPlease review any generated Pull Requests and workflow logs for details."
    
    create_comment_on_issue_wrapper(issue_number, final_comment)
    logger.info(f"--- Successfully completed processing for GitHub Issue #{issue_number} ---")

    # The GitHub Actions workflow will use the python_script_output (which is refine_questions.py's stdout)
    # to extract PR_BODY_CONTENT for the actual PR body. This script just includes it in the comment.
    # We need to ensure that the SCRIPT_OUTPUT in the GitHub Action YAML correctly captures
    # the stdout of this process_issue.py script, which in turn should include refine_questions.py's stdout.
    # For clarity, process_issue.py can also print the refine_questions.py output directly if needed by the action.
    # The current run_python_script returns stdout, so we can print it here:
    if python_script_output:
        print(python_script_output) # This ensures refine_questions.py's stdout is passed up for PR message extraction by GH Action

if __name__ == "__main__":
    main()
