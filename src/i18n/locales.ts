import enMessages from '../../messages/en.json';
import beMessages from '../../messages/be.json';

export const LOCALES = ['en', 'be'] as const;

export type Locale = (typeof LOCALES)[number];

export function isValidLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const LOCALE_MESSAGES_MAP = {
  en: enMessages,
  be: beMessages,
} satisfies Record<Locale, object>;
