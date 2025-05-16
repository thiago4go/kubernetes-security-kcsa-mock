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
    """Extract question objects from an mjs file."""
    questions = []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # This regex attempts to find individual JSON-like objects representing questions.
        # It looks for "id": <number>, "question": "text possibly with escaped quotes",
        # and then non-greedily captures the rest of the object until the closing '}'.
        # This assumes questions are somewhat distinct objects in the .mjs file.
        # A full JS parser would be more robust but is overly complex for this script.
        pattern = r'{\s*"id"\s*:\s*(\d+)\s*,\s*"question"\s*:\s*"((?:\\.|[^"])*)".*?}(?=\s*,\s*\{|\s*\])'
        # The lookahead `(?=\s*,\s*\{|\s*\])` helps delineate objects in an array.

        for match in re.finditer(pattern, content, re.DOTALL):
            question_str_segment = match.group(0) # The whole matched object string
            try:
                # Attempt to parse the extracted string segment as JSON
                question_data = json.loads(question_str_segment)
                questions.append(question_data)
            except json.JSONDecodeError as e:
                logging.warning(f"Failed to parse question segment from {file_path} into JSON: {e}. Segment: {question_str_segment[:100]}...")
                # Fallback: if json.loads fails, try to build dict manually from core regex groups if needed
                # This is a simpler fallback if full object parsing fails
                try:
                    q_id = int(match.group(1))
                    q_text_raw = match.group(2)
                    q_text_unescaped = q_text_raw.replace('\\"', '"').replace('\\n', '\n') # Basic unescaping
                    questions.append({"id": q_id, "question": q_text_unescaped})
                    logging.info(f"Successfully parsed question (fallback) ID {q_id} from {file_path}")
                except Exception as fallback_e:
                    logging.error(f"Fallback parsing also failed for segment in {file_path}: {fallback_e}")


    except FileNotFoundError:
        logging.error(f"Test file not found at {file_path}")
    except Exception as e:
        logging.error(f"An error occurred reading or processing {file_path}: {e}")
    
    logging.info(f"Extracted {len(questions)} questions from {file_path}")
    return questions


def find_question(question_id=None, question_text=None, correct_answer=None):
    """
    Find which test question file contains the question with the given ID or content.
    Returns a tuple (domain_name, question_id) or None.
    """
    # Use our test file here
    # Ensure this path correctly points to your test MJS file relative to this script's location
    test_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "test_exported_questions.mjs")

    if not os.path.exists(test_file):
        logging.error(f"Test file not found at {test_file}")
        return None
        
    questions = _extract_questions_from_mjs(test_file)
    if not questions:
        logging.warning(f"No questions extracted from {test_file}. Cannot find question.")
        return None

    # Domain is hardcoded for this test finder as it uses a specific test file.
    # In a real scenario, the domain might come from the filename.
    domain = "Kubernetes_Security_Fundamentals" # Example domain
    
    # Search by ID (most reliable)
    if question_id is not None: # Explicitly check for not None
        logging.info(f"Test finder: Searching by ID: {question_id}")
        for q in questions:
            if q.get("id") == question_id:
                logging.info(f"Test finder: Found question by ID: {question_id}")
                return (domain, question_id)
        logging.info(f"Test finder: Question ID {question_id} not found.")
    
    # Search by question text (normalized)
    if question_text:
        # Normalize input question text: lowercase and strip/condense whitespace
        clean_input_question = re.sub(r'\s+', ' ', question_text).strip().lower()
        logging.info(f"Test finder: Searching by text (normalized): '{clean_input_question[:70]}...'")

        for q in questions:
            q_text_from_file = q.get("question", "")
            # Normalize question text from file: lowercase and strip/condense whitespace
            q_text_file_clean = re.sub(r'\s+', ' ', q_text_from_file).strip().lower()
            
            if not q_text_file_clean:
                continue

            # Exact match
            if clean_input_question == q_text_file_clean:
                logging.info(f"Test finder: Found exact text match for ID {q.get('id')}")
                return (domain, q.get("id"))
            
            # Substring match / Word overlap (optional, can be tuned)
            # Using a simple 'in' for substring, and a basic word overlap percentage
            if len(clean_input_question) > 15: # Avoid overly short partial matches
                input_words = set(clean_input_question.split())
                file_words = set(q_text_file_clean.split())
                if not file_words: continue # Avoid division by zero

                if (clean_input_question in q_text_file_clean or 
                    q_text_file_clean in clean_input_question or
                    (len(input_words & file_words) / len(input_words) > 0.6 and len(input_words) > 2) ): # Match if >60% of input words are present
                    logging.info(f"Test finder: Found partial text match for ID {q.get('id')}")
                    return (domain, q.get("id"))
        logging.info(f"Test finder: Question text '{clean_input_question[:70]}...' not found.")
    
    # Search by correct answer (less reliable, kept simple)
    if correct_answer:
        clean_input_answer = re.sub(r'\s+', ' ', correct_answer).strip().lower()
        logging.info(f"Test finder: Searching by correct answer (normalized): '{clean_input_answer[:70]}...'")
        for q in questions:
            options = q.get("options", [])
            # Assuming correct_answers is a list of indices as in refine_questions.py prompt
            correct_indices = q.get("correct_answers", []) 
            
            for idx in correct_indices:
                if 0 <= idx < len(options):
                    option_text_clean = re.sub(r'\s+', ' ', options[idx]).strip().lower()
                    if clean_input_answer == option_text_clean or clean_input_answer in option_text_clean:
                        logging.info(f"Test finder: Found by correct answer match for ID {q.get('id')}")
                        return (domain, q.get("id"))
        logging.info(f"Test finder: Correct answer '{clean_input_answer[:70]}...' not found leading to a question.")
    
    logging.warning("Test finder: Could not find a matching question using any strategy.")
    return None

