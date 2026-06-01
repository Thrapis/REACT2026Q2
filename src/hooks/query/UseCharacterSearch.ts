import { searchCharacters } from '@/api/RickAndMortyAPI';
import { useQuery } from '@tanstack/react-query';
import { characterKeys } from './types';

export function useCharacterSearch(name: string, page: number = 1) {
  return useQuery({
    queryKey: characterKeys.search(name, page),
    queryFn: () => searchCharacters(name, page),
  });
}
