import { useState } from 'react';
import './ErrorThrowButton.css';

export default function ErrorThrowButton() {
  const [shouldThrowError, setShouldThrowError] = useState<boolean>(false);

  const handleOrderErrorThrow = (): void => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error('Manual throwed error');
  }

  return (
    <button className="error-throw-button" onClick={handleOrderErrorThrow}>
      Throw Error
    </button>
  );
}
