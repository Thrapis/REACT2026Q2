import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <section className="not-found-section">
      <h2>Page 404</h2>
      <span>Page Not Found</span>
      <Link to={'/'}>Return</Link>
    </section>
  );
}
