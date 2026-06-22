import type { Metadata } from 'next';
import Providers from '@/components/Providers/Providers';
import Header from '@/components/Header/Header';
import SelectionFlyout from '@/components/SelectionFlyout/SelectionFlyout';

import './global.css';

export const metadata: Metadata = {
  title: 'Next SSR',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <Providers>
            <Header />
            {children}
            <SelectionFlyout />
          </Providers>
        </div>
      </body>
    </html>
  );
}
