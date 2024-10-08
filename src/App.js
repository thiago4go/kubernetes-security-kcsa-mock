import React, { useState, useEffect } from 'react';
import Exam from './components/Exam';
import Results from './components/Results';
import ReviewFlagged from './components/ReviewFlagged';
import HomePage from './components/HomePage';
import { questions } from './questions';
import useLocalStorage from './hooks/useLocalStorage';
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [reviewingFlagged, setReviewingFlagged] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [examQuestions, setExamQuestions] = useLocalStorage('examQuestions', []);
  const [userAnswers, setUserAnswers] = useLocalStorage('userAnswers', {});
  const [flaggedQuestions, setFlaggedQuestions] = useLocalStorage('flaggedQuestions', []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useLocalStorage('currentQuestionIndex', 0);
  const [timeLeft, setTimeLeft] = useLocalStorage('timeLeft', 0);

  useEffect(() => {
    const storedExamStarted = localStorage.getItem('examStarted');
    const storedExamFinished = localStorage.getItem('examFinished');
    const storedReviewingFlagged = localStorage.getItem('reviewingFlagged');

    if (storedExamStarted === 'true') {
      setExamStarted(true);
    }

    if (storedExamFinished === 'true') {
      setExamFinished(true);
    }

    if (storedReviewingFlagged === 'true') {
      setReviewingFlagged(true);
    }
  }, []);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startExam = () => {
    const shuffledQuestions = shuffleArray(questions);
    const selectedQuestions = shuffledQuestions.slice(0, numQuestions);
    setExamQuestions(selectedQuestions);
    setExamStarted(true);
    setExamFinished(false);
    setReviewingFlagged(false);
    setUserAnswers({});
    setFlaggedQuestions([]);
    setCurrentQuestionIndex(0);
    setTimeLeft(numQuestions * 60); // 1 minute per question
    localStorage.setItem('examStarted', 'true');
    localStorage.setItem('examFinished', 'false');
    localStorage.setItem('reviewingFlagged', 'false');
  };

  const finishExam = () => {
    setExamFinished(true);
    setExamStarted(false);
    setReviewingFlagged(false);
    localStorage.setItem('examStarted', 'false');
    localStorage.setItem('examFinished', 'true');
    localStorage.setItem('reviewingFlagged', 'false');
  };

  const startReview = () => {
    setReviewingFlagged(true);
    localStorage.setItem('reviewingFlagged', 'true');
  };

  const endReview = () => {
    setReviewingFlagged(false);
    localStorage.setItem('reviewingFlagged', 'false');
  };

  const restartExam = () => {
    setExamStarted(false);
    setExamFinished(false);
    setReviewingFlagged(false);
    setUserAnswers({});
    setFlaggedQuestions([]);
    setCurrentQuestionIndex(0);
    setTimeLeft(0);
    setExamQuestions([]);
    localStorage.removeItem('examStarted');
    localStorage.removeItem('examFinished');
    localStorage.removeItem('reviewingFlagged');
    localStorage.removeItem('examQuestions');
    localStorage.removeItem('userAnswers');
    localStorage.removeItem('flaggedQuestions');
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('timeLeft');
  };

  return (
    <div className="App">
     
      {!examStarted && !examFinished && !reviewingFlagged ? (
        <HomePage
          numQuestions={numQuestions}
          setNumQuestions={setNumQuestions}
          startExam={startExam}
          maxQuestions={questions.length}
        />
      ) : (
        <>
          <h1>Kubernetes Security KCSA Mock Exam</h1>
          {examStarted && !reviewingFlagged && (
            <Exam
              questions={examQuestions}
              userAnswers={userAnswers}
              setUserAnswers={setUserAnswers}
              flaggedQuestions={flaggedQuestions}
              setFlaggedQuestions={setFlaggedQuestions}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              onFinish={startReview}
            />
          )}
          {reviewingFlagged && (
            <ReviewFlagged
              questions={examQuestions}
              userAnswers={userAnswers}
              setUserAnswers={setUserAnswers}
              flaggedQuestions={flaggedQuestions}
              setFlaggedQuestions={setFlaggedQuestions}
              onFinish={finishExam}
            />
          )}
          {examFinished && (
            <Results
              questions={examQuestions}
              userAnswers={userAnswers}
              onRestart={restartExam}
            />
          )}
        </>
      )}
      <Analytics />
    </div>
  );
}

export default App;