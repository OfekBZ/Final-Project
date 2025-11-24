import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookGrid from '../components/Books/BookGrid';
import { getFavorites } from '../services/favoriteService';
import styles from '../styles/Books.module.css';
import { useLanguage } from '../context/LanguageContext';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadFavorites = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getFavorites();
      setFavorites(data.favorites || []);
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to load favorites';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleSelectBook = (book) => {
    navigate(`/books/${book._id}`);
  };

  return (
    <section>
      <h1>{t('books.favoritesTitle')}</h1>
      <p>{t('books.favoritesSubtitle')}</p>
      {loading && <p>{t('books.loadingFavorites')}</p>}
      {error && <p className={styles.errorText}>{error}</p>}
      {!loading && !error && favorites.length === 0 && <p>{t('books.noFavorites')}</p>}
      {!loading && !error && favorites.length > 0 && (
        <BookGrid books={favorites} onSelect={handleSelectBook} />
      )}
    </section>
  );
};

export default FavoritesPage;
