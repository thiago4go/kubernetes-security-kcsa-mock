import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { format } from 'date-fns';

// Convert file URL to path (needed for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define database path
const dbFile = path.resolve(__dirname, '../../../public/questions.sqlite');
const questionsDir = path.resolve(__dirname, '../../exported-questions');

// Ensure the database file exists
if (!fs.existsSync(dbFile)) {
    console.error(`Database file not found at: ${dbFile}`);
    process.exit(1);
}

const db = new Database(dbFile);

// Function to ensure new columns exist
const ensureSchema = () => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY,
        question TEXT NOT NULL,
        options TEXT NOT NULL,
        correct_answers TEXT NOT NULL,
        explanation TEXT NOT NULL,
        question_type TEXT NOT NULL,
        domain TEXT NOT NULL,
        subdomain TEXT NOT NULL,
        sources TEXT DEFAULT '[]',           -- New JSON column
        revision INTEGER DEFAULT 0,          -- New integer column
        revision_date TEXT DEFAULT NULL      -- New date column
      );
    `);
};

// Function to fetch existing question data
const getExistingQuestion = (id) => {
    const row = db.prepare("SELECT * FROM questions WHERE id = ?").get(id);
    return row ? row : null;
};

// Function to load questions from JavaScript files
const loadQuestionsFromFiles = async () => {
    const questionFiles = fs.readdirSync(questionsDir).filter(file => file.endsWith('.mjs'));
    let allQuestions = [];

    for (const file of questionFiles) {
        const filePath = path.join(questionsDir, file);
        try {
            // Dynamically import the JS file and extract questions
            const module = await import(filePath);
            const questionsArray = Object.values(module)[0]; // Extracts the exported array
            allQuestions = [...allQuestions, ...questionsArray];

        } catch (error) {
            console.error(`Error importing ${file}:`, error);
        }
    }

    // Update database after loading all questions
    if (allQuestions.length > 0) {
        updateDatabase(allQuestions);
    } else {
        console.log("No questions found in exported files.");
    }
};

// Function to check for changes and update the SQLite database
const updateDatabase = (questions) => {
    ensureSchema();

    const update = db.prepare(`
      UPDATE questions
      SET 
        question = ?, 
        options = ?, 
        correct_answers = ?, 
        explanation = ?, 
        question_type = ?, 
        domain = ?, 
        subdomain = ?, 
        sources = ?, 
        revision = ?, 
        revision_date = ?
      WHERE id = ?
    `);

    const insert = db.prepare(`
      INSERT INTO questions (id, question, options, correct_answers, explanation, question_type, domain, subdomain, sources, revision, revision_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = format(new Date(), 'yyyy-MM-dd HH:mm:ss'); // Current timestamp

    let updatedCount = 0;
    let insertedCount = 0;

    db.transaction(() => {
        for (const q of questions) {
            const existing = getExistingQuestion(q.id);

            // Default sources if missing
            const sources = JSON.stringify(q.sources || []);

            if (existing) {
                // Convert stored JSON fields for comparison
                existing.options = JSON.parse(existing.options);
                existing.correct_answers = JSON.parse(existing.correct_answers);
                existing.sources = JSON.parse(existing.sources || '[]');

                // Check if any field has changed
                if (
                    existing.question !== q.question ||
                    JSON.stringify(existing.options) !== JSON.stringify(q.options) ||
                    JSON.stringify(existing.correct_answers) !== JSON.stringify(q.correct_answers) ||
                    existing.explanation !== q.explanation ||
                    existing.question_type !== q.question_type ||
                    existing.domain !== q.domain ||
                    existing.subdomain !== q.subdomain ||
                    JSON.stringify(existing.sources) !== sources
                ) {
                    // Increment revision and update date if modified
                    const newRevision = existing.revision + 1;
                    update.run(
                        q.question,
                        JSON.stringify(q.options),
                        JSON.stringify(q.correct_answers),
                        q.explanation,
                        q.question_type,
                        q.domain,
                        q.subdomain,
                        sources,
                        newRevision,
                        now,
                        q.id
                    );
                    updatedCount++;
                }
            } else {
                // Insert new question
                insert.run(
                    q.id,
                    q.question,
                    JSON.stringify(q.options),
                    JSON.stringify(q.correct_answers),
                    q.explanation,
                    q.question_type,
                    q.domain,
                    q.subdomain,
                    sources,
                    0,    // Initial revision = 0
                    now   // First insertion date
                );
                insertedCount++;
            }
        }
    })();

    console.log(`Updated: ${updatedCount} | Inserted: ${insertedCount}`);
    db.close();
};

// Run the script
loadQuestionsFromFiles();
