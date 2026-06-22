'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useState, useEffect, type ReactNode } from 'react';

import {
  isValidLocale,
  LOCALE_MESSAGES_MAP,
  type Locale,
} from '@/i18n/locales';
import { LOCALE_STORAGE_KEY } from '@/constants/LocalStorage';
import { IntlContext } from '@/context/Locale/LocaleContext';

interface IntlProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

export default function IntlProvider({
  children,
  defaultLocale = 'en',
}: IntlProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (savedLocale && isValidLocale(savedLocale)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
  };

  return (
    <IntlContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider
        locale={locale}
        messages={LOCALE_MESSAGES_MAP[locale]}
      >
        {children}
      </NextIntlClientProvider>
    </IntlContext.Provider>
  );
}
