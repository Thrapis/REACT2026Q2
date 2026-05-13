import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import React from 'react';

interface DangerousComponentProps {
  throwError?: boolean;
}

class DangerousComponent extends React.Component<DangerousComponentProps> {
  render() {
    if (this.props.throwError) {
      throw new Error('I guess something bad happened');
    }
    return <div>Be Happy</div>;
  }
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should show reserve UI on thrown error', () => {
    render(
      <ErrorBoundary>
        <DangerousComponent throwError={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
  });

  it('should rid off error state on Reload button click', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <DangerousComponent throwError={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <DangerousComponent throwError={false} />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByRole('button', { name: 'Reload' });
    fireEvent.click(reloadButton);

    expect(screen.getByText('Be Happy')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong.')).not.toBeInTheDocument();
  });

  it('should just show children component if no error', () => {
    render(
      <ErrorBoundary>
        <span>Safe Component</span>
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe Component')).toBeInTheDocument();
  });
});
