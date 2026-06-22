import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import { LOCALE_MESSAGES_MAP, type Locale } from '@/i18n/locales';

export const renderWithBasicProviders = (
  children: React.ReactNode,
  queryClientInstance?: QueryClient,
  locale: Locale = 'en'
) => {
  const queryClient =
    queryClientInstance ||
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    });

  return render(
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider
        locale={locale}
        messages={LOCALE_MESSAGES_MAP[locale]}
      >
        {children}
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
};

export const renderWithI18N = (
  children: React.ReactNode,
  locale: Locale = 'en'
) => {
  return render(
    <NextIntlClientProvider
      locale={locale}
      messages={LOCALE_MESSAGES_MAP[locale]}
    >
      {children}
    </NextIntlClientProvider>
  );
};
