import React from 'react';
import './Pagination.css';

export interface PaginationProps {
  nextUrl: string | null;
  prevUrl: string | null;
  onPageSelect: (url: string) => void;
}

export default class Pagination extends React.Component<PaginationProps> {
  render() {
    const { nextUrl, prevUrl, onPageSelect } = this.props;

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
}
