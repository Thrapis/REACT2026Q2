import type { CharacterSearchResult } from '../types/CharacterSearchResult';

async function searchCharacters(name: string, page: number = 1) {
  const url = `https://rickandmortyapi.com/api/character?name=${name}&page=${page}`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    return data as CharacterSearchResult;
  } catch (error) {
    console.error('Request Error:', error);
  }
}

export { searchCharacters };
