'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

import { useRouter, usePathname } from '@/i18n/navigation';
import { LOCALES, type Locale } from '@/i18n/locales';

import './LanguageSelector.css';

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const handleToggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const setLocaleAndClose = (newLocale: Locale) => {
    setLocale(newLocale);
    setOpen(false);
  };

  return (
    <div className="locale-selector">
      <button
        className="locale-selector-toggle-button"
        onClick={handleToggleOpen}
      >
        {locale.toUpperCase()}
      </button>
      <ul className={`locale-selector-list ${open ? '' : 'hidden'}`}>
        {LOCALES.map((loc) => (
          <li className="locale-selector-item" key={loc}>
            <button
              className="locale-selector-select-button"
              onClick={() => setLocaleAndClose(loc)}
            >
              {loc.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
