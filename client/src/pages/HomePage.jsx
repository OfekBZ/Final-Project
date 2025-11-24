import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Home.module.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <p className={styles.kicker}>Book Explorer</p>
        <h1>Discover, manage, and review your favorite books</h1>
        <p className={styles.subtitle}>
          Browse a rich catalog, save favorites, leave reviews, and control access with a clean admin
          experience.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.primaryButton} onClick={() => navigate('/books')}>
            Browse Books
          </button>
          {auth.user ? (
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => navigate('/favorites')}
            >
              View Favorites
            </button>
          ) : (
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => navigate('/register')}
            >
              Create Account
            </button>
          )}
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.card}>
          <div className={styles.icon}>🔍</div>
          <h3>Search & Filter</h3>
          <p>Find books by title, author, genre, or year with grid and table views.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>❤️</div>
          <h3>Favorites</h3>
          <p>Save the books you love and access them quickly from your favorites page.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>⭐</div>
          <h3>Reviews</h3>
          <p>Share your thoughts with ratings and text reviews; see the average instantly.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>🛡️</div>
          <h3>Admin Tools</h3>
          <p>Manage users, roles, and content with secure, role-based admin controls.</p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
