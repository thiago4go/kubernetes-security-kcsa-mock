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
# from datetime import datetime # Not explicitly used

# Configure logging
LOG_LEVEL = os.environ.get("LOG_LEVEL", "INFO").upper()
logging.basicConfig(
    level=LOG_LEVEL,
    format='%(asctime)s - %(levelname)s - [%(name)s:%(funcName)s:%(lineno)d] - %(message)s'
)
logger = logging.getLogger(__name__) # Use a specific logger

# --- Path Constants ---
# Absolute path to the directory where this script (.github/scripts/process_issue.py) is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# Absolute path to the project root (assuming .github is at the root)
PROJECT_ROOT = os.path.dirname(os.path.dirname(SCRIPT_DIR))

# Paths relative to PROJECT_ROOT
SRC_DIR_REL = "src"
ADMIN_DIR_REL = os.path.join(SRC_DIR_REL, "admin")
DB_TOOLS_DIR_REL = os.path.join(ADMIN_DIR_REL, "db-tools")

# Absolute paths to directories and key files
SRC_DIR_ABS = os.path.join(PROJECT_ROOT, SRC_DIR_REL)
EXPORTED_QUESTIONS_DIR_ABS = os.path.join(SRC_DIR_ABS, "exported-questions")
METADATA_FILE_ABS = os.path.join(SRC_DIR_ABS, "questions_metadata.json")

ADMIN_SCRIPTS_DIR_ABS = os.path.join(SRC_DIR_ABS, "admin")

# Script paths relative to PROJECT_ROOT (for execution with cwd=PROJECT_ROOT)
REFINE_SCRIPT_PATH_FROM_ROOT = os.path.join(ADMIN_DIR_REL, "refine_questions.py")
REVIEW_SCRIPT_PATH_FROM_ROOT = os.path.join(ADMIN_DIR_REL, "review_questions.py")
NODE_UPDATE_SCRIPT_PATH_FROM_ROOT = os.path.join(DB_TOOLS_DIR_REL, "update_questions.mjs")
NODE_EXPORT_SCRIPT_PATH_FROM_ROOT = os.path.join(DB_TOOLS_DIR_REL, "export_questions.mjs")


def extract_question_info(title, body):
    """Extract question information from issue title and body."""
    logger.info("Extracting question information from issue content.")
    logger.debug(f"Received Title: {title}")
    logger.debug(f"Received Body (first 500 chars):\n{body[:500]}...")

    question_info = {
        "id": None, "domain": None, "error_type": "content",
        "needs_review": False, "question_text": None, "correct_answer": None
    }

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

    question_pattern = re.compile(
        r'(?i)(?:\*\*Question\*\*|Question)\s*:\s*(.+?)(?=\n\s*\n|\n\s*(?:Your answer:|Correct answer:|Explanation:|Error:|Domain:|$))', re.DOTALL)
    question_match = question_pattern.search(body)
    if question_match:
        question_info["question_text"] = question_match.group(1).strip()
        logger.info(f"Extracted question text (first 100 chars): '{question_info['question_text'][:100]}...'")
    else:
        logger.warning("Could not extract question text using primary pattern.")

    correct_answer_pattern = re.compile(
        r'(?i)(?:\*\*Correct answer\*\*|Correct answer)\s*:\s*(.+?)(?=\n\s*\n|\n\s*(?:Explanation:|Error:|Domain:|$))', re.DOTALL)
    correct_answer_match = correct_answer_pattern.search(body)
    if correct_answer_match:
        question_info["correct_answer"] = correct_answer_match.group(1).strip()
        logger.info(f"Extracted correct answer (first 100 chars): '{question_info['correct_answer'][:100]}...'")
    else:
        logger.warning("Could not extract correct answer text.")

    domain_pattern_body = re.compile(r'(?i)(?:\*\*Domain\*\*|Domain)\s*:\s*([^\n]+)')
    domain_match_body = domain_pattern_body.search(body)
    if domain_match_body:
        domain_raw = domain_match_body.group(1).strip()
        domain_normalized = re.sub(r'[^\w\s-]', '', domain_raw).lower().replace(' ', '_')
        question_info["domain"] = domain_normalized
        logger.info(f"Found domain '{domain_normalized}' in body (raw: '{domain_raw}').")
    else:
        logger.warning("Could not extract domain from body using 'Domain:' pattern.")

    if "needs full review" in body.lower() or "needs comprehensive review" in body.lower():
        question_info["needs_review"] = True
        logger.info("Issue flagged for 'full review'.")

    if any(keyword in title.lower() for keyword in ["answer", "correct answer"]): question_info["error_type"] = "answer"
    elif any(keyword in body.lower() for keyword in ["correct answer:", "your answer:"]): question_info["error_type"] = "answer"
    elif "explanation" in title.lower() or "explanation:" in body.lower(): question_info["error_type"] = "explanation"
    elif "question" in title.lower(): question_info["error_type"] = "question"
    logger.info(f"Determined error type: '{question_info['error_type']}'.")

    if os.path.exists(METADATA_FILE_ABS):
        try:
            with open(METADATA_FILE_ABS, "r", encoding="utf-8") as f:
                domains_data = json.load(f)
            if question_info["domain"]:
                extracted_domain_normalized = question_info["domain"]
                mapped_domain = None
                for proper_case_domain in domains_data.keys():
                    if extracted_domain_normalized == proper_case_domain.lower().replace(' ', '_'):
                        mapped_domain = proper_case_domain
                        break
                if mapped_domain:
                    question_info["domain"] = mapped_domain
                    logger.info(f"Mapped extracted domain '{extracted_domain_normalized}' to '{mapped_domain}'.")
                else:
                    logger.warning(f"Extracted domain '{extracted_domain_normalized}' not in metadata.")
        except Exception as e:
            logger.error(f"Error with metadata file {METADATA_FILE_ABS}: {e}")
    else:
        logger.warning(f"Metadata file not found: {METADATA_FILE_ABS}. Cannot map domain names accurately.")

    logger.info(f"Final extracted info: {json.dumps(question_info, indent=2)}")
    return question_info


