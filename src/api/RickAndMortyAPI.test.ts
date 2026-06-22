import { it, expect, vi, describe, beforeEach } from 'vitest';
import { searchCharacters, getCharacter } from './RickAndMortyAPI';
import { MOCK_CHARACTER, MOCK_CHARACTER_SEARCH_DATA } from '@/test-utils/Api';

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

  it('searchCharacters should encode uri components', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => MOCK_CHARACTER_SEARCH_DATA,
    } as Response);

    await searchCharacters('Rick Sanchez', 1);

    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character?name=Rick Sanchez&page=1'
    );
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

  it('getCharacter should return single character data', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => MOCK_CHARACTER,
    } as Response);

    const result = await getCharacter(1);

    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/1'
    );
    expect(result).toEqual(MOCK_CHARACTER);
  });

  it('getCharacter should throw default error if response.ok === false', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response);

    await expect(getCharacter(9999)).rejects.toThrow(
      'Failed to load character data'
    );
  });
});
