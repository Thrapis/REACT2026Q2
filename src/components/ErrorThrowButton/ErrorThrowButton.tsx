'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import './ErrorThrowButton.css';

export default function ErrorThrowButton() {
  const t = useTranslations('ErrorThrowButton');

  const [shouldThrowError, setShouldThrowError] = useState<boolean>(false);

  const handleOrderErrorThrow = (): void => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error(t('errorMessage'));
  }

  return (
    <button className="error-throw-button" onClick={handleOrderErrorThrow}>
      {t('throwError')}
    </button>
  );
}
