import React from 'react';

function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${percentage}%` }}></div>
      <span className="progress-text">{`${current} / ${total}`}</span>
    </div>
  );
}

export default ProgressBar;