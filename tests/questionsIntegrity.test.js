import fs from "fs";
import Database from "better-sqlite3";
import { questions } from "../src/questions.js"; // Ensure this imports all questions
import path from "path";

// Path to the database
const dbPath = path.join(__dirname, "../public/questions.sqlite");

// 🧪 Test 1: Check if SQLite database exists and is valid
test("SQLite database should exist and be readable", () => {
  expect(fs.existsSync(dbPath)).toBe(true);

  const db = new Database(dbPath, { readonly: true });
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table';").all();

  expect(tables.length).toBeGreaterThan(0); // Ensure there are tables
  db.close();
});

// 🧪 Test 2: Check if questions table contains data
test("Database should have questions", () => {
  const db = new Database(dbPath, { readonly: true });
  const rowCount = db.prepare("SELECT COUNT(*) as count FROM questions;").get();
  
  expect(rowCount.count).toBeGreaterThan(0); // Ensure at least one question exists
  db.close();
});

// 🧪 Test 3: Ensure exported questions match the database count
test("Exported JavaScript questions should match database count", () => {
  const db = new Database(dbPath, { readonly: true });
  const rowCount = db.prepare("SELECT COUNT(*) as count FROM questions;").get();

  expect(questions.length).toBe(rowCount.count); // Ensure both have the same count
  db.close();
});

// 🧪 Test 4: Validate that exported questions have required fields
test("Exported questions should have required fields", () => {
  questions.forEach((q) => {
    expect(q).toHaveProperty("id");
    expect(q).toHaveProperty("question");
    expect(q).toHaveProperty("options");
    expect(q).toHaveProperty("correct_answers");
    expect(q).toHaveProperty("explanation");
    expect(q).toHaveProperty("domain");
  });
});
