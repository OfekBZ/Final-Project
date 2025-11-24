import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addFavorite, removeFavorite } from '../../services/favoriteService';
import styles from './BookCard.module.css';

const BookCard = ({ book, onSelect }) => {
  const { auth, addFavoriteLocal, removeFavoriteLocal } = useAuth();
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  const isFavorited = !!auth.user?.favorites?.includes(book._id);

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    if (!auth.token) return;
    setLoadingFavorite(true);
    try {
      if (isFavorited) {
        await removeFavorite(book._id);
        removeFavoriteLocal(book._id);
      } else {
        await addFavorite(book._id);
        addFavoriteLocal(book._id);
      }
    } catch (err) {
      // In production we would surface a toast; keeping silent here per instructions.
    } finally {
      setLoadingFavorite(false);
    }
  };

  return (
    <div className={styles.card} onClick={() => onSelect?.(book)} role="button" tabIndex={0}>
      <div className={styles.coverWrapper}>
        {book.coverImageUrl ? (
          <img src={book.coverImageUrl} alt={book.title} className={styles.cover} />
        ) : (
          <div className={styles.placeholder}>No Cover</div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.headerRow}>
          <div>
            <h3 className={styles.title}>{book.title}</h3>
            <p className={styles.author}>{book.author}</p>
          </div>
          {auth.user && (
            <button
              type="button"
              className={`${styles.heart} ${isFavorited ? styles.heartActive : ''}`}
              onClick={toggleFavorite}
              disabled={loadingFavorite}
              aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorited ? '❤️' : '♡'}
            </button>
          )}
        </div>
        <p className={styles.meta}>
          {book.year ? `${book.year}` : 'Year N/A'} · {book.language || 'Language N/A'}
        </p>
        <p className={styles.description}>
          {book.description?.slice(0, 120) || 'Description not available'}
          {book.description && book.description.length > 120 ? '...' : ''}
        </p>
        <div className={styles.tags}>
          {book.genres?.slice(0, 3).map((genre) => (
            <span key={genre} className={styles.tag}>
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
