import os
import json
import requests
import re
import datetime
import time
import logging
import argparse
import subprocess
import shutil # For backup

# --- Configuration ---
PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions"
MODEL_NAME = "sonar-pro" # Reverted to potentially valid name
BATCH_SIZE = 5
INPUT_DIR = "../../src/exported-questions"
OUTPUT_DIR = "../../src/revised-questions"
# Delay between API calls in seconds (to avoid rate limits if necessary)
API_CALL_DELAY = 1

# --- Logging Setup ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

NODE_UPDATE_SCRIPT = "db-tools/update_questions.mjs"
NODE_EXPORT_SCRIPT = "db-tools/export_questions.mjs"

# --- Prompt Template ---
PROMPT_TEMPLATE = """
Please analyze the provided JSON array of question objects. Your primary task is to meticulously identify and revise questions *only* if they meet specific criteria: factual incorrectness, lack of clarity for a KCSA-level audience, or the use of significantly deprecated Kubernetes information. You must *not* make stylistic changes or rephrase content that is already accurate, clear, and current.

1.  **Identify Necessary Revisions (Strict Criteria):**
    Carefully examine each question object. Propose revisions *only* if the question, its options, the designated correct answers, or the explanation meet one or more of the following conditions:
    * **Incorrect:** Contains factually inaccurate information regarding Kubernetes concepts, features, security best practices, or KCSA-relevant tooling.
    * **Unclear/Ambiguous:** The question is worded in a way that is ambiguous, lacks crucial context for understanding by someone with KCSA-level knowledge, or could be easily misinterpreted, thereby failing to accurately assess knowledge.
    * **Deprecated Information:** Refers to Kubernetes features, API versions (e.g., beta APIs that have long graduated or been removed), commands, or practices that are significantly outdated (e.g., deprecated for more than 1-2 years or superseded by clear, widely adopted alternatives) and no longer relevant for current Kubernetes versions (assume target is recent stable versions, e.g., v1.27+ as of May 2025) or KCSA exam objectives.

2.  **Perform Minimal, Targeted Revisions:**
    * If a question meets the criteria above, revise *only the specific parts* (e.g., a single option, a sentence in the explanation, the question phrasing) that are incorrect, unclear, or deprecated.
    * The goal is to correct/update, not to rewrite extensively if other parts of the question remain valid.
    * Ensure revisions maintain or improve alignment with KCSA-level understanding and terminology.

3.  **Update Sources (Conditionally):**
    * If revisions were made (especially for incorrectness or deprecated information), critically evaluate the existing sources.
    * Replace or add new sources *only if* the original sources no longer support the corrected/updated content or if they themselves point to deprecated information.
    * New or replacement sources must be authoritative and current (e.g., official Kubernetes documentation for the relevant feature, CNCF blogs, reputable Kubernetes security references). Aim for at least two robust sources supporting any revised content.
    * If no revisions are made to the question content, or if original sources still adequately support minor clarifications, retain the original sources.

4.  **Preserve Original Content and Metadata where No Revision is Warranted:**
    * If a question *does not* meet any of the criteria in point 1, return the original question object *completely unchanged*. This includes its `id`, `question`, `options`, `correct_answers`, `explanation`, `question_type`, `domain`, `subdomain`, `sources`, original `revision` value, and original `revision_date`.

5.  **Output Structured JSON (Strict Adherence):**
    The output MUST be a single, valid JSON array containing *all* question objects from the input batch.
    * For questions that were revised, update the `revision` field by incrementing its previous value (or setting to `1` if it was `0` or `null`). Set `revision_date` to **2025-05-16**.
    * For questions *not* revised, all fields, including `revision` and `revision_date`, must remain identical to the input.

    The structure for EACH question object (whether revised or original) in the response array must strictly follow:
    ```json
    {
      "id": "<question_id>", // Unchanged
      "question": "<question_text>", // Revised only if incorrect/unclear/deprecated
      "options": [ // Array revised only if options were incorrect/unclear/deprecated
        "<option_1_text>",
        "<option_2_text>",
        "<option_3_text>",
        "<option_4_text>",
        "<option_5_text>"
      ],
      "correct_answers": [ <correct_option_index_1>, ... ], // Revised only if incorrect
      "explanation": "<explanation_text>", // Revised only if incorrect/unclear/deprecated
      "question_type": "<question_type>", // Unchanged unless the nature of the fix requires it (rare)
      "domain": "<domain>", // Unchanged
      "subdomain": "<subdomain>", // Unchanged
      "sources": [ // Updated only if revision occurred AND original sources became invalid/insufficient
        { "name": "<source_1_name>", "url": "<source_1_url>" },
        { "name": "<source_2_name>", "url": "<source_2_url>" }
      ],
      "revision": <updated_or_original_revision_value>,
      "revision_date": "<2025-05-16_or_original_revision_date>"
    }
    ```

6.  **Generate PR Messages (Only for Revised Questions):**
    * After the JSON block, provide a concise PR message *only for each question that was actually revised*.
    * Prefix this section with "--- PR MESSAGES ---".
    * Each message must clearly state:
        * The `id` of the question.
        * The *specific reason* for the revision (e.g., "Corrected factual error regarding etcd backup procedures in explanation.", "Clarified ambiguous wording in question related to NetworkPolicy ingress rules.", "Updated deprecated `kubectl run` flag to current equivalent.", "Replaced outdated API version for PodSecurityPolicy with information on Pod Security Admission.").
        * A brief summary of the change (e.g., "Explanation now states X instead of Y.", "Question rephrased for clarity.", "Option C updated from Z to A and relevant source added.").
    * Separate PR messages with double newlines (`\n\n`). Do *not* generate PR messages for unchanged questions.

---
Input JSON Array of Questions:
```json
{questions_json}
```
"""

