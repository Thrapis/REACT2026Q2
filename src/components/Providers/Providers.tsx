'use client';

import { StrictMode, useState } from 'react';
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ThemeProvider } from '@/context/Theme/ThemeProvider';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { DEFAULT_CACHE_TTL_MS } from '@/constants/EnvironmentVariables';

const cacheTime =
  Number(process.env.NEXT_PUBLIC_CACHE_TTL_MS) || DEFAULT_CACHE_TTL_MS;

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
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
          <ErrorBoundary>{children}</ErrorBoundary>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
