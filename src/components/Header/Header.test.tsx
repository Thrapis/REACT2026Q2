import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { useTheme } from '../../hooks/UseTheme';

vi.mock('../../hooks/UseTheme', () => ({
  useTheme: vi.fn(),
}));

describe('Header Component', () => {
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderHeader = () => {
    return render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  };

  it('should render navigation links correctly', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    renderHeader();

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('should apply light theme class and format button text correctly', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    const { container } = renderHeader();
    const headerElement = container.firstChild;

    expect(headerElement).toHaveClass('header');
    expect(headerElement).toHaveClass('light');
    expect(
      screen.getByRole('button', { name: 'Light Theme' })
    ).toBeInTheDocument();
  });

  it('should apply dark theme class and format button text correctly', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    const { container } = renderHeader();
    const headerElement = container.firstChild;

    expect(headerElement).toHaveClass('header');
    expect(headerElement).toHaveClass('dark');
    expect(
      screen.getByRole('button', { name: 'Dark Theme' })
    ).toBeInTheDocument();
  });

  it('should call toggleTheme when button clicked', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    renderHeader();

    const themeButton = screen.getByRole('button');
    fireEvent.click(themeButton);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