def test_find_file(question_id=None, question_text=None, correct_answer=None):
    """Test finding the file containing a question."""
    logging.info(f"--- Test Invocation: test_find_file(id={question_id}, text='{str(question_text)[:50]}...', answer='{str(correct_answer)[:50]}...') ---")
    
    result = find_question(
        question_id=question_id,
        question_text=question_text,
        correct_answer=correct_answer
    )
    
    if result:
        domain_name, found_id = result
        print(f"\nIdentified Question in test_find_file:")
        print(f"  Domain: {domain_name}")
        print(f"  ID: {found_id}")
    else:
        print("\nCould not identify question in test_find_file.")
    
    return result

def main():
    parser = argparse.ArgumentParser(description="Test question finder")
    parser.add_argument("--test-id", type=int, help="Test finding a question by ID")
    parser.add_argument("--test-text", help="Test finding a question by its text")
    parser.add_argument("--test-answer", help="Test finding a question by a correct answer")
    parser.add_argument("--test-issue", action="store_true", help="Test with a sample issue (predefined test cases)")
    
    args = parser.parse_args()
    
    if not any(vars(args).values()):
        parser.print_help()
        return 1
    
    if args.test_id:
        print(f"\n>>> Testing find_question with ID #{args.test_id}")
        test_find_file(question_id=args.test_id)
    
    if args.test_text:
        print(f"\n>>> Testing find_question with text: '{args.test_text[:50]}...'")
        test_find_file(question_text=args.test_text)
    
    if args.test_answer:
        print(f"\n>>> Testing find_question with answer: '{args.test_answer[:50]}...'")
        test_find_file(correct_answer=args.test_answer)
    
    if args.test_issue:
        print("\n>>> Testing with predefined sample issue data")
        
        # Ensure you have a test_exported_questions.mjs file in the same directory
        # with questions that match these test cases.
        # Example content for test_exported_questions.mjs:
        # export const kubernetesSecurityFundamentals = [
        #   {
        #     "id": 1,
        #     "question": "How do Network Policies work in Kubernetes?",
        #     "options": ["They use iptables rules", "They inspect packets", "They are managed by the kubelet", "They encrypt traffic"],
        #     "correct_answers": [0],
        #     "explanation": "Network Policies in Kubernetes are implemented by the network plugin, often using technologies like iptables or eBPF to enforce rules.",
        #     "domain": "Kubernetes_Security_Fundamentals"
        #   },
        #   {
        #     "id": 2,
        #     "question": "What is the primary purpose of RBAC in Kubernetes?",
        #     "options": ["Network isolation", "Resource quotas", "Authorization control", "Encrypting secrets"],
        #     "correct_answers": [2],
        #     "explanation": "Role-Based Access Control (RBAC) is used to regulate access to Kubernetes API resources.",
        #     "domain": "Kubernetes_Security_Fundamentals"
        #   },
        #   {
        #     "id": 3,
        #     "question": "Which component is responsible for storing the cluster state?",
        #     "options": ["kubelet", "kube-proxy", "etcd", "kube-scheduler"],
        #     "correct_answers": [2],
        #     "explanation": "etcd is a consistent and highly-available key-value store used as Kubernetes' backing store for all cluster data.",
        #     "domain": "Kubernetes_Security_Fundamentals"
        #   }
        # ];

        test_cases = [
            {
                "name": "Exact question text match",
                "question_text": "How do Network Policies work in Kubernetes?",
                "expected_id": 1
            },
            {
                "name": "Partial question text match (case insensitive)",
                "question_text": "network policies work in kubernetes?", # Lowercase to test normalization
                "expected_id": 1
            },
            {
                "name": "Find by ID",
                "question_id": 2,
                "expected_id": 2
            },
            {
                "name": "Find by correct answer (exact)",
                "correct_answer": "They use iptables rules",
                "expected_id": 1
            },
            {
                "name": "Non-existent ID",
                "question_id": 999,
                "expected_id": None # Expecting not found
            },
            {
                "name": "Non-existent text",
                "question_text": "This question does not exist in the test file.",
                "expected_id": None # Expecting not found
            }
        ]
        
        for case in test_cases:
            print(f"\n--- Testing: {case['name']} ---")
            result = test_find_file(
                question_id=case.get("question_id"),
                question_text=case.get("question_text"),
                correct_answer=case.get("correct_answer")
            )
            
            expected_id = case.get("expected_id")
            if result:
                domain, found_id = result
                if found_id == expected_id:
                    print(f"✅ PASS: Found question ID {found_id} as expected.")
                else:
                    print(f"❌ FAIL: Expected ID {expected_id}, but found ID {found_id}.")
            elif expected_id is None:
                 print(f"✅ PASS: Correctly did not find a question.")
            else:
                print(f"❌ FAIL: Expected ID {expected_id}, but no question was found.")
    
    return 0

if __name__ == "__main__":
    # Example: Create a dummy test_exported_questions.mjs if it doesn't exist for basic testing
    test_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "test_exported_questions.mjs")
    if not os.path.exists(test_file_path):
        logging.warning(f"{test_file_path} not found. Creating a dummy file for testing.")
        with open(test_file_path, "w", encoding="utf-8") as f:
            f.write("""
export const kubernetesSecurityFundamentals = [
  {
    "id": 1,
    "question": "How do Network Policies work in Kubernetes?",
    "options": ["They use iptables rules", "They inspect packets", "They are managed by the kubelet", "They encrypt traffic"],
    "correct_answers": [0],
    "explanation": "Network Policies in Kubernetes are implemented by the network plugin, often using technologies like iptables or eBPF to enforce rules.",
    "question_type": "multiple_choice",
    "domain": "Kubernetes_Security_Fundamentals",
    "subdomain": "Network_Security",
    "sources": [{"name": "K8s Docs", "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"}],
    "revision": 0,
    "revision_date": null
  },
  {
    "id": 2,
    "question": "What is the primary purpose of RBAC in Kubernetes?",
    "options": ["Network isolation", "Resource quotas", "Authorization control", "Encrypting secrets"],
    "correct_answers": [2],
    "explanation": "Role-Based Access Control (RBAC) is used to regulate access to Kubernetes API resources.",
    "question_type": "multiple_choice",
    "domain": "Kubernetes_Security_Fundamentals",
    "subdomain": "Authentication_Authorization",
    "sources": [{"name": "K8s Docs", "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"}],
    "revision": 0,
    "revision_date": null
  }
];
            """)
    sys.exit(main())