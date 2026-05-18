import { Link } from 'react-router-dom';
import './AboutPage.css';

export default function AboutPage() {
  return (
    <section className="about-section">
      <div className="about-block">
        <h3>About</h3>
        <div className="about-list">
          <div className="about-row">
            <span>Author</span>
            <a href="https://github.com/Thrapis">Thrapis</a>
          </div>
          <div className="about-row">
            <span>School</span>
            <a href="https://rs.school/courses/reactjs">RSScool</a>
          </div>
        </div>
        <Link to={'/'}>Return</Link>
      </div>
    </section>
  );
}
