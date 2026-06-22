import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { THEME_STORAGE_KEY } from '@/constants/LocalStorage';

function TestComponent() {
  const context = useContext(ThemeContext);
  if (!context) return null;
  return (
    <div>
      <span data-testid="theme-val">{context.theme}</span>
      <button onClick={context.toggleTheme}>Toggle</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('should provide default light theme to children', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeValue = await screen.findByTestId('theme-val');
    expect(themeValue).toHaveTextContent('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should initialize with theme from localStorage if it exists', async () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeValue = await screen.findByTestId('theme-val');
    expect(themeValue).toHaveTextContent('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should toggle theme from light to dark and back when toggleTheme is executed', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = await screen.findByRole('button');
    const themeValue = screen.getByTestId('theme-val');

    fireEvent.click(button);
    expect(themeValue).toHaveTextContent('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    fireEvent.click(button);
    expect(themeValue).toHaveTextContent('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
