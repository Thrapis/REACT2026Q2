import type { Metadata } from 'next';
import Providers from '@/components/Providers/Providers';
import Layout from '@/components/Layout/Layout';
import Header from '@/components/Header/Header';
import SelectionFlyout from '@/components/SelectionFlyout/SelectionFlyout';

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
            <Layout>
              <Header />
              {children}
              <SelectionFlyout />
            </Layout>
          </Providers>
        </div>
      </body>
    </html>
  );
}
