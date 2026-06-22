import type {
  CharacterSearchResult,
  CharacterSearchResultEntry,
} from '@/types/CharacterSearchResult';

export const FETCH_CHARACTER_ERROR_TEXT = 'Failed to load character data';

export const MOCK_CHARACTER: CharacterSearchResultEntry = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'image-link',
};

export const MOCK_CHARACTERS: CharacterSearchResultEntry[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'image-link-1',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'image-link-2',
  },
];

export const MOCK_CHARACTER_SEARCH_DATA: CharacterSearchResult = {
  info: { count: 1, pages: 1, next: '', prev: '' },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'image-link',
    },
  ],
};
