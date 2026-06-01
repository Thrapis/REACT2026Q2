import { create } from 'zustand';
import { searchCharacters } from '@/api/RickAndMortyAPI';
import type { CharacterSearchResult } from '@/types/CharacterSearchResult';

interface CharacterState {
  lastSearch: string;
  currentPage: number;
  result: CharacterSearchResult | undefined;
  isLoading: boolean;
  error: string | undefined;
  firstLoadCompleted: boolean;

  search: (
    query: string,
    page: number,
    onSuccess: (query: string, page: number) => void
  ) => Promise<void>;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  lastSearch: '',
  currentPage: 1,
  result: undefined,
  isLoading: true,
  error: undefined,
  firstLoadCompleted: false,

  search: async (query, page, onSuccess) => {
    set({ isLoading: true });
    try {
      const result = await searchCharacters(query, page);

      set({
        firstLoadCompleted: true,
        lastSearch: query,
        currentPage: page,
        result: result,
        error: undefined,
        isLoading: false,
      });

      onSuccess(query, page);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Something went wrong';
      set({
        result: undefined,
        error: errorMessage,
        isLoading: false,
      });
    }
  },
}));
