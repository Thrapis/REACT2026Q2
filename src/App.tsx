import { Routes, Route } from 'react-router-dom';

import Layout from '@/components/Layout/Layout';
import Header from '@/components/Header/Header';
import HomePage from '@/pages/Home/HomePage';
import DetailsPage from '@/pages/Details/DetailsPage';
import AboutPage from '@/pages/About/AboutPage';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import SelectionFlyout from '@/components/SelectionFlyout/SelectionFlyout';

export default function App() {
  return (
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
  );
}
