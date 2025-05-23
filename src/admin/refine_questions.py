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
BATCH_SIZE = 5  # Number of questions to process in a single API call for batch mode
# INPUT_DIR is relative to the project root (where the script is expected to be called from)
INPUT_DIR_RELATIVE_TO_ROOT = os.path.join("src", "exported-questions")
# TEMP_ARTIFACTS_DIR is also relative to project root, used for debug outputs
TEMP_ARTIFACTS_DIR_RELATIVE_TO_ROOT = os.path.join("src", "revised-questions-temp-artifacts")
API_CALL_DELAY_SECONDS = 1  # Delay between API calls in batch mode

# --- Logging Setup ---
# The calling script (process_issue.py) already configures logging.
# If this script is run standalone, basicConfig will apply.
# Using a specific logger for this module can be helpful if process_issue.py also uses logging.
logger = logging.getLogger(__name__)
if not logger.handlers: # Avoid adding multiple handlers if process_issue.py already set it up
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s')


# --- Prompt Template ---
# Note: {current_date_iso} will be replaced with the actual current date.
PROMPT_TEMPLATE = """
Task: Given a JSON array of Kubernetes exam question objects, perform a comprehensive review and targeted fixes—but only where strictly necessary. Your goal is to catch and correct all the following classes of issues:

Checking the validity of the source links url and finding a valid replacement if it is broken, Insufficient, or Non-Authoritative Sources: URLs that 404, link to deprecated content, or fail to back up the claim.
Remain cautious about source verification, prioritizing accuracy and conservative documentation updates. Visiting each url and checking the content is not required, but if you find a broken link, please replace it with a valid one.

Factual Errors: Any statement in the question stem, options, correct-answer keys, or explanation that is no longer accurate for Kubernetes v1.27+ or KCSA-level knowledge.

Ambiguity & Clarity: Wording that could be misinterpreted, lacks essential context, or fails to precisely assess the intended concept.

Deprecated & Outdated Content: References to removed/obsolete APIs, flags, commands, or best practices superseded more than 1–2 years ago.

Styling, Grammar & Formatting: Spelling mistakes, inconsistent terminology (e.g., mixing “Pods” vs. “pods”), uneven option formatting, missing punctuation, or JSON metadata errors (e.g., wrong question_type, missing domain/subdomain).

Metadata Completeness: Missing or incorrect fields such as revision, revision_date, or improperly structured sources arrays.

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
    * For questions that were revised, update the `revision` field by incrementing its previous value (or setting to `1` if it was `0` or `null`). Set `revision_date` to **current_date**.
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
    * Separate PR messages with double newlines (`\\n\\n`). Do *not* generate PR messages for unchanged questions.

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
    questions = []
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
            questions = json.loads(json_string)
            logger.info(f"Successfully parsed {len(questions)} questions, variable '{variable_name}', from {filepath}")
            return header_comments, variable_name, questions
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
    # The prompt uses {{ and }} for JSON examples, which is fine for f-strings/format.
    # However, the {current_date_iso} in the "revision_date" example line needs to be escaped
    # if we were using .format() on the whole PROMPT_TEMPLATE directly with other placeholders.
    # Since we are doing targeted .replace(), it's okay.
    # Ensure the example JSON in the prompt correctly shows the dynamic date too.
    # "revision_date": "<{current_date_iso}_or_original_revision_date>"
    # This part in the prompt is an example for the AI, so it should show the placeholder name.
    # The AI is instructed to set revision_date to the *actual* current_date_iso.
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
            {"role": "system", "content": "You are an AI assistant helping to review and improve Kubernetes security questions according to strict guidelines."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 8000, # Increased based on potential verbosity of question objects and PR messages
        "temperature": 0.2, # Low temperature for more deterministic and factual output
    }
    logger.info(f"Calling Perplexity API for {batch_info_for_logging}...")
    try:
        response = requests.post(PERPLEXITY_API_URL, headers=headers, json=payload, timeout=360) # Increased timeout
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

    # Save raw API response content for debugging
    raw_response_filename = f"api_response_raw_{category_name}{batch_num_str}.txt"
    try:
        os.makedirs(temp_artifacts_dir, exist_ok=True)
        with open(os.path.join(temp_artifacts_dir, raw_response_filename), 'w', encoding='utf-8') as f:
            f.write(api_response_content_string)
        logger.info(f"Saved raw API response to {os.path.join(temp_artifacts_dir, raw_response_filename)}")
    except Exception as e:
        logger.warning(f"Could not save raw API response content: {e}")

    # Attempt to extract the JSON block
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

    # Attempt to extract PR messages
    pr_match = re.search(r'--- PR MESSAGES ---\s*(.*)', api_response_content_string, re.DOTALL | re.IGNORECASE)
    if pr_match:
        pr_messages_string = pr_match.group(1).strip()
        logger.info("Extracted PR messages using '--- PR MESSAGES ---' marker.")
    elif json_match: # If JSON block was found, try to get text after it as PR messages
        text_after_json = api_response_content_string[json_match.end():].strip()
        if text_after_json and len(text_after_json) > 20: # Heuristic to avoid short leftovers
            pr_messages_string = text_after_json
            logger.info("Extracted PR messages from text following JSON block (fallback).")
        else:
            logger.info("No '--- PR MESSAGES ---' marker found, and no substantial text after JSON block.")
    else:
        logger.info("No '--- PR MESSAGES ---' marker found and no JSON block to delimit PR messages.")

    # Save parsed PR messages for debugging
    if pr_messages_string:
        pr_messages_filename = f"api_pr_messages_{category_name}{batch_num_str}.txt"
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
    Processes a list of questions (single or batch) with the Perplexity API.
    Returns a tuple: (list_of_api_returned_questions, aggregated_pr_messages_string).
    The list_of_api_returned_questions contains question objects as returned by the API.
    """
    all_api_returned_questions = []
    aggregated_pr_messages_parts = []
    current_date_iso = datetime.date.today().strftime("%Y-%m-%d") # Get current date once

    # Determine if it's single question mode (list has 1 item) or batch mode
    is_single_question_mode = len(questions_to_process_list) == 1

    if is_single_question_mode:
        question_to_process = questions_to_process_list[0]
        q_id_for_log = question_to_process.get('id', 'UnknownID')
        batch_info_log = f"single question ID {q_id_for_log}"
        prompt = _format_prompt_with_questions([question_to_process], current_date_iso)
        api_response_json = _call_perplexity_api(api_key, prompt, batch_info_log)

        if api_response_json and 'choices' in api_response_json and api_response_json['choices']:
            content_str = api_response_json['choices'][0]['message']['content']
            parsed_qs, pr_msg = _parse_api_response_content(content_str, temp_artifacts_dir, category_name_for_debug, f"_qid{q_id_for_log}")
            if parsed_qs: # API should return the question, revised or not
                all_api_returned_questions.extend(parsed_qs)
            if pr_msg:
                aggregated_pr_messages_parts.append(pr_msg)
        else:
            logger.error(f"API call or response structure invalid for question ID {q_id_for_log}.")
            # Depending on desired robustness, could raise an exception here or return empty
            return [], "" # Indicates failure for this single question
    else: # Batch mode
        num_total_questions_for_api = len(questions_to_process_list)
        for i in range(0, num_total_questions_for_api, BATCH_SIZE):
            batch_of_questions = questions_to_process_list[i:i + BATCH_SIZE]
            batch_num = (i // BATCH_SIZE) + 1
            total_batches = (num_total_questions_for_api + BATCH_SIZE - 1) // BATCH_SIZE
            batch_info_log = f"batch {batch_num}/{total_batches} for category {category_name_for_debug} (size: {len(batch_of_questions)})"

            prompt = _format_prompt_with_questions(batch_of_questions, current_date_iso)
            api_response_json = _call_perplexity_api(api_key, prompt, batch_info_log)

            if api_response_json and 'choices' in api_response_json and api_response_json['choices']:
                content_str = api_response_json['choices'][0]['message']['content']
                parsed_qs, pr_msg = _parse_api_response_content(content_str, temp_artifacts_dir, category_name_for_debug, f"_batch{batch_num}")
                if parsed_qs: # API should return all questions in the batch, revised or not
                    all_api_returned_questions.extend(parsed_qs)
                if pr_msg:
                    aggregated_pr_messages_parts.append(pr_msg)
            else:
                logger.error(f"API call or response structure invalid for {batch_info_log}. Stopping processing for this category.")
                # Return what has been processed so far, but signal that it wasn't fully complete if needed by caller
                break # Exit batch loop for this category

            if API_CALL_DELAY_SECONDS > 0 and (i + BATCH_SIZE) < num_total_questions_for_api:
                logger.info(f"Waiting for {API_CALL_DELAY_SECONDS}s before next API call...")
                time.sleep(API_CALL_DELAY_SECONDS)

    # Join PR messages with a clear separator if multiple parts exist
    final_pr_messages_string = "\n\n---\n\n".join(filter(None, aggregated_pr_messages_parts))
    return all_api_returned_questions, final_pr_messages_string

def main():
    """Main function to orchestrate the question refinement process."""
    parser = argparse.ArgumentParser(description="Refine Kubernetes security questions using Perplexity API.")
    parser.add_argument("--category", required=True,
                        help="Category name (e.g., Kubernetes_Security_Fundamentals) which corresponds to the .mjs filename.")
    parser.add_argument("--question-id", type=str, default=None,
                        help="Specific question ID to refine. If not provided, processes questions in batch mode based on filtering logic (e.g., all questions).")
    args = parser.parse_args()

    category_name = args.category
    question_id_to_refine_str = args.question_id

    # Construct full paths based on CWD (expected to be project root)
    input_dir_abs = os.path.abspath(INPUT_DIR_RELATIVE_TO_ROOT)
    temp_artifacts_dir_abs = os.path.abspath(TEMP_ARTIFACTS_DIR_RELATIVE_TO_ROOT)

    mjs_filepath = os.path.join(input_dir_abs, f"{category_name}.mjs")
    backup_filepath = mjs_filepath + ".refine_bak"

    overall_processing_success = False
    final_pr_message_for_stdout = ""

    # --- 0. Initial Setup & Validation ---
    logger.info(f"Starting question refinement for category: {category_name}" +
                (f", specific QID: {question_id_to_refine_str}" if question_id_to_refine_str else ", batch mode."))

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

    # --- 1. Backup original MJS file ---
    try:
        shutil.copy2(mjs_filepath, backup_filepath)
        logger.info(f"Created backup of input file: {backup_filepath}")
    except Exception as e:
        logger.error(f"Failed to create backup for {mjs_filepath}: {e}. Exiting.")
        return

    try:
        api_key = get_api_key()
        header_comments, variable_name, all_questions_from_file = parse_mjs_file(mjs_filepath)

        if not all_questions_from_file or not variable_name:
            # parse_mjs_file logs specifics
            raise Exception(f"Failed to parse MJS file: {mjs_filepath}")

        questions_for_api_processing = []
        is_single_q_mode = bool(question_id_to_refine_str)

        if is_single_q_mode:
            target_found = False
            for q in all_questions_from_file:
                # Compare IDs as strings for robustness, as API might return them as strings
                if str(q.get("id", "")).strip() == question_id_to_refine_str.strip():
                    questions_for_api_processing.append(q)
                    target_found = True
                    break
            if not target_found:
                raise Exception(f"Question ID '{question_id_to_refine_str}' not found in {mjs_filepath}")
            logger.info(f"Prepared single question (ID: {question_id_to_refine_str}) for API processing.")
        else: # Batch mode
            # For now, batch mode sends ALL questions from the file.
            # The AI is instructed to only revise if necessary and return others unchanged.
            # Add filtering here if only a subset (e.g., revision: 0) should be sent.
            questions_for_api_processing = all_questions_from_file
            if not questions_for_api_processing:
                logger.info(f"No questions found in {mjs_filepath} to process in batch mode. Exiting as success.")
                overall_processing_success = True # No work needed is a form of success
                # Skip to finally block by returning or letting try complete
            else:
                logger.info(f"Prepared {len(questions_for_api_processing)} questions for API batch processing from {category_name}.")


        if not questions_for_api_processing: # Handles case where single QID not found or batch list is empty after filtering
            if not overall_processing_success: # If not already marked success (e.g. empty file for batch)
                 raise Exception("No questions selected for API processing.")
        else:
            api_returned_questions, pr_messages_from_api = _process_questions_with_api(
                questions_for_api_processing, api_key, temp_artifacts_dir_abs, category_name
            )
            final_pr_message_for_stdout = pr_messages_from_api

            # --- Merge API results back into the full list from the file ---
            # The AI is expected to return all questions it was sent (revised or original).
            api_returned_map = {str(q.get("id", "")): q for q in api_returned_questions}
            
            updated_full_question_list = []
            questions_effectively_changed_count = 0

            for original_q_in_file in all_questions_from_file:
                original_q_id_str = str(original_q_in_file.get("id", ""))
                
                # Check if this question was part of the batch processed by the API
                # This is important if questions_for_api_processing was a SUBSET of all_questions_from_file
                # For the current logic (single ID or ALL for batch), original_q_id_str should usually be in api_returned_map
                # if it was part of questions_for_api_processing.
                
                if original_q_id_str in api_returned_map:
                    # This question was processed by the API. Use the version from the API.
                    api_version_q = api_returned_map[original_q_id_str]
                    updated_full_question_list.append(api_version_q)
                    # Check if the content actually changed to count revisions
                    # Comparing JSON strings is a simple way if order is consistent or sorted
                    original_json = json.dumps(original_q_in_file, sort_keys=True)
                    api_json = json.dumps(api_version_q, sort_keys=True)
                    if original_json != api_json:
                        questions_effectively_changed_count += 1
                        logger.info(f"Question ID {original_q_id_str} was modified by the API.")
                else:
                    # This question was not processed by the API (e.g., filtered out before sending)
                    # So, keep the original version from the file.
                    updated_full_question_list.append(original_q_in_file)
            
            logger.info(f"Total questions in file: {len(all_questions_from_file)}. Questions returned by API: {len(api_returned_questions)}. Effective changes made: {questions_effectively_changed_count}.")

            if not reconstruct_and_save_mjs(mjs_filepath, header_comments, variable_name, updated_full_question_list):
                raise Exception(f"Failed to save updated MJS file: {mjs_filepath}")
            
            logger.info(f"Successfully updated MJS file: {mjs_filepath}")
            overall_processing_success = True

    except ValueError as ve: # Specifically for get_api_key
        logger.critical(str(ve)) # Already logged by get_api_key
        overall_processing_success = False
    except Exception as e:
        logger.error(f"An error occurred during main processing for category '{category_name}': {e}", exc_info=True)
        overall_processing_success = False
    finally:
        if overall_processing_success:
            if os.path.exists(backup_filepath):
                try:
                    os.remove(backup_filepath)
                    logger.info(f"Processing successful. Removed backup: {backup_filepath}")
                except Exception as e:
                    logger.warning(f"Processing successful but failed to remove backup {backup_filepath}: {e}")
            if os.path.exists(temp_artifacts_dir_abs):
                try:
                    shutil.rmtree(temp_artifacts_dir_abs)
                    logger.info(f"Processing successful. Removed temp artifacts directory: {temp_artifacts_dir_abs}")
                except Exception as e:
                    logger.warning(f"Processing successful but failed to remove temp artifacts dir {temp_artifacts_dir_abs}: {e}")
            
            if final_pr_message_for_stdout:
                print(f"PR_BODY_CONTENT::{final_pr_message_for_stdout}")
                logger.info("Printed PR message content to stdout.")
            else:
                logger.info("Processing successful, but no specific PR message content was generated/found from API.")
        else:
            logger.error(f"Processing FAILED for category '{category_name}'.")
            if os.path.exists(backup_filepath):
                logger.warning(f"Backup file kept at: {backup_filepath}")
            if os.path.exists(temp_artifacts_dir_abs):
                logger.warning(f"Temp artifacts directory kept for review: {temp_artifacts_dir_abs}")
            # Optionally print an error marker to stdout for the GitHub Action
            # print("PR_BODY_CONTENT::Error: Question refinement script failed. Check workflow logs.")

    logger.info(f"Overall question refinement process finished for category: {category_name}.")

if __name__ == "__main__":
    main()
