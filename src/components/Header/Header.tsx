import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/UseTheme';

import './Header.css';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  const themeName = () => {
    return theme.slice(0, 1).toUpperCase() + theme.slice(1);
  };

  return (
    <header className={`header`}>
      <nav className="header-navigation">
        <Link className="header-link" to={'/'}>
          Home
        </Link>
        <Link className="header-link" to={'/about'}>
          About
        </Link>
      </nav>
      <button className="header-button" onClick={toggleTheme}>
        {themeName()} Theme
      </button>
    </header>
  );
}
