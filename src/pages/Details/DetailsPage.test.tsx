import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailsPage from './DetailsPage';
import type { CharacterSearchResultEntry } from '@/types/CharacterSearchResult';
import * as api from '@/api/RickAndMortyAPI';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('@/api/RickAndMortyAPI', () => ({
  getCharacter: vi.fn(),
}));

describe('DetailsPage', () => {
  const mockCharacter: CharacterSearchResultEntry = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'image_link',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProviders = (
    initialEntries = ['/details/1'],
    queryClientInstance?: QueryClient
  ) => {
    const queryClient =
      queryClientInstance ||
      new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });

    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/" element={<div>App Page Mock</div>} />
            <Route path="/details/:id" element={<DetailsPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it('should show loading indicator initially and fetch character data', async () => {
    vi.mocked(api.getCharacter).mockResolvedValue(mockCharacter);
    renderWithProviders(['/details/1']);

    const loader = screen.getByRole('img');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('details-loading-indicator');
  });

  it('should render character details after API resolves successfully', async () => {
    vi.mocked(api.getCharacter).mockResolvedValue(mockCharacter);
    renderWithProviders(['/details/1']);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    expect(screen.getByText('Species: Human')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Status: Alive')).toBeInTheDocument();

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image.src).toContain(mockCharacter.image);
  });

  it('should render an ErrorMessage when the API call fails', async () => {
    vi.mocked(api.getCharacter).mockRejectedValue(
      new Error('Failed to fetch character')
    );
    renderWithProviders(['/details/1']);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch character')).toBeInTheDocument();
    });
  });

  it('should navigate to the Home page with search parameters preserved when close button is clicked', async () => {
    vi.mocked(api.getCharacter).mockResolvedValue(mockCharacter);
    renderWithProviders(['/details/1?search=rick&page=2']);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: 'X' });
    await fireEvent.click(closeButton);

    expect(screen.getByText('App Page Mock')).toBeInTheDocument();
  });

  it('should trigger manual cache invalidation when refresh buttons are clicked', async () => {
    vi.mocked(api.getCharacter).mockResolvedValue(mockCharacter);

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    renderWithProviders(['/details/1'], queryClient);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    const refreshButton = screen.getByRole('button', { name: 'Refresh' });
    await fireEvent.click(refreshButton);

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ['characters', 'detail', 1],
    });
  });

  it('should not trigger invalidation on refresh if id parameter is missing or invalid', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    renderWithProviders(['/details/abc'], queryClient);

    const refreshButton = screen.getByRole('button', { name: 'Refresh' });
    await fireEvent.click(refreshButton);

    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});
