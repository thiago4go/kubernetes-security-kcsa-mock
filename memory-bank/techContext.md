# Technical Context: Kubernetes Security Mock Exam App

## 1. Core Technologies

*   **Frontend Framework:** React (v18+, based on typical Create React App setups) using JavaScript (ES6+).
*   **UI Rendering:** Client-side rendering managed by React DOM.
*   **State Management:** Primarily React Hooks (`useState`, `useEffect`). A custom hook `useLocalStorage` (`src/hooks/useLocalStorage.js`) is used for persisting exam state in the browser's local storage.
*   **Data Handling:**
    *   Currently uses `sql.js` (WebAssembly library) to read data from a static SQLite database file (`public/questions.sqlite`).
*   **Styling:** Standard CSS files (`src/index.css`, `src/App.css`). No CSS preprocessors (like Sass/Less) or CSS-in-JS libraries are currently configured.
*   **Package Management:** npm (Node Package Manager). `package.json` defines dependencies and scripts. `package-lock.json` ensures reproducible builds.
*   **Testing Framework:** Jest, configured via `jest.config.js` and `jest.setup.js`. Tests are located in `tests/` and potentially alongside components (`*.test.js`). `tests/questionsIntegrity.test.js` specifically validates question data.

## 2. Development Environment

*   **Runtime:** Node.js (version required by Create React App / project dependencies).
*   **Setup:** Standard `npm install` to get dependencies.
*   **Development Server:** Likely uses `react-scripts start` (via `npm start`) provided by Create React App (though `craco.config.js` suggests potential customization via CRACO - Create React App Configuration Override).
*   **Build Process:** `npm run build` (likely using `react-scripts build` or CRACO equivalent) to create a production-ready static build in the `build/` directory (standard CRA behavior).
*   **Linting/Formatting:** Not explicitly configured in `.clinerules`, but recommended (e.g., ESLint, Prettier).

## 3. Technical Constraints & Considerations

*   **Browser Environment:** All application logic runs in the user's browser. Performance depends on the user's machine and browser capabilities, especially `sql.js` execution.
*   **Static Data:** Questions are currently static and bundled with the application build. Updating questions requires rebuilding and redeploying the application or updating the `public/questions.sqlite` file.
*   **Local Persistence:** Exam state is tied to the specific browser's local storage. Clearing browser data will reset progress. State is not shared across devices or browsers.
*   **Security:** As a purely client-side application, there are minimal server-side security concerns. However, input validation and secure handling of data within the browser context are still relevant. The primary asset is the question data itself.

## 4. Dependencies (Key Libraries - Inferred from context)

*   `react`, `react-dom`: Core React libraries.
*   `react-scripts` / `@craco/craco`: Build/development tooling.
*   `sql.js`: For reading SQLite database in the browser.
*   `jest`: Testing framework.
*   (Other dependencies listed in `package.json`)

## 5. Tool Usage Patterns

*   **Database Management:** Node.js scripts (`.mjs`) in `src/admin/db-tools/` are used for managing the questions in the SQLite database (e.g., exporting, updating).
*   **Testing:** `npm test` runs the Jest test suite.
*   **Containerization (Optional):** A `docker-compose/` directory exists, suggesting Docker can be used for building or running the application in a containerized environment (`docker-compose.yaml`, `Dockerfile`).
