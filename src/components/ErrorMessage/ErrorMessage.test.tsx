import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  const mockProps = {
    message: 'Failed to fetch data',
    onRetry: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show error message', () => {
    render(<ErrorMessage {...mockProps} />);

    expect(screen.getByRole('heading', { name: 'Error' })).toBeInTheDocument();
    expect(screen.getByText(mockProps.message)).toBeInTheDocument();
  });

  it('should call onRetry on Retry Search click', () => {
    render(<ErrorMessage {...mockProps} />);

    const button = screen.getByRole('button', { name: 'Retry Search' });
    fireEvent.click(button);

    expect(mockProps.onRetry).toHaveBeenCalledTimes(1);
  });
});
