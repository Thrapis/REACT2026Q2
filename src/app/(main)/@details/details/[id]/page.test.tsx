import { screen, waitFor, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DetailsPage from './page';
import * as api from '@/api/RickAndMortyAPI';
import { QueryClient } from '@tanstack/react-query';
import { FETCH_CHARACTER_ERROR_TEXT, MOCK_CHARACTER } from '@/test-utils/Api';
import { renderWithBasicProviders } from '@/test-utils/Render';

vi.mock('@/api/RickAndMortyAPI', () => ({
  getCharacter: vi.fn(),
}));

const mockPush = vi.fn();
const mockSearchQuery = 'search=rick&page=2';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    toString: () => mockSearchQuery,
  }),
}));

describe('DetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const RenderWithBasicProvidersAndParameters = (
    stringId: string,
    queryClientInstance?: QueryClient
  ) => {
    const mockParamsPromise = Promise.resolve({ id: stringId });

    return renderWithBasicProviders(
      <DetailsPage params={mockParamsPromise} />,
      queryClientInstance
    );
  };

  it('should show loading indicator initially and fetch character data', async () => {
    vi.mocked(api.getCharacter).mockResolvedValue(MOCK_CHARACTER);

    await act(async () => {
      RenderWithBasicProvidersAndParameters('1');
    });

    const loader = screen.getByRole('img');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('details-loading-indicator');
  });

  it('should render character details after API resolves successfully', async () => {
    vi.mocked(api.getCharacter).mockResolvedValue(MOCK_CHARACTER);

    await act(async () => {
      RenderWithBasicProvidersAndParameters('1');
    });

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    expect(screen.getByText('Species: Human')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Status: Alive')).toBeInTheDocument();

    const image = screen.getByRole('img', {
      name: /image of rick sanchez/i,
    }) as HTMLImageElement;
    expect(image.src).toContain(MOCK_CHARACTER.image);
  });

  it('should render an ErrorMessage when the API call fails', async () => {
    vi.mocked(api.getCharacter).mockRejectedValue(
      new Error(FETCH_CHARACTER_ERROR_TEXT)
    );

    await act(async () => {
      RenderWithBasicProvidersAndParameters('1');
    });

    await waitFor(() => {
      expect(screen.getByText(FETCH_CHARACTER_ERROR_TEXT)).toBeInTheDocument();
    });
  });

  it('should navigate to the Home page with search parameters preserved when close button is clicked', async () => {
    vi.mocked(api.getCharacter).mockResolvedValue(MOCK_CHARACTER);

    await act(async () => {
      RenderWithBasicProvidersAndParameters('1');
    });

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: 'X' });
    await fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith('/?search=rick&page=2');
  });

  it('should trigger manual cache invalidation when refresh buttons are clicked', async () => {
    vi.mocked(api.getCharacter).mockResolvedValue(MOCK_CHARACTER);

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    await act(async () => {
      RenderWithBasicProvidersAndParameters('1', queryClient);
    });

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
    vi.mocked(api.getCharacter).mockRejectedValue(
      new Error(FETCH_CHARACTER_ERROR_TEXT)
    );

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    await act(async () => {
      RenderWithBasicProvidersAndParameters('abc', queryClient);
    });

    const refreshButton = await screen.findByRole('button', {
      name: 'Refresh',
    });
    await fireEvent.click(refreshButton);

    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});
