import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext(undefined);
const LANG_KEY = 'be_lang';

const getInitialLanguage = () => {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === 'en' || stored === 'he') {
    return stored;
  }
  return 'en';
};

const drill = (obj, path) => {
  return path.reduce((acc, key) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
      return acc[key];
    }
    return undefined;
  }, obj);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, language);
    document.documentElement.lang = language === 'he' ? 'he' : 'en';
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'he' : 'en'));
  };

  const t = (key) => {
    const parts = key.split('.');
    const value = drill(translations[language], parts);
    return value || key;
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
};
