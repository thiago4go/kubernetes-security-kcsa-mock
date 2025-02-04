### **📝 Contributing to the KCSA Mock Exam App**  

We welcome contributions to improve and refine the **question database, application features, and overall functionality**!  

There are multiple ways to contribute:  
✅ **Update or fix questions**  
✅ **Enhance explanations with proper sources**  
✅ **Improve the exam experience**  
✅ **Suggest new features**  
✅ **Fix bugs or improve performance**  

---

# **🛠 How to Contribute**  

## **1️⃣ Contributing to Question Updates**  
### **1️⃣ Open an Issue**  
Before making changes, **open an issue** in the repository to describe:  
- The **question ID** you are updating.  
- The **problem with the question** (e.g., incorrect answer, missing explanation, outdated reference).  
- The **proposed fix** or improvement.  

💡 **Example Issue:**  
```
Title: Update Question id: 42 – Incorrect Explanation  

Description:  
The explanation for question id: 42 is incorrect.  
- **Current Explanation:** "Kubernetes API Server is responsible for managing nodes directly."  
- **Corrected Explanation:** "The Kubernetes API Server serves as the control plane, exposing RESTful APIs for interacting with the cluster."  
- **Adding Sources:** ["Kubernetes Documentation", "https://kubernetes.io/docs/concepts/overview/components/"]
```

---

### **2️⃣ Create a New Branch**  
Once your issue is approved or if you're directly contributing a fix:  
```bash
git checkout -b update-question-<question_id>
```
Replace `<question_id>` with the **actual question ID**.

---

### **3️⃣ Modify the Exported JavaScript Files**  
1. Locate the question file in **`src/exported-questions/`**  
   - Example: `src/exported-questions/Cloud_Native_Security.js`
2. Modify the question, **ensuring proper JSON formatting**.
3. **Add sources** in the correct format:  
```js
export const CloudNativeSecurityQuestions = [
  {
    "id": 7,
    "question": "What is the main function of a Cloud Workload Protection Platform (CWPP)?",
    "options": [
      "Monitor network traffic",
      "Secure workloads across environments",
      "Manage cloud costs"
    ],
    "correct_answers": [1],
    "explanation": "CWPPs protect workloads across multiple environments.",
    "question_type": "single-choice",
    "domain": "Cloud Native Security",
    "subdomain": "Workload and Application Code Security",
    "sources": [
      {
        "name": "Kubernetes Documentation",
        "url": "https://kubernetes.io/docs/concepts/security/overview/"
      }
    ]
  }
];
```
✅ **Ensure:**
- 📝 **Correct formatting** (`sources` must be an **array of objects** with `name` & `url`).  
- 🔢 **Accuracy** (Check `correct_answers`, `explanation`, and `options`).  

---

### **4️⃣ Submit a Pull Request (PR)**  
Once you've made your changes, commit and push them:  
```bash
git add src/exported-questions/Cloud_Native_Security.js
git commit -m "Updated question id: 7 - Fixed explanation and added sources"
git push origin update-question-7
```
Then, **create a Pull Request (PR)**:
- **Title:** `[Update Question id: 7] Fixed explanation and added references`
- **Description:**  
  - What was changed (e.g., added sources, corrected explanation).
  - Why the change was needed.  

---

### **5️⃣ Review & Merge**
- Maintainers will review the PR.
- If approved, the PR will be merged, and the **SQLite database will be updated** using:
  ```bash
  node src/admin/db-tools/update_questions.mjs
  ```
- The latest questions will be **exported** back to JavaScript files using:
  ```bash
  node src/admin/db-tools/export_questions.mjs
  ```

---


## **2️⃣Contributing to Features & Bug Fixes**  
Want to improve the app itself? Here’s how:  

### **📌 Reporting a Bug or Suggesting a Feature**
1. Open an **issue** with a **clear description** of the bug or improvement.
2. If suggesting a new feature, explain:  
   - **What problem does this solve?**  
   - **How would this improve the user experience?**  
   - **Any potential implementation ideas?**  

---

### **📌 Implementing a Feature or Bug Fix**
1. Create a new branch:  
   ```bash
   git checkout -b feature-<name>  # Example: feature-improve-ui
   ```
2. Make your changes inside `src/`  
3. Ensure everything runs smoothly:  
   ```bash
   npm start  # Check if the app is working correctly
   ```
4. Commit your changes and push:  
   ```bash
   git add .
   git commit -m "Improved UI navigation for exam review"
   git push origin feature-improve-ui
   ```
5. **Submit a Pull Request (PR)** following the **same format as question updates**.


## **🔹 Summary of the Contribution Process**
### **✅ Updating Questions**
1️⃣ Open an issue describing the update.  
2️⃣ Create a new branch (`update-question-<question_id>`).  
3️⃣ Modify the exported JavaScript file (`src/exported-questions/`).  
4️⃣ Ensure sources are properly formatted (`[{ "name": "...", "url": "..." }]`).  
5️⃣ Submit a **pull request (PR)** for review.  
6️⃣ **Maintainers merge & update SQLite database**.  

### **✅ Contributing to Features & Bug Fixes**
1️⃣ Open an issue describing the feature or bug fix.  
2️⃣ Create a new branch (`feature-<name>` or `bugfix-<name>`).  
3️⃣ Make the necessary code changes in `src/`.  
4️⃣ Test your updates (`npm start`).  
5️⃣ Submit a **pull request (PR)** for review.  

---

## **🚀 Get Involved!**
Your contributions make the **KCSA Mock Exam App** better for **everyone**!  

📖 **See [ROADMAP.md](ROADMAP.md) for upcoming features!**  

🚀 Let's make Kubernetes security education **accessible, accurate, and effective**! 🎯🔥  
