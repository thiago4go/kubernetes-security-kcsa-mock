import React from 'react';

function Results({ questions, userAnswers, onRestart }) {
  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id] || [];
      if (
        userAnswer.length === question.correct_answers.length &&
        userAnswer.every((answer) => question.correct_answers.includes(answer))
      ) {
        correctAnswers++;
      }
    });
    return (correctAnswers / questions.length) * 100;
  };

  return (
    <div className="results">
      <h2>Exam Results</h2>
      <p>Your score: {calculateScore().toFixed(2)}%</p>
      {questions.map((question) => (
        <div key={question.id} className="question-review">
          <h3>{question.question}</h3>
          <p>Your answer: {(userAnswers[question.id] || []).map((index) => question.options[index]).join(', ')}</p>
          <p>Correct answer: {question.correct_answers.map((index) => question.options[index]).join(', ')}</p>
          <p>Explanation: {question.explanation}</p>
        </div>
      ))}
      <button onClick={onRestart}>Restart Exam</button>
    </div>
  );
}

export default Results;