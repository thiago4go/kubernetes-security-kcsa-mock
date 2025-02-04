import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { format } from 'date-fns';

// Convert file URL to path (needed for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const DB_FILE = path.resolve(__dirname, '../../../public/questions.sqlite');
const OUTPUT_DIR = path.resolve(__dirname, '../../exported-questions');
const METAFILE = path.resolve(__dirname, '../../questions_metadata.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Open SQLite database
const db = new Database(DB_FILE);

// Function to ensure database schema is up to date
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
            sources TEXT DEFAULT '[]' CHECK(json_valid(sources)),
            revision INTEGER DEFAULT 0,
            revision_date TEXT DEFAULT NULL
        );
    `);
};

// Function to convert domain name to camelCase
const convertToCamelCase = (str) => {
    return str
        .split('_')
        .map((word, index) =>
            index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join('');
};

// Function to get all unique domains
const getDomains = () => {
    return db.prepare("SELECT DISTINCT domain FROM questions;").all().map(row => row.domain);
};

// Function to get questions for a given domain
const getQuestionsForDomain = (domain) => {
    return db.prepare(`
        SELECT 
            id, question, options, correct_answers, explanation, 
            question_type, domain, subdomain, sources, revision, revision_date
        FROM questions
        WHERE domain = ?
    `).all(domain);
};

// Function to get the latest revision date for a domain
const getLatestRevisionDate = (domain) => {
    const result = db.prepare(`
        SELECT COALESCE(MAX(revision_date), 'N/A') as latest_date
        FROM questions WHERE domain = ?
    `).get(domain);
    return result.latest_date;
};

// Function to export questions to JavaScript files
const exportQuestions = () => {
    ensureSchema();
    const domains = getDomains();
    let metadata = {};

    domains.forEach(domain => {
        const safeDomain = domain.replace(/[^a-zA-Z0-9]/g, '_'); // Ensure safe filename
        const camelCaseName = convertToCamelCase(safeDomain) + "Questions"; // Convert to JS variable
        const questions = getQuestionsForDomain(domain);
        const latestRevisionDate = getLatestRevisionDate(domain);
        const questionCount = questions.length;

        // Format fields correctly
        questions.forEach(q => {
            q.options = JSON.parse(q.options);
            q.correct_answers = JSON.parse(q.correct_answers);
            q.sources = JSON.parse(q.sources || '[]'); // Ensure sources is a valid JSON array
        });

        // Create JavaScript export file
        const jsFilePath = path.join(OUTPUT_DIR, `${safeDomain}.mjs`);
        const jsContent = `
// Exported ${questionCount} questions for domain: ${domain}
// Last revision date: ${latestRevisionDate}
export const ${camelCaseName} = ${JSON.stringify(questions, null, 2)};
`;

        fs.writeFileSync(jsFilePath, jsContent);
        console.log(`✅ Exported ${questionCount} questions to: ${jsFilePath}`);

        // Update metadata
        metadata[safeDomain] = questionCount;
    });

    // Write metadata JSON file
    fs.writeFileSync(METAFILE, JSON.stringify(metadata, null, 2));
    console.log(`✅ Metadata saved in: ${METAFILE}`);

    db.close();
};

// Run the export function
exportQuestions();
