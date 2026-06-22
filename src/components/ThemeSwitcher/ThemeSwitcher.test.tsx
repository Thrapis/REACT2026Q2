import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTheme } from '@/hooks/theme/UseTheme';
import { renderWithI18N } from '@/test-utils/Render';
import ThemeSwitcher from './ThemeSwitcher';

vi.mock('@/hooks/theme/UseTheme', () => ({
  useTheme: vi.fn(),
}));

describe('ThemeSwitcher Component', () => {
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call toggleTheme when button clicked', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    renderWithI18N(<ThemeSwitcher />);

    const themeButton = screen.getByRole('button');
    fireEvent.click(themeButton);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
