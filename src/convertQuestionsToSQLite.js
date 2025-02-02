import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert file URL to path (needed for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import questions data
import { questions } from './questions.js';

// Define the output SQLite file
const dbFile = path.resolve(__dirname, 'questions.sqlite');

// Open a new (or existing) SQLite database file
const db = new Database(dbFile);

// Create the "questions" table if it does not exist
db.exec(`
  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY,
    question TEXT NOT NULL,
    options TEXT NOT NULL,
    correct_answers TEXT NOT NULL,
    explanation TEXT,
    question_type TEXT NOT NULL,
    domain TEXT NOT NULL,
    subdomain TEXT NOT NULL
  );
`);

// Prepare the insert statement
const insert = db.prepare(`
  INSERT INTO questions (id, question, options, correct_answers, explanation, question_type, domain, subdomain)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(id) DO UPDATE SET 
    question=excluded.question,
    options=excluded.options,
    correct_answers=excluded.correct_answers,
    explanation=excluded.explanation,
    question_type=excluded.question_type,
    domain=excluded.domain,
    subdomain=excluded.subdomain;
`);

// Use a transaction to insert all questions at once
const insertMany = db.transaction((questionsArray) => {
  for (const q of questionsArray) {
    insert.run(
      q.id,
      JSON.stringify(q.question),         // Store question as JSON string
      JSON.stringify(q.options),         // Store options as JSON string
      JSON.stringify(q.correct_answers), // Store correct answers as JSON string
      q.explanation,
      q.question_type,
      q.domain,
      q.subdomain
    );
  }
});

// Execute the transaction
insertMany(questions);
console.log(`Successfully created ${dbFile} with ${questions.length} questions.`);

// Close the database
db.close();
