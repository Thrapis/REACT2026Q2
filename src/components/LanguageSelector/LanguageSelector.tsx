'use client';

import { useLocale } from '@/hooks/locale/UseLocale';
import { LOCALES, type Locale } from '@/i18n/locales';

import './LanguageSelector.css';
import { useState } from 'react';

export default function LanguageSelector() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);

  const handleToggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const setLocaleAndClose = (loc: Locale) => {
    setLocale(loc);
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
