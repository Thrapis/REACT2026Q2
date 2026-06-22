'use client';

import { useContext } from 'react';

import { IntlContext } from '@/context/Locale/LocaleContext';

export function useLocale() {
  const context = useContext(IntlContext);
  if (!context) {
    throw new Error('useLocale is not inside IntlProvider');
  }
  return context;
}
