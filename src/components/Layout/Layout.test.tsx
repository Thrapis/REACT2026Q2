import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Layout from './Layout';
import { useTheme } from '../../hooks/UseTheme';

vi.mock('../../hooks/UseTheme', () => ({
  useTheme: vi.fn(),
}));

describe('Layout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should apply light theme class and render children content', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: () => {},
    });

    const { container } = render(
      <Layout>
        <span data-testid="child-element">Test Content</span>
      </Layout>
    );

    const layoutElement = container.firstChild;
    expect(layoutElement).toHaveClass('layout');
    expect(layoutElement).toHaveClass('light');
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
  });

  it('should apply dark theme class and render children content', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      toggleTheme: () => {},
    });

    const { container } = render(
      <Layout>
        <span data-testid="child-element">Test Content</span>
      </Layout>
    );

    const layoutElement = container.firstChild;
    expect(layoutElement).toHaveClass('layout');
    expect(layoutElement).toHaveClass('dark');
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
  });
});
