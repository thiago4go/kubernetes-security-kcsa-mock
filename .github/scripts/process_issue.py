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
    
    # Initialize default values
    question_info = {
        "id": None,
        "domain": None,
        "error_type": "content",  # Default to content error
        "needs_review": False,     # Default to refine
        "question_text": None,     # Actual question text to help with identification
        "correct_answer": None     # Correct answer text to help with identification
    }
    

    # Extract question ID from title (e.g., "Erro on answer #61" or "Erro on answer id: 16")
    id_match = re.search(r'#(\d+)', title)
    if id_match:
        question_info["id"] = int(id_match.group(1))
    else:
        # Try alternative format with 'id:' in title
        id_match = re.search(r'id:\s*(\d+)', title, re.IGNORECASE)
        if id_match:
            question_info["id"] = int(id_match.group(1))
        else:
            # Look for ID in the body
            id_match = re.search(r'#(\d+)', body)
            if id_match:
                question_info["id"] = int(id_match.group(1))
            else:
                # Try alternative format with 'id:' in body
                id_match = re.search(r'id:\s*(\d+)', body, re.IGNORECASE)
                if id_match:
                    question_info["id"] = int(id_match.group(1))
  
    
    # Look for domain information in the body (improved regex pattern)
    domain_patterns = [
        r'Domain:\s*([^\n]+)',
        r'Domain[^\w]*\s*(\w[\w\s_-]+)',
        r'domain[^\w]*\s*(\w[\w\s_-]+)'
    ]
    
    for pattern in domain_patterns:
        domain_match = re.search(pattern, body, re.IGNORECASE)
        if domain_match:
            domain = domain_match.group(1).strip()
            # Format domain name correctly for file matching
            domain = domain.lower().replace(' ', '_')
            question_info["domain"] = domain
            logging.info(f"Found domain: {domain}")
            break
    
    # Extract the question text itself (useful for identifying questions without IDs)
    question_match = re.search(r'Question:\s*(.+?)(?:\n|Your answer:|$)', body, re.DOTALL | re.IGNORECASE)
    if question_match:
        question_info["question_text"] = question_match.group(1).strip()
    
    # Extract the correct answer
    correct_answer_match = re.search(r'Correct answer:\s*(.+?)(?:\n|Explanation:|$)', body, re.DOTALL | re.IGNORECASE)
    if correct_answer_match:
        question_info["correct_answer"] = correct_answer_match.group(1).strip()
    
    # Determine if this is a content error or needs full review
    if "needs full review" in body.lower() or "needs comprehensive review" in body.lower():
        question_info["needs_review"] = True
    
    # Determine error type
    if "answer" in title.lower() or "correct answer" in body.lower():
        question_info["error_type"] = "answer"
    elif "explanation" in title.lower() or "explanation" in body.lower():
        question_info["error_type"] = "explanation"
    elif "question" in title.lower() or "question text" in body.lower():
        question_info["error_type"] = "question"
    
    # Dynamically load domain mappings from /src/questions_metadata.json
    domain_mapping = {}
    metadata_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "src", "questions_metadata.json")
    if os.path.exists(metadata_path):
        try:
            with open(metadata_path, "r", encoding="utf-8") as f:
                domains_data = json.load(f)
                # The file contains domain names as keys and question counts as values
                for domain_key in domains_data.keys():
                    # Convert to lowercase with underscores for consistent mapping
                    normalized_key = domain_key.lower()
                    # Map each domain to itself (for normalization)
                    domain_mapping[normalized_key] = domain_key
                    # Also map without underscores
                    domain_mapping[normalized_key.replace('_', ' ')] = domain_key
        except Exception as e:
            logging.warning(f"Could not load domain mapping from metadata: {e}")
    else:
        logging.warning(f"questions_metadata.json not found at {metadata_path}")
    
    if question_info["domain"] and question_info["domain"] in domain_mapping:
        question_info["domain"] = domain_mapping[question_info["domain"]]
        logging.info(f"Mapped domain to: {question_info['domain']}")
    
    return question_info



