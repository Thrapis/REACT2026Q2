'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import './not-found.css';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <section className="not-found-section">
      <h2>{t('page404')}</h2>
      <span>{t('pageNotFound')}</span>
      <Link href="/">{t('return')}</Link>
    </section>
  );
}
