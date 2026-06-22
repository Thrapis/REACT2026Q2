import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ChracterCard from './ChracterCard';
import { MOCK_CHARACTER } from '@/test-utils/Api';

describe('ChracterCard', () => {
  it('should show character name and description', () => {
    render(<ChracterCard character={MOCK_CHARACTER} />);

    expect(screen.getByText(MOCK_CHARACTER.name)).toBeInTheDocument();

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image.src).toContain(MOCK_CHARACTER.image);
  });
});
