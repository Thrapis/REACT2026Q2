import React from 'react';
import './ErrorMessage.css';

export interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export default class Pagination extends React.Component<ErrorMessageProps> {
  render() {
    const { message, onRetry } = this.props;

    return (
      <div className="error-message">
        <h4>Error</h4>
        <p>{message}</p>
        <button onClick={onRetry}>Retry Search</button>
      </div>
    );
  }
}
