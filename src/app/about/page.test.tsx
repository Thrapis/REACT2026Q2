import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AboutPage from './page';

describe('AboutPage', () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<div>Mock App Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders heading and text content correctly', () => {
    renderWithRouter();

    expect(
      screen.getByRole('heading', { name: 'About', level: 3 })
    ).toBeInTheDocument();

    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('School')).toBeInTheDocument();
  });

  it('contains correct external links for Author and School', () => {
    renderWithRouter();

    const authorLink = screen.getByRole('link', { name: 'Thrapis' });
    expect(authorLink).toHaveAttribute('href', 'https://github.com/Thrapis');

    const schoolLink = screen.getByRole('link', { name: 'RSScool' });
    expect(schoolLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });

  it('navigates to the home page when the Return link is clicked', async () => {
    renderWithRouter();

    const returnLink = screen.getByRole('link', { name: 'Return' });
    expect(returnLink).toHaveAttribute('href', '/');

    await fireEvent.click(returnLink);

    expect(screen.getByText('Mock App Page')).toBeInTheDocument();
  });
});
