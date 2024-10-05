import React from 'react';

function SideMenu({ questions, currentQuestionIndex, setCurrentQuestionIndex, flaggedQuestions, userAnswers, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="side-menu">
      <button className="close-menu-btn" onClick={onClose}>Close</button>
      <h3>Questions</h3>
      <ul>
        {questions.map((question, index) => (
          <li
            key={question.id}
            className={`
              ${index === currentQuestionIndex ? 'active' : ''}
              ${flaggedQuestions.includes(question.id) ? 'flagged' : ''}
              ${userAnswers[question.id] ? 'answered' : ''}
            `}
            onClick={() => {
              setCurrentQuestionIndex(index);
              onClose();
            }}
          >
            <span className="question-number">Question {index + 1}</span>
            <div className="question-indicators">
              {flaggedQuestions.includes(question.id) && (
                <span className="flag-icon" title="Flagged">🚩</span>
              )}
              {userAnswers[question.id] && (
                <span className="answered-icon" title="Answered">✅</span>
              )}
              {index === currentQuestionIndex && (
                <span className="active-icon" title="Current Question">👉</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideMenu;