import fs from "fs";
import path from "path";

const workflowPath = path.join(
  __dirname,
  "../.github/workflows/question-fix-automation.yml"
);

describe("question fix automation workflow security", () => {
  test("uses environment variables instead of interpolating issue content into the shell", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");
    const processStepSection = workflow.match(
      /- name: Parse issue content and process question[\s\S]*?(?=\n {6}- name: Create Pull Request if changes were made)/
    )?.[0];

    expect(processStepSection).toBeTruthy();
    expect(processStepSection).toContain(
      "ISSUE_TITLE: ${{ github.event.issue.title }}"
    );
    expect(processStepSection).toContain(
      "ISSUE_BODY: ${{ github.event.issue.body }}"
    );
    expect(processStepSection).toContain(
      'SCRIPT_OUTPUT=$(python .github/scripts/process_issue.py "$ISSUE_TITLE" "$ISSUE_BODY_B64" "$ISSUE_NUMBER")'
    );

    const runBlock = processStepSection.split("run: |\n")[1];

    expect(runBlock).toBeTruthy();
    expect(runBlock).not.toMatch(/\$\{\{\s*github\.event\.issue\.title\s*\}\}/);
    expect(runBlock).not.toMatch(/\$\{\{\s*github\.event\.issue\.body\s*\}\}/);
  });
});
