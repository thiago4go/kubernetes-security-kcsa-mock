# **Kubernetes Security KCSA Mock Exam**  

## **🚀 Overview**  
This project is an **interactive web application** designed to help aspiring **Kubernetes security professionals** prepare for certification exams. It features a comprehensive **bank of 290+ questions** covering key Kubernetes security topics.

---

## **🌐 Live Version**  
Access the live version of the app here:  
🔗 [**Kubernetes Security KCSA Mock Exam**](https://kubernetes-security-kcsa-mock.vercel.app/)

---

## **📌 What's New?**  

The latest update brings **significant improvements** to align with the **KCSA curriculum** and enhance maintainability:

✅ **AI powered question review python script** for better clarity and accuracy. 

✅ **Improved exam interface & question navigation.**  

✅ **Select Exam Domains:** Focus your practice by choosing specific Kubernetes security domains (under "Extra Options").

✅ **Enhanced Explanations:** Explanations now include verified sources/references.

✅ **Domain-Specific Results:** View your score broken down by domain on the results page.

---

## **📌 Features**  

✔️ **290+ Carefully crafted questions** (UPDATED)  
✔️ **Randomized question order** in every exam session  
✔️ **Configurable question count** per exam  
✔️ **Select Exam Domains:** Choose specific domains for targeted practice (under "Extra Options").

✔️ **Interactive exam interface** (one question per page)  
✔️ **Navigation menu** for easy question review  
✔️ **Flag questions** for later review  
✔️ **Exam countdown timer**  

✔️ **Auto-scoring & detailed explanations** with sources/references.

✔️ **Domain-Specific Scoring:** Results page shows performance per domain.

✔️ **Fully responsive design** (mobile-friendly)  

✔️ **Progress saving** to handle page refreshes or accidental closures  

---

## **🛠 Getting Started**  

### **📌 Prerequisites**  
- Node.js (v14 or later)  
- npm (v6 or later)  

### **📌 Installation**  
1️⃣ **Clone the repository:**  
```bash
git clone https://github.com/thiago4go/kubernetes-security-kcsa-mock.git
```
2️⃣ **Navigate to the project directory:**  
```bash
cd kubernetes-security-kcsa-mock
```
3️⃣ **Install dependencies:**  
```bash
npm install
```
4️⃣ **Start the development server:**  
```bash
npm start
```
5️⃣ Open your browser and visit **`http://localhost:3000`** to use the application.  

### **📌 Docker Compose Deploy**  

[Documentation](docker-compose/README.md)
---

## **📌 Usage**  

1️⃣ Select the number of questions for your exam session.  
2️⃣ **(Optional)** Choose specific **Exam Domains** to focus your practice (under "Extra Options").

3️⃣ Click **"Start Exam"** to begin.  
4️⃣ Answer each question & navigate using **"Previous" / "Next"** buttons.  
5️⃣ **Flag questions** for review if needed.  

6️⃣ Submit the exam when finished or when the timer runs out.  
7️⃣ Review results, correct answers, explanations, and domain scores.  

---

## **📂 Database Management (SQLite)**  

The application now **stores and manages questions in SQLite** for improved performance and maintainability.

### **📌 Exporting Questions**  
To **export** questions from SQLite into categorized JavaScript files:  
```bash
node src/admin/db-tools/export_questions.mjs
```

### **📌 Updating Questions**  
To **update** the SQLite database with the latest classified questions:  
```bash
node src/admin/db-tools/update_questions.mjs
```
These scripts **keep the database structured and up to date**.

### **🤖 AI-Powered Question Review (Advanced)**

For maintainers, experimental scripts `review_questions.py` and `refine_questions.py` use the Perplexity AI API to automatically review and enhance questions within a specific category.

**⚠️ Warning:** These scripts modify question files directly and rely on an external AI service. Use with caution and review the changes carefully.

**Prerequisites:**
*   Python 3 installed.
*   Node.js installed (for subsequent database updates).
*   Perplexity AI API Key: Set the `PERPLEXITY_API_KEY` environment variable.
    ```bash
    export PERPLEXITY_API_KEY='your_api_key_here'
    ```

**Usage for `review_questions.py`:**
1.  Ensure your API key is set as an environment variable.
2.  Run the script from the project root directory, specifying the category (matching the `.mjs` filename without the extension):
    ```bash
    python review_questions.py --category <CategoryName>
    ```
    *Example:*
    ```bash
    python review_questions.py --category Kubernetes_Security_Fundamentals
    ```

**What it does:**
1.  Identifies questions in `src/exported-questions/<CategoryName>.mjs` needing review (where `revision: 0`).
2.  Sends batches of these questions to the Perplexity API for improvements (clarity, explanations, sources).
3.  Creates a backup (`.bak`) of the original `.mjs` file before making changes.
4.  Updates the `.mjs` file with the AI-revised questions (setting `revision: 1` and `revision_date`).
5.  Automatically runs `src/admin/db-tools/update_questions.mjs` and `src/admin/db-tools/export_questions.mjs` to update the SQLite database and re-export the files.
6.  Saves suggested PR messages summarizing changes to `src/revised-questions/pr_messages_<CategoryName>.txt`.
7.  If any critical step fails, it attempts to restore the original `.mjs` file from the backup. On success, the backup is removed.

**Usage for `refine_questions.py`:**
1.  Ensure your API key is set as an environment variable.
2.  Run the script from the project root directory, specifying the category (matching the `.mjs` filename without the extension):
    ```bash
    python refine_questions.py --category <CategoryName>
    ```
    *Example:*
    ```bash
    python refine_questions.py --category Kubernetes_Security_Fundamentals
    ```

**What it does:**
1.  Identifies questions in `src/exported-questions/<CategoryName>.mjs` needing review (where `revision: 1` by default).
2.  Sends batches of these questions to the Perplexity API for targeted improvements (clarity, correctness, deprecation, sources).
3.  Creates a backup (`.bak`) of the original `.mjs` file before making changes.
4.  Updates the `.mjs` file with the AI-revised questions (setting `revision: 1` and `revision_date`).
5.  Automatically runs `src/admin/db-tools/update_questions.mjs` and `src/admin/db-tools/export_questions.mjs` to update the SQLite database and re-export the files.
6.  Saves suggested PR messages summarizing changes to `src/revised-questions/pr_messages_<CategoryName>.txt`.
7.  If any critical step fails, it attempts to restore the original `.mjs` file from the backup. On success, the backup is removed.

---

## **🔹 Contributing**  

### **🛠 How to Update Questions**  
We welcome contributions to improve the **question bank**!  
If you spot an error, want to add references, or update a question, follow these steps:  

📖 **See [CONTRIBUTING.md](CONTRIBUTING.md) for details.**  

### **💡 Quick Contribution Steps:**  
1️⃣ **Open an issue** describing the update.  
2️⃣ **Create a new branch** (`update-question-<id>`).  
3️⃣ **Modify the question** in `src/exported-questions/`.  
4️⃣ **Ensure sources follow the correct format:**  
```json
"sources": [
  {
    "name": "Kubernetes Documentation",
    "url": "https://kubernetes.io/docs/concepts/security/overview/"
  }
]
```
5️⃣ **Submit a Pull Request (PR)** for review.  

---

## **📜 License**  
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.  

---

## **🙌 Acknowledgments**  

Special thanks to:  
- **Henry Khosashi & Mark Wilson** for their support in Kubernetes certification studies.  
- **The Kubernetes Community** for their contributions to cloud-native security.  
- **v0 (Vercel's AI assistant)** for helping refine the project.  
- **ChatGPT-4** for assisting in the initial question structure and JSON format generation.  

---

## **⚠️ Disclaimer**  
This mock exam is created for **educational purposes** and is **not officially affiliated with CNCF or Kubernetes certification programs**.  

---

## **📌 Roadmap 2025**
Our goal is to **continuously improve the KCSA Mock Exam App** by keeping the questions **up-to-date, categorised, and well-explained** to enhance learning, accuracy, and usability.  

#### **🛠 Planned Enhancements:**  
- **[Ongoing]** **Keep Questions Updated** – Ensure alignment with **latest KCSA exam domains** and security best practices.  
- [X] **Use Classified Questions by Domain Exam** – Improve UX for **targeted learning** domain.  
- [X] **Improve Explanations with Sources** – Add **verified references** to help users understand correct answers.  
- [ ] **Advanced Analytics & Learning Insights** – Track **weakest topics**, **attempt history**, and **improvement trends**.  
- [ ] **Implement Spaced Repetition System (SRS)** – Prioritize difficult questions for better retention. 
- [ ] **Enhance Community Collaboration** – Open a **public issue tracker** for reporting **errors and missing sources**.  

📖 **See [ROADMAP.md](ROADMAP.md) for details!**  

🚀 Have suggestions? **Open an issue** or **submit a PR** to help improve the app! 🎯

---

## **💬 Feedback & Support**  
Your feedback is **crucial** for improving this project!  
If you find errors or want to suggest improvements, please **open an issue** on GitHub.

---

### **🎯 Keep Pushing Forward!**  
With **dedication and practice**, you can become a **Kubestronaut**! 🚀👨‍🚀  
Best of luck on your **Kubernetes Security certification journey**! 🎯🔥
