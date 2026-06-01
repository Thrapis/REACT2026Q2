import { getCharacter } from '@/api/RickAndMortyAPI';
import { useQuery } from '@tanstack/react-query';
import { characterKeys } from './types';

export function useCharacter(id: number | undefined) {
  return useQuery({
    queryKey: characterKeys.detail(id!),
    queryFn: () => getCharacter(id!),
    enabled: Boolean(id),
  });
}
