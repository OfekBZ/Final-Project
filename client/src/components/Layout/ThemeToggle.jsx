import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button type="button" className={styles.toggle} onClick={toggleTheme} aria-label="Toggle theme">
      {isLight ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
