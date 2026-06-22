import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';

import Providers from '@/components/Providers/Providers';
import Header from '@/components/Header/Header';
import SelectionFlyout from '@/components/SelectionFlyout/SelectionFlyout';
import { isValidLocale } from '@/i18n/locales';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Next SSR',
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <div id="root">
      <Providers locale={locale} messages={messages}>
        <Header />
        {children}
        <SelectionFlyout />
      </Providers>
    </div>
  );
}
