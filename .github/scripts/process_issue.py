#!/usr/bin/env python3
"""
Script to process GitHub issues related to question errors and run the appropriate
question processing scripts.
"""
import os
import sys
import re
import json
import subprocess
import logging
import shutil
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Constants
REFINE_SCRIPT = "src/admin/refine_questions.py"
REVIEW_SCRIPT = "src/admin/review_questions.py"
NODE_UPDATE_SCRIPT = "src/admin/db-tools/update_questions.mjs"
NODE_EXPORT_SCRIPT = "src/admin/db-tools/export_questions.mjs"


def extract_question_info(title, body):
    """Extract question information from issue title and body."""
    logging.info("Extracting question information from issue")
    logging.debug(f"Received Title: {title}")
    logging.debug(f"Received Body:\n{body[:500]}...") # Log beginning of body for context

    question_info = {
        "id": None,
        "domain": None,
        "error_type": "content",
        "needs_review": False,
        "question_text": None,
        "correct_answer": None
    }

    # Extract question ID from title (e.g., "Error on answer #61" or "Error on answer id: 16")
    # This ID refers to the internal question ID, not the GitHub issue number.
    id_match_title = re.search(r'#(\d+)', title)
    if id_match_title:
        question_info["id"] = int(id_match_title.group(1))
        logging.info(f"Found question ID #{question_info['id']} in title.")
    else:
        id_match_title_alt = re.search(r'id:\s*(\d+)', title, re.IGNORECASE)
        if id_match_title_alt:
            question_info["id"] = int(id_match_title_alt.group(1))
            logging.info(f"Found question ID {question_info['id']} with 'id:' in title.")

    # If not found in title, look for ID in the body
    if question_info["id"] is None:
        id_match_body = re.search(r'question\s+id\s*[:#]?\s*(\d+)', body, re.IGNORECASE) # More flexible ID search
        if id_match_body:
            question_info["id"] = int(id_match_body.group(1))
            logging.info(f"Found question ID #{question_info['id']} in body.")
        else:
            # Try alternative format with 'id:' in body
            id_match_body_alt = re.search(r'\bid\s*[:#]?\s*(\d+)', body, re.IGNORECASE)
            if id_match_body_alt:
                question_info["id"] = int(id_match_body_alt.group(1))
                logging.info(f"Found question ID {question_info['id']} with 'id:' in body (alternative).")


    # Extract the question text itself. Looks for "Question:" possibly with markdown,
    # and captures until a common next section or end of string.
    question_pattern = re.compile(
        r'(?i)(?:\*\*Question\*\*|Question)\s*:\s*(.+?)(?=\n\s*(?:\*\*Your answer:|\*\*Correct answer:|\*\*Explanation:|\*\*Error:|Domain:|$)|$)',
        re.DOTALL
    )
    question_match = question_pattern.search(body)
    if question_match:
        question_info["question_text"] = question_match.group(1).strip()
        logging.info(f"Extracted question text: '{question_info['question_text'][:100]}...'")
    else:
        logging.warning("Could not extract question text using primary pattern.")
        # Fallback for question text if primary fails (e.g. simple body with just the question)
        if not question_info["question_text"] and "Your answer:" not in body and "Correct answer:" not in body and "Explanation:" not in body:
             # Attempt to grab content before "Domain:" if it exists and other markers are absent
            fallback_question_match = re.search(r'^(.*?)(?=\n\s*Domain:|$)', body, re.DOTALL | re.IGNORECASE)
            if fallback_question_match:
                potential_text = fallback_question_match.group(1).strip()
                # Avoid grabbing the issue title if it's the only thing there.
                if potential_text and len(potential_text) > 20 and potential_text.lower() != title.lower() : # Heuristic
                    question_info["question_text"] = potential_text
                    logging.info(f"Extracted question text (fallback): '{question_info['question_text'][:100]}...'")


    # Extract the correct answer. Similar logic for delimiters.
    correct_answer_pattern = re.compile(
        r'(?i)(?:\*\*Correct answer\*\*|Correct answer)\s*:\s*(.+?)(?=\n\s*(?:\*\*Explanation:|\*\*Error:|Domain:|$)|$)',
        re.DOTALL
    )
    correct_answer_match = correct_answer_pattern.search(body)
    if correct_answer_match:
        question_info["correct_answer"] = correct_answer_match.group(1).strip()
        logging.info(f"Extracted correct answer: '{question_info['correct_answer'][:100]}...'")
    else:
        logging.warning("Could not extract correct answer.")

    # Look for domain information in the body
    domain_patterns = [
        r'(?i)\*\*?Domain\*\*?\s*:\s*([^\n]+)', # Handles optional markdown
        r'(?i)Domain[^\w]*\s*(\w[\w\s_-]+)' # More general
    ]
    for pattern in domain_patterns:
        domain_match = re.search(pattern, body) # re.IGNORECASE is in pattern now
        if domain_match:
            domain = domain_match.group(1).strip()
            domain = domain.lower().replace(' ', '_') # Normalize
            question_info["domain"] = domain
            logging.info(f"Found domain: {domain} in body.")
            break
    if not question_info["domain"]:
        logging.warning("Could not extract domain from body using standard patterns.")


    # Determine if this is a content error or needs full review
    if "needs full review" in body.lower() or "needs comprehensive review" in body.lower():
        question_info["needs_review"] = True
        logging.info("Issue flagged for full review.")

    # Determine error type based on title or key phrases in body
    if "answer" in title.lower() or "correct answer" in body.lower() or "your answer" in body.lower(): # Added "your answer"
        question_info["error_type"] = "answer"
    elif "explanation" in title.lower() or "explanation" in body.lower():
        question_info["error_type"] = "explanation"
    elif "question" in title.lower() or "question text" in body.lower(): # "question text" might be too broad
        question_info["error_type"] = "question"
    logging.info(f"Determined error type: {question_info['error_type']}")

    # Dynamically load domain mappings from /src/questions_metadata.json
    domain_mapping = {}
    # Assuming the script is run from repository root or .github/scripts
    metadata_path_candidates = [
        "src/questions_metadata.json",
        "../../src/questions_metadata.json" # If script is in .github/scripts/
    ]
    metadata_path = None
    for candidate in metadata_path_candidates:
        if os.path.exists(candidate):
            metadata_path = candidate
            break
    
    if metadata_path:
        try:
            with open(metadata_path, "r", encoding="utf-8") as f:
                domains_data = json.load(f)
                for domain_key in domains_data.keys():
                    normalized_key = domain_key.lower().replace(" ", "_") # Ensure consistent normalization
                    domain_mapping[normalized_key] = domain_key
                    # Map variations for robustness
                    domain_mapping[domain_key.lower()] = domain_key
                    domain_mapping[domain_key.replace(" ", "_")] = domain_key


            if question_info["domain"] and question_info["domain"] in domain_mapping:
                original_extracted_domain = question_info["domain"]
                question_info["domain"] = domain_mapping[question_info["domain"]]
                logging.info(f"Mapped extracted domain '{original_extracted_domain}' to '{question_info['domain']}' using metadata.")
            elif question_info["domain"]:
                 logging.warning(f"Extracted domain '{question_info['domain']}' not found in metadata mapping.")
        except Exception as e:
            logging.warning(f"Could not load or process domain mapping from metadata at {metadata_path}: {e}")
    else:
        logging.warning(f"questions_metadata.json not found in candidate paths.")
    
    logging.info(f"Final extracted info before returning: {json.dumps(question_info, indent=2)}")
    return question_info


