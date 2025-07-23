import React from 'react';

function Navigation({ currentIndex, totalQuestions, onPrevious, onNext, onFlag, isFlagged }) {
  return (
    <div className="navigation">
      <button
        className="nav-btn nav-prev"
        onClick={onPrevious}
        disabled={currentIndex === 0}
      >
        Previous
      </button>
      <button
        className="nav-btn nav-flag"
        onClick={onFlag}
      >
        {isFlagged ? 'Unflag' : 'Flag'} Question
      </button>
      <button
        className="nav-btn nav-next"
        onClick={onNext}
      >
        {currentIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}

export default Navigation;