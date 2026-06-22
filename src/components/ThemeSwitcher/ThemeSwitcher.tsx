'use client';

import { useTranslations } from 'next-intl';

import { useTheme } from '@/hooks/theme/UseTheme';

export default function ThemeSwitcher() {
  const t = useTranslations('ThemeSwitcher');

  const { theme, toggleTheme } = useTheme();

  return (
    <button className="header-button" onClick={toggleTheme}>
      {theme === 'light' ? t('lightTheme') : t('darkTheme')}
    </button>
  );
}