def find_question_in_files(question_id_to_find=None, text_to_find=None, answer_to_find=None, domain_to_search=None):
    logger.info(f"Searching questions. ID:{question_id_to_find}, Text:'{str(text_to_find)[:50]}...', Domain:{domain_to_search}")
    if not os.path.isdir(EXPORTED_QUESTIONS_DIR_ABS):
        logger.error(f"Exported questions directory not found: {EXPORTED_QUESTIONS_DIR_ABS}")
        return None

    files_to_scan = []
    if domain_to_search:
        potential_filename = f"{domain_to_search.replace(' ', '_')}.mjs" # Assumes domain_to_search is proper case
        filepath = os.path.join(EXPORTED_QUESTIONS_DIR_ABS, potential_filename)
        if os.path.exists(filepath):
            files_to_scan.append(filepath)
            logger.info(f"Targeting specific domain file: {filepath}")
        else:
            logger.warning(f"Domain file '{potential_filename}' not found. Scanning all files.")
            files_to_scan = [os.path.join(EXPORTED_QUESTIONS_DIR_ABS, f) for f in os.listdir(EXPORTED_QUESTIONS_DIR_ABS) if f.endswith('.mjs')]
    else:
        files_to_scan = [os.path.join(EXPORTED_QUESTIONS_DIR_ABS, f) for f in os.listdir(EXPORTED_QUESTIONS_DIR_ABS) if f.endswith('.mjs')]

    if not files_to_scan: logger.warning(f"No .mjs files to scan in {EXPORTED_QUESTIONS_DIR_ABS}"); return None

    if question_id_to_find is not None:
        logger.debug(f"Strategy 1: Searching ID = {question_id_to_find}")
        for filepath in files_to_scan:
            try:
                with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
                if re.search(rf'"id"\s*:\s*{question_id_to_find}\s*,', content):
                    domain_name = os.path.splitext(os.path.basename(filepath))[0]
                    logger.info(f"Found ID {question_id_to_find} in {filepath} (Domain: {domain_name})")
                    return (domain_name, question_id_to_find)
            except Exception as e: logger.error(f"Error reading/searching {filepath} for ID: {e}")
        logger.info(f"ID {question_id_to_find} not found by ID search.")

    if text_to_find:
        norm_text = re.sub(r'\s+', ' ', text_to_find).strip().lower()
        logger.debug(f"Strategy 2: Searching text (norm): '{norm_text[:70]}...'")
        for filepath in files_to_scan:
            try:
                with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
                for match in re.finditer(r'{\s*"id"\s*:\s*(\d+)\s*,\s*"question"\s*:\s*"((?:\\.|[^"])*)"', content):
                    found_id, found_q_raw = int(match.group(1)), match.group(2)
                    norm_file_q = re.sub(r'\s+', ' ', found_q_raw.replace('\\"', '"').replace('\\n', '\n')).strip().lower()
                    if norm_text == norm_file_q:
                        domain_name = os.path.splitext(os.path.basename(filepath))[0]
                        logger.info(f"Exact text match in {filepath} (ID: {found_id})")
                        return (domain_name, found_id)
            except Exception as e: logger.error(f"Error reading/searching {filepath} for text: {e}")
        logger.info(f"Text '{norm_text[:70]}...' not found by text search.")

    if answer_to_find: logger.warning("Search by correct answer not fully implemented robustly.")
    logger.warning("Could not identify specific question using available strategies.")
    return None


