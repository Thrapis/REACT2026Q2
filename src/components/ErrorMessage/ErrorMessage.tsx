'use client';

import './ErrorMessage.css';

export interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export default function Pagination({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <h4>Error</h4>
      <p>{message}</p>
      <button onClick={onRetry}>Retry Search</button>
    </div>
  );
}