# --- Helper Functions ---

def get_api_key():
    """Retrieves the Perplexity API key from environment variables."""
    api_key = os.environ.get("PERPLEXITY_API_KEY")
    if not api_key:
        raise ValueError("PERPLEXITY_API_KEY environment variable not set.")
    return api_key

def find_mjs_files(directory):
    """Finds all .mjs files in the specified directory."""
    mjs_files = []
    if not os.path.isdir(directory):
        logging.error(f"Input directory not found: {directory}")
        return mjs_files
    for filename in os.listdir(directory):
        if filename.endswith(".mjs"):
            mjs_files.append(os.path.join(directory, filename))
    logging.info(f"Found {len(mjs_files)} .mjs files in {directory}")
    return mjs_files

def parse_mjs_file(filepath):
    """
    Parses an .mjs file to extract header comments, variable name, and questions JSON array.
    Returns (header_comments, variable_name, questions_list) or (None, None, None) on failure.
    """
    header_comments = ""
    variable_name = None
    questions = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Regex to find the variable name and the array
        match = re.search(r'export const (\w+) = (\[.*?\]);', content, re.DOTALL | re.MULTILINE)
        if match:
            variable_name = match.group(1)
            json_string = match.group(2)

            # Extract header comments (lines before the export statement)
            header_match = re.search(r'^(.*?)\nexport const', content, re.DOTALL | re.MULTILINE)
            if header_match:
                header_comments = header_match.group(1).strip()

            # Basic cleaning: Remove trailing commas before closing brackets/braces if any
            json_string = re.sub(r',\s*([\]}])', r'\1', json_string)
            questions = json.loads(json_string)
            logging.info(f"Successfully parsed {len(questions)} questions, variable '{variable_name}', and headers from {filepath}")
            return header_comments, variable_name, questions
        else:
            logging.warning(f"Could not find questions array pattern 'export const VarName = [...]' in {filepath}")
            return None, None, None
    except FileNotFoundError:
        logging.error(f"File not found: {filepath}")
        return None, None, None
    except json.JSONDecodeError as e:
        logging.error(f"Error decoding JSON from {filepath}: {e}")
        # Optionally log the problematic string part:
        # logging.error(f"Problematic JSON string snippet: {json_string[:500]}...")
        return None, None, None
    except Exception as e:
        logging.error(f"An unexpected error occurred parsing {filepath}: {e}")
        return []
    except json.JSONDecodeError as e:
        logging.error(f"Error decoding JSON from {filepath}: {e}")
        # Optionally log the problematic string part:
        # logging.error(f"Problematic JSON string snippet: {json_string[:500]}...")
        return []
    except Exception as e:
        logging.error(f"An unexpected error occurred parsing {filepath}: {e}")
        return None, None, None

def filter_questions_for_revision(questions, target_revision):
    """Filters questions based on the target revision number."""
    if not questions: # Handle case where parsing failed
        return []
    filtered = [
        q for q in questions
        if q.get('revision') == target_revision
    ]
    logging.info(f"Filtered {len(filtered)} questions with revision number {target_revision}.")
    return filtered