def find_question_file(question_id=None, question_text=None, correct_answer=None):
    """
    Find which file contains the question with the given ID or content.
    (Keeping existing structure, assuming test_question_finder.py might be used)
    """
    test_finder_path = os.path.join(os.path.dirname(__file__), "test_question_finder.py")
    if os.path.exists(test_finder_path):
        try:
            sys.path.append(os.path.dirname(__file__))
            from test_question_finder import find_question
            logging.info("Using test question finder function")
            return find_question(question_id, question_text, correct_answer)
        except ImportError:
            logging.warning("Could not import test question finder, falling back to default implementation")
            # Fall through to default implementation below if import fails
        except Exception as e:
            logging.error(f"Error loading test_question_finder: {e}. Falling back to default.")


    # Handle path - check if we're in the .github/scripts directory or in the repo root
    exported_dir_candidates = ["../../src/exported-questions", "src/exported-questions"]
    exported_dir = None
    for candidate in exported_dir_candidates:
        if os.path.exists(candidate):
            exported_dir = candidate
            break
    if not exported_dir:
        logging.error("Could not find exported questions directory.")
        return None
    
    logging.info(f"Using exported questions directory: {exported_dir}")

    # Strategy 1: Find by ID if available
    if question_id is not None: # Explicitly check for not None
        logging.info(f"Searching for question by ID: {question_id}")
        for filename in os.listdir(exported_dir):
            if not filename.endswith('.mjs'):
                continue
            filepath = os.path.join(exported_dir, filename)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # More robust ID check, allowing for spaces around comma and colon
                    if re.search(rf'"id"\s*:\s*{question_id}\s*,', content):
                        domain_name = filename.replace('.mjs', '')
                        logging.info(f"Found question ID {question_id} in file {domain_name}")
                        return (domain_name, question_id)
            except Exception as e:
                logging.warning(f"Error reading file {filepath} during ID search: {e}")
        logging.info(f"Question ID {question_id} not found via direct ID search strategy.")


    # Strategy 2-3: Find by question text if available
    if question_text:
        clean_question = re.sub(r'\s+', ' ', question_text).strip().lower() # Normalize to lower for comparison
        logging.info(f"Searching for question by text (normalized): {clean_question[:50]}...")
        
        for filename in os.listdir(exported_dir):
            if not filename.endswith('.mjs'):
                continue
            filepath = os.path.join(exported_dir, filename)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                # Extract all question objects more reliably
                # This pattern looks for JSON objects with "id" and "question" keys
                for match in re.finditer(r'{\s*"id"\s*:\s*(\d+)\s*,\s*"question"\s*:\s*"((?:\\.|[^"])*)"', content):
                    found_id = int(match.group(1))
                    found_question_raw = match.group(2)
                    # Basic unescaping for comparison (e.g., \\" to ")
                    found_question_unescaped = found_question_raw.replace('\\"', '"').replace('\\n', '\n')
                    found_question_clean = re.sub(r'\s+', ' ', found_question_unescaped).strip().lower()
                    
                    if clean_question == found_question_clean:
                        domain_name = filename.replace('.mjs', '')
                        logging.info(f"Found exact question text match in {domain_name}, question ID: {found_id}")
                        return (domain_name, found_id)
                    
                    # Consider using a library for fuzzy matching if partials are important
                    # For now, keeping simple substring or word set overlap
                    if (len(clean_question) > 15 and
                        (clean_question in found_question_clean or
                         found_question_clean in clean_question or
                         (len(set(clean_question.split()) & set(found_question_clean.split())) > len(clean_question.split()) / 2))):
                        domain_name = filename.replace('.mjs', '')
                        logging.info(f"Found partial question text match in {domain_name}, question ID: {found_id}")
                        return (domain_name, found_id) # Return first good partial match
            except Exception as e:
                logging.warning(f"Error reading/parsing file {filepath} during text search: {e}")
        logging.info(f"Question text '{clean_question[:50]}...' not found via text search strategy.")

    # Strategy 4: Find by correct answer if available (less reliable, use with caution)
    if correct_answer:
        clean_answer = re.sub(r'\s+', ' ', correct_answer).strip().lower()
        logging.info(f"Searching for question by correct answer (normalized): {clean_answer[:50]}...")
        # This strategy is complex and can be error-prone.
        # Consider if it's truly needed or if improving ID/text extraction is better.
        # For now, commenting out detailed implementation to focus on ID/text.
        logging.warning("Search by correct answer is complex and currently not fully implemented in this fallback.")


    logging.warning("Could not find a matching question in any file using available strategies.")
    return None

