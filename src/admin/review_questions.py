import os
import json
import requests
import re
import datetime
import time
import logging
import argparse
import shutil

# --- Configuration ---
PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions"
MODEL_NAME = "sonar-pro"
BATCH_SIZE = 5
INPUT_DIR_RELATIVE_TO_ROOT = os.path.join("src", "exported-questions")
TEMP_ARTIFACTS_DIR_RELATIVE_TO_ROOT = os.path.join("src", "review-temp-artifacts") # Specific temp dir for review
API_CALL_DELAY_SECONDS = 1

# --- Logging Setup ---
logger = logging.getLogger(__name__)
if not logger.handlers:
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s')

# --- Prompt Template ---
# This prompt is for general quality review and improvement.
PROMPT_TEMPLATE = """
Please analyze the provided JSON array of question objects and improve the quality of each question as described below.
Your goal is to enhance existing questions for clarity, depth of explanation, and sourcing.
Assume the questions are fundamentally sound unless explicitly stated otherwise in your analysis.

1.  **Enhance Question Clarity and Context:**
    * Ensure the question is clear, concise, and unambiguous for a KCSA-level audience.
    * Provide or refine context if it helps in understanding the question's intent.
    * If the question is already excellent, acknowledge it and make no changes to the question text.

2.  **Improve Explanation Quality:**
    * Enhance the explanation to provide a more in-depth understanding of the correct answer(s).
    * Clearly explain why the incorrect options are indeed incorrect, especially if they represent common misunderstandings.
    * The explanation should be informative, accurate, and easy to understand.
    * If the explanation is already comprehensive and accurate, acknowledge it.

3.  **Verify and Add Relevant Sources:**
    * Verify existing sources for relevance and accuracy.
    * Add at least two reputable and current sources that support the question, correct answer(s), and explanation.
    * Sources should be authoritative (e.g., official Kubernetes documentation, CNCF materials, well-respected Kubernetes security blogs or books).
    * If excellent sources already exist, ensure they are current or add complementary ones if beneficial.

4.  **Preserve Original Content Where Appropriate:**
    * If a question, its options, or explanation are already of high quality and meet the criteria, return them unchanged in those specific fields.
    * The `id`, `question_type`, `domain`, and `subdomain` fields should generally remain unchanged unless a fundamental flaw necessitates it (which should be rare for a review task).

5.  **Output Structured JSON (Strict Adherence):**
    The output MUST be a single, valid JSON array containing *all* question objects from the input batch (whether you revised them or deemed them already excellent).
    * For questions that were revised (even minor text edits, or source additions), update the `revision` field by incrementing its previous value (or setting to `1` if it was `0` or `null`). Set `revision_date` to **{current_date_iso}**.
    * For questions you assess as already excellent and requiring *no changes whatsoever* to any field (question, options, explanation, sources), all fields, including `revision` and `revision_date`, must remain identical to the input.

    The structure for EACH question object in the response array must strictly follow:
    ```json
    {{
      "id": "<question_id>", // Unchanged
      "question": "<improved_or_original_question_text>",
      "options": [ // Original or minimally adjusted if clarity demanded
        "<option_1_text>",
        // ... up to 5 options
      ],
      "correct_answers": [ <correct_option_index_1>, ... ], // Unchanged unless a fundamental error was found
      "explanation": "<improved_or_original_explanation_text>",
      "question_type": "<question_type>", // Unchanged
      "domain": "<domain>", // Unchanged
      "subdomain": "<subdomain>", // Unchanged
      "sources": [ // Verified, updated, or new reputable sources
        {{ "name": "<source_1_name>", "url": "<source_1_url>" }},
        {{ "name": "<source_2_name>", "url": "<source_2_url>" }}
        // ... potentially more
      ],
      "revision": "<updated_or_original_revision_value>",
      "revision_date": "<{current_date_iso}_or_original_revision_date>"
    }}
    ```

6.  **Generate PR Messages (Only for Questions with Actual Changes):**
    * After the JSON block, provide a concise PR message *only for each question that had any field revised or sources added/updated*.
    * Prefix this section with "--- PR MESSAGES ---".
    * Each message must clearly state:
        * The `id` of the question.
        * A brief summary of the improvements (e.g., "Clarified question wording and added detail to explanation.", "Enhanced explanation for incorrect options and updated sources.", "Added two new sources to support the existing explanation.").
    * Separate PR messages with double newlines (`\\n\\n`). Do *not* generate PR messages for questions you returned completely unchanged.

---
Input JSON Array of Questions:
```json
{questions_json}
```
"""

