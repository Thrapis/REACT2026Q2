import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NotFoundPage from './not-found';
import { renderWithI18N } from '@/test-utils/Render';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('NotFoundPage', () => {
  const renderPage = () => {
    return renderWithI18N(<NotFoundPage />);
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
