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
# from datetime import datetime # Not explicitly used, can be removed if not needed for other logic

# Configure logging
# Consider adding a more detailed format if needed, e.g., include function name
LOG_LEVEL = os.environ.get("LOG_LEVEL", "INFO").upper()
logging.basicConfig(
    level=LOG_LEVEL,
    format='%(asctime)s - %(levelname)s - [%(funcName)s:%(lineno)d] - %(message)s'
)

# Constants
# Assuming this script is in .github/scripts/
# Adjust paths if the script is moved or CWD is different during execution
PROJECT_ROOT_OFFSET = "../.." # From .github/scripts/ to project root
SRC_DIR = os.path.join(PROJECT_ROOT_OFFSET, "src")
EXPORTED_QUESTIONS_DIR = os.path.join(SRC_DIR, "exported-questions")
METADATA_FILE = os.path.join(SRC_DIR, "questions_metadata.json")

ADMIN_SCRIPTS_DIR = os.path.join(SRC_DIR, "admin")
REFINE_SCRIPT = os.path.join(ADMIN_SCRIPTS_DIR, "refine_questions.py")
REVIEW_SCRIPT = os.path.join(ADMIN_SCRIPTS_DIR, "review_questions.py")

DB_TOOLS_DIR = os.path.join(ADMIN_SCRIPTS_DIR, "db-tools")
NODE_UPDATE_SCRIPT = os.path.join(DB_TOOLS_DIR, "update_questions.mjs")
NODE_EXPORT_SCRIPT = os.path.join(DB_TOOLS_DIR, "export_questions.mjs")


