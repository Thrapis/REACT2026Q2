'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import LanguageSelector from '@/components/LanguageSelector/LanguageSelector';

import './Header.css';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

export default function Header() {
  const t = useTranslations('Header');

  return (
    <header className={`header`}>
      <nav className="header-navigation">
        <Link className="header-link" href={'/'}>
          {t('home')}
        </Link>
        <Link className="header-link" href={'/about'}>
          {t('about')}
        </Link>
      </nav>

      <div className="header-controls">
        <ThemeSwitcher />
        <LanguageSelector />
      </div>
    </header>
  );
}
