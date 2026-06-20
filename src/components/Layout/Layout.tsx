'use client';

import type { ReactNode } from 'react';

import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <div className="layout">{children}</div>;
}
