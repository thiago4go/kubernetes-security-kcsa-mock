// src/questionsDatabase.js
import initSqlJs from 'sql.js';

export async function getAllQuestions() {
  // Initialize sql.js and tell it where to load the wasm file from:
  const SQL = await initSqlJs({
    locateFile: () => '/sql-wasm.wasm', // now served from the public folder
  });

  // Fetch the bundled SQLite file (ensure it is also in your public folder)
  const response = await fetch('/questions.sqlite');
  if (!response.ok) {
    throw new Error('Failed to load the SQLite database file.');
  }
  const buffer = await response.arrayBuffer();

  // Open the database in memory from the buffer
  const db = new SQL.Database(new Uint8Array(buffer));

  // Execute query to select all questions
  const result = db.exec("SELECT * FROM questions");
  if (!result.length) {
    return [];
  }
  const { columns, values } = result[0];
  const questions = values.map(row => {
    const question = {};
    row.forEach((val, index) => {
      const col = columns[index];
      // Parse JSON fields if needed
      if (col === 'options' || col === 'correct_answers') {
        try {
          question[col] = JSON.parse(val);
        } catch {
          question[col] = val;
        }
      } else {
        question[col] = val;
      }
    });
    return question;
  });

  db.close();
  return questions;
}
