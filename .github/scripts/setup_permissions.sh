#!/bin/bash
# Script to set appropriate permissions for automation scripts

# Make Python scripts executable
chmod +x .github/scripts/process_issue.py
chmod +x src/admin/refine_questions.py
chmod +x src/admin/review_questions.py

echo "Permissions set for automation scripts!"
