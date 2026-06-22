import type { Locale } from '@/i18n/locales';

export interface IntlContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}
