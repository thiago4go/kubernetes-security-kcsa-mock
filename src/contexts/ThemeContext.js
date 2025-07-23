import React, { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Create the ThemeContext
const ThemeContext = createContext({
  theme: 'system',
  setTheme: () => {},
  resolvedTheme: 'light'
});

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('theme', 'system');
  const [resolvedTheme, setResolvedTheme] = useState('light');

  useEffect(() => {
    // Handle theme resolution and DOM updates
    const root = document.documentElement;
    
    // Function to apply theme
    const applyTheme = (themeName) => {
      root.setAttribute('data-theme', themeName);
      setResolvedTheme(themeName);
    };

    if (theme === 'system') {
      // Check system preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      applyTheme(systemTheme);

      // Listen for system theme changes
      const handleChange = (e) => {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        applyTheme(newSystemTheme);
      };

      mediaQuery.addEventListener('change', handleChange);

      // Cleanup listener
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    } else {
      // Apply explicit theme
      applyTheme(theme);
    }
  }, [theme]);

  // Add smooth transition for theme switching
  useEffect(() => {
    const root = document.documentElement;
    
    // Add transition class after initial mount to prevent flash
    const timeout = setTimeout(() => {
      root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Toggle Component
export const ThemeToggle = () => {
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
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {resolvedTheme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

// Export default
export default ThemeContext;