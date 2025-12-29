import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import ThemeToggle from '../Layout/ThemeToggle';
import LanguageToggle from '../Layout/LanguageToggle';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { auth, logout } = useAuth();
  const { t } = useLanguage();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Link to="/">Book Explorer</Link>
      </div>
      <nav className={styles.nav}>
        <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : '')}>
          {t('nav.home')}
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : '')}>
          {t('nav.about')}
        </NavLink>
        <NavLink to="/books" className={({ isActive }) => (isActive ? styles.active : '')}>
          {t('nav.books')}
        </NavLink>
        {auth.user && (
          <NavLink to="/favorites" className={({ isActive }) => (isActive ? styles.active : '')}>
            {t('nav.favorites')}
          </NavLink>
        )}
        {auth.user?.role === 'admin' && (
          <>
            <NavLink to="/admin" className={({ isActive }) => (isActive ? styles.active : '')}>
              {t('nav.admin')}
            </NavLink>
            <NavLink
              to="/admin/books"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              {t('nav.adminBooks')}
            </NavLink>
          </>
        )}
        <ThemeToggle />
        <LanguageToggle />
        {auth.user ? (
          <>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? styles.active : '')}>
              {t('nav.profile')}
            </NavLink>
            <span className={styles.userLabel}>{auth.user.name}</span>
            <button type="button" className={styles.logoutButton} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')}>
              {t('nav.login')}
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : '')}>
              {t('nav.register')}
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
