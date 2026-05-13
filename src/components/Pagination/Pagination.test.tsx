import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('should disable Prev button if prevUrl === null', () => {
    render(
      <Pagination
        prevUrl={null}
        nextUrl="https://rickandmortyapi.com/api/character?page=2&name=rick"
        onPageSelect={() => {}}
      />
    );

    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).toBeDisabled();
  });

  it('should call onPageSelect if Prev button is not disabled', () => {
    const onPageSelectMock = vi.fn();
    const prevUrl =
      'https://rickandmortyapi.com/api/character?page=1&name=rick';
    const nextUrl =
      'https://rickandmortyapi.com/api/character?page=3&name=rick';

    render(
      <Pagination
        prevUrl={prevUrl}
        nextUrl={nextUrl}
        onPageSelect={onPageSelectMock}
      />
    );

    const prevButton = screen.getByRole('button', { name: 'Prev' });

    fireEvent.click(prevButton);

    expect(onPageSelectMock).toHaveBeenCalledWith(prevUrl);
  });

  it('should call onPageSelect if Next button is not disabled', () => {
    const onPageSelectMock = vi.fn();
    const prevUrl =
      'https://rickandmortyapi.com/api/character?page=1&name=rick';
    const nextUrl =
      'https://rickandmortyapi.com/api/character?page=3&name=rick';

    render(
      <Pagination
        prevUrl={prevUrl}
        nextUrl={nextUrl}
        onPageSelect={onPageSelectMock}
      />
    );

    const nextButton = screen.getByRole('button', { name: 'Next' });

    fireEvent.click(nextButton);

    expect(onPageSelectMock).toHaveBeenCalledWith(nextUrl);
  });

  it('should not call onPageSelect if button is disabled', () => {
    const onPageSelectMock = vi.fn();

    render(
      <Pagination
        prevUrl={null}
        nextUrl={null}
        onPageSelect={onPageSelectMock}
      />
    );

    const prevButton = screen.getByRole('button', { name: 'Prev' });
    fireEvent.click(prevButton);

    expect(onPageSelectMock).not.toHaveBeenCalled();
  });
});
