import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from './context/Theme/ThemeProvider.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header.tsx';
import AppPage from './pages/App/AppPage.tsx';
import DetailsPage from './pages/Details/DetailsPage.tsx';
import AboutPage from './pages/About/AboutPage.tsx';
import NotFoundPage from './pages/NotFound/NotFoundPage.tsx';
import SelectionFlyout from './components/SelectionFlyout/SelectionFlyout.tsx';

import './index.css';
import Layout from './components/Layout/Layout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Layout>
        <ErrorBoundary>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<AppPage />}>
                <Route index element={null} />
                <Route path="/details/:id" element={<DetailsPage />} />
              </Route>
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
          <SelectionFlyout />
        </ErrorBoundary>
      </Layout>
    </ThemeProvider>
  </StrictMode>
);
