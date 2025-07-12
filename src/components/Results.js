import React, { useMemo, useState } from 'react'; // Import useMemo and useState
import { motion } from 'framer-motion';

function Results({ questions, userAnswers, onRestart }) {
  // State to manage visibility of sources for each question
  const [showSourcesMap, setShowSourcesMap] = useState({});

  // Toggle sources visibility for a specific question ID
  const toggleSources = (questionId) => {
    setShowSourcesMap(prevMap => ({
      ...prevMap,
      [questionId]: !prevMap[questionId] // Toggle the boolean value
    }));
  };

  // Helper to check if a single question is answered correctly
  const isQuestionCorrect = (question, userAnswer) => {
    const correctAnswerIndices = question.correct_answers || [];
    // Ensure userAnswer is always an array for consistent comparison
    const userAnswersIndices = Array.isArray(userAnswer) ? userAnswer : (userAnswer !== undefined && userAnswer !== null ? [userAnswer] : []);


    // Check if the lengths match first
    if (userAnswersIndices.length !== correctAnswerIndices.length) {
      return false;
    }
    // Handle empty arrays - if both are empty, it's technically a match (e.g., no answer submitted for a question with no correct answer?)
    if (userAnswersIndices.length === 0) {
        return true; // Or false depending on desired logic for empty answers
    }

    // Check if all user answers are in the correct answers and vice versa (using Sets for efficiency)
    const userSet = new Set(userAnswersIndices);
    const correctSet = new Set(correctAnswerIndices);
    // Ensure sets have the same size and all elements in userSet are in correctSet
    return userSet.size === correctSet.size && [...userSet].every(ans => correctSet.has(ans));
  };


  // Calculate overall score using useMemo
  const overallScoreData = useMemo(() => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (isQuestionCorrect(q, userAnswers[q.id])) {
        correctCount++;
      }
    });
    const percentage = questions.length > 0 ? ((correctCount / questions.length) * 100).toFixed(2) : 0;
    return { score: correctCount, percentage: percentage };
  }, [questions, userAnswers]);

  // Calculate scores per domain using useMemo
  const domainScores = useMemo(() => {
    const scores = {};
    const questionsByDomain = {};

    // Group questions and initialize scores
    questions.forEach(q => {
      const domain = q.domain || 'Uncategorized'; // Handle potential missing domain
      if (!questionsByDomain[domain]) {
        questionsByDomain[domain] = [];
        scores[domain] = { correct: 0, total: 0 };
      }
      questionsByDomain[domain].push(q);
      scores[domain].total++;
    });

    // Calculate correct answers per domain
    Object.keys(questionsByDomain).forEach(domain => {
      questionsByDomain[domain].forEach(q => {
        // Use the consistent helper function
        if (isQuestionCorrect(q, userAnswers[q.id])) {
          scores[domain].correct++;
        }
      });
    });

    // Calculate percentages per domain
    Object.keys(scores).forEach(domain => {
        scores[domain].percentage = scores[domain].total > 0
            ? ((scores[domain].correct / scores[domain].total) * 100).toFixed(1)
            : 0;
    });


    return scores;
  }, [questions, userAnswers]);


  // Keep original isCorrect for styling review items, but use the refined helper
  const isCorrect = (question) => {
    const userAnswer = userAnswers[question.id] || [];
    return (
      userAnswer.length === question.correct_answers.length &&
      userAnswer.every((answer) => question.correct_answers.includes(answer))
    );
  };

  return (
    <div className="results">
      <div className="results-header">
        <h2 className="results-title">Exam Results</h2>
        <div className="overall-score">
          <span className="score-label">Overall Score:</span>
          <span className="score-value">{overallScoreData.score} out of {questions.length}</span>
          <span className="score-percentage">({overallScoreData.percentage}%)</span>
        </div>
      </div>

      {/* Display Domain Scores */}
      <div className="domain-scores">
        <h3 className="domain-scores-title">Score by Domain:</h3>
        <div className="domain-scores-grid">
          {Object.entries(domainScores)
            .sort(([domainA], [domainB]) => domainA.localeCompare(domainB)) // Sort domains alphabetically
            .map(([domain, score]) => (
            <div key={domain} className="domain-score-item">
              <span className="domain-name">{domain.replace(/_/g, ' ')}</span>
              <span className="domain-score">{score.correct} / {score.total} ({score.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Section Title */}
      <h3 className="review-title">Review Your Answers:</h3>

      {/* Map through questions for review */}
      <div className="questions-review">
        {questions.map((question) => (
          <motion.div
            key={question.id}
            className={`question-review ${isCorrect(question) ? 'correct' : 'incorrect'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="question-text">{question.question}</h3>
            
            <div className="answer-section">
              <p className="answer-item">
                <strong>Your answer:</strong>
                <span className="answer-value">
                  {(userAnswers[question.id] || []).map((index) => question.options[index]).join(', ')}
                </span>
              </p>
              <p className="answer-item">
                <strong>Correct answer:</strong>
                <span className="answer-value correct-answer">
                  {question.correct_answers.map((index) => question.options[index]).join(', ')}
                </span>
              </p>
              <p className="answer-item">
                <strong>Explanation:</strong>
                <span className="explanation-text">{question.explanation}</span>
              </p>
              <p className="answer-item">
                <strong>Domain:</strong>
                <span className="domain-text">{question.domain ? question.domain.replace(/_/g, ' ') : 'N/A'}</span>
              </p>
            </div>

            {/* Sources Section */}
            {question.sources && Array.isArray(question.sources) && question.sources.length > 0 && (
              <div className="sources-section">
                <button
                  className="sources-toggle-btn"
                  onClick={() => toggleSources(question.id)}
                >
                  {showSourcesMap[question.id] ? 'Hide Sources' : 'Show Sources'}
                </button>
                {showSourcesMap[question.id] && (
                  <ul className="sources-list">
                    {question.sources.map((source, index) => (
                      <li key={index} className="source-item">
                        {source.url ? (
                          <a href={source.url} target="_blank" rel="noopener noreferrer" className="source-link">
                            {source.name || source.url}
                          </a>
                        ) : (
                          <span className="source-name">{source.name || 'Unnamed source'}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="results-actions">
        <button className="restart-btn" onClick={onRestart}>
          Restart Exam
        </button>
      </div>
    </div>
  );
}

export default Results;
