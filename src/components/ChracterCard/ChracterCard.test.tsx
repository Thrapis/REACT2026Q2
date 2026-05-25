import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ChracterCard from './ChracterCard';
import type { CharacterSearchResultEntry } from '../../types/CharacterSearchResult';
import { ThemeProvider } from '../../context/Theme/ThemeProvider';

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
    render(
      <ThemeProvider>
        <ChracterCard character={mockCharacter} />
      </ThemeProvider>
    );

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image.src).toContain(mockCharacter.image);
  });
});