def extract_question_info(title, body):
    """Extract question information from issue title and body."""
    logging.info("Extracting question information from issue content.")
    logging.debug(f"Received Title: {title}")
    # Log only a portion of the body to avoid flooding logs, but enough for context
    logging.debug(f"Received Body (first 500 chars):\n{body[:500]}...")

    question_info = {
        "id": None,             # Internal ID of the question, if found
        "domain": None,         # The domain/category of the question
        "error_type": "content",# Default error type
        "needs_review": False,  # Flag for comprehensive review vs. targeted refine
        "question_text": None,  # The actual text of the question
        "correct_answer": None  # The text of the correct answer
    }

    # --- ID Extraction (from title or body, looking for internal question ID) ---
    # Order of preference: title with #, title with id:, body with "question id:", body with "id:"
    id_patterns = [
        (r'#(\d+)', title, "title (#)"),
        (r'\bid\s*:\s*(\d+)', title, "title (id:)"),
        (r'question\s+id\s*[:#]?\s*(\d+)', body, "body (question id)"),
        (r'(?<!\w)id\s*[:#]\s*(\d+)', body, "body (id:)") # (?<!\w) to avoid matching 'quizid' etc.
    ]
    for pattern, text_source, desc in id_patterns:
        match = re.search(pattern, text_source, re.IGNORECASE)
        if match:
            question_info["id"] = int(match.group(1))
            logging.info(f"Found potential question ID '{question_info['id']}' from {desc}.")
            break # Take the first ID found

    # --- Question Text Extraction ---
    # Regex tries to capture text after "Question:" and before common subsequent section headers
    # or a significant break (double newline).
    question_pattern = re.compile(
        r'(?i)(?:\*\*Question\*\*|Question)\s*:\s*' # Header
        r'(.+?)'                                  # Actual question (non-greedy)
        # Lookahead for end: double newline OR newline + known section OR end of string
        r'(?=\n\s*\n|\n\s*(?:Your answer:|Correct answer:|Explanation:|Error:|Domain:|$))',
        re.DOTALL
    )
    question_match = question_pattern.search(body)
    if question_match:
        question_info["question_text"] = question_match.group(1).strip()
        logging.info(f"Extracted question text (first 100 chars): '{question_info['question_text'][:100]}...'")
    else:
        logging.warning("Could not extract question text using primary pattern.")

    # --- Correct Answer Extraction ---
    correct_answer_pattern = re.compile(
        r'(?i)(?:\*\*Correct answer\*\*|Correct answer)\s*:\s*' # Header
        r'(.+?)'                                             # Actual answer (non-greedy)
        # Lookahead for end: double newline OR newline + known section OR end of string
        r'(?=\n\s*\n|\n\s*(?:Explanation:|Error:|Domain:|$))',
        re.DOTALL
    )
    correct_answer_match = correct_answer_pattern.search(body)
    if correct_answer_match:
        question_info["correct_answer"] = correct_answer_match.group(1).strip()
        logging.info(f"Extracted correct answer (first 100 chars): '{question_info['correct_answer'][:100]}...'")
    else:
        logging.warning("Could not extract correct answer text.")

    # --- Domain Extraction (from body) ---
    domain_pattern_body = re.compile(
        r'(?i)(?:\*\*Domain\*\*|Domain)\s*:\s*([^\n]+)', # Capture line after "Domain:"
        re.DOTALL
    )
    domain_match_body = domain_pattern_body.search(body)
    if domain_match_body:
        domain_raw = domain_match_body.group(1).strip()
        # Normalize: lowercase, replace spaces with underscores, remove trailing punctuation
        domain_normalized = re.sub(r'[^\w\s-]', '', domain_raw).lower().replace(' ', '_')
        question_info["domain"] = domain_normalized
        logging.info(f"Found domain '{domain_normalized}' in body (raw: '{domain_raw}').")
    else:
        logging.warning("Could not extract domain from body using 'Domain:' pattern.")

    # --- Needs Review Flag ---
    if "needs full review" in body.lower() or "needs comprehensive review" in body.lower():
        question_info["needs_review"] = True
        logging.info("Issue flagged for 'full review'.")

    # --- Error Type Determination ---
    # Simple keyword matching in title or body
    if any(keyword in title.lower() for keyword in ["answer", "correct answer"]):
        question_info["error_type"] = "answer"
    elif any(keyword in body.lower() for keyword in ["correct answer:", "your answer:"]):
        question_info["error_type"] = "answer"
    elif "explanation" in title.lower() or "explanation:" in body.lower():
        question_info["error_type"] = "explanation"
    elif "question" in title.lower(): # Less specific, might need care
        question_info["error_type"] = "question"
    logging.info(f"Determined error type: '{question_info['error_type']}'.")

    # --- Domain Mapping using metadata.json ---
    if os.path.exists(METADATA_FILE):
        try:
            with open(METADATA_FILE, "r", encoding="utf-8") as f:
                domains_data = json.load(f) # Expected to be a dict like {"Domain_Name_Proper_Case": count}
            
            if question_info["domain"]: # If a domain was extracted
                extracted_domain_normalized = question_info["domain"] # Already normalized
                # Find a match in metadata keys (case-insensitive and underscore/space insensitive)
                mapped_domain = None
                for proper_case_domain in domains_data.keys():
                    metadata_normalized = proper_case_domain.lower().replace(' ', '_')
                    if extracted_domain_normalized == metadata_normalized:
                        mapped_domain = proper_case_domain
                        break
                
                if mapped_domain:
                    question_info["domain"] = mapped_domain
                    logging.info(f"Mapped extracted domain '{extracted_domain_normalized}' to '{mapped_domain}' using metadata.")
                else:
                    logging.warning(f"Extracted domain '{extracted_domain_normalized}' not found in {METADATA_FILE} keys for mapping.")
            else:
                logging.info("No domain extracted from issue body to map using metadata.")
        except json.JSONDecodeError:
            logging.error(f"Error decoding JSON from metadata file: {METADATA_FILE}")
        except Exception as e:
            logging.error(f"Error loading or processing domain metadata from {METADATA_FILE}: {e}")
    else:
        logging.warning(f"Metadata file not found at {METADATA_FILE}. Cannot map domain names.")

    logging.info(f"Final extracted info: {json.dumps(question_info, indent=2)}")
    return question_info


