import React from 'react';
import './ErrorThrowButton.css';

interface ErrorThrowButtonProps {
  shouldThrowError: boolean;
}

export default class ErrorThrowButton extends React.Component<
  Record<string, never>,
  ErrorThrowButtonProps
> {
  state: ErrorThrowButtonProps = {
    shouldThrowError: false,
  };

  handleOrderErrorThrow = (): void => {
    this.setState({ shouldThrowError: true });
  };

  render() {
    if (this.state.shouldThrowError) {
      throw new Error('Manual throwed error');
    }

    return (
      <button
        className="error-throw-button"
        onClick={this.handleOrderErrorThrow}
      >
        Throw Error
      </button>
    );
  }
}
