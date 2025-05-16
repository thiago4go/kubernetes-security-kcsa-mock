# KCSA Mock Question Automation

This directory contains GitHub Actions workflows and scripts to automate question fixes and updates based on GitHub issues.

## Question Fix Automation

### How It Works

The `question-fix-automation.yml` workflow automatically processes GitHub issues that are labeled with `question-error`. It:

1. Extracts question information from the issue title and body
2. Determines which question needs to be fixed and which file it's in
3. Runs either the `refine_questions.py` or `review_questions.py` script based on the issue content
4. Updates the SQLite database and exports the questions back to JavaScript files
5. Creates a pull request with the changes
6. Adds a comment to the original issue

### Required Issue Format

For the automation to work correctly, issues should follow this format:

#### Title Format
Include the question ID in the title with a # symbol:
- "Erro on answer #42"
- "Error in explanation #23"
- "Question #17 needs updating"

#### Body Format
Include the following information in the issue body:
```
Domain: Kubernetes_Security_Fundamentals

Question: [The current question text]

Problem: [Description of the problem]

Suggested fix: [Your suggested fix, if any]

[Optional] Needs comprehensive review: Yes
```

The "Needs comprehensive review" line should be included if the question needs a full rewrite rather than a targeted fix.

### Labels

The workflow triggers when issues are labeled with:
- `question-error`

### Environment Setup

The workflow requires the `PERPLEXITY_API_KEY` secret to be configured in the repository settings.

## Testing Locally

You can test the automation locally using the `test_automation.py` script:

```bash
cd .github/scripts
python test_automation.py --title "Error on answer #42" --body "Domain: Kubernetes_Security_Fundamentals" --dry-run
```

Remove the `--dry-run` flag to actually execute the scripts.

## Troubleshooting

If the automation fails, check:
1. The issue format - make sure it includes the question ID and domain
2. The GitHub Actions workflow logs
3. That the `PERPLEXITY_API_KEY` secret is properly configured