def format_prompt(questions_batch):
    """Formats the prompt with the current batch of questions."""
    today_date = datetime.date.today().strftime("%Y-%m-%d")
    """Formats the prompt with the current batch of questions and today's date."""
    today_date = datetime.date.today().strftime("%Y-%m-%d")
    # Prepare questions for JSON embedding
    batch_json_string = json.dumps(questions_batch, indent=2)
    # Inject batch JSON and today's date into the main prompt template
    prompt = PROMPT_TEMPLATE.replace("{questions_json}", batch_json_string).replace("{today_date}", today_date)
    return prompt

def call_perplexity_api(api_key, prompt, batch_size_info):
    """Calls the Perplexity API with the given prompt."""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": "You are an AI assistant helping to review and improve Kubernetes security questions."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 4000, # Adjust as needed, consider response size
        "temperature": 0.3, # Lower temperature for more deterministic output
    }

    logging.info(f"Calling Perplexity API for a batch of {batch_size_info} questions...")
    try:
        response = requests.post(PERPLEXITY_API_URL, headers=headers, json=payload, timeout=300) # Increased timeout further
        response.raise_for_status()  # Raise an exception for bad status codes (4xx or 5xx)
        logging.info("API call successful.")
        return response.json()
    except requests.exceptions.RequestException as e:
        logging.error(f"Error calling Perplexity API: {e}")
        if hasattr(e, 'response') and e.response is not None:
            logging.error(f"API Response Status Code: {e.response.status_code}")
            logging.error(f"API Response Body: {e.response.text}")
        return None
    except Exception as e:
        logging.error(f"An unexpected error occurred during API call: {e}")
        return None

def parse_api_response(api_response_json):
    """
    Parses the API response to extract revised questions and PR messages.
    This function makes assumptions about the response format based on the prompt.
    It might need significant adjustments after seeing actual API output.
    """
    revised_questions = []
    pr_messages = ""

    if not api_response_json or 'choices' not in api_response_json or not api_response_json['choices']:
        logging.error("Invalid or empty API response received.")
        return revised_questions, pr_messages

    try:
        content = api_response_json['choices'][0]['message']['content']

        # Attempt to extract the JSON block first
        json_match = re.search(r'```json\s*(\[.*?\])\s*```', content, re.DOTALL | re.IGNORECASE)
        if json_match:
            json_string = json_match.group(1)
            try:
                revised_questions = json.loads(json_string)
                logging.info(f"Successfully parsed {len(revised_questions)} revised questions from API response.")
            except json.JSONDecodeError as e:
                logging.error(f"Failed to decode JSON from API response: {e}")
                logging.error(f"Problematic JSON string snippet: {json_string[:500]}...")
                # Keep content for PR message extraction attempt
        else:
            logging.warning("Could not find JSON block ```json [...] ``` in API response.")
            # Try parsing the whole content as JSON as a fallback
            try:
                potential_json = json.loads(content)
                if isinstance(potential_json, list):
                     revised_questions = potential_json
                     logging.info(f"Parsed {len(revised_questions)} revised questions from fallback (full content).")
                else:
                    logging.warning("Fallback JSON parse resulted in non-list data.")
            except json.JSONDecodeError:
                 logging.warning("Fallback JSON parse of full content also failed.")


        # Attempt to extract PR messages (assuming they follow the JSON block)
        pr_match = re.search(r'--- PR MESSAGES ---\s*(.*)', content, re.DOTALL | re.IGNORECASE)
        if pr_match:
            pr_messages = pr_match.group(1).strip()
            logging.info("Extracted PR messages.")
        else:
            # Fallback: Maybe PR messages are just after the JSON block without the marker?
            if json_match:
                potential_pr_part = content[json_match.end():].strip()
                if potential_pr_part and len(potential_pr_part) > 20: # Heuristic: avoid grabbing short leftover text
                    pr_messages = potential_pr_part
                    logging.info("Extracted PR messages using fallback (text after JSON block).")
                else:
                    logging.warning("Could not find PR messages marker or substantial text after JSON block.")
            else:
                 logging.warning("Could not find PR messages marker and no JSON block was found.")


    except KeyError as e:
        logging.error(f"Missing expected key in API response: {e}")
    except Exception as e:
        logging.error(f"An unexpected error occurred parsing API response: {e}")
        logging.error(f"Raw API content snippet: {content[:500]}...")


    # Basic validation of extracted questions
    if revised_questions and not isinstance(revised_questions, list):
        logging.warning(f"Parsed 'revised_questions' is not a list: {type(revised_questions)}")
        revised_questions = [] # Reset if not a list

    return revised_questions, pr_messages

def save_pr_messages(output_dir, category_name, pr_messages):
    """Saves the PR messages to a file."""
    if not pr_messages:
        logging.warning(f"No PR messages to save for {category_name}.")
        return False
    try:
        os.makedirs(output_dir, exist_ok=True)
        pr_filepath = os.path.join(output_dir, f"pr_messages_{category_name}.txt")
        with open(pr_filepath, 'w', encoding='utf-8') as f:
            f.write(pr_messages)
        logging.info(f"Saved PR messages to {pr_filepath}")
        return True
    except IOError as e:
        logging.error(f"Error writing PR messages for {category_name} to {output_dir}: {e}")
        return False
    except Exception as e:
        logging.error(f"An unexpected error occurred saving PR messages: {e}")
        return False

def reconstruct_and_save_mjs(filepath, header_comments, variable_name, updated_questions):
    """Reconstructs the .mjs file content and saves it."""
    try:
        # Format the updated questions list as a JSON string with indentation
        # Using ensure_ascii=False to handle potential non-ASCII characters correctly
        json_string = json.dumps(updated_questions, indent=2, ensure_ascii=False)

        # Construct the full file content
        new_content = ""
        if header_comments:
            new_content += header_comments + "\n"
        new_content += f"export const {variable_name} = {json_string};\n"

        # Overwrite the original file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        logging.info(f"Successfully updated and saved {filepath}")
        return True
    except IOError as e:
        logging.error(f"Error writing updated content to {filepath}: {e}")
        return False
    except Exception as e:
        logging.error(f"An unexpected error occurred reconstructing/saving {filepath}: {e}")
        return False

def run_node_script(script_path):
    """Runs a node script using subprocess and returns True on success."""
    if not os.path.exists(script_path):
        logging.error(f"Node script not found: {script_path}")
        return False
    try:
        logging.info(f"Running node script: {script_path}...")
        # Using 'node' command, assuming it's in the system's PATH
        result = subprocess.run(['node', script_path], capture_output=True, text=True, check=False, encoding='utf-8') # check=False to handle errors manually

        if result.stdout:
            logging.info(f"Output from {script_path}:\n{result.stdout}")
        if result.stderr:
            # Log stderr as warning or error depending on return code
            if result.returncode != 0:
                 logging.error(f"Error output from {script_path}:\n{result.stderr}")
            else:
                 logging.warning(f"Stderr output from {script_path} (but script succeeded):\n{result.stderr}")


        if result.returncode == 0:
            logging.info(f"Node script {script_path} executed successfully.")
            return True
        else:
            logging.error(f"Node script {script_path} failed with return code {result.returncode}.")
            return False
    except FileNotFoundError:
         logging.error("Error: 'node' command not found. Please ensure Node.js is installed and in your PATH.")
         return False
    except Exception as e:
        logging.error(f"An unexpected error occurred running {script_path}: {e}")
        return False


# --- Main Execution ---

