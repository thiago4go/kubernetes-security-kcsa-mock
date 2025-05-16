#!/usr/bin/env python3
"""
Mock find_question_file function for testing purposes.
This overrides the one in process_issue.py to use our test data.
"""
import os
import sys
import argparse
import json
import re
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def _extract_questions_from_mjs(file_path):
    """Extract questions from an mjs file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        # Extract all question objects as JSON-like strings
        pattern = r'\{\s*"id":\s*(\d+),\s*"question":\s*"([^"]+)".*?\}'
        matches = re.finditer(pattern, content, re.DOTALL)
        
        questions = []
        for match in matches:
            try:
                # Get the full match text and convert it to a dict
                question_str = match.group(0)
                # Clean up the string to make it valid JSON
                question_str = question_str.replace("'", "\"")
                # Try to parse it as JSON
                question_data = json.loads(question_str)
                questions.append(question_data)
            except json.JSONDecodeError:
                logging.warning(f"Failed to parse question from {file_path}")
                
        return questions

def find_question(question_id=None, question_text=None, correct_answer=None):
    """
    Find which test question file contains the question with the given ID or content.
    """
    # Use our test file here
    test_file = os.path.join(os.path.dirname(__file__), "test_exported_questions.mjs")
    if not os.path.exists(test_file):
        logging.error(f"Test file not found at {test_file}")
        return None
        
    # First, extract questions from the file
    questions = _extract_questions_from_mjs(test_file)
    domain = "Kubernetes_Security_Fundamentals"
    
    # Search by ID (most reliable)
    if question_id:
        for q in questions:
            if q["id"] == question_id:
                return (domain, question_id)
    
    # Search by question text
    if question_text:
        clean_question = re.sub(r'\s+', ' ', question_text).strip()
        for q in questions:
            q_text = q.get("question", "")
            q_text_clean = re.sub(r'\s+', ' ', q_text).strip()
            
            # Exact match
            if clean_question == q_text_clean:
                return (domain, q["id"])
            
            # Substring match (at least 50% of words match)
            if (clean_question in q_text_clean or 
                q_text_clean in clean_question or
                len(set(clean_question.split()) & set(q_text_clean.split())) > len(clean_question.split()) / 2):
                return (domain, q["id"])
    
    # Search by correct answer
    if correct_answer:
        clean_answer = re.sub(r'\s+', ' ', correct_answer).strip()
        for q in questions:
            options = q.get("options", [])
            correct_idx = q.get("answer", -1)
            
            # Check if correct_idx is valid
            if 0 <= correct_idx < len(options):
                correct = options[correct_idx]
                if clean_answer in correct or correct in clean_answer:
                    return (domain, q["id"])
    
    # If we reach here, couldn't find a match
    return None

def test_find_file(question_id=None, question_text=None, correct_answer=None):
    """Test finding the file containing a question."""
    logging.info("Testing find_question function")
    
    result = find_question(
        question_id=question_id,
        question_text=question_text,
        correct_answer=correct_answer
    )
    
    if result:
        domain_name, found_id = result
        print(f"\nIdentified Question:")
        print(f"Domain: {domain_name}")
        print(f"ID: {found_id}")
    else:
        print("\nCould not identify question")
    
    return result

def main():
    parser = argparse.ArgumentParser(description="Test question finder")
    parser.add_argument("--test-id", type=int, help="Test finding a question by ID")
    parser.add_argument("--test-text", help="Test finding a question by its text")
    parser.add_argument("--test-answer", help="Test finding a question by a correct answer")
    parser.add_argument("--test-issue", action="store_true", help="Test with a sample issue")
    
    args = parser.parse_args()
    
    # If no args provided, show help and exit
    if not any(vars(args).values()):
        parser.print_help()
        return 1
    
    # Test finding by ID
    if args.test_id:
        print(f"Testing find_question with ID #{args.test_id}")
        test_find_file(question_id=args.test_id)
    
    # Test finding by text
    if args.test_text:
        print(f"Testing find_question with text: {args.test_text[:50]}...")
        test_find_file(question_text=args.test_text)
    
    # Test finding by correct answer
    if args.test_answer:
        print(f"Testing find_question with answer: {args.test_answer[:50]}...")
        test_find_file(correct_answer=args.test_answer)
    
    # Test with a sample issue
    if args.test_issue:
        print("Testing with sample data")
        
        test_cases = [
            # Test case 1: Find by exact question text
            {
                "name": "Exact question text match",
                "question_text": "How do Network Policies work in Kubernetes?",
                "expected_id": 1
            },
            # Test case 2: Find by partial question text
            {
                "name": "Partial question text match",
                "question_text": "Network Policies work in Kubernetes?",
                "expected_id": 1
            },
            # Test case 3: Find by ID
            {
                "name": "Find by ID",
                "question_id": 2,
                "expected_id": 2
            },
            # Test case 4: Find by correct answer
            {
                "name": "Find by correct answer",
                "correct_answer": "They use iptables rules",
                "expected_id": 1
            }
        ]
        
        for case in test_cases:
            print(f"\n=== Testing: {case['name']} ===")
            result = test_find_file(
                question_id=case.get("question_id"),
                question_text=case.get("question_text"),
                correct_answer=case.get("correct_answer")
            )
            
            if result:
                domain, found_id = result
                expected_id = case.get("expected_id")
                if found_id == expected_id:
                    print(f"✅ PASS: Found correct question {found_id}")
                else:
                    print(f"❌ FAIL: Expected {expected_id}, got {found_id}")
            else:
                print(f"❌ FAIL: Could not find question")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