def find_question_file(question_id=None, question_text=None, correct_answer=None):
    """
    Find which file contains the question with the given ID or content.
    Uses multiple identification strategies in order of reliability:
    1. Question ID (most reliable)
    2. Exact question text match
    3. Fuzzy question text match
    4. Correct answer text match
    
    Returns: tuple of (domain_name, question_id)
    """
    # For testing, use a specific function from test_question_finder if it exists
    test_finder_path = os.path.join(os.path.dirname(__file__), "test_question_finder.py")
    if os.path.exists(test_finder_path):
        try:
            sys.path.append(os.path.dirname(__file__))
            from test_question_finder import find_question
            logging.info("Using test question finder function")
            return find_question(question_id, question_text, correct_answer)
        except ImportError:
            logging.warning("Could not import test question finder, falling back to default implementation")
    
    # Handle path - check if we're in the .github/scripts directory or in the repo root
    if os.path.exists("../../src/exported-questions"):
        exported_dir = "../../src/exported-questions"
    elif os.path.exists("src/exported-questions"):
        exported_dir = "src/exported-questions"
    else:
        logging.error("Could not find exported questions directory")
        return None
    
    # Strategy 1: Find by ID if available
    if question_id:
        logging.info(f"Searching for question by ID: {question_id}")
        for filename in os.listdir(exported_dir):
            if not filename.endswith('.mjs'):
                continue
                
            filepath = os.path.join(exported_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                if f'"id": {question_id},' in content or f'"id":{question_id},' in content:
                    domain_name = filename.replace('.mjs', '')
                    logging.info(f"Found question ID {question_id} in file {domain_name}")
                    return (domain_name, question_id)
    
    # Strategy 2-3: Find by question text if available
    if question_text:
        # Clean the question text for comparison (remove extra whitespace)
        clean_question = re.sub(r'\s+', ' ', question_text).strip()
        logging.info(f"Searching for question by text: {clean_question[:50]}...")
        
        # First pass: Look for exact match
        for filename in os.listdir(exported_dir):
            if not filename.endswith('.mjs'):
                continue
                
            filepath = os.path.join(exported_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
                # Extract all question objects from the file
                # This pattern looks for JSON objects within the array
                matches = re.finditer(r'{\s*"id":\s*(\d+),\s*"question":\s*"([^"]+)"', content)
                
                for match in matches:
                    found_id = match.group(1)
                    found_question = match.group(2)
                    # Clean found question text for comparison
                    found_question_clean = re.sub(r'\s+', ' ', found_question).strip()
                    
                    # Check for exact match
                    if clean_question == found_question_clean:
                        domain_name = filename.replace('.mjs', '')
                        logging.info(f"Found exact question text match in {domain_name}, question ID: {found_id}")
                        return (domain_name, int(found_id))
        
        # Second pass: Look for substring match (for partial questions)
        # Only if we couldn't find an exact match
        if len(clean_question) > 15:  # Only consider substantial questions to avoid false positives
            for filename in os.listdir(exported_dir):
                if not filename.endswith('.mjs'):
                    continue
                    
                filepath = os.path.join(exported_dir, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                    # Extract all question objects from the file
                    matches = re.finditer(r'{\s*"id":\s*(\d+),\s*"question":\s*"([^"]+)"', content)
                    
                    for match in matches:
                        found_id = match.group(1)
                        found_question = match.group(2)
                        # Clean found question text for comparison
                        found_question_clean = re.sub(r'\s+', ' ', found_question).strip()
                        
                        # Check for significant substring match (at least 50% of words match)
                        if (clean_question in found_question_clean or 
                            found_question_clean in clean_question or
                            len(set(clean_question.split()) & set(found_question_clean.split())) > len(clean_question.split()) / 2):
                            domain_name = filename.replace('.mjs', '')
                            logging.info(f"Found partial question text match in {domain_name}, question ID: {found_id}")
                            return (domain_name, int(found_id))
    
    # Strategy 4: Find by correct answer if available
    if correct_answer:
        clean_answer = re.sub(r'\s+', ' ', correct_answer).strip()
        logging.info(f"Searching for question by correct answer: {clean_answer[:50]}...")
        
        for filename in os.listdir(exported_dir):
            if not filename.endswith('.mjs'):
                continue
                
            filepath = os.path.join(exported_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
                # Extract all options arrays and check if any contain the correct answer
                option_blocks = re.finditer(r'"options":\s*\[((?:"[^"]*",?\s*)+)\]', content)
                
                for block_match in option_blocks:
                    options_str = block_match.group(1)
                    options = re.findall(r'"([^"]+)"', options_str)
                    
                    # Find start of the question object
                    # Find this option block's position in the file
                    block_pos = block_match.start()
                    
                    # Go backwards to find the question ID
                    question_match = re.search(r'"id":\s*(\d+)', content[:block_pos])
                    if question_match:
                        found_id = question_match.group(1)
                    else:
                        continue
                    
                    # Check if the correct answer is among the options
                    for option in options:
                        if clean_answer in option or option in clean_answer:
                            domain_name = filename.replace('.mjs', '')
                            logging.info(f"Found matching answer in {domain_name}, question ID: {found_id}")
                            return (domain_name, int(found_id))
    
    # If we reach here, we couldn't find the question
    logging.warning("Could not find a matching question in any file")
    return None

def run_refine_script(question_domain, question_id=None):
    """Run the refine_questions.py script for the given domain."""
    logging.info(f"Running refine script for domain: {question_domain}")
    
    cmd = [
        "python3", 
        REFINE_SCRIPT, 
        "--category", question_domain,
    ]
    
    # Add question ID parameter if provided
    if question_id is not None:
        cmd.extend(["--question-id", str(question_id)])
    
    logging.info(f"Command: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        logging.error(f"Error running refine script: {result.stderr}")
        return False
        
    logging.info(f"Refine script output: {result.stdout}")
    return True

def run_review_script(question_domain, question_id=None):
    """Run the review_questions.py script for the given domain."""
    logging.info(f"Running review script for domain: {question_domain}")
    
    cmd = [
        "python3", 
        REVIEW_SCRIPT, 
        "--category", question_domain
    ]
    
    # Add question ID parameter if provided
    if question_id is not None:
        cmd.extend(["--question-id", str(question_id)])
    logging.info(f"Command: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        logging.error(f"Error running review script: {result.stderr}")
        return False
        
    logging.info(f"Review script output: {result.stdout}")
    return True

def run_node_scripts():
    """Run the Node.js scripts to update the database and export questions."""
    logging.info("Running Node.js update script")
    
    # Run update script
    update_result = subprocess.run(["node", NODE_UPDATE_SCRIPT], capture_output=True, text=True)
    if update_result.returncode != 0:
        logging.error(f"Error running update script: {update_result.stderr}")
        return False
        
    logging.info(f"Update script output: {update_result.stdout}")
    
    # Run export script
    logging.info("Running Node.js export script")
    export_result = subprocess.run(["node", NODE_EXPORT_SCRIPT], capture_output=True, text=True)
    if export_result.returncode != 0:
        logging.error(f"Error running export script: {export_result.stderr}")
        return False
        
    logging.info(f"Export script output: {export_result.stdout}")
    return True

def create_comment_on_issue(issue_number, message):
    """Create a comment on the GitHub issue using the GitHub CLI."""
    logging.info(f"Adding comment to issue #{issue_number}")
    
    # For testing in local environment, just log the message
    if not shutil.which("gh"):
        logging.info(f"Would add comment to issue #{issue_number}: {message}")
        return True
    
    cmd = [
        "gh", "issue", "comment",
        str(issue_number),
        "--body", message
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        logging.error(f"Error creating comment: {result.stderr}")
        return False
    
    return True

def main():
    if len(sys.argv) < 4:
        logging.error("Usage: python process_issue.py <issue_title> <issue_body> <issue_number>")
        sys.exit(1)
        
    issue_title = sys.argv[1]
    issue_body = sys.argv[2]
    issue_number = int(sys.argv[3])
    
    logging.info(f"Processing issue #{issue_number}: {issue_title}")
    
    # Extract question information
    question_info = extract_question_info(issue_title, issue_body)
    
    # Debug output to help diagnose issues
    logging.info(f"Extracted info: {json.dumps(question_info, indent=2)}")
    
    # Try to identify the domain and question using multiple methods
    if not question_info["domain"] or not question_info["id"]:
        # Log the full issue body for debugging (with sensitive info redacted)
        safe_body = re.sub(r'token\s*[:=]\s*[^\s]+', 'token=REDACTED', issue_body)
        logging.info(f"Full issue body (for debugging domain extraction):\n{safe_body}")
        
        result = find_question_file(
            question_id=question_info["id"],
            question_text=question_info["question_text"],
            correct_answer=question_info["correct_answer"]
        )
        
        if result:
            domain_name, found_id = result
            question_info["domain"] = domain_name
            if not question_info["id"]:
                question_info["id"] = found_id
            logging.info(f"Identified question as being in domain: {domain_name}, ID: {found_id}")
        else:
            # Attempt to manually extract domain from clear text references
            clear_domain_markers = [
                "Domain is", "domain:", "Domain -", "Domain:", 
                "Category:", "category:", "Topic:", "topic:"
            ]
            
            for marker in clear_domain_markers:
                if marker.lower() in issue_body.lower():
                    # Find the position of the marker
                    pos = issue_body.lower().find(marker.lower())
                    # Extract the rest of that line
                    line_end = issue_body.find("\n", pos)
                    if line_end == -1:  # No newline found
                        line_end = len(issue_body)
                    
                    domain_text = issue_body[pos + len(marker):line_end].strip()
                    logging.info(f"Found manual domain marker: '{marker}' with value: '{domain_text}'")
                    
                    # Basic cleaning and normalization
                    clean_domain = re.sub(r'[^\w\s]', '', domain_text).lower().strip()
                    clean_domain = re.sub(r'\s+', '_', clean_domain)
                    
                    logging.info(f"Setting domain to: {clean_domain}")
                    question_info["domain"] = clean_domain
                    break
                        
            if not question_info["domain"]:
                logging.error("Could not identify which domain contains this question")
                
                # Create detailed error message with extracted info for debugging
                error_msg = "❌ Automation failed: Could not determine which file contains this question.\n\n"
                error_msg += "**Debug information extracted:**\n"
                
                if question_info["id"]:
                    error_msg += f"- Question ID: #{question_info['id']}\n"
                else:
                    error_msg += "- No question ID found in issue\n"
                    
                if question_info["question_text"]:
                    error_msg += f"- Question text: '{question_info['question_text'][:100]}...'\n"
                else:
                    error_msg += "- No question text found in issue\n"
                    
                if question_info["correct_answer"]:
                    error_msg += f"- Correct answer: '{question_info['correct_answer'][:100]}...'\n"
                else:
                    error_msg += "- No correct answer found in issue\n"
                    
                error_msg += "\nPlease specify the domain in the issue body or include more details about the question."
                
                create_comment_on_issue(issue_number, error_msg)
                sys.exit(1)
    
    # Run the appropriate script
    success = False
    if question_info["needs_review"]:
        # Run the review script for comprehensive reviews
        success = run_review_script(question_info["domain"], question_info["id"])
    else:
        # Run the refine script for targeted fixes
        # Try both revision 0 and 1 if the first attempt fails
        success = run_refine_script(question_info["domain"], question_info["id"])

    
    if not success:
        logging.error("Script execution failed")
        create_comment_on_issue(
            issue_number,
            "❌ Automation failed: There was an error running the question processing script. Please check the workflow logs."
        )
        sys.exit(1)
    
    # Run Node.js scripts to update DB and export
    if not run_node_scripts():
        logging.error("Node scripts execution failed")
        create_comment_on_issue(
            issue_number,
            "❌ Automation failed: There was an error updating the database. Please check the workflow logs."
        )
        sys.exit(1)
    
    # Add comment to issue indicating success
    create_comment_on_issue(
        issue_number,
        f"✅ Question processing completed successfully. A pull request has been created to fix question #{question_info['id']}."
    )
    
    logging.info("Issue processing completed successfully")

if __name__ == "__main__":
    main()
