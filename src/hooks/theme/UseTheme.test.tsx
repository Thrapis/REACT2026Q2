import { renderHook } from '@testing-library/react';
import { ThemeContext } from '@/context/Theme/ThemeContext';
import { useTheme } from './UseTheme';
import { describe, it, expect, vi } from 'vitest';
import type { ThemeContextType } from '@/context/Theme/types';

describe('useTheme', () => {
  it('should return context value when used inside ThemeProvider', () => {
    const mockThemeContext: ThemeContextType = {
      theme: 'dark',
      toggleTheme: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={mockThemeContext}>
        {children}
      </ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toEqual(mockThemeContext);
    expect(result.current.theme).toBe('dark');
  });

  it('should throw an error when used outside ThemeProvider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme is not inside ThemeProvider');

    consoleSpy.mockRestore();
  });
});