def find_question_in_files(question_id_to_find=None, text_to_find=None, answer_to_find=None, domain_to_search=None):
    """
    Finds a question by ID, text, or answer within .mjs files in the EXPORTED_QUESTIONS_DIR.
    If domain_to_search is provided, searches only in that domain's file.
    Returns a tuple (domain_filename_without_ext, question_id_found) or None.
    """
    logging.info(f"Searching for question in production files. ID: {question_id_to_find}, Text Hint: '{str(text_to_find)[:50]}...', Domain hint: {domain_to_search}")

    if not os.path.isdir(EXPORTED_QUESTIONS_DIR):
        logging.error(f"Exported questions directory not found: {EXPORTED_QUESTIONS_DIR}")
        return None

    files_to_scan = []
    if domain_to_search:
        # Construct filename from domain: replace spaces with underscores, ensure .mjs
        # This assumes domain_to_search is already the proper case or can be matched
        # to a filename based on common patterns (e.g. "Kubernetes_Security_Fundamentals.mjs")
        potential_filename = f"{domain_to_search.replace(' ', '_')}.mjs"
        filepath = os.path.join(EXPORTED_QUESTIONS_DIR, potential_filename)
        if os.path.exists(filepath):
            files_to_scan.append(filepath)
            logging.info(f"Targeting specific domain file: {filepath}")
        else:
            logging.warning(f"Specified domain file '{potential_filename}' not found in {EXPORTED_QUESTIONS_DIR}. Scanning all files.")
            files_to_scan = [os.path.join(EXPORTED_QUESTIONS_DIR, f) for f in os.listdir(EXPORTED_QUESTIONS_DIR) if f.endswith('.mjs')]
    else:
        files_to_scan = [os.path.join(EXPORTED_QUESTIONS_DIR, f) for f in os.listdir(EXPORTED_QUESTIONS_DIR) if f.endswith('.mjs')]

    if not files_to_scan:
        logging.warning(f"No .mjs files found to scan in {EXPORTED_QUESTIONS_DIR}")
        return None

    # --- Strategy 1: Find by ID (most reliable) ---
    if question_id_to_find is not None:
        logging.debug(f"Strategy 1: Searching for question_id = {question_id_to_find}")
        for filepath in files_to_scan:
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                # Regex to find "id": <id>, allowing for spaces
                if re.search(rf'"id"\s*:\s*{question_id_to_find}\s*,', content):
                    domain_name_from_file = os.path.splitext(os.path.basename(filepath))[0]
                    logging.info(f"Found question ID {question_id_to_find} in file: {filepath} (Domain: {domain_name_from_file})")
                    return (domain_name_from_file, question_id_to_find)
            except Exception as e:
                logging.error(f"Error reading/searching file {filepath} for ID: {e}")
        logging.info(f"Question ID {question_id_to_find} not found via direct ID search strategy.")

    # --- Strategy 2: Find by Question Text (if provided) ---
    if text_to_find:
        normalized_text_to_find = re.sub(r'\s+', ' ', text_to_find).strip().lower()
        logging.debug(f"Strategy 2: Searching by question text (normalized): '{normalized_text_to_find[:70]}...'")
        for filepath in files_to_scan:
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                # Regex to extract all question objects with "id" and "question"
                # ((?:\\.|[^"])*) captures string content, handling escaped quotes
                for match in re.finditer(r'{\s*"id"\s*:\s*(\d+)\s*,\s*"question"\s*:\s*"((?:\\.|[^"])*)"', content):
                    found_id = int(match.group(1))
                    found_question_raw = match.group(2)
                    found_question_unescaped = found_question_raw.replace('\\"', '"').replace('\\n', '\n')
                    normalized_file_question = re.sub(r'\s+', ' ', found_question_unescaped).strip().lower()

                    if normalized_text_to_find == normalized_file_question:
                        domain_name_from_file = os.path.splitext(os.path.basename(filepath))[0]
                        logging.info(f"Found exact question text match in {filepath} (Domain: {domain_name_from_file}, ID: {found_id})")
                        return (domain_name_from_file, found_id)
                    
                    # Optional: Add fuzzy matching here if needed (e.g., Levenshtein distance)
                    # from difflib import SequenceMatcher
                    # if SequenceMatcher(None, normalized_text_to_find, normalized_file_question).ratio() > 0.85: # Example threshold
                    #    logging.info(f"Found fuzzy text match (ratio > 0.85) in {filepath} (ID: {found_id})")
                    #    return (os.path.splitext(os.path.basename(filepath))[0], found_id)

            except Exception as e:
                logging.error(f"Error reading/searching file {filepath} for text: {e}")
        logging.info(f"Question text '{normalized_text_to_find[:70]}...' not found via text search strategy.")

    # --- Strategy 3: Find by Correct Answer Text (less reliable, use if other methods fail) ---
    if answer_to_find:
        normalized_answer_to_find = re.sub(r'\s+', ' ', answer_to_find).strip().lower()
        logging.debug(f"Strategy 3: Searching by correct answer text (normalized): '{normalized_answer_to_find[:70]}...'")
        # This strategy can be complex if answers are long or questions have multiple correct options.
        # A simplified version might look for the answer text within the "options" array
        # at the index specified by "correct_answers".
        # Due to complexity and lower reliability, keeping this brief.
        logging.warning("Search by correct answer text is a complex strategy and might not be fully effective here.")

    logging.warning("Could not identify the specific question using available strategies.")
    return None


