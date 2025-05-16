#!/usr/bin/env python3
"""
Test script for question identification logic.
This script can be used to test how well our identification methods work.
"""
import os
import sys
import argparse
import logging

# Import from process_issue in the same directory
from process_issue import extract_question_info, find_question_file

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def test_extract_info(title, body):
    """Test extracting information from issue title and body."""
    logging.info("Testing extract_question_info function")
    result = extract_question_info(title, body)
    
    print("\nExtracted Information:")
    print("----------------------")
    for key, value in result.items():
        if value is not None:
            print(f"{key}: {value}")
    
    return result

def test_find_file(question_id=None, question_text=None, correct_answer=None):
    """Test finding the file containing a question."""
    logging.info("Testing find_question_file function")
    
    result = find_question_file(
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
    parser = argparse.ArgumentParser(description="Test question identification logic")
    parser.add_argument("--test-id", type=int, help="Test finding a question by ID")
    parser.add_argument("--test-text", help="Test finding a question by its text")
    parser.add_argument("--test-answer", help="Test finding a question by a correct answer")
    parser.add_argument("--test-issue", action="store_true", help="Test parsing a sample issue")
    
    args = parser.parse_args()
    
    # If no args provided, show help and exit
    if not any(vars(args).values()):
        parser.print_help()
        return 1
    
    # Test finding by ID
    if args.test_id:
        print(f"Testing find_question_file with ID #{args.test_id}")
        test_find_file(question_id=args.test_id)
    
    # Test finding by text
    if args.test_text:
        print(f"Testing find_question_file with text: {args.test_text[:50]}...")
        test_find_file(question_text=args.test_text)
    
    # Test finding by correct answer
    if args.test_answer:
        print(f"Testing find_question_file with answer: {args.test_answer[:50]}...")
        test_find_file(correct_answer=args.test_answer)
    
    # Test parsing a sample issue
    if args.test_issue:
        print("Testing with sample issue content")
        
        sample_title = "Error on answer about Network Policies"
        sample_body = """
Domain: Kubernetes Security Fundamentals

Question: How do Network Policies work in Kubernetes?

Your answer: They use iptables rules to control pod communication

Correct answer: They are enforced by the kube-scheduler

Explanation: Network Policies in Kubernetes use iptables rules to control communication between pods. This allows administrators to define which pods can communicate with each other, enhancing network security. By default, pods can communicate freely unless restricted by a Network Policy.
"""
        
        info = test_extract_info(sample_title, sample_body)
        
        if info["question_text"] or info["correct_answer"]:
            test_find_file(
                question_id=info["id"],
                question_text=info["question_text"],
                correct_answer=info["correct_answer"]
            )
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
