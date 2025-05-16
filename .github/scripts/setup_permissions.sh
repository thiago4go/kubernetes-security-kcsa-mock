#!/bin/bash
# Script to set appropriate permissions for automation scripts

# Make Python scripts executable
chmod +x .github/scripts/process_issue.py
chmod +x .github/scripts/test_automation.py
chmod +x .github/scripts/test_question_identifier.py
chmod +x src/admin/refine_questions.py
chmod +x src/admin/review_questions.py

# Create directories if they don't exist
mkdir -p .github/scripts
mkdir -p src/revised-questions
mkdir -p .github/scripts/test-data/exported-questions
mkdir -p .github/scripts/test-data/revised-questions
mkdir -p .github/scripts/test-data/public

echo "Permissions set for automation scripts!"
