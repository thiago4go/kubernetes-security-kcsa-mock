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
MODEL_NAME = "sonar" # Reverted to potentially valid name
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
# Note: Ensure the JSON placeholder is exactly where the batch goes.
PROMPT_TEMPLATE = """
Please analyze the provided JSON array of question objects and improve the quality of each question as described below.

1. **Enhance Question Clarity and Context:** Ensure the question is clear, concise, and unambiguous. Provide sufficient context for the question to be understood by the target audience. If necessary, rephrase the question for better clarity.

2. **Improve Explanation Quality:** Enhance the explanation to provide a more in-depth understanding of the correct answers and why the other options are incorrect. The explanation should be informative and easy to understand.

3. **Add Relevant Sources:** Include at least two reputable sources that support the question, correct answers, and explanation. Sources should be authoritative and relevant to the topic. Prefer official documentation, academic papers, or well-respected industry resources.

4. **Output Structured JSON:** The output must be a valid JSON object containing ONLY the revised questions. The structure for EACH revised question object within the response array should be:

```json
{
  "id": <question_id>,
  "question": "<improved_question_text>",
  "options": [
    "<option_1_text>",
    "<option_2_text>",
    "<option_3_text>",
    "<option_4_text>",
    "<option_5_text>"
  ],
  "correct_answers": [ <correct_option_index_1>, <correct_option_index_2>, ... ],
  "explanation": "<improved_explanation_text>",
  "question_type": "<question_type>",
  "domain": "<domain>",
  "subdomain": "<subdomain>",
  "sources": [
    {
      "name": "<source_1_name>",
      "url": "<source_1_url>"
    },
    {
      "name": "<source_2_name>",
      "url": "<source_2_url>"
    },
    ...
  ],
  "revision": 1, // Set revision to 1
  "revision_date": "<revision_date_YYYY-MM-DD>" // Set to today's date
}
```

5. **Generate PR Messages:** Create a concise and informative pull request (PR) message for each question, summarizing the changes made. Return these PR messages separately after the JSON block, perhaps prefixed with "--- PR MESSAGES ---" and separated by double newlines (\n\n).

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

def filter_questions_for_revision(questions):
    """Filters questions that need revision (revision: 0, revision_date: null)."""
    if not questions: # Handle case where parsing failed
        return []
    filtered = [
        q for q in questions
        if q.get('revision') == 0 and q.get('revision_date') is None
    ]
    logging.info(f"Filtered {len(filtered)} questions needing revision.")
    return filtered

def format_prompt(questions_batch):
    """Formats the prompt with the current batch of questions."""
    today_date = datetime.date.today().strftime("%Y-%m-%d")
    # Prepare questions for JSON embedding
    batch_json_string = json.dumps(questions_batch, indent=2)
    # Inject into the main prompt template
    prompt = PROMPT_TEMPLATE.replace("{questions_json}", batch_json_string)
    # Add today's date to the prompt context for revision_date setting
    prompt += f"\n\nPlease set the 'revision_date' field in the output JSON to today's date: {today_date}"
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
    parser = argparse.ArgumentParser(description="Review and update Kubernetes security questions using Perplexity API.")
    parser.add_argument("--category", required=True, help="The category name (e.g., Kubernetes_Security_Fundamentals) corresponding to the .mjs file.")
    args = parser.parse_args()

    category_name = args.category
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
        questions_to_revise = filter_questions_for_revision(original_questions)
        if not questions_to_revise:
            logging.info(f"No questions require revision in {filepath}.")
            overall_success = True # Mark as success as no action needed beyond parsing
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
