import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/context/Theme/ThemeProvider.tsx';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary.tsx';
import App from './App.tsx';

import './index.css';

// 10 min TTL caching
const cacheTime = Number(import.meta.env.CACHE_TTL_MS) || 10 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: cacheTime,
      gcTime: cacheTime,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
