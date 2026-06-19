import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Layout from '@/components/Layout/Layout';
import Header from '@/components/Header/Header';
import HomePage from '@/pages/Home/HomePage';
import DetailsPage from '@/pages/Details/DetailsPage';
import AboutPage from '@/pages/About/AboutPage';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import SelectionFlyout from '@/components/SelectionFlyout/SelectionFlyout';
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { StrictMode } from 'react';
import { ThemeProvider } from './context/Theme/ThemeProvider';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const cacheTime =
  Number(process.env.NEXT_PUBLIC_CACHE_TTL_MS) || 10 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: cacheTime,
      gcTime: cacheTime,
      placeholderData: keepPreviousData,
    },
  },
});

export default function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ErrorBoundary>
            <BrowserRouter>
              <Layout>
                <Header />
                <Routes>
                  <Route path="/" element={<HomePage />}>
                    <Route index element={null} />
                    <Route path="/details/:id" element={<DetailsPage />} />
                  </Route>
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <SelectionFlyout />
              </Layout>
            </BrowserRouter>
          </ErrorBoundary>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