def run_script(script_path_from_root, category, question_id=None):
    full_script_path = os.path.join(PROJECT_ROOT, script_path_from_root)
    if not os.path.exists(full_script_path):
        logger.error(f"Script not found: {full_script_path} (expected relative to project root for execution)")
        return False, f"Script not found: {full_script_path}"

    cmd = ["python3", script_path_from_root, "--category", category]
    if question_id is not None: cmd.extend(["--question-id", str(question_id)])
    logger.info(f"Executing: {' '.join(cmd)} (CWD: {PROJECT_ROOT})")
    try:
        process = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', check=False, cwd=PROJECT_ROOT)
        stdout, stderr = process.stdout, process.stderr
        if process.returncode != 0:
            logger.error(f"Error running {os.path.basename(script_path_from_root)} (RC:{process.returncode})")
            if stdout: logger.error(f"STDOUT:\n{stdout}")
            if stderr: logger.error(f"STDERR:\n{stderr}")
            return False, stdout + stderr
        logger.info(f"{os.path.basename(script_path_from_root)} STDOUT:\n{stdout or '(empty)'}")
        if stderr: logger.warning(f"{os.path.basename(script_path_from_root)} STDERR:\n{stderr}")
        return True, stdout
    except FileNotFoundError: logger.error(f"python3 or {full_script_path} not found."); return False, "python3 or script missing."
    except Exception as e: logger.error(f"Unexpected error running {script_path_from_root}: {e}"); return False, str(e)


def run_node_scripts_wrapper():
    scripts = {"Update": NODE_UPDATE_SCRIPT_PATH_FROM_ROOT, "Export": NODE_EXPORT_SCRIPT_PATH_FROM_ROOT}
    all_ok = True
    for name, path_from_root in scripts.items():
        full_path = os.path.join(PROJECT_ROOT, path_from_root)
        if not os.path.exists(full_path):
            logger.error(f"Node.js {name} script not found: {full_path}"); all_ok = False; continue
        logger.info(f"Running Node.js {name} script: {path_from_root} (CWD: {PROJECT_ROOT})")
        try:
            process = subprocess.run(["node", path_from_root], capture_output=True, text=True, encoding='utf-8', check=False, cwd=PROJECT_ROOT)
            stdout, stderr = process.stdout, process.stderr
            if process.returncode != 0:
                logger.error(f"Error Node {name} (RC:{process.returncode})"); all_ok = False
                if stdout: logger.error(f"STDOUT:\n{stdout}")
                if stderr: logger.error(f"STDERR:\n{stderr}")
            else:
                logger.info(f"Node {name} STDOUT:\n{stdout or '(empty)'}")
                if stderr: logger.warning(f"Node {name} STDERR:\n{stderr}")
        except FileNotFoundError: logger.error("'node' not found."); all_ok = False
        except Exception as e: logger.error(f"Err Node {name}: {e}"); all_ok = False
    return all_ok

def create_comment_on_issue_wrapper(issue_number, message):
    logger.info(f"Adding comment to GH Issue #{issue_number}")
    if not shutil.which("gh"):
        logger.warning("'gh' CLI not found. Skipping comment. Msg:\n{message}"); return True
    cmd = ["gh", "issue", "comment", str(issue_number), "--body", message]
    try:
        process = subprocess.run(cmd, capture_output=True, text=True, check=True, encoding='utf-8')
        logger.info(f"Commented on issue #{issue_number}. GH CLI:\n{process.stdout}"); return True
    except subprocess.CalledProcessError as e:
        logger.error(f"Err commenting (RC:{e.returncode}) GH CLI STDOUT:\n{e.stdout}\nSTDERR:\n{e.stderr}"); return False
    except Exception as e: logger.error(f"Unexpected err commenting: {e}"); return False

def main():
    if len(sys.argv) < 4:
        print("Usage: python process_issue.py <issue_title> <issue_body_base64> <issue_number>"); sys.exit(1)
    issue_title, issue_body_b64, issue_num_str = sys.argv[1], sys.argv[2], sys.argv[3]
    
    import base64
    try: issue_body = base64.b64decode(issue_body_b64).decode('utf-8')
    except Exception as e: logger.critical(f"Failed to decode base64 issue body: {e}"); sys.exit(1)
    try: issue_number = int(issue_num_str)
    except ValueError: logger.critical(f"Invalid issue number: {issue_num_str}"); sys.exit(1)

    logger.info(f"--- Starting processing Issue #{issue_number}: \"{issue_title}\" ---")
    question_info = extract_question_info(issue_title, issue_body)

    if question_info["id"] is None and (question_info["question_text"] or question_info["correct_answer"]):
        logger.info("ID not directly extracted. Attempting find in files.")
        find_result = find_question_in_files(
            text_to_find=question_info["question_text"],
            answer_to_find=question_info["correct_answer"],
            domain_to_search=question_info["domain"]
        )
        if find_result:
            found_domain_fn, found_id = find_result
            logger.info(f"Question ID {found_id} found in file {found_domain_fn}.mjs")
            question_info["id"] = found_id
            # Attempt to re-map domain based on filename where ID was found
            # This ensures the domain passed to scripts matches the file's actual domain name case/format
            if os.path.exists(METADATA_FILE_ABS):
                try:
                    with open(METADATA_FILE_ABS, "r", encoding="utf-8") as f: domains_data = json.load(f)
                    mapped_domain_from_file = None
                    for proper_case_domain in domains_data.keys():
                        if found_domain_fn.lower().replace('_',' ') == proper_case_domain.lower().replace('_',' '):
                            mapped_domain_from_file = proper_case_domain; break
                    if mapped_domain_from_file and question_info["domain"] != mapped_domain_from_file:
                        logger.info(f"Updating domain from '{question_info['domain']}' to '{mapped_domain_from_file}' based on file search.")
                        question_info["domain"] = mapped_domain_from_file
                    elif not mapped_domain_from_file: # No match in metadata, use filename as is
                         question_info["domain"] = found_domain_fn 
                except Exception as e: logger.error(f"Error re-mapping domain from filename {found_domain_fn}: {e}")
            elif question_info["domain"] != found_domain_fn : # No metadata, just use filename
                 logger.warning(f"Metadata not found. Updating domain from '{question_info['domain']}' to '{found_domain_fn}' based on filename.")
                 question_info["domain"] = found_domain_fn


    if not question_info["domain"]:
        logger.critical("Domain could not be determined. Cannot proceed.")
        create_comment_on_issue_wrapper(issue_number, f"❌ Automation Error: Domain missing for Issue #{issue_number}.")
        sys.exit(1)

    if question_info["id"] is None and question_info["error_type"] == "answer":
        logger.critical(f"Answer error for domain '{question_info['domain']}' but no specific Question ID.")
        create_comment_on_issue_wrapper(issue_number, f"❌ Automation Error: Answer error reported for Issue #{issue_number} in domain '{question_info['domain']}', but specific Question ID is missing. Please provide Question ID or full question text.")
        sys.exit(1)

    script_path = REVIEW_SCRIPT_PATH_FROM_ROOT if question_info["needs_review"] else REFINE_SCRIPT_PATH_FROM_ROOT
    script_name = "Review" if question_info["needs_review"] else "Refine"
    logger.info(f"Running {script_name} for domain '{question_info['domain']}' ID:{question_info['id']}")
    
    success, _ = run_script(script_path, question_info["domain"], question_info["id"])
    if not success:
        logger.error(f"{script_name} script failed.")
        create_comment_on_issue_wrapper(issue_number, f"❌ Automation Error: {script_name} script failed for Issue #{issue_number}. Check logs.")
        sys.exit(1)

    if not run_node_scripts_wrapper():
        logger.error("Node.js scripts failed.")
        create_comment_on_issue_wrapper(issue_number, f"❌ Automation Error: Node.js DB/Export scripts failed for Issue #{issue_number}. Check logs.")
        sys.exit(1)

    comment = f"✅ Automated processing (Type: {script_name}) for Issue #{issue_number} on domain '{question_info['domain']}' completed."
    if question_info["id"]: comment += f" Question ID targeted: #{question_info['id']}."
    create_comment_on_issue_wrapper(issue_number, comment)
    logger.info(f"--- Successfully processed Issue #{issue_number} ---")

if __name__ == "__main__":
    main()