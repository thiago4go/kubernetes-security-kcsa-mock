# Project Brief: Kubernetes Security Mock Exam App

## 1. Project Goal

To create a web application that provides a mock exam experience for the Kubernetes Certified Security Specialist (KCsa) certification. The application should allow users to take practice exams, review their answers, and track their progress.

## 2. Core Requirements

*   Load questions from a data source (currently SQLite, planned migration to JSON).
*   Present questions one by one in an exam format.
*   Allow users to select answers.
*   Provide immediate feedback or feedback upon exam completion (TBD).
*   Score the exam based on correct answers.
*   Allow users to review their answers and explanations.
*   Persist exam state locally using browser storage.
*   Responsive design for usability on different screen sizes.

## 3. Target Audience

Individuals preparing for the KCsa certification exam.

## 4. Scope

*   **In Scope:**
    *   Exam simulation functionality.
    *   Question loading and display.
    *   Answer selection and scoring.
    *   Results review.
    *   Local state persistence.
    *   Basic UI/UX based on React.
*   **Out of Scope (Initially):**
    *   User accounts and server-side persistence.
    *   Advanced analytics or reporting.
    *   Integration with external learning platforms.
    *   Admin interface for question management (beyond current scripts).

## 5. Key Technologies (as per .clinerules)

*   Frontend: React (JavaScript)
*   State Management: React Hooks (`useState`, `useEffect`, `useLocalStorage`)
*   Data: SQLite (`public/questions.sqlite`) via `sql.js` (migration to JSON planned)
*   Styling: CSS (`src/App.css`, `src/index.css`)
*   Testing: Jest
