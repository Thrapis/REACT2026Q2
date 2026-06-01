import { searchCharacters } from '@/api/RickAndMortyAPI';
import { useQuery } from '@tanstack/react-query';
import { CharacterKeys } from './types';

export function useCharacterSearch(name: string, page: number = 1) {
  return useQuery({
    queryKey: CharacterKeys.search(name, page),
    queryFn: () => searchCharacters(name, page),
  });
}