# --- Helper Functions (Identical to refactored_refine_questions.py) ---

def get_api_key():
    """Retrieves the Perplexity API key from environment variables."""
    api_key = os.environ.get("PERPLEXITY_API_KEY")
    if not api_key:
        logger.critical("PERPLEXITY_API_KEY environment variable not set.")
        raise ValueError("PERPLEXITY_API_KEY environment variable not set.")
    return api_key

def parse_mjs_file(filepath):
    """
    Parses an .mjs file to extract header comments, variable name, and questions JSON array.
    Returns (header_comments, variable_name, questions_list) or (None, None, None) on failure.
    """
    header_comments = ""
    variable_name = None
    questions_list = [] # Initialize
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        match = re.search(r'export const (\w+) = (\[.*?\]);', content, re.DOTALL | re.MULTILINE)
        if match:
            variable_name = match.group(1)
            json_string = match.group(2)
            header_match = re.search(r'^(.*?)\nexport const', content, re.DOTALL | re.MULTILINE)
            if header_match:
                header_comments = header_match.group(1).strip()
            json_string = re.sub(r',\s*([\]}])', r'\1', json_string) # Remove trailing commas
            questions_list = json.loads(json_string)
            logger.info(f"Successfully parsed {len(questions_list)} questions, variable '{variable_name}', from {filepath}")
            return header_comments, variable_name, questions_list
        else:
            logger.warning(f"Could not find questions array pattern in {filepath}")
            return None, None, None
    except FileNotFoundError:
        logger.error(f"MJS file not found: {filepath}")
        return None, None, None
    except json.JSONDecodeError as e:
        logger.error(f"Error decoding JSON from {filepath}: {e}")
        return None, None, None
    except Exception as e:
        logger.error(f"An unexpected error occurred parsing {filepath}: {e}")
        return None, None, None

def reconstruct_and_save_mjs(filepath, header_comments, variable_name, updated_questions):
    """Reconstructs the .mjs file content and saves it, overwriting the original."""
    try:
        json_string = json.dumps(updated_questions, indent=2, ensure_ascii=False)
        new_content = ""
        if header_comments:
            new_content += header_comments + "\n"
        new_content += f"export const {variable_name} = {json_string};\n"
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        logger.info(f"Successfully updated and saved {filepath}")
        return True
    except IOError as e:
        logger.error(f"Error writing updated content to {filepath}: {e}")
        return False
    except Exception as e:
        logger.error(f"An unexpected error occurred reconstructing/saving {filepath}: {e}")
        return False

def _format_prompt_with_questions(questions_batch, current_date_iso):
    """Formats the API prompt with the current batch of questions and current date."""
    batch_json_string = json.dumps(questions_batch, indent=2)
    prompt = PROMPT_TEMPLATE.replace("{questions_json}", batch_json_string)
    prompt = prompt.replace("{current_date_iso}", current_date_iso)
    return prompt

def _call_perplexity_api(api_key, prompt, batch_info_for_logging):
    """Calls the Perplexity API."""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": "You are an AI assistant helping to review and improve Kubernetes security questions according to specific guidelines for quality enhancement."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 8000,
        "temperature": 0.3, # Slightly higher for more creative review, but still factual
    }
    logger.info(f"Calling Perplexity API for {batch_info_for_logging}...")
    try:
        response = requests.post(PERPLEXITY_API_URL, headers=headers, json=payload, timeout=360)
        response.raise_for_status()
        logger.info(f"API call successful for {batch_info_for_logging}.")
        return response.json()
    except requests.exceptions.RequestException as e:
        logger.error(f"Error calling Perplexity API for {batch_info_for_logging}: {e}")
        if hasattr(e, 'response') and e.response is not None:
            logger.error(f"API Response Status Code: {e.response.status_code}, Body: {e.response.text[:500]}")
        return None
    except Exception as e:
        logger.error(f"An unexpected error occurred during API call for {batch_info_for_logging}: {e}")
        return None

