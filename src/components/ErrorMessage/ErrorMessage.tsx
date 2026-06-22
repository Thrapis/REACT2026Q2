'use client';

import { useTranslations } from 'next-intl';

import './ErrorMessage.css';

export interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const t = useTranslations('ErrorMessage');

  return (
    <div className="error-message">
      <h4>{t('error')}</h4>
      <p>{message}</p>
      <button onClick={onRetry}>{t('retrySearch')}</button>
    </div>
  );
}
