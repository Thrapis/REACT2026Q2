import type { CharacterSearchResult } from '../types/CharacterSearchResult';

async function searchCharacters(
  name: string,
  page: number = 1
): Promise<CharacterSearchResult> {
  const url = `https://rickandmortyapi.com/api/character?name=${name}&page=${page}`;

  const response = await fetch(url);

  const data = (await response.json()) as CharacterSearchResult;

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}

async function getCharactersPage(url: string): Promise<CharacterSearchResult> {
  const response = await fetch(url);

  const data = (await response.json()) as CharacterSearchResult;

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}

export { searchCharacters, getCharactersPage };
