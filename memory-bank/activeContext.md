# Active Context: Kubernetes Security Mock Exam App

## 1. Current Focus

*   Establishing the initial Memory Bank documentation structure.
*   Understanding the existing codebase structure and technologies based on file analysis and `.clinerules`.

## 2. Recent Changes

*   Created the initial Memory Bank core files:
    *   `projectbrief.md`
    *   `productContext.md`
    *   `systemPatterns.md`
    *   `techContext.md`

## 3. Next Steps (Immediate)

*   Create the remaining core Memory Bank files:
    *   `activeContext.md` (this file)
    *   `progress.md`
*   Await further instructions or tasks from the user.

## 4. Active Decisions & Considerations

*   **Memory Bank Initialization:** Following the defined protocol to create the necessary documentation foundation.
*   **Development Environment:** Assuming a standard Create React App (potentially customized with CRACO) setup as inferred from file structure and configuration files (`craco.config.js`, `package.json`).

## 5. Important Patterns & Preferences

*   **Memory Bank Protocol:** Adherence to the specified structure and update workflows is paramount.
*   **React Hooks:** Standard pattern for state management as per `techContext.md`.
*   **Component Structure:** Following the `/src/components/` convention mentioned in `.clinerules`.
*   **Local Persistence:** Utilizing the `useLocalStorage` hook for saving exam state is the current pattern.

## 6. Learnings & Project Insights (Initial)

*   The project is a client-side React application focused on providing a KCsa mock exam experience.
*   Core functionality involves loading questions (currently SQLite), presenting them, scoring, and allowing review.
*   State persistence is handled locally.
*   There's an existing structure for components, hooks, and even database management scripts.
*   A future implementation of referencing sources for answers is planned.
*   Testing (Jest) and optional containerization (Docker) are part of the project setup.
