import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import ErrorThrowButton from './ErrorThrowButton';
import React from 'react';
import { renderWithI18N } from '@/test-utils/Render';

class TestBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? (
      <span>Caught Error</span>
    ) : (
      this.props.children
    );
  }
}

describe('ErrorThrowButton', () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should throw error on button click', () => {
    renderWithI18N(
      <TestBoundary>
        <ErrorThrowButton />
      </TestBoundary>
    );

    const button = screen.getByRole('button', { name: 'Throw Error' });

    fireEvent.click(button);

    expect(screen.getByText('Caught Error')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
