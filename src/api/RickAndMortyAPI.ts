import type {
  CharacterSearchResult,
  CharacterSearchResultEntry,
} from '@/types/CharacterSearchResult';

const BASE_URL = 'https://rickandmortyapi.com/api';

async function searchCharacters(
  name: string,
  page: number = 1
): Promise<CharacterSearchResult> {
  const url = `${BASE_URL}/character?name=${name}&page=${page}`;
  const response = await fetch(url);
  const data = (await response.json()) as CharacterSearchResult;
  if (!response.ok) {
    throw new Error(data.error || 'Failed to search characters');
  }
  return data;
}

async function getCharacter(id: number): Promise<CharacterSearchResultEntry> {
  const url = `${BASE_URL}/character/${id}`;
  const response = await fetch(url);
  const data = (await response.json()) as CharacterSearchResultEntry;
  if (!response.ok) {
    throw new Error('Failed to load character data');
  }
  return data;
}

export { searchCharacters, getCharacter };
