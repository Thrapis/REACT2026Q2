import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Modal from './Modal';

describe('Modal Component', () => {
  const mockOnClose = vi.fn();
  const modalChildren = 'Modal Children';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should call onClose when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<Modal onClose={mockOnClose}>{modalChildren}</Modal>);

    await user.keyboard('{Escape}');

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when other keys are pressed', async () => {
    const user = userEvent.setup();
    render(<Modal onClose={mockOnClose}>{modalChildren}</Modal>);

    await user.keyboard('{Enter}');

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should render children and close button correctly', () => {
    render(<Modal onClose={mockOnClose}>{modalChildren}</Modal>);

    expect(screen.getByText(modalChildren)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'X' })).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Modal onClose={mockOnClose}>{modalChildren}</Modal>);

    const closeButton = screen.getByRole('button', { name: 'X' });
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when clicking on the backdrop', async () => {
    const user = userEvent.setup();
    render(<Modal onClose={mockOnClose}>{modalChildren}</Modal>);

    const backdrop = screen.getByText(modalChildren).closest('.modal-drop');
    expect(backdrop).not.toBeNull();

    if (backdrop) {
      await user.click(backdrop);
    }

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when clicking inside the modal content', async () => {
    const user = userEvent.setup();
    render(<Modal onClose={mockOnClose}>{modalChildren}</Modal>);

    const content = screen.getByText(modalChildren);
    await user.click(content);

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
