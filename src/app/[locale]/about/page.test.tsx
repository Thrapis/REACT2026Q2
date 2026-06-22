import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AboutPage from './page';
import { renderWithI18N } from '@/test-utils/Render';
import { LOCALE_MESSAGES_MAP, type LocaleMessageType } from '@/i18n/locales';
import { act } from 'react';

const GITHUB_NAME = 'Thrapis';
const GITHUB_LINK = 'https://github.com/Thrapis';
const RSSCHOOL_NAME = 'RSScool';
const RSSCHOOL_LINK = 'https://rs.school/courses/reactjs';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  usePathname: () => '/about',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async ({ namespace }: { namespace: string }) => {
    return (key: string) => {
      const ns =
        LOCALE_MESSAGES_MAP['en'][namespace as keyof LocaleMessageType];
      return ns ? ns[key] || key : key;
    };
  }),
  getLocale: vi.fn(async () => 'en'),
}));

describe('AboutPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockParams = Promise.resolve({ locale: 'en' });

  const renderPage = async () => {
    const ResolvedPage = await AboutPage({ params: mockParams });
    return renderWithI18N(ResolvedPage);
  };

  it('should render heading and text content correctly', async () => {
    await act(async () => {
      renderPage();
    });

    expect(
      screen.getByRole('heading', { name: 'About', level: 3 })
    ).toBeInTheDocument();

    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('School')).toBeInTheDocument();
  });

  it('should contain correct external links for Author and School', async () => {
    await act(async () => {
      renderPage();
    });

    const authorLink = screen.getByRole('link', { name: GITHUB_NAME });
    expect(authorLink).toHaveAttribute('href', GITHUB_LINK);

    const schoolLink = screen.getByRole('link', { name: RSSCHOOL_NAME });
    expect(schoolLink).toHaveAttribute('href', RSSCHOOL_LINK);
  });

  it('should contain a return link pointing to the home path', async () => {
    await act(async () => {
      renderPage();
    });

    const returnLink = screen.getByRole('link', { name: 'Return' });

    expect(returnLink).toHaveAttribute('href', '/');
  });
});
