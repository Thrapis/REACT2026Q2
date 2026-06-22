import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

import { type Locale } from '@/i18n/locales';
import IntlProvider from '@/components/Providers/IntlProvider/IntlProvider';

export const renderWithBasicProviders = (
  children: React.ReactNode,
  queryClientInstance?: QueryClient,
  locale: Locale = 'en'
) => {
  const queryClient =
    queryClientInstance ||
    new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

  return render(
    <QueryClientProvider client={queryClient}>
      <IntlProvider defaultLocale={locale}>{children}</IntlProvider>
    </QueryClientProvider>
  );
};

export const renderWithI18N = (
  children: React.ReactNode,
  locale: Locale = 'en'
) => {
  return render(<IntlProvider defaultLocale={locale}>{children}</IntlProvider>);
};