def main():
    """Main function to orchestrate the question review process."""
    parser = argparse.ArgumentParser(description="Refine Kubernetes security questions using Perplexity API based on specific criteria.")
    parser.add_argument("--category", required=True, help="The category name (e.g., Kubernetes_Security_Fundamentals) corresponding to the .mjs file.")
    parser.add_argument("--revision", type=int, default=1, help="The revision number to target for refinement (default: 1).")
    args = parser.parse_args()

    category_name = args.category
    target_revision = args.revision
    filepath = os.path.join(INPUT_DIR, f"{category_name}.mjs")
    backup_filepath = filepath + ".bak"
    overall_success = False # Flag to track if all steps succeed for cleanup

    logging.info(f"Starting question review process for category: {category_name}")

    # --- 1. Check if file exists ---
    if not os.path.exists(filepath):
        logging.error(f"Input file not found: {filepath}")
        return

    # --- 2. Get API Key ---
    try:
        api_key = get_api_key()
    except ValueError as e:
        logging.error(e)
        return

    # --- 3. Backup Original File ---
    try:
        shutil.copy2(filepath, backup_filepath)
        logging.info(f"Created backup: {backup_filepath}")
    except Exception as e:
        logging.error(f"Failed to create backup file for {filepath}: {e}")
        return # Stop if backup fails

    try:
        # --- 4. Parse Original File ---
        header_comments, variable_name, original_questions = parse_mjs_file(filepath)
        if not original_questions or not variable_name:
            logging.error(f"Failed to parse original file {filepath}. Restoring from backup.")
            raise Exception("Parsing failed") # Jump to finally block for restore

        # --- 5. Filter Questions ---
        logging.info(f"Filtering questions with revision number: {target_revision}")
        questions_to_revise = filter_questions_for_revision(original_questions, target_revision)
        if not questions_to_revise:
            logging.info(f"No questions found with revision {target_revision} in {filepath}.")
            overall_success = True # Mark as success as no action needed
            return # Exit gracefully

        # --- 6. Process Revisions via API ---
        all_revised_from_api = []
        all_pr_messages_for_file = []
        api_call_succeeded = True
        for i in range(0, len(questions_to_revise), BATCH_SIZE):
            batch = questions_to_revise[i:i + BATCH_SIZE]
            logging.info(f"Processing batch {i // BATCH_SIZE + 1}/{ (len(questions_to_revise) + BATCH_SIZE - 1) // BATCH_SIZE } for {category_name} (size: {len(batch)})")

            prompt = format_prompt(batch)
            # Pass batch length for logging inside call_perplexity_api
            api_response = call_perplexity_api(api_key, prompt, len(batch))

            if api_response:
                revised_batch, pr_batch = parse_api_response(api_response)
                if revised_batch: # Check if parsing yielded questions
                    all_revised_from_api.extend(revised_batch)
                else:
                    logging.warning(f"Batch {i // BATCH_SIZE + 1}: API called but no revised questions parsed successfully.")
                    # Decide if this is a critical failure - for now, we continue but won't have revisions for this batch
                if pr_batch:
                    all_pr_messages_for_file.append(pr_batch)
            else:
                logging.error(f"API call failed for batch {i // BATCH_SIZE + 1}. Stopping processing for this file.")
                api_call_succeeded = False
                break # Stop processing batches for this file if one fails

            # Optional delay
            if API_CALL_DELAY > 0 and i + BATCH_SIZE < len(questions_to_revise):
                 logging.info(f"Waiting for {API_CALL_DELAY} seconds before next API call...")
                 time.sleep(API_CALL_DELAY)

        if not api_call_succeeded:
             raise Exception("API call failed") # Jump to finally for restore

        if not all_revised_from_api:
             logging.warning("API calls completed, but no revised questions were successfully parsed/returned.")
             # Decide if this is an error or just means nothing was revised. Let's treat as non-fatal for now.
             # We won't update the file or run node scripts if nothing was revised.
             overall_success = True # Consider it success if API ran but returned no valid revisions
             return


        # --- 7. Merge Results ---
        revised_map = {q['id']: q for q in all_revised_from_api}
        updated_questions = []
        revision_count = 0
        for q in original_questions:
            if q['id'] in revised_map:
                updated_questions.append(revised_map[q['id']])
                revision_count += 1
            else:
                updated_questions.append(q)
        logging.info(f"Merged {revision_count} revised questions with original data.")

        # --- 8. Reconstruct and Save .mjs ---
        if not reconstruct_and_save_mjs(filepath, header_comments, variable_name, updated_questions):
            raise Exception("Failed to save updated .mjs file") # Jump to finally for restore

        # --- 9. Run Node Update Script ---
        if not run_node_script(NODE_UPDATE_SCRIPT):
             raise Exception("Node update script failed") # Jump to finally for restore

        # --- 10. Run Node Export Script ---
        if not run_node_script(NODE_EXPORT_SCRIPT):
             raise Exception("Node export script failed") # Jump to finally for restore

        # --- 11. Save PR Messages ---
        combined_pr_messages = "\n\n---\n\n".join(all_pr_messages_for_file)
        save_pr_messages(OUTPUT_DIR, category_name, combined_pr_messages) # Save PR messages regardless of node script success

        # --- If we reach here, all critical steps succeeded ---
        overall_success = True
        logging.info(f"Successfully processed category: {category_name}")

    except Exception as e:
        logging.error(f"An error occurred during processing: {e}. Attempting to restore original file from backup.")
        try:
            shutil.copy2(backup_filepath, filepath)
            logging.info(f"Restored original file {filepath} from {backup_filepath}")
        except Exception as restore_e:
            logging.error(f"CRITICAL ERROR: Failed to restore original file from backup: {restore_e}")
            logging.error(f"Backup file is still available at: {backup_filepath}")

    finally:
        # --- 12. Cleanup Backup ---
        if overall_success:
            try:
                if os.path.exists(backup_filepath):
                    os.remove(backup_filepath)
                    logging.info(f"Removed backup file: {backup_filepath}")
            except Exception as clean_e:
                logging.warning(f"Failed to remove backup file {backup_filepath}: {clean_e}")
        else:
            if os.path.exists(backup_filepath):
                logging.warning(f"Processing failed. Backup file kept at: {backup_filepath}")

    logging.info("Question review process finished.")


if __name__ == "__main__":
    main()
