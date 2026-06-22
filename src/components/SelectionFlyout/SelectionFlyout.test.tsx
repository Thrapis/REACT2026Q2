import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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

  const mockCreateObjectURL = vi.fn(
    () => 'blob:http://localhost/downloooooooad'
  );
  const mockRevokeObjectURL = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    global.URL.createObjectURL = mockCreateObjectURL;
    global.URL.revokeObjectURL = mockRevokeObjectURL;

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      blob: vi
        .fn()
        .mockResolvedValue(
          new Blob(['name;status;image'], { type: 'text/csv' })
        ),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
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

  it('should change button text to downloading state and trigger server side compilation on click', async () => {
    vi.mocked(useSelectionStore).mockReturnValue({
      characters: MOCK_CHARACTERS,
      removeSelection: mockRemoveSelection,
      clearSelection: mockClearSelection,
    });
    const mockAppend = vi.spyOn(document.body, 'append');

    renderWithI18N(<SelectionFlyout />);

    const downloadButton = screen.getByRole('button', { name: 'Download (2)' });
    fireEvent.click(downloadButton);

    expect(screen.getByText(/downloading/i)).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith('/api/export-characters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ characters: MOCK_CHARACTERS }),
    });

    await waitFor(() => {
      expect(mockCreateObjectURL).toHaveBeenCalled();
      expect(mockAppend).toHaveBeenCalled();
      expect(mockRevokeObjectURL).toHaveBeenCalled();
    });

    expect(screen.getByText('Download (2)')).toBeInTheDocument();
  });

  it('should handle fetch server error safely and log error in console without crashing', async () => {
    vi.mocked(useSelectionStore).mockReturnValue({
      characters: MOCK_CHARACTERS,
      removeSelection: mockRemoveSelection,
      clearSelection: mockClearSelection,
    });

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    renderWithI18N(<SelectionFlyout />);

    const downloadButton = screen.getByRole('button', { name: 'Download (2)' });
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to export CSV from server:',
        expect.any(Error)
      );
    });

    expect(screen.getByText('Download (2)')).toBeInTheDocument();
  });

  it('should catch network breakdown errors and reset loading state', async () => {
    vi.mocked(useSelectionStore).mockReturnValue({
      characters: MOCK_CHARACTERS,
      removeSelection: mockRemoveSelection,
      clearSelection: mockClearSelection,
    });

    global.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    renderWithI18N(<SelectionFlyout />);

    const downloadButton = screen.getByRole('button', { name: 'Download (2)' });
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    expect(screen.getByText('Download (2)')).toBeInTheDocument();
  });
});
