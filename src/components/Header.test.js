import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import Header from './Header';
import { ThemeProvider } from '../contexts/ThemeContext';

describe('Header accessibility', () => {
  afterEach(cleanup);

  test('should have no accessibility violations in light theme', async () => {
    localStorage.setItem('theme', 'light');
    const { container } = render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have no accessibility violations in dark theme', async () => {
    localStorage.setItem('theme', 'dark');
    const { container } = render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});