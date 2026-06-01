import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCharacterSearch } from './UseCharacterSearch';
import * as api from '@/api/RickAndMortyAPI';
import { describe, it, expect, vi, afterEach } from 'vitest';
import type { CharacterSearchResult } from '@/types/CharacterSearchResult';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return TestWrapper;
};

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

describe('useCharacterSearch', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully load character data by term and page', async () => {
    const searchSpy = vi
      .spyOn(api, 'searchCharacters')
      .mockResolvedValue(mockData);

    const { result } = renderHook(() => useCharacterSearch('Rick', 1), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(searchSpy).toHaveBeenCalledTimes(1);
    expect(searchSpy).toHaveBeenCalledWith('Rick', 1);
  });

  it('should correctly handle server or network errors', async () => {
    const mockError = new Error('API Error');
    vi.spyOn(api, 'searchCharacters').mockRejectedValue(mockError);

    const { result } = renderHook(() => useCharacterSearch('Unknown', 1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('API Error');
    expect(result.current.data).toBeUndefined();
  });
});
