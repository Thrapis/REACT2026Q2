'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import './page.css';

export default function AboutPage() {
  const t = useTranslations('AboutPage');

  return (
    <section className="about-section">
      <div className="about-block">
        <h3>{t('about')}</h3>
        <div className="about-list">
          <div className="about-row">
            <span>{t('author')}</span>
            <a href="https://github.com/Thrapis">Thrapis</a>
          </div>
          <div className="about-row">
            <span>{t('school')}</span>
            <a href="https://rs.school/courses/reactjs">RSScool</a>
          </div>
        </div>
        <Link href={'/'}>{t('return')}</Link>
      </div>
    </section>
  );
}
