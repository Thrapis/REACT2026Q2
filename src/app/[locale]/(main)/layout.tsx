import HomePage from './page';

interface MainLayoutProps {
  details: React.ReactNode;
}

export default function MainLayout({ details }: MainLayoutProps) {
  return <HomePage>{details}</HomePage>;
}
