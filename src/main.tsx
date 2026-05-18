import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppPage from './pages/App/AppPage.tsx';
import DetailsPage from './pages/Details/DetailsPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppPage />}>
            <Route index element={null} />
            <Route path="/details/:id" element={<DetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
