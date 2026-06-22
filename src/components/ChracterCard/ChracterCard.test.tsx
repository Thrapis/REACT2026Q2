import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ChracterCard from './ChracterCard';
import { MOCK_CHARACTER } from '@/test-utils/Api';
import { renderWithI18N } from '@/test-utils/Render';

describe('ChracterCard', () => {
  it('should show character name and description', () => {
    renderWithI18N(<ChracterCard character={MOCK_CHARACTER} />);

    expect(screen.getByText(MOCK_CHARACTER.name)).toBeInTheDocument();

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image.src).toContain(MOCK_CHARACTER.image);
  });
});
