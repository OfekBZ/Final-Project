import { useLanguage } from '../../context/LanguageContext';
import styles from './LanguageToggle.module.css';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  const nextLabel = language === 'en' ? 'HE' : 'EN';

  return (
    <button type="button" className={styles.toggle} onClick={toggleLanguage} aria-label="Toggle language">
      {nextLabel}
    </button>
  );
};

export default LanguageToggle;