def _parse_api_response_content(api_response_content_string, temp_artifacts_dir, category_name, batch_num_str=""):
    """
    Parses the string content from an API response to extract revised questions (JSON) and PR messages.
    Saves raw content and parsed PR messages to temp_artifacts_dir for debugging.
    """
    revised_questions_list = []
    pr_messages_string = ""

    raw_response_filename = f"api_response_raw_review_{category_name}{batch_num_str}.txt" # Added _review prefix
    try:
        os.makedirs(temp_artifacts_dir, exist_ok=True)
        with open(os.path.join(temp_artifacts_dir, raw_response_filename), 'w', encoding='utf-8') as f:
            f.write(api_response_content_string)
        logger.info(f"Saved raw API response to {os.path.join(temp_artifacts_dir, raw_response_filename)}")
    except Exception as e:
        logger.warning(f"Could not save raw API response content: {e}")

    json_match = re.search(r'```json\s*(\[.*?\])\s*```', api_response_content_string, re.DOTALL | re.IGNORECASE)
    if json_match:
        json_data_string = json_match.group(1)
        try:
            revised_questions_list = json.loads(json_data_string)
            logger.info(f"Successfully parsed {len(revised_questions_list)} questions from API JSON block.")
        except json.JSONDecodeError as e:
            logger.error(f"Failed to decode JSON from API response block: {e}. JSON string snippet: {json_data_string[:500]}")
    else:
        logger.warning("Could not find JSON block ```json [...] ``` in API response. Trying to parse entire content as JSON.")
        try:
            potential_json = json.loads(api_response_content_string)
            if isinstance(potential_json, list):
                revised_questions_list = potential_json
                logger.info(f"Successfully parsed {len(revised_questions_list)} questions from entire API content (fallback).")
            else:
                logger.warning("Entire API content parsed as JSON, but it's not a list.")
        except json.JSONDecodeError:
            logger.error("Failed to parse entire API content as JSON. No questions extracted.")

    pr_match = re.search(r'--- PR MESSAGES ---\s*(.*)', api_response_content_string, re.DOTALL | re.IGNORECASE)
    if pr_match:
        pr_messages_string = pr_match.group(1).strip()
        logger.info("Extracted PR messages using '--- PR MESSAGES ---' marker.")
    elif json_match:
        text_after_json = api_response_content_string[json_match.end():].strip()
        if text_after_json and len(text_after_json) > 20:
            pr_messages_string = text_after_json
            logger.info("Extracted PR messages from text following JSON block (fallback).")
        else:
            logger.info("No '--- PR MESSAGES ---' marker found, and no substantial text after JSON block.")
    else:
        logger.info("No '--- PR MESSAGES ---' marker found and no JSON block to delimit PR messages.")

    if pr_messages_string:
        pr_messages_filename = f"api_pr_messages_review_{category_name}{batch_num_str}.txt" # Added _review prefix
        try:
            with open(os.path.join(temp_artifacts_dir, pr_messages_filename), 'w', encoding='utf-8') as f:
                f.write(pr_messages_string)
            logger.info(f"Saved parsed PR messages to {os.path.join(temp_artifacts_dir, pr_messages_filename)}")
        except Exception as e:
            logger.warning(f"Could not save parsed PR messages: {e}")

    if revised_questions_list and not isinstance(revised_questions_list, list):
        logger.warning(f"Parsed 'revised_questions_list' is not a list: {type(revised_questions_list)}. Resetting to empty.")
        revised_questions_list = []

    return revised_questions_list, pr_messages_string

