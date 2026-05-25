import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AppPage from './AppPage';
import * as api from '../../api/RickAndMortyAPI';
import type { CharacterSearchResult } from '../../types/CharacterSearchResult';
import { useCharacterStore } from '../../stores/Character.store';

vi.mock('../../api/RickAndMortyAPI', () => ({
  searchCharacters: vi.fn(),
}));

describe('App Component', () => {
  const mockData: CharacterSearchResult = {
    info: { count: 1, pages: 1, next: '', prev: '' },
    results: [
      {
        id: 1,
        name: 'Rick Sanchez',
        image: '',
        species: 'Human',
        gender: 'Male',
        status: 'Alive',
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    useCharacterStore.setState({
      lastSearch: '',
      currentPage: 1,
      result: undefined,
      isLoading: true,
      error: undefined,
      firstLoadCompleted: false,
    });

    vi.mocked(api.searchCharacters).mockResolvedValue(mockData);
  });

  const renderApp = () => {
    return render(
      <MemoryRouter>
        <AppPage />
      </MemoryRouter>
    );
  };

  it('should load data from localStorage on start', async () => {
    localStorage.setItem('last_search', 'Morty');

    renderApp();

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('Morty');

    await waitFor(() => {
      expect(api.searchCharacters).toHaveBeenCalledWith('Morty', 1);
    });
  });

  it('should write search query in localStorage with trimming', async () => {
    renderApp();

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: ' Morty       ' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(api.searchCharacters).toHaveBeenCalled();
    });

    const storedValue = localStorage.getItem('last_search');
    expect(storedValue === 'Morty').toBe(true);
  });

  it('should show loading indicator', async () => {
    vi.mocked(api.searchCharacters).mockReturnValue(new Promise(() => {}));

    renderApp();

    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);

    const loader = screen.getByRole('img');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('loading-indicator');
  });

  it('should show error message if API returned Error', async () => {
    const errorText = 'API Error';
    vi.mocked(api.searchCharacters).mockRejectedValue(new Error(errorText));

    renderApp();

    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(errorText)).toBeInTheDocument();
    });
  });

  it('should update list of results on succesed API call', async () => {
    renderApp();

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('should stop search if repeated query', async () => {
    renderApp();

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
