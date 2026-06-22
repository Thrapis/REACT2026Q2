'use client';

import Link from 'next/link';

import './not-found.css';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <section className="not-found-section">
      <h2>{t('page404')}</h2>
      <span>{t('pageNotFound')}</span>
      <Link href={'/'}>{t('return')}</Link>
    </section>
  );
}
