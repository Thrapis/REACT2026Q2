import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCharacter } from './UseCharacter';
import * as api from '@/api/RickAndMortyAPI';
import { describe, it, expect, vi } from 'vitest';
import { MOCK_CHARACTER } from '@/test-utils/Api';

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

describe('useCharacter', () => {
  it('should fetch character successfully', async () => {
    const getCharacterSpy = vi
      .spyOn(api, 'getCharacter')
      .mockResolvedValue(MOCK_CHARACTER);

    const { result } = renderHook(() => useCharacter(1), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(MOCK_CHARACTER);
    expect(getCharacterSpy).toHaveBeenCalledWith(1);
  });

  it('should handle error status', async () => {
    vi.spyOn(api, 'getCharacter').mockRejectedValue(
      new Error('Some unexpected error yada-yada')
    );

    const { result } = renderHook(() => useCharacter(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