def run_script(script_path, category, question_id=None):
    """Helper to run refine or review scripts."""
    if not os.path.exists(script_path):
        logging.error(f"Script not found: {script_path}")
        return False, ""

    cmd = ["python3", script_path, "--category", category]
    if question_id is not None:
        cmd.extend(["--question-id", str(question_id)])

    logging.info(f"Executing command: {' '.join(cmd)}")
    try:
        # Set CWD to project root if scripts expect that for relative paths (e.g. to db-tools)
        # This assumes process_issue.py is in .github/scripts
        process = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', check=False, cwd=PROJECT_ROOT_OFFSET)
        stdout = process.stdout
        stderr = process.stderr

        if process.returncode != 0:
            logging.error(f"Error running {os.path.basename(script_path)}. Return code: {process.returncode}")
            if stdout: logging.error(f"STDOUT:\n{stdout}")
            if stderr: logging.error(f"STDERR:\n{stderr}")
            return False, stdout + stderr
        
        logging.info(f"{os.path.basename(script_path)} STDOUT:\n{stdout if stdout else '(empty)'}")
        if stderr:
            logging.warning(f"{os.path.basename(script_path)} STDERR (may contain warnings):\n{stderr}")
        return True, stdout
    except FileNotFoundError:
        logging.error(f"Python3 interpreter or script {script_path} not found. Ensure it's in PATH and executable.")
        return False, "Python3 or script not found."
    except Exception as e:
        logging.error(f"An unexpected error occurred while running {script_path}: {e}")
        return False, str(e)


def run_node_scripts_wrapper():
    """Wrapper to run Node.js update and export scripts."""
    scripts_to_run = {
        "Update": NODE_UPDATE_SCRIPT,
        "Export": NODE_EXPORT_SCRIPT
    }
    all_success = True

    for script_name, script_path in scripts_to_run.items():
        if not os.path.exists(script_path):
            logging.error(f"Node.js {script_name} script not found: {script_path}")
            all_success = False
            continue
        
        logging.info(f"Running Node.js {script_name} script: {script_path}")
        try:
            # Node scripts might also need CWD set if they use relative paths from project root
            process = subprocess.run(["node", script_path], capture_output=True, text=True, encoding='utf-8', check=False, cwd=PROJECT_ROOT_OFFSET)
            stdout = process.stdout
            stderr = process.stderr

            if process.returncode != 0:
                logging.error(f"Error running Node.js {script_name} script. Return code: {process.returncode}")
                if stdout: logging.error(f"STDOUT:\n{stdout}")
                if stderr: logging.error(f"STDERR:\n{stderr}")
                all_success = False
            else:
                logging.info(f"Node.js {script_name} script STDOUT:\n{stdout if stdout else '(empty)'}")
                if stderr:
                    logging.warning(f"Node.js {script_name} script STDERR (may contain warnings):\n{stderr}")
        except FileNotFoundError:
            logging.error("'node' command not found. Please ensure Node.js is installed and in PATH.")
            all_success = False
        except Exception as e:
            logging.error(f"An unexpected error occurred running Node.js {script_name} script: {e}")
            all_success = False
            
    return all_success


