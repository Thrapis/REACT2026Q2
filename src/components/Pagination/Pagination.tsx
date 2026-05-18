import './Pagination.css';

export interface PaginationProps {
  nextUrl: string | null;
  prevUrl: string | null;
  onPageSelect: (url: string) => void;
}

export default function Pagination({
  nextUrl,
  prevUrl,
  onPageSelect,
}: PaginationProps) {
  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => prevUrl && onPageSelect(prevUrl)}
        disabled={prevUrl === null}
      >
        Prev
      </button>
      <button
        className="pagination-button"
        onClick={() => nextUrl && onPageSelect(nextUrl)}
        disabled={nextUrl === null}
      >
        Next
      </button>
    </div>
  );
}
