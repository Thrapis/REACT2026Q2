'use client';

import { useTranslations } from 'next-intl';

import './Pagination.css';

export interface PaginationProps {
  current: number;
  pages: number;
  onPageSelect: (page: number) => void;
}

export default function Pagination({
  current,
  pages,
  onPageSelect,
}: PaginationProps) {
  const t = useTranslations('Pagination');

  const hasPrev = current - 1 >= 1;
  const hasNext = current + 1 <= pages;
  const pagesArray = Array.from({ length: pages }, (_v, k) => k + 1);

  return (
    <nav className="pagination">
      <button
        className="pagination-button"
        onClick={() => hasPrev && onPageSelect(current - 1)}
        disabled={!hasPrev}
      >
        {t('prev')}
      </button>

      {pagesArray.map((page: number) => (
        <button
          key={page}
          className={`pagination-button ${current === page ? 'current' : ''}`}
          onClick={() => current !== page && onPageSelect(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-button"
        onClick={() => hasNext && onPageSelect(current + 1)}
        disabled={!hasNext}
      >
        {t('next')}
      </button>
    </nav>
  );
}
