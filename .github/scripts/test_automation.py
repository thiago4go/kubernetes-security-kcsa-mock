#!/usr/bin/env python3
"""
Test script for question processing automation.
Can be used to manually test the issue processing logic.
"""
import os
import sys
import argparse
from process_issue import extract_question_info, find_question_file, run_refine_script, run_review_script, run_node_scripts

def main():
    parser = argparse.ArgumentParser(description="Test question processing automation")
    parser.add_argument("--title", required=True, help="Issue title")
    parser.add_argument("--body", required=True, help="Issue body")
    parser.add_argument("--dry-run", action="store_true", help="Don't run the actual scripts, just show what would be done")
    
    args = parser.parse_args()
    
    print(f"Processing mock issue with title: {args.title}")
    print(f"Body: {args.body}")
    
    # Extract question information
    question_info = extract_question_info(args.title, args.body)
    print("\nExtracted information:")
    print(f"- Question ID: {question_info['id']}")
    print(f"- Error type: {question_info['error_type']}")
    print(f"- Needs review: {question_info['needs_review']}")
    
    # If domain is not specified in the issue, try to find it
    if not question_info["domain"] or not question_info["id"]:
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
            print(f"- Found domain: {domain_name}, ID: {found_id}")
        else:
            print(f"ERROR: Could not find file for this question")
            return 1
    else:
        print(f"- Domain: {question_info['domain']}")
        print(f"- Question ID: {question_info['id']}")
    
    if args.dry_run:
        print("\nDRY RUN MODE - Not executing scripts")
        if question_info["needs_review"]:
            print(f"Would run: run_review_script({question_info['domain']}, {question_info['id']})")
        else:
            print(f"Would run: run_refine_script({question_info['domain']}, {question_info['id']}, revision=1)")
        print("Would run: run_node_scripts()")
        return 0
    
    # Run the appropriate script
    success = False
    if question_info["needs_review"]:
        # Run the review script for comprehensive reviews
        success = run_review_script(question_info["domain"], question_info["id"])
    else:
        # Run the refine script for targeted fixes
        success = run_refine_script(question_info["domain"], question_info["id"], revision=1)
    
    if not success:
        print("ERROR: Script execution failed")
        return 1
    
    # Run Node.js scripts to update DB and export
    if not run_node_scripts():
        print("ERROR: Node scripts execution failed")
        return 1
    
    print("Processing completed successfully")
    return 0

if __name__ == "__main__":
    sys.exit(main())
