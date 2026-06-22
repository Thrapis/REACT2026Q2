'use client';

import { StrictMode, useState } from 'react';
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { DEFAULT_CACHE_TTL_MS } from '@/constants/EnvironmentVariables';

import { ThemeProvider } from './ThemeProvider/ThemeProvider';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';

const cacheTime =
  Number(process.env.NEXT_PUBLIC_CACHE_TTL_MS) || DEFAULT_CACHE_TTL_MS;

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

export default function Providers({
  children,
  locale,
  messages,
}: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: cacheTime,
            gcTime: cacheTime,
            placeholderData: keepPreviousData,
          },
        },
      })
  );

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ErrorBoundary>{children}</ErrorBoundary>
          </NextIntlClientProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