def create_comment_on_issue_wrapper(issue_number, message):
    """Wrapper to create a comment on GitHub issue using 'gh' CLI."""
    logging.info(f"Attempting to add comment to GitHub issue #{issue_number}")
    
    if not shutil.which("gh"):
        logging.warning("'gh' CLI not found. Skipping comment creation. Message for issue #{issue_number}:\n{message}")
        return True # Non-fatal for local testing or if gh CLI isn't critical path

    cmd = ["gh", "issue", "comment", str(issue_number), "--body", message]
    try:
        # Ensure GITHUB_TOKEN is available in env for gh to work in Actions
        process = subprocess.run(cmd, capture_output=True, text=True, check=True, encoding='utf-8')
        logging.info(f"Successfully commented on issue #{issue_number}. GH CLI Output:\n{process.stdout}")
        return True
    except subprocess.CalledProcessError as e:
        logging.error(f"Error creating comment on issue #{issue_number} using 'gh' CLI. Return code: {e.returncode}")
        if e.stdout: logging.error(f"GH CLI STDOUT:\n{e.stdout}")
        if e.stderr: logging.error(f"GH CLI STDERR:\n{e.stderr}")
        return False
    except Exception as e:
        logging.error(f"An unexpected error occurred when trying to comment via 'gh' CLI: {e}")
        return False

