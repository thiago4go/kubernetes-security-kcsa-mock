import React from 'react';
import { motion } from 'framer-motion';

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
      <p>Your score: {calculateScore().toFixed(2)}%</p>
      {questions.map((question) => (
        <motion.div
          key={question.id}
          className="question-review"
          style={{
            backgroundColor: isCorrect(question) ? 'lightgreen' : 'lightcoral',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>{question.question}</h3>
          <p>Your answer: {(userAnswers[question.id] || []).map((index) => question.options[index]).join(', ')}</p>
          <p>Correct answer: {question.correct_answers.map((index) => question.options[index]).join(', ')}</p>
          <p>Explanation: {question.explanation}</p>
        </motion.div>
      ))}
      <button onClick={onRestart}>Restart Exam</button>
    </div>
  );
}

export default Results;