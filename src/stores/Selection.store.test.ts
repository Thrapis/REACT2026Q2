import { describe, it, expect, beforeEach } from 'vitest';
import { useSelectionStore } from './Selection.store';
import type { CharacterSearchResultEntry } from '../types/CharacterSearchResult';

describe('Selection Store', () => {
  const mockCharacter1: CharacterSearchResultEntry = {
    id: 1,
    name: 'Rick Sanchez',
    image: '',
    species: 'Human',
    gender: 'Male',
    status: 'Alive',
  };

  const mockCharacter2: CharacterSearchResultEntry = {
    id: 2,
    name: 'Morty Smith',
    image: '',
    species: 'Human',
    gender: 'Male',
    status: 'Alive',
  };

  beforeEach(() => {
    useSelectionStore.setState({ characters: [] });
  });

  it('should have initial empty state', () => {
    const state = useSelectionStore.getState();
    expect(state.characters).toEqual([]);
  });

  it('should toggle selection on and add character if not present', () => {
    useSelectionStore.getState().toggleSelection(mockCharacter1);

    const state = useSelectionStore.getState();
    expect(state.characters).toHaveLength(1);
    expect(state.characters[0]).toEqual(mockCharacter1);
    expect(state.isSelected(1)).toBe(true);
  });

  it('should toggle selection off and remove character if already present', () => {
    useSelectionStore.setState({ characters: [mockCharacter1] });

    useSelectionStore.getState().toggleSelection(mockCharacter1);

    const state = useSelectionStore.getState();
    expect(state.characters).toHaveLength(0);
    expect(state.isSelected(1)).toBe(false);
  });

  it('should remove character by id using removeSelection', () => {
    useSelectionStore.setState({
      characters: [mockCharacter1, mockCharacter2],
    });

    useSelectionStore.getState().removeSelection(1);

    const state = useSelectionStore.getState();
    expect(state.characters).toHaveLength(1);
    expect(state.characters[0].id).toBe(2);
    expect(state.isSelected(1)).toBe(false);
    expect(state.isSelected(2)).toBe(true);
  });

  it('should clear all selected characters', () => {
    useSelectionStore.setState({
      characters: [mockCharacter1, mockCharacter2],
    });

    useSelectionStore.getState().clearSelection();

    const state = useSelectionStore.getState();
    expect(state.characters).toHaveLength(0);
  });

  it('should return false for isSelected when list is empty or ID matches nothing', () => {
    const state = useSelectionStore.getState();
    expect(state.isSelected(666)).toBe(false);
  });
});
