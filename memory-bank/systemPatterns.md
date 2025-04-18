# System Patterns: Kubernetes Security Mock Exam App

## 1. Architecture Overview

This is a client-side single-page application (SPA) built with React. There is no backend server component for core application logic; all exam processing and state management happen within the user's browser.

```mermaid
graph LR
    A[User Browser] --> B(React App);
    B --> C{State Management (Hooks)};
    B --> D[UI Components (src/components)];
    B --> E{Data Loading (sql.js)};
    C --> F[Local Storage];
    E --> G[/public/questions.sqlite];
```

## 2. Key Technical Decisions

*   **Client-Side Rendering:** The application renders entirely in the browser, simplifying deployment (static file hosting) but placing reliance on browser capabilities.
*   **SQLite via sql.js:** Questions are currently stored in a SQLite database file (`public/questions.sqlite`) and queried client-side using the `sql.js` library (compiled to WebAssembly). This allows for complex queries and data manipulation without a server.
*   **Local Storage for State:** The `useLocalStorage` hook is used to persist the user's exam progress (current question, answers) across browser sessions. This is simple but limited to the specific browser instance.
*   **Component-Based UI:** React components are used to structure the UI, promoting reusability and separation of concerns.

## 3. Design Patterns

*   **React Hooks:** Functional components with Hooks (`useState`, `useEffect`, custom hooks like `useLocalStorage`) are the standard for managing state and side effects.
*   **Component Composition:** Building complex UI elements by combining smaller, focused components (e.g., `Exam` component uses `Question`, `ProgressBar`, `Navigation`).
*   **Props Drilling:** State and callbacks might be passed down through multiple component layers. (Consideration: Could potentially be refactored with React Context API if state management becomes too complex).
*   **Conditional Rendering:** Displaying different UI elements based on application state (e.g., showing the exam view vs. the results page).

## 4. Component Relationships (Illustrative)

*   `App.js`: Main application component, handles routing/view switching (Home, Exam, Results).
*   `HomePage.js`: Initial view, button to start the exam.
*   `Exam.js`: Manages the active exam state, renders current `Question`, `ProgressBar`, `Navigation`.
*   `Question.js`: Displays a single question and its options, handles answer selection callbacks.
*   `Results.js`: Displays the final score and allows reviewing answered questions.
*   `useLocalStorage.js`: Custom hook providing persistent state.

## 5. Critical Implementation Paths

*   **Question Loading:** Asynchronous loading and parsing of the SQLite database using `sql.js`. Error handling is important here.
*   **State Synchronization:** Ensuring the UI correctly reflects the state stored in local storage, especially on initial load or refresh.
*   **Scoring Logic:** Correctly comparing user answers against the correct answers stored in the data source.

