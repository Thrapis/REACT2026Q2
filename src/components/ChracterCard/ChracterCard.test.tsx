import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ChracterCard from './ChracterCard';
import type { CharacterSearchResultEntry } from '../../types/CharacterSearchResult';

describe('ChracterCard', () => {
  const mockCharacter: CharacterSearchResultEntry = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'image_link',
  };

  it('should show character name and description', () => {
    render(<ChracterCard character={mockCharacter} />);

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();

    expect(
      screen.getByText(`Species: ${mockCharacter.species}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Gender: ${mockCharacter.gender}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Status: ${mockCharacter.status}`)
    ).toBeInTheDocument();

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image.src).toContain(mockCharacter.image);
  });
});
