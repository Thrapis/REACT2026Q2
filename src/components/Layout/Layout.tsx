import type { ReactNode } from 'react';
import { useTheme } from '../../hooks/UseTheme';

import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return <div className={`layout ${theme}`}>{children}</div>;
}
