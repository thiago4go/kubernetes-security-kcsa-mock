import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function SideMenu({ questions, currentQuestionIndex, setCurrentQuestionIndex, flaggedQuestions, userAnswers, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="side-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          
          {/* Side Menu */}
          <motion.div
            className="side-menu"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            <div className="side-menu-header">
              <h3 className="side-menu-title">Questions</h3>
              <button className="close-menu-btn" onClick={onClose}>
                <span className="close-icon">×</span>
              </button>
            </div>
            
            <div className="side-menu-content">
              <ul className="questions-list">
                {questions.map((question, index) => {
                  const isActive = index === currentQuestionIndex;
                  const isFlagged = flaggedQuestions.includes(question.id);
                  const isAnswered = userAnswers[question.id];
                  
                  return (
                    <motion.li
                      key={question.id}
                      className={`question-item ${isActive ? 'active' : ''} ${isFlagged ? 'flagged' : ''} ${isAnswered ? 'answered' : ''}`}
                      onClick={() => {
                        setCurrentQuestionIndex(index);
                        onClose();
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="question-content">
                        <span className="question-number">Question {index + 1}</span>
                        <div className="question-indicators">
                          {isFlagged && (
                            <span className="flag-icon" title="Flagged">🚩</span>
                          )}
                          {isAnswered && (
                            <span className="answered-icon" title="Answered">✅</span>
                          )}
                          {isActive && (
                            <span className="active-icon" title="Current Question">👉</span>
                          )}
                        </div>
                      </div>
                      <div className="question-status-bar" />
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SideMenu;