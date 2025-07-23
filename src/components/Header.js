import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/variables.css';
import './Header.css'; // Import the Header-specific CSS

const Header = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'system') {
      // If on system, switch to opposite of current resolved theme
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    } else {
      // If on explicit theme, toggle between light and dark
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand">
          <h1 className="header-title">
            Kubernetes Security KCSA Mock Exam
          </h1>
        </div>
        
        <nav className="header-nav header-nav-updated">
          <button
            className="theme-toggle-btn theme-toggle-btn-updated"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className="theme-icon">
              {resolvedTheme === 'dark' ? '☀️' : '🌙'}
            </span>
            <span className="theme-label">
              {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;