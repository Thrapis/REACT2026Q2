import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter initialEntries={['/some-invalid-path']}>
        <Routes>
          <Route path="/" element={<div>Mock App Page</div>} />
          <Route path="/some-invalid-path" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders 404 heading and error message correctly', () => {
    renderWithRouter();

    expect(
      screen.getByRole('heading', { name: 'Page 404', level: 2 })
    ).toBeInTheDocument();

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('contains a return link pointing to the home path', () => {
    renderWithRouter();

    const returnLink = screen.getByRole('link', { name: 'Return' });
    expect(returnLink).toHaveAttribute('href', '/');
  });

  it('navigates to the home page when the Return link is clicked', async () => {
    renderWithRouter();

    const returnLink = screen.getByRole('link', { name: 'Return' });

    await fireEvent.click(returnLink);

    expect(screen.getByText('Mock App Page')).toBeInTheDocument();
  });
});