def run_refine_script(question_domain, question_id=None):
    """Run the refine_questions.py script for the given domain."""
    if not question_domain:
        logging.error("Cannot run refine script: question_domain is not provided.")
        return False
    logging.info(f"Running refine script for domain: {question_domain}" + (f", ID: {question_id}" if question_id is not None else ""))
    
    cmd = [
        "python3", 
        REFINE_SCRIPT, 
        "--category", question_domain,
    ]
    
    if question_id is not None: # Ensure ID is explicitly passed if available
        cmd.extend(["--question-id", str(question_id)])
    
    logging.info(f"Refine script command: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
    
    if result.returncode != 0:
        logging.error(f"Error running refine script. Return code: {result.returncode}")
        logging.error(f"Refine script STDERR:\n{result.stderr}")
        logging.error(f"Refine script STDOUT:\n{result.stdout}") # Log stdout too on error
        return False
        
    logging.info(f"Refine script STDOUT:\n{result.stdout}")
    if result.stderr: # Log stderr even on success if not empty
        logging.info(f"Refine script STDERR (non-fatal or warnings):\n{result.stderr}")
    return True

def run_review_script(question_domain, question_id=None):
    """Run the review_questions.py script for the given domain."""
    if not question_domain:
        logging.error("Cannot run review script: question_domain is not provided.")
        return False
    logging.info(f"Running review script for domain: {question_domain}" + (f", ID: {question_id}" if question_id is not None else ""))
    
    cmd = [
        "python3", 
        REVIEW_SCRIPT, 
        "--category", question_domain
    ]
    
    if question_id is not None:
        cmd.extend(["--question-id", str(question_id)])

    logging.info(f"Review script command: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
    
    if result.returncode != 0:
        logging.error(f"Error running review script. Return code: {result.returncode}")
        logging.error(f"Review script STDERR:\n{result.stderr}")
        logging.error(f"Review script STDOUT:\n{result.stdout}")
        return False
        
    logging.info(f"Review script STDOUT:\n{result.stdout}")
    if result.stderr:
        logging.info(f"Review script STDERR (non-fatal or warnings):\n{result.stderr}")
    return True

def run_node_scripts():
    """Run the Node.js scripts to update the database and export questions."""
    logging.info("Running Node.js update script")
    
    update_result = subprocess.run(["node", NODE_UPDATE_SCRIPT], capture_output=True, text=True, encoding='utf-8')
    if update_result.returncode != 0:
        logging.error(f"Error running update script. Return code: {update_result.returncode}")
        logging.error(f"Node Update STDERR:\n{update_result.stderr}")
        logging.error(f"Node Update STDOUT:\n{update_result.stdout}")
        return False
    logging.info(f"Update script output:\n{update_result.stdout}")
    if update_result.stderr:
        logging.info(f"Update script STDERR (non-fatal or warnings):\n{update_result.stderr}")
    
    logging.info("Running Node.js export script")
    export_result = subprocess.run(["node", NODE_EXPORT_SCRIPT], capture_output=True, text=True, encoding='utf-8')
    if export_result.returncode != 0:
        logging.error(f"Error running export script. Return code: {export_result.returncode}")
        logging.error(f"Node Export STDERR:\n{export_result.stderr}")
        logging.error(f"Node Export STDOUT:\n{export_result.stdout}")
        return False
    logging.info(f"Export script output:\n{export_result.stdout}")
    if export_result.stderr:
        logging.info(f"Export script STDERR (non-fatal or warnings):\n{export_result.stderr}")
    return True

def create_comment_on_issue(issue_number, message):
    """Create a comment on the GitHub issue using the GitHub CLI."""
    logging.info(f"Attempting to add comment to issue #{issue_number}")
    
    if not shutil.which("gh"):
        logging.warning("`gh` CLI not found. Skipping comment creation. Message for issue #{issue_number}:\n{message}")
        return True # Non-fatal if gh is not present for local testing
    
    cmd = ["gh", "issue", "comment", str(issue_number), "--body", message]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True, encoding='utf-8')
        logging.info(f"Successfully commented on issue #{issue_number}. Output:\n{result.stdout}")
        return True
    except subprocess.CalledProcessError as e:
        logging.error(f"Error creating comment on issue #{issue_number}. Return code: {e.returncode}")
        logging.error(f"GH CLI STDERR:\n{e.stderr}")
        logging.error(f"GH CLI STDOUT:\n{e.stdout}")
        return False
    except Exception as e:
        logging.error(f"An unexpected error occurred when trying to comment on issue #{issue_number}: {e}")
        return False

def main():
    if len(sys.argv) < 4:
        logging.error("Usage: python process_issue.py <issue_title> <issue_body> <issue_number>")
        sys.exit(1)
        
    issue_title = sys.argv[1]
    issue_body = sys.argv[2]
    issue_number = int(sys.argv[3])
    
    logging.info(f"Processing GitHub issue #{issue_number}: \"{issue_title}\"")
    
    question_info = extract_question_info(issue_title, issue_body)
    
    logging.info(f"Initial extracted info from issue: {json.dumps(question_info, indent=2)}")
    
    # Attempt to find the question file and ID if not already explicitly found
    if not question_info["id"] or not question_info["domain"]:
        logging.info("Attempting to find question file/ID as it was not fully extracted from issue content.")
        # Log the full issue body for debugging (with sensitive info redacted if any)
        safe_body = re.sub(r'token\s*[:=]\s*[^\s]+', 'token=REDACTED', issue_body) # Example redaction
        logging.debug(f"Full issue body provided to find_question_file (debugging):\n{safe_body}")
        
        result_find_file = find_question_file(
            question_id=question_info["id"], # Pass current ID (might be None)
            question_text=question_info["question_text"],
            correct_answer=question_info["correct_answer"]
        )
        
        if result_find_file:
            found_domain, found_id = result_find_file
            logging.info(f"find_question_file succeeded: Domain='{found_domain}', ID='{found_id}'")
            question_info["domain"] = found_domain # Prioritize domain from find_question_file
            if found_id is not None and question_info["id"] is None: # Only update ID if not already set and find_question_file provides one
                question_info["id"] = found_id
            logging.info(f"Question info after find_question_file: {json.dumps(question_info, indent=2)}")
        else:
            logging.warning("find_question_file did not return a result.")
            # If domain was manually extracted by extract_question_info but ID is still missing, that's an issue.
            # The 'clear_domain_markers' logic was here, but it's better if extract_question_info handles domain.
            # If domain is present but ID is missing after all attempts, it's a critical issue for targeted fixes.
            if question_info["domain"] and question_info["id"] is None:
                 logging.error(f"Domain '{question_info['domain']}' identified, but specific Question ID could not be determined.")
                 error_msg = (f"❌ Automation failed for issue #{issue_number}: "
                              f"The domain '{question_info['domain']}' was identified, but the specific Question ID is missing.\n\n"
                              "Please ensure the issue body contains enough information to identify the question (e.g., full question text) "
                              "or explicitly mention the Question ID (e.g., `Question ID: 123`).")
                 create_comment_on_issue(issue_number, error_msg)
                 sys.exit(1)

    # Final check for essential info: domain is always needed. ID is needed for refine/review of specific q.
    if not question_info["domain"]:
        logging.error("Could not determine the domain for this question. Processing cannot continue.")
        error_msg = (f"❌ Automation failed for issue #{issue_number}: Could not determine the question's domain.\n\n"
                      "Please specify the domain in the issue body (e.g., `Domain: Kubernetes_Security_Fundamentals`)."
                      f"\n\n**Debug information extracted:**\n{json.dumps(question_info, indent=2)}")
        create_comment_on_issue(issue_number, error_msg)
        sys.exit(1)

    # If ID is still None at this point, it means we are processing a domain generally,
    # not a specific question identified by ID. Scripts should handle ID=None.
    if question_info["id"] is None:
        logging.warning(f"Proceeding without a specific Question ID for domain '{question_info['domain']}'. "
                        "Scripts will operate on the category/revision level.")

    success = False
    if question_info["needs_review"]:
        success = run_review_script(question_info["domain"], question_info["id"])
    else:
        success = run_refine_script(question_info["domain"], question_info["id"])
    
    if not success:
        logging.error("Script execution (refine/review) failed.")
        create_comment_on_issue(
            issue_number,
            f"❌ Automation failed for issue #{issue_number}: There was an error running the question processing script for domain '{question_info['domain']}'"
            + (f" and question ID {question_info['id']}" if question_info['id'] else "")
            + ". Please check the workflow logs."
        )
        sys.exit(1)
    
    if not run_node_scripts():
        logging.error("Node scripts execution failed.")
        create_comment_on_issue(
            issue_number,
            f"❌ Automation failed for issue #{issue_number}: There was an error updating the database/exporting questions after processing. Please check the workflow logs."
        )
        sys.exit(1)
    
    comment_message = f"✅ Question processing completed for issue #{issue_number} concerning domain '{question_info['domain']}'."
    if question_info["id"]:
        comment_message += f" Specific question ID targeted: #{question_info['id']}."
    else:
        comment_message += " General processing was performed for the domain."
    comment_message += "\nCheck workflow logs and any resulting PRs for details."

    create_comment_on_issue(issue_number, comment_message)
    logging.info("Issue processing completed successfully.")

if __name__ == "__main__":
    main()