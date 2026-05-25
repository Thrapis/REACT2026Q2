import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';
import { ThemeProvider } from './ThemeProvider';

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
  it('should provide default light theme to children', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-val')).toHaveTextContent('light');
  });

  it('should toggle theme from light to dark and back when toggleTheme is executed', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    const themeValue = screen.getByTestId('theme-val');

    fireEvent.click(button);
    expect(themeValue).toHaveTextContent('dark');

    fireEvent.click(button);
    expect(themeValue).toHaveTextContent('light');
  });
});
