'use client';

import { getCharacter } from '@/api/RickAndMortyAPI';
import { useQuery } from '@tanstack/react-query';
import { CharacterKeys } from './types';

export function useCharacter(id: number | undefined) {
  return useQuery({
    queryKey: CharacterKeys.detail(id!),
    queryFn: () => getCharacter(id!),
    enabled: Boolean(id),
  });
}
