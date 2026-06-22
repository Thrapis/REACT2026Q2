import { Link } from '@/i18n/navigation';

import './page.css';
import { LOCALES } from '@/i18n/locales';
import { getTranslations } from 'next-intl/server';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [
    ...LOCALES.map((loc) => ({
      locale: loc,
    })),
  ];
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'AboutPage' });

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
        <Link href="/">{t('return')}</Link>
      </div>
    </section>
  );
}
