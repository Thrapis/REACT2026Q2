import type { Metadata } from 'next';
import Providers from '@/components/Providers/Providers';
import Header from '@/components/Header/Header';
import SelectionFlyout from '@/components/SelectionFlyout/SelectionFlyout';
import './index.css';

export const metadata: Metadata = {
  title: 'Next SSR',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
