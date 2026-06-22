import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutPage from './page';
import { renderWithI18N } from '@/test-utils/Render';

const GITHUB_NAME = 'Thrapis';
const GITHUB_LINK = 'https://github.com/Thrapis';
const RSSCHOOL_NAME = 'RSScool';
const RSSCHOOL_LINK = 'https://rs.school/courses/reactjs';

describe('AboutPage', () => {
  const renderPage = () => {
    return renderWithI18N(<AboutPage />);
  };

  it('should render heading and text content correctly', () => {
    renderPage();

    expect(
      screen.getByRole('heading', { name: 'About', level: 3 })
    ).toBeInTheDocument();

    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('School')).toBeInTheDocument();
  });

  it('should contain correct external links for Author and School', () => {
    renderPage();

    const authorLink = screen.getByRole('link', { name: GITHUB_NAME });
    expect(authorLink).toHaveAttribute('href', GITHUB_LINK);

    const schoolLink = screen.getByRole('link', { name: RSSCHOOL_NAME });
    expect(schoolLink).toHaveAttribute('href', RSSCHOOL_LINK);
  });

  it('should contain a return link pointing to the home path', () => {
    renderPage();

    const returnLink = screen.getByRole('link', { name: 'Return' });

    expect(returnLink).toHaveAttribute('href', '/');
  });
});
