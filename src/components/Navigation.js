import React from 'react';

function Navigation({ currentIndex, totalQuestions, onPrevious, onNext, onFlag, isFlagged }) {
  return (
    <div className="navigation">
      <button onClick={onPrevious} disabled={currentIndex === 0}>
        Previous
      </button>
      <button onClick={onFlag}>
        {isFlagged ? 'Unflag' : 'Flag'} Question
      </button>
      <button onClick={onNext}>
        {currentIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}

export default Navigation;