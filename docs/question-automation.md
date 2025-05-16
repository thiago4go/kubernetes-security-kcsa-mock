# KCSA Mock Exam - Automated Question Fixing

This document provides an in-depth explanation of the automated question fixing system implemented in this repository.

## Overview

The automated question fixing system is designed to streamline the process of updating, correcting, and enhancing questions in the KCSA Mock Exam. It leverages GitHub Issues, GitHub Actions, and the Perplexity AI API to create an efficient workflow for maintaining question quality.

## System Components

### 1. GitHub Issues

- **Question Error Reports**: Users can report errors or suggest improvements to questions by creating GitHub Issues with a specific format.
- **Issue Template**: A standardized template helps users provide all necessary information.
- **Labels**: The `question-error` label triggers the automated fixing process.

### 2. GitHub Actions

- **Issue Management**: Automatically labels and validates question error reports.
- **Question Fix Automation**: Processes properly formatted issues and creates pull requests with fixes.
- **Auto-labeling**: Automatically adds the `question-error` label to issues that match error reporting patterns.
- **Self-Test**: Validates that the automation scripts are working correctly.

### 3. Python Scripts

- **Process Issue**: Extracts information from GitHub Issues and triggers the appropriate question processing script.
- **Refine Questions**: Makes targeted fixes to questions based on specific criteria (factual incorrectness, unclear content, or deprecated information).
- **Review Questions**: Performs comprehensive reviews and rewrites of questions to align with KCSA exam objectives.

### 4. Node.js Tools

- **Update Questions**: Updates the SQLite database with revised question data.
- **Export Questions**: Exports questions from the database to JavaScript files.

## Workflow

1. **Issue Creation**: A user creates a GitHub Issue reporting a question error.
2. **Issue Management**: GitHub Actions adds the `question-error` label if it matches the pattern.
3. **Question Fix Automation**: When an issue is labeled with `question-error`, the automation workflow:
   - Extracts the question ID and domain from the issue
   - Identifies the question using multiple methods (ID, text matching, answer matching)
   - Determines whether to use the refine or review script
   - Runs the appropriate script with the Perplexity API
   - Updates the database and exports the questions
   - Creates a pull request with the changes
   - Comments on the original issue with the outcome

4. **Review and Merge**: The pull request is reviewed by maintainers and merged if the changes are appropriate.

## Question Identification Methods

The system uses multiple methods to identify questions, in order of reliability:

1. **Question ID Matching**: If the issue includes a question ID (e.g., "#42"), the system searches for a question with that ID in all domain files.

2. **Exact Question Text Matching**: If the issue includes the question text, the system searches for an exact match across all domain files.

3. **Fuzzy Question Text Matching**: If no exact match is found, the system looks for questions with similar text (at least 50% word overlap).

4. **Answer Text Matching**: If text matching fails, the system tries to match based on the correct answer content provided in the issue.

This multi-method approach ensures we can find the relevant question even if the ID isn't provided or if there are slight variations in how the question is quoted in the issue.

## Processing Workflow in Detail

1. **Issue Identification**:
   - The GitHub Actions workflow is triggered when an issue with the `question-error` label is created or edited.
   - The workflow passes the issue title, body, and number to the `process_issue.py` script.

2. **Extraction**:
   - The script extracts relevant information from the issue using regular expressions.
   - It identifies the question ID, domain, error type, and whether the question needs a full review.

3. **Question Identification**:
   - The script uses the methods described above to find the specific question.
   - If it cannot identify the question, it adds a detailed comment to the issue explaining what information is missing.

4. **Question Processing**:
   - For simple content errors, the `refine_questions.py` script is used.
   - For questions needing comprehensive review, the `review_questions.py` script is used.
   - Both scripts use the Perplexity API to generate improved versions of the questions.

5. **Database Update**:
   - The node.js scripts update the SQLite database and export the revised questions.

6. **Pull Request Creation**:
   - A pull request is created with the changes to the database and exported question files.
   - The PR includes a link to the original issue and describes the changes made.

7. **Completion**:
   - The system adds a comment to the original issue indicating successful processing and links to the created PR.

The system uses multiple methods to identify questions when no explicit ID is provided:

1. **Question ID**: If the issue includes a reference to the question ID (e.g., #42), this is the most reliable method
2. **Question Text**: If the issue contains the full question text, the system can locate the question by matching text
3. **Partial Text Matching**: For cases where only part of the question text is included
4. **Answer Matching**: When the correct answer is mentioned, the system can use this to find the question

## AI-Assisted Question Improvement

The system uses the Perplexity AI API to:

1. **Analyze Question Quality**: Examine questions for factual errors, unclear content, or outdated information.
2. **Make Targeted Improvements**: Depending on the script used:
   - **Refine**: Make minimal, targeted changes to fix specific issues.
   - **Review**: Comprehensively revise questions to align with KCSA exam objectives.
3. **Add Authoritative Sources**: Ensure questions have high-quality references from official Kubernetes documentation and reputable security resources.

## Running the System Locally

For testing or development purposes, the automation system can be run locally:

```bash
# Test the issue processing without making actual changes
cd .github/scripts
python test_automation.py --title "Error on question #42" --body "Domain: Kubernetes_Security_Fundamentals" --dry-run

# Run the refine script directly to make targeted fixes
cd src/admin
python refine_questions.py --category Kubernetes_Security_Fundamentals --revision 1

# Run the review script for comprehensive question revisions
cd src/admin
python review_questions.py --category Cloud_Native_Security
```

## Security Considerations

- **API Keys**: The Perplexity API key is stored as a GitHub Secret and is never exposed in logs or pull requests.
- **Permissions**: The GitHub Actions workflows use the minimum required permissions.
- **Content Control**: All AI-generated changes are submitted as pull requests for review, not automatically merged.

## Maintenance

To keep the question automation system running smoothly:

1. **Update Prompt Templates**: Regularly review and update the prompt templates in the Python scripts.
2. **Monitor API Changes**: Stay informed about changes to the Perplexity AI API that may affect the system.
3. **Review Automation Logs**: Regularly check the GitHub Actions logs for any issues or failures.

## Contributing

We welcome contributions to improve the automated question fixing system. See [CONTRIBUTING.md](../CONTRIBUTING.md) for more information.
