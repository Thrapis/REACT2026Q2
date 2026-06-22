import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HomePage from './page';
import * as api from '@/api/RickAndMortyAPI';
import { MOCK_CHARACTER_SEARCH_DATA } from '@/test-utils/Api';
import { LAST_SEARCH_STORAGE_KEY } from '@/constants/LocalStorage';
import { renderWithBasicProviders } from '@/test-utils/Render';

vi.mock('@/api/RickAndMortyAPI', () => ({
  searchCharacters: vi.fn(),
}));

let mockParams = new URLSearchParams();
const mockPush = vi.fn();
const mockReplace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: (url: string) => {
      mockPush(url);
      const queryString = url.split('?')[1];
      mockParams = new URLSearchParams(queryString || '');
    },
    replace: (url: string) => {
      mockReplace(url);
      const queryString = url.split('?')[1];
      mockParams = new URLSearchParams(queryString || '');
    },
  }),
  useSearchParams: () => mockParams,
  usePathname: () => '/',
}));

describe('App Component', () => {
  const renderPage = () => renderWithBasicProviders(<HomePage />);

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockParams = new URLSearchParams();

    vi.mocked(api.searchCharacters).mockResolvedValue(
      MOCK_CHARACTER_SEARCH_DATA
    );
  });

  it('should load data from localStorage on start', async () => {
    const searchTerm = 'Morty';
    localStorage.setItem(LAST_SEARCH_STORAGE_KEY, searchTerm);

    renderPage();

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe(searchTerm);

    await waitFor(() => {
      expect(api.searchCharacters).toHaveBeenCalledWith(searchTerm, 1);
    });
  });

  it('should write search query in localStorage with trimming', async () => {
    renderPage();

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: ' Morty       ' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(api.searchCharacters).toHaveBeenCalled();
    });

    const storedValue = localStorage.getItem(LAST_SEARCH_STORAGE_KEY);
    expect(storedValue === 'Morty').toBe(true);
  });

  it('should show loading indicator', async () => {
    vi.mocked(api.searchCharacters).mockReturnValue(new Promise(() => {}));

    renderPage();

    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);

    const loader = screen.getByRole('img');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('loading-indicator');
  });

  it('should show error message if API returned Error', async () => {
    const errorText = 'API Error';
    vi.mocked(api.searchCharacters).mockRejectedValue(new Error(errorText));

    renderPage();

    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(errorText)).toBeInTheDocument();
    });
  });

  it('should update list of results on succesed API call', async () => {
    renderPage();

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('should stop search if repeated query', async () => {
    renderPage();

    await waitFor(() => {
      expect(api.searchCharacters).toHaveBeenCalled();
    });

    vi.clearAllMocks();

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(api.searchCharacters).toHaveBeenCalledWith('Rick', 1);
    });

    fireEvent.click(searchButton);

    expect(api.searchCharacters).toHaveBeenCalledTimes(1);
  });
});