def _process_questions_with_api(questions_to_process_list, api_key, temp_artifacts_dir, category_name_for_debug):
    """
    Processes a list of questions (single or batch) with the Perplexity API for review.
    Returns a tuple: (list_of_api_returned_questions, aggregated_pr_messages_string).
    """
    all_api_returned_questions = []
    aggregated_pr_messages_parts = []
    current_date_iso = datetime.date.today().strftime("%Y-%m-%d")

    is_single_question_mode = len(questions_to_process_list) == 1

    if is_single_question_mode:
        question_to_process = questions_to_process_list[0]
        q_id_for_log = question_to_process.get('id', 'UnknownID')
        batch_info_log = f"single question ID {q_id_for_log} for review"
        prompt = _format_prompt_with_questions([question_to_process], current_date_iso)
        api_response_json = _call_perplexity_api(api_key, prompt, batch_info_log)

        if api_response_json and 'choices' in api_response_json and api_response_json['choices']:
            content_str = api_response_json['choices'][0]['message']['content']
            parsed_qs, pr_msg = _parse_api_response_content(content_str, temp_artifacts_dir, category_name_for_debug, f"_review_qid{q_id_for_log}")
            if parsed_qs:
                all_api_returned_questions.extend(parsed_qs)
            if pr_msg:
                aggregated_pr_messages_parts.append(pr_msg)
        else:
            logger.error(f"API call or response structure invalid for review of question ID {q_id_for_log}.")
            return [], ""
    else: # Batch mode
        num_total_questions_for_api = len(questions_to_process_list)
        for i in range(0, num_total_questions_for_api, BATCH_SIZE):
            batch_of_questions = questions_to_process_list[i:i + BATCH_SIZE]
            batch_num = (i // BATCH_SIZE) + 1
            total_batches = (num_total_questions_for_api + BATCH_SIZE - 1) // BATCH_SIZE
            batch_info_log = f"review batch {batch_num}/{total_batches} for category {category_name_for_debug} (size: {len(batch_of_questions)})"

            prompt = _format_prompt_with_questions(batch_of_questions, current_date_iso)
            api_response_json = _call_perplexity_api(api_key, prompt, batch_info_log)

            if api_response_json and 'choices' in api_response_json and api_response_json['choices']:
                content_str = api_response_json['choices'][0]['message']['content']
                parsed_qs, pr_msg = _parse_api_response_content(content_str, temp_artifacts_dir, category_name_for_debug, f"_review_batch{batch_num}")
                if parsed_qs:
                    all_api_returned_questions.extend(parsed_qs)
                if pr_msg:
                    aggregated_pr_messages_parts.append(pr_msg)
            else:
                logger.error(f"API call or response structure invalid for {batch_info_log}. Stopping review for this category.")
                break

            if API_CALL_DELAY_SECONDS > 0 and (i + BATCH_SIZE) < num_total_questions_for_api:
                logger.info(f"Waiting for {API_CALL_DELAY_SECONDS}s before next API call...")
                time.sleep(API_CALL_DELAY_SECONDS)

    final_pr_messages_string = "\n\n---\n\n".join(filter(None, aggregated_pr_messages_parts))
    return all_api_returned_questions, final_pr_messages_string

def filter_questions_for_review_script(questions_list):
    """
    Filters questions that need review based on specific criteria for this script.
    Example: revision is 0 and revision_date is null.
    Adjust this logic if your criteria for "needs review" are different.
    """
    if not questions_list:
        return []
    # Criteria for review: revision is 0 AND revision_date is null
    # (or adapt if 'review_status' field exists)
    filtered = [
        q for q in questions_list
        if q.get('revision') == 0 and q.get('revision_date') is None
    ]
    logger.info(f"Filtered {len(filtered)} questions for review (revision:0, revision_date:null).")
    return filtered


def main():
    """Main function to orchestrate the question review process."""
    parser = argparse.ArgumentParser(description="Review and improve Kubernetes security questions using Perplexity API.")
    parser.add_argument("--category", required=True,
                        help="Category name (e.g., Kubernetes_Security_Fundamentals) which corresponds to the .mjs filename.")
    parser.add_argument("--question-id", type=str, default=None,
                        help="Specific question ID to review. If not provided, processes questions in batch mode based on filtering logic.")
    args = parser.parse_args()

    category_name = args.category
    question_id_to_review_str = args.question_id

    input_dir_abs = os.path.abspath(INPUT_DIR_RELATIVE_TO_ROOT)
    temp_artifacts_dir_abs = os.path.abspath(TEMP_ARTIFACTS_DIR_RELATIVE_TO_ROOT)

    mjs_filepath = os.path.join(input_dir_abs, f"{category_name}.mjs")
    backup_filepath = mjs_filepath + ".review_bak" # Specific backup for review script

    overall_processing_success = False
    final_pr_message_for_stdout = ""

    logger.info(f"Starting question REVIEW process for category: {category_name}" +
                (f", specific QID: {question_id_to_review_str}" if question_id_to_review_str else ", batch mode."))

    if os.path.exists(temp_artifacts_dir_abs):
        try:
            shutil.rmtree(temp_artifacts_dir_abs)
            logger.info(f"Cleaned up existing temp artifacts directory: {temp_artifacts_dir_abs}")
        except Exception as e:
            logger.warning(f"Could not clean up temp artifacts directory {temp_artifacts_dir_abs}: {e}")
    try:
        os.makedirs(temp_artifacts_dir_abs, exist_ok=True)
    except Exception as e:
        logger.error(f"Could not create temp artifacts directory {temp_artifacts_dir_abs}: {e}. Exiting.")
        return

    if not os.path.exists(mjs_filepath):
        logger.error(f"Input MJS file not found: {mjs_filepath}. Exiting.")
        return

    try:
        shutil.copy2(mjs_filepath, backup_filepath)
        logger.info(f"Created backup of input file: {backup_filepath}")
    except Exception as e:
        logger.error(f"Failed to create backup for {mjs_filepath}: {e}. Exiting.")
        return

    try:
        api_key = get_api_key()
        header_comments, variable_name, all_questions_from_file = parse_mjs_file(mjs_filepath)

        if all_questions_from_file is None or variable_name is None: # Check for None explicitly
            raise Exception(f"Failed to parse MJS file: {mjs_filepath}")

        questions_for_api_processing = []
        is_single_q_mode = bool(question_id_to_review_str)

        if is_single_q_mode:
            target_found = False
            for q in all_questions_from_file:
                if str(q.get("id", "")).strip() == question_id_to_review_str.strip():
                    questions_for_api_processing.append(q)
                    target_found = True
                    break
            if not target_found:
                raise Exception(f"Question ID '{question_id_to_review_str}' not found in {mjs_filepath}")
            logger.info(f"Prepared single question (ID: {question_id_to_review_str}) for API review.")
        else: # Batch mode
            # Filter questions specifically for review (e.g., revision 0, no revision_date)
            questions_for_api_processing = filter_questions_for_review_script(all_questions_from_file)
            if not questions_for_api_processing:
                logger.info(f"No questions meet review criteria in {category_name}. Exiting as success.")
                overall_processing_success = True
            else:
                logger.info(f"Prepared {len(questions_for_api_processing)} questions for API batch review from {category_name}.")

        if not questions_for_api_processing and not overall_processing_success:
             raise Exception("No questions selected for API review processing.")
        
        if questions_for_api_processing: # Only proceed if there are questions to send
            api_returned_questions, pr_messages_from_api = _process_questions_with_api(
                questions_for_api_processing, api_key, temp_artifacts_dir_abs, category_name
            )
            final_pr_message_for_stdout = pr_messages_from_api
            
            api_returned_map = {str(q.get("id", "")): q for q in api_returned_questions}
            updated_full_question_list = []
            questions_effectively_changed_count = 0

            for original_q_in_file in all_questions_from_file:
                original_q_id_str = str(original_q_in_file.get("id", ""))
                if original_q_id_str in api_returned_map:
                    api_version_q = api_returned_map[original_q_id_str]
                    updated_full_question_list.append(api_version_q)
                    original_json = json.dumps(original_q_in_file, sort_keys=True)
                    api_json = json.dumps(api_version_q, sort_keys=True)
                    if original_json != api_json:
                        questions_effectively_changed_count += 1
                        logger.info(f"Question ID {original_q_id_str} was modified during review by the API.")
                else:
                    updated_full_question_list.append(original_q_in_file)
            
            logger.info(f"Total questions in file: {len(all_questions_from_file)}. Questions returned by API: {len(api_returned_questions)}. Effective changes made during review: {questions_effectively_changed_count}.")

            if not reconstruct_and_save_mjs(mjs_filepath, header_comments, variable_name, updated_full_question_list):
                raise Exception(f"Failed to save updated MJS file: {mjs_filepath}")
            
            logger.info(f"Successfully updated MJS file after review: {mjs_filepath}")
            overall_processing_success = True

    except ValueError as ve:
        logger.critical(str(ve))
        overall_processing_success = False
    except Exception as e:
        logger.error(f"An error occurred during main review processing for category '{category_name}': {e}", exc_info=True)
        overall_processing_success = False
    finally:
        if overall_processing_success:
            if os.path.exists(backup_filepath):
                try:
                    os.remove(backup_filepath)
                    logger.info(f"Review processing successful. Removed backup: {backup_filepath}")
                except Exception as e:
                    logger.warning(f"Review processing successful but failed to remove backup {backup_filepath}: {e}")
            if os.path.exists(temp_artifacts_dir_abs):
                try:
                    shutil.rmtree(temp_artifacts_dir_abs)
                    logger.info(f"Review processing successful. Removed temp artifacts directory: {temp_artifacts_dir_abs}")
                except Exception as e:
                    logger.warning(f"Review processing successful but failed to remove temp artifacts dir {temp_artifacts_dir_abs}: {e}")
            
            if final_pr_message_for_stdout:
                print(f"PR_BODY_CONTENT::{final_pr_message_for_stdout}")
                logger.info("Printed PR message content from review to stdout.")
            else:
                logger.info("Review processing successful, but no specific PR message content was generated/found from API.")
        else:
            logger.error(f"Review processing FAILED for category '{category_name}'.")
            if os.path.exists(backup_filepath): # Check if backup_filepath was defined (it should be if try block was entered)
                logger.warning(f"Backup file kept at: {backup_filepath}")
            else:
                logger.warning(f"Backup file {backup_filepath} not found, possibly failed before or during creation.")

            if os.path.exists(temp_artifacts_dir_abs):
                logger.warning(f"Temp artifacts directory kept for review: {temp_artifacts_dir_abs}")

    logger.info(f"Overall question review process finished for category: {category_name}.")

if __name__ == "__main__":
    main()
