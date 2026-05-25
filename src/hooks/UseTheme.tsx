import { useContext } from 'react';
import { ThemeContext } from '../context/Theme/ThemeContext';

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme is not inside ThemeProvider');
  }

  return context;
}
