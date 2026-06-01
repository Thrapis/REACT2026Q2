import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SelectionFlyout from './SelectionFlyout';
import { useSelectionStore } from '@/stores/Selection.store';

vi.mock('@/stores/Selection.store', () => ({
  useSelectionStore: vi.fn(),
}));

describe('SelectionFlyout', () => {
  const mockCharacters = [
    { id: 1, name: 'Rick Sanchez' },
    { id: 2, name: 'Morty Smith' },
  ];

  const mockRemoveSelection = vi.fn();
  const mockClearSelection = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should have hidden class when characters list is empty', () => {
    vi.mocked(useSelectionStore).mockReturnValue({
      characters: [],
      removeSelection: mockRemoveSelection,
      clearSelection: mockClearSelection,
    });

    const { container } = render(<SelectionFlyout />);
    const component = container.firstChild as HTMLElement;

    expect(component).toHaveClass('selection-flyout-container');
    expect(component).toHaveClass('hidden');
  });

  it('should render items and counter when characters are selected', () => {
    vi.mocked(useSelectionStore).mockReturnValue({
      characters: mockCharacters,
      removeSelection: mockRemoveSelection,
      clearSelection: mockClearSelection,
    });

    const { container } = render(<SelectionFlyout />);
    const component = container.firstChild as HTMLElement;

    expect(component).not.toHaveClass('hidden');
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('Download (2)')).toBeInTheDocument();
  });

  it('should call removeSelection with correct id when delete button clicked', () => {
    vi.mocked(useSelectionStore).mockReturnValue({
      characters: mockCharacters,
      removeSelection: mockRemoveSelection,
      clearSelection: mockClearSelection,
    });

    render(<SelectionFlyout />);

    const deleteButtons = screen.getAllByRole('button', { name: 'X' });
    fireEvent.click(deleteButtons[0]);

    expect(mockRemoveSelection).toHaveBeenCalledWith(1);
    expect(mockRemoveSelection).toHaveBeenCalledTimes(1);
  });

  it('should call clearSelection when unselect button clicked', () => {
    vi.mocked(useSelectionStore).mockReturnValue({
      characters: mockCharacters,
      removeSelection: mockRemoveSelection,
      clearSelection: mockClearSelection,
    });

    render(<SelectionFlyout />);

    const clearButton = screen.getByRole('button', { name: 'Unselect All' });
    fireEvent.click(clearButton);

    expect(mockClearSelection).toHaveBeenCalledTimes(1);
  });
});