# --- Main Processing Logic ---
def main():
    if len(sys.argv) < 4:
        print("Usage: python process_issue.py <issue_title> <issue_body_base64_encoded> <issue_number>")
        logging.error("Insufficient arguments. Expected title, body (base64), and issue number.")
        sys.exit(1)
        
    issue_title = sys.argv[1]
    # Assuming issue_body is passed base64 encoded from GH Actions to handle special chars
    import base64
    try:
        issue_body_encoded = sys.argv[2]
        issue_body = base64.b64decode(issue_body_encoded).decode('utf-8')
    except Exception as e:
        logging.error(f"Failed to decode base64 issue body: {e}")
        print("Error: Issue body could not be decoded from base64.")
        sys.exit(1)

    try:
        issue_number = int(sys.argv[3])
    except ValueError:
        logging.error(f"Invalid issue number: {sys.argv[3]}. Must be an integer.")
        print(f"Error: Invalid issue number '{sys.argv[3]}'.")
        sys.exit(1)
    
    logging.info(f"--- Starting processing for GitHub Issue #{issue_number}: \"{issue_title}\" ---")
    
    # 1. Extract information from the issue
    question_info = extract_question_info(issue_title, issue_body)
    
    # 2. If ID not found by direct extraction, try to find it in files
    if question_info["id"] is None and (question_info["question_text"] or question_info["correct_answer"]):
        logging.info("Question ID not directly extracted from issue. Attempting to find in files using text/answer.")
        # Pass the domain extracted from the issue (if any) as a hint to narrow down search
        # The domain in question_info might be the mapped, proper-case one, or the normalized one.
        # find_question_in_files can handle this by checking common filename patterns.
        find_result = find_question_in_files(
            text_to_find=question_info["question_text"],
            answer_to_find=question_info["correct_answer"],
            domain_to_search=question_info["domain"] # Pass domain as a hint
        )
        if find_result:
            found_domain_filename, found_id = find_result
            logging.info(f"Question identified in file: {found_domain_filename}.mjs, ID: {found_id}")
            question_info["id"] = found_id
            # If find_question_in_files used a filename to derive domain, update if more specific
            # We need to ensure question_info["domain"] is the mapped/proper case one for scripts
            if question_info["domain"] and found_domain_filename.lower().replace('_',' ') != question_info["domain"].lower().replace('_',' '):
                 logging.warning(f"Domain from issue body ('{question_info['domain']}') differs from filename ('{found_domain_filename}'). Trusting domain from file if ID found there.")
                 # Re-map domain based on filename if metadata exists
                 if os.path.exists(METADATA_FILE):
                    try:
                        with open(METADATA_FILE, "r", encoding="utf-8") as f:
                            domains_data = json.load(f)
                        mapped_domain = None
                        for proper_case_domain in domains_data.keys():
                            if found_domain_filename.lower().replace('_',' ') == proper_case_domain.lower().replace('_',' '):
                                mapped_domain = proper_case_domain
                                break
                        if mapped_domain:
                            question_info["domain"] = mapped_domain
                            logging.info(f"Updated domain to '{mapped_domain}' based on file where ID was found.")
                        else:
                             question_info["domain"] = found_domain_filename # Fallback to filename if no mapping
                    except Exception as e:
                        logging.error(f"Error re-mapping domain from filename: {e}")
                        question_info["domain"] = found_domain_filename # Fallback
                 else:
                    question_info["domain"] = found_domain_filename


    # 3. Validate necessary information
    if not question_info["domain"]:
        logging.error("Critical: Domain could not be determined. Cannot proceed.")
        create_comment_on_issue_wrapper(issue_number,
            f"❌ Automation Error for Issue #{issue_number}:\n"
            "The question's domain/category could not be determined from the issue body or file search. "
            "Please ensure the issue clearly states the domain (e.g., `Domain: Kubernetes_Security_Fundamentals`).")
        sys.exit(1)

    if question_info["id"] is None and (question_info["error_type"] != "content" or question_info["needs_review"]):
        # If it's a specific error report (answer, explanation, specific question) or needs full review, an ID is usually expected.
        # "content" errors might sometimes be general without an ID if it's about adding a new question.
        logging.warning(f"Proceeding for domain '{question_info['domain']}' but no specific question ID was identified. "
                        "Processing will be at the category/general level if supported by the downstream script.")
        # For certain operations like "Error on answer", an ID is vital.
        if question_info["error_type"] == "answer":
             logging.error(f"Critical: An 'answer' error was reported for domain '{question_info['domain']}', but a specific Question ID could not be identified. This type of error requires a specific question target.")
             create_comment_on_issue_wrapper(issue_number,
                f"❌ Automation Error for Issue #{issue_number} (Error on Answer):\n"
                f"While processing an error related to an answer in the '{question_info['domain']}' domain, "
                "the specific Question ID could not be identified. "
                "Please ensure the issue body contains enough information to find the question (e.g., full question text, or ideally the Question ID like `Question ID: 123`).")
             sys.exit(1)


    # 4. Run the appropriate processing script (refine or review)
    script_to_run_path = REVIEW_SCRIPT if question_info["needs_review"] else REFINE_SCRIPT
    script_name_friendly = "Review" if question_info["needs_review"] else "Refine"
    
    logging.info(f"Preparing to run {script_name_friendly} script for domain '{question_info['domain']}'" +
                 (f" and question ID {question_info['id']}" if question_info['id'] is not None else " (general domain processing)."))

    script_success, script_output = run_script(script_to_run_path,
                                               question_info["domain"],
                                               question_info["id"])

    if not script_success:
        logging.error(f"{script_name_friendly} script execution failed.")
        create_comment_on_issue_wrapper(issue_number,
            f"❌ Automation Error for Issue #{issue_number}:\n"
            f"The {script_name_friendly.lower()} script for domain '{question_info['domain']}' "
            f"{('and question ID ' + str(question_info['id'])) if question_info['id'] is not None else ''} "
            "encountered an error. Please check the workflow logs for details.")
        sys.exit(1)

    # 5. Run Node.js scripts for DB update and export
    if not run_node_scripts_wrapper():
        logging.error("Node.js scripts (update/export) failed.")
        create_comment_on_issue_wrapper(issue_number,
            f"❌ Automation Error for Issue #{issue_number}:\n"
            "The question was processed, but there was an error during the database update or export step. "
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
    logging.info(f"--- Successfully completed processing for GitHub Issue #{issue_number} ---")

if __name__ == "__main__":
    # Example of how to call this from GH Action (ensure body is base64 encoded)
    # ISSUE_BODY_RAW="..."
    # ISSUE_BODY_B64=$(echo "$ISSUE_BODY_RAW" | base64 -w 0)
    # python .github/scripts/process_issue.py "$ISSUE_TITLE" "$ISSUE_BODY_B64" "$ISSUE_NUMBER"
    main()