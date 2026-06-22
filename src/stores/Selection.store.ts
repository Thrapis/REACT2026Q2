'use client';

import { create } from 'zustand';
import type { CharacterSearchResultEntry } from '@/types/CharacterSearchResult';

interface SelectionState {
  characters: CharacterSearchResultEntry[];

  isSelected: (characterId: number) => boolean;
  removeSelection: (characterId: number) => void;
  toggleSelection: (character: CharacterSearchResultEntry) => void;
  clearSelection: () => void;
}

export const useSelectionStore = create<SelectionState>((set, get) => ({
  characters: [],

  isSelected: (characterId: number) => {
    return get().characters.some((item) => item.id === characterId);
  },

  removeSelection: (characterId: number) => {
    set((state) => ({
      characters: state.characters.filter((c) => c.id !== characterId),
    }));
  },

  toggleSelection: (character: CharacterSearchResultEntry) => {
    if (get().isSelected(character.id)) {
      get().removeSelection(character.id);
      return;
    }

    set((state) => ({ characters: [...state.characters, character] }));
  },

  clearSelection: () => {
    set({ characters: [] });
  },
}));
