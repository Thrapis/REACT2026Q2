import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFoundPage from './not-found';

describe('NotFoundPage', () => {
  const renderPage = () => {
    return render(<NotFoundPage />);
  };

  it('should render 404 heading and error message correctly', () => {
    renderPage();

    expect(
      screen.getByRole('heading', { name: 'Page 404', level: 2 })
    ).toBeInTheDocument();

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('should contain a return link pointing to the home path', () => {
    renderPage();

    const returnLink = screen.getByRole('link', { name: 'Return' });

    expect(returnLink).toHaveAttribute('href', '/');
  });
});
