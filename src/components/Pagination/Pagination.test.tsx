import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('should disable Prev button if on the first page', () => {
    render(<Pagination current={1} pages={5} onPageSelect={() => {}} />);

    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).toBeDisabled();
  });

  it('should disable Next button if on the last page', () => {
    render(<Pagination current={5} pages={5} onPageSelect={() => {}} />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it('should call onPageSelect with previous page number when Prev is clicked', () => {
    const onPageSelectMock = vi.fn();
    render(
      <Pagination current={3} pages={5} onPageSelect={onPageSelectMock} />
    );

    const prevButton = screen.getByRole('button', { name: /prev/i });
    fireEvent.click(prevButton);

    expect(onPageSelectMock).toHaveBeenCalledWith(2);
  });

  it('should call onPageSelect with next page number when Next is clicked', () => {
    const onPageSelectMock = vi.fn();
    render(
      <Pagination current={3} pages={5} onPageSelect={onPageSelectMock} />
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    expect(onPageSelectMock).toHaveBeenCalledWith(4);
  });

  it('should render all page buttons and highlight the current page', () => {
    render(<Pagination current={2} pages={3} onPageSelect={() => {}} />);

    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(5);

    const secondPageButton = screen.getByRole('button', { name: '2' });
    expect(secondPageButton).toHaveClass('current');
  });

  it('should call onPageSelect with specific page number when a page button is clicked', () => {
    const onPageSelectMock = vi.fn();
    render(
      <Pagination current={1} pages={3} onPageSelect={onPageSelectMock} />
    );

    const thirdPageButton = screen.getByRole('button', { name: '3' });
    fireEvent.click(thirdPageButton);

    expect(onPageSelectMock).toHaveBeenCalledWith(3);
  });

  it('should not call onPageSelect when clicking the already active page button', () => {
    const onPageSelectMock = vi.fn();
    render(
      <Pagination current={2} pages={3} onPageSelect={onPageSelectMock} />
    );

    const activePageButton = screen.getByRole('button', { name: '2' });
    fireEvent.click(activePageButton);

    expect(onPageSelectMock).not.toHaveBeenCalled();
  });
});
