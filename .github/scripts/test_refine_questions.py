#!/usr/bin/env python3
"""
Test version of refine_questions.py for testing the question automation workflow.
This script simulates the behavior of the real script but works with test data.
"""
import os
import json
import logging
import argparse
import subprocess
import shutil  # For backup
from datetime import datetime

# --- Configuration ---
# Use test directories
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_DIR = os.path.join(SCRIPT_DIR, "test-data/exported-questions")
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "test-data/revised-questions")

# --- Logging Setup ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Node scripts in the test directory
NODE_UPDATE_SCRIPT = os.path.join(SCRIPT_DIR, "test-data/update_questions.mjs")
NODE_EXPORT_SCRIPT = os.path.join(SCRIPT_DIR, "test-data/export_questions.mjs")

def refine_single_question(category, question_id, revision=0):
    """
    Simulates refining a single question for testing purposes.
    In a real environment, this would call the AI model and process just that question.
    """
    logging.info(f"Processing single question: {question_id} in category: {category}, revision: {revision}")
    
    # Ensure we're looking at the test directory
    category_file = os.path.join(INPUT_DIR, f"{category}.mjs")
    
    if not os.path.exists(category_file):
        logging.error(f"Category file not found: {category_file}")
        return False
        
    # Read the test data file
    with open(category_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract actual questions from the file
    export_statement = f"export const {category} = "
    if export_statement in content:
        json_start_idx = content.find(export_statement) + len(export_statement)
        json_end_idx = content.rfind("];") + 1
        json_str = content[json_start_idx:json_end_idx].strip()
        
        try:
            # Parse the JSON array
            questions = json.loads(json_str)
            
            # Find the specific question by ID
            for i, question in enumerate(questions):
                if question.get("id") == question_id:
                    # Modify this specific question
                    original_explanation = question.get("explanation", "")
                    questions[i]["explanation"] = f"{original_explanation} [REFINED SINGLE QUESTION BY TEST SCRIPT]"
                    logging.info(f"Modified explanation for question ID {question_id}")
                    
                    # Create the output directory if it doesn't exist
                    os.makedirs(OUTPUT_DIR, exist_ok=True)
                    
                    # Write the questions back to the output directory
                    output_file = os.path.join(OUTPUT_DIR, f"{category}.mjs")
                    with open(output_file, 'w', encoding='utf-8') as f:
                        f.write(f"export const {category} = {json.dumps(questions, indent=2)};")
                        
                    logging.info(f"Wrote refined question ID {question_id} to: {output_file}")
                    return True
            
            logging.error(f"Question ID {question_id} not found in category {category}")
            return False
            
        except json.JSONDecodeError as e:
            logging.error(f"Error parsing JSON: {e}")
            return False
    else:
        logging.error(f"Could not find export statement in file: {category_file}")
        return False

def refine_questions(category, revision=0):
    """
    Simulates refining questions for testing purposes.
    In a real environment, this would call the AI model and process the questions.
    """
    logging.info(f"Processing category: {category}, revision: {revision}")
    
    # Ensure we're looking at the test directory
    category_file = os.path.join(INPUT_DIR, f"{category}.mjs")
    
    if not os.path.exists(category_file):
        logging.error(f"Category file not found: {category_file}")
        return False
    
    # Read the test data file
    with open(category_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract actual questions from the file
    # In a real implementation, this would parse the JavaScript file properly
    # For testing, we're using a simplified approach
    export_statement = f"export const {category} = "
    if export_statement in content:
        json_start_idx = content.find(export_statement) + len(export_statement)
        json_end_idx = content.rfind("];") + 1
        json_str = content[json_start_idx:json_end_idx].strip()
        
        try:
            # Parse the JSON array
            questions = json.loads(json_str)
            
            # For testing, simulate making a change to the first question
            if len(questions) > 0:
                # Example: modify explanation
                if "explanation" in questions[0]:
                    original_explanation = questions[0]["explanation"]
                    questions[0]["explanation"] = f"{original_explanation} [REFINED BY TEST SCRIPT]"
                    logging.info(f"Modified explanation for question ID {questions[0]['id']}")
            
            # Create the output directory if it doesn't exist
            os.makedirs(OUTPUT_DIR, exist_ok=True)
            
            # Write the "refined" questions back to the output directory
            output_file = os.path.join(OUTPUT_DIR, f"{category}.mjs")
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(f"export const {category} = {json.dumps(questions, indent=2)};")
                
            logging.info(f"Wrote refined questions to: {output_file}")
            return True
            
        except json.JSONDecodeError as e:
            logging.error(f"Error parsing JSON: {e}")
            return False
    else:
        logging.error(f"Could not find export statement in file: {category_file}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Test refine_questions.py script")
    parser.add_argument("--category", required=True, help="Category to process")
    parser.add_argument("--revision", type=int, default=0, help="Revision number")
    parser.add_argument("--question-id", type=int, help="Specific question ID to refine (optional)")
    
    args = parser.parse_args()
    
    if args.question_id:
        # Process a single question if question_id is provided
        success = refine_single_question(args.category, args.question_id, args.revision)
    else:
        # Process the entire category otherwise
        success = refine_questions(args.category, args.revision)
        
    if success:
        logging.info("Successfully refined questions")
        return 0
    else:
        logging.error("Failed to refine questions")
        return 1

if __name__ == "__main__":
    import sys
    sys.exit(main())
