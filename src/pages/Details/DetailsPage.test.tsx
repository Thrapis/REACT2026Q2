import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailsPage from './DetailsPage';
import type { CharacterSearchResultEntry } from '@/types/CharacterSearchResult';
import * as api from '@/api/RickAndMortyAPI';
import { ThemeProvider } from '@/context/Theme/ThemeProvider';

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
    vi.mocked(api.getCharacter).mockResolvedValue(mockCharacter);
  });

  const renderWithRouter = (initialEntries = ['/details/1']) => {
    return render(
      <ThemeProvider>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/" element={<div>App Page Mock</div>} />
            <Route path="/details/:id" element={<DetailsPage />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );
  };

  it('shows loading indicator initially and fetches character data', async () => {
    renderWithRouter();

    const loader = screen.getByRole('img');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('details-loading-indicator');
  });

  it('renders character details after API resolves successfully', async () => {
    renderWithRouter(['/details/1']);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    expect(screen.getByText('Species: Human')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Status: Alive')).toBeInTheDocument();

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image.src).toContain(mockCharacter.image);
  });
});
