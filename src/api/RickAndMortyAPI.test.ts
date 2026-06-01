import { it, expect, vi, describe, beforeEach } from 'vitest';
import { searchCharacters } from './RickAndMortyAPI';

describe('API functions', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('searchCharacters should return data', async () => {
    const mockData = { info: {}, results: [{ id: 1, name: 'Rick' }] };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await searchCharacters('Rick', 1);

    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character?name=Rick&page=1'
    );
    expect(result).toEqual(mockData);
  });

  it('searchCharacters should return error if response.ok === false', async () => {
    const errorText = 'There is nothing here';
    const errorResponse = { error: errorText };

    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: async () => errorResponse,
    } as Response);

    await expect(searchCharacters('SomeUnrealShite')).rejects.toThrow(
      errorText
    );
  });
});
