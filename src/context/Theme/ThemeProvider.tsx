'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';
import { THEME_STORAGE_KEY } from '@/constants/LocalStorage';

type Theme = 'light' | 'dark';

function isTheme(value: string): value is Theme {
  return value === 'light' || value === 'dark';
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isMounted, setIsMounted] = useState(false);

  const getStorageTheme = () => {
    const storageValue = localStorage.getItem(THEME_STORAGE_KEY);
    const currentTheme =
      storageValue && isTheme(storageValue) ? storageValue : defaultTheme;
    return currentTheme;
  };

  const applyTheme = (theme: Theme) => {
    document.documentElement.setAttribute('data-theme', theme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  useEffect(() => {
    const storageTheme = getStorageTheme();
    if (theme !== storageTheme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(storageTheme);
    }
    applyTheme(storageTheme);
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
