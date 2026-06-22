import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SelectionFlyout from './SelectionFlyout';
import { useSelectionStore } from '@/stores/Selection.store';
import { MOCK_CHARACTERS } from '@/test-utils/Api';
import { renderWithI18N } from '@/test-utils/Render';

vi.mock('@/stores/Selection.store', () => ({
  useSelectionStore: vi.fn(),
}));

describe('SelectionFlyout', () => {
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

    const { container } = renderWithI18N(<SelectionFlyout />);
    const component = container.firstChild as HTMLElement;

    expect(component).toHaveClass('selection-flyout-container');
    expect(component).toHaveClass('hidden');
  });

  it('should render items and counter when characters are selected', () => {
    vi.mocked(useSelectionStore).mockReturnValue({
      characters: MOCK_CHARACTERS,
      removeSelection: mockRemoveSelection,
      clearSelection: mockClearSelection,
    });

    const { container } = renderWithI18N(<SelectionFlyout />);
    const component = container.firstChild as HTMLElement;

    expect(component).not.toHaveClass('hidden');
    expect(screen.getByText(MOCK_CHARACTERS[0].name)).toBeInTheDocument();
    expect(screen.getByText(MOCK_CHARACTERS[1].name)).toBeInTheDocument();
    expect(screen.getByText('Download (2)')).toBeInTheDocument();
  });

  it('should call removeSelection with correct id when delete button clicked', () => {
    vi.mocked(useSelectionStore).mockReturnValue({
      characters: MOCK_CHARACTERS,
      removeSelection: mockRemoveSelection,
      clearSelection: mockClearSelection,
    });

    renderWithI18N(<SelectionFlyout />);

    const deleteButtons = screen.getAllByRole('button', { name: 'X' });
    fireEvent.click(deleteButtons[0]);

    expect(mockRemoveSelection).toHaveBeenCalledWith(1);
    expect(mockRemoveSelection).toHaveBeenCalledTimes(1);
  });

  it('should call clearSelection when unselect button clicked', () => {
    vi.mocked(useSelectionStore).mockReturnValue({
      characters: MOCK_CHARACTERS,
      removeSelection: mockRemoveSelection,
      clearSelection: mockClearSelection,
    });

    renderWithI18N(<SelectionFlyout />);

    const clearButton = screen.getByRole('button', { name: 'Unselect All' });
    fireEvent.click(clearButton);

    expect(mockClearSelection).toHaveBeenCalledTimes(1);
  });
});
