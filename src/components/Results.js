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
      <h2>Exam Results</h2>
      {/* Display Overall Score */}
      <p>Overall Score: {overallScoreData.score} out of {questions.length} ({overallScoreData.percentage}%)</p>

      {/* Display Domain Scores */}
      <div className="domain-scores" style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>Score by Domain:</h3>
        {Object.entries(domainScores)
          .sort(([domainA], [domainB]) => domainA.localeCompare(domainB)) // Sort domains alphabetically
          .map(([domain, score]) => (
          <p key={domain} style={{ margin: '5px 0' }}>
            <strong>{domain.replace(/_/g, ' ')}:</strong> {score.correct} / {score.total} ({score.percentage}%)
          </p>
        ))}
      </div>

      {/* Review Section Title */}
      <h3 style={{ marginTop: '30px' }}>Review Your Answers:</h3>

      {/* Map through questions for review */}
      {questions.map((question) => (
        <motion.div
          key={question.id} // Ensure key is still here
          className="question-review"
          style={{
            backgroundColor: isCorrect(question) ? 'lightgreen' : 'lightcoral',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>{question.question}</h3>
          {/* Added <strong> tags and reordered */}
          <p><strong>Your answer:</strong> {(userAnswers[question.id] || []).map((index) => question.options[index]).join(', ')}</p>
          <p><strong>Correct answer:</strong> {question.correct_answers.map((index) => question.options[index]).join(', ')}</p>
          <p><strong>Explanation:</strong> {question.explanation}</p>
          {/* Moved Domain to the end */}
          <p><strong>Domain:</strong> {question.domain ? question.domain.replace(/_/g, ' ') : 'N/A'}</p>


          {/* Sources Section - Added text-align: right to container */}
          {question.sources && Array.isArray(question.sources) && question.sources.length > 0 && (
            <div className="sources-section" style={{ marginTop: '10px', textAlign: 'right' }}>
              <button
                onClick={() => toggleSources(question.id)}
                style={{ marginBottom: '5px', cursor: 'pointer', display: 'inline-block' }} // Ensure button is inline-block for text-align to work
              >
                {showSourcesMap[question.id] ? 'Hide Sources' : 'Show Sources'}
              </button>
              {showSourcesMap[question.id] && (
                <ul style={{ listStyle: 'disc', marginLeft: '20px', paddingLeft: '0' }}>
                  {question.sources.map((source, index) => (
                    <li key={index}>
                      {source.url ? (
                        <a href={source.url} target="_blank" rel="noopener noreferrer">
                          {source.name || source.url}
                        </a>
                      ) : (
                        source.name || 'Unnamed source'
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {/* End Sources Section */}

        </motion.div>
      ))}
      <button className="btn btn-primary btn-lg" onClick={onRestart} style={{ marginTop: '20px' }}>
        Restart Exam
      </button>
    </div>
  );
}

export default Results;
