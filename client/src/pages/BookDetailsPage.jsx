import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { fetchBookById } from '../services/bookService';
import { getReviewsForBook, addReview, deleteReview } from '../services/reviewService';
import ReviewList from '../components/Reviews/ReviewList';
import ReviewForm from '../components/Reviews/ReviewForm';
import styles from '../components/Books/BookDetails.module.css';

const BookDetailsPage = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const { t } = useLanguage();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const loadBook = async () => {
      if (!id) return;
      setLoading(true);
      setError('');
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (err) {
        const message = err?.response?.data?.message || 'Failed to load book';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  useEffect(() => {
    const loadReviews = async () => {
      if (!id) return;
      setReviewsLoading(true);
      setReviewsError('');
      try {
        const data = await getReviewsForBook(id);
        setReviews(data.reviews || []);
      } catch (err) {
        const message = err?.response?.data?.message || 'Failed to load reviews';
        setReviewsError(message);
      } finally {
        setReviewsLoading(false);
      }
    };

    loadReviews();
  }, [id]);

  const handleAddReview = async ({ rating, text }) => {
    if (!id) return;
    setSubmittingReview(true);
    setReviewsError('');
    try {
      await addReview(id, { rating, text });
      const data = await getReviewsForBook(id);
      setReviews(data.reviews || []);
      const refreshedBook = await fetchBookById(id);
      setBook(refreshedBook);
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to add review';
      setReviewsError(message);
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    setReviewsError('');
    try {
      await deleteReview(reviewId);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      const refreshedBook = await fetchBookById(id);
      setBook(refreshedBook);
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to delete review';
      setReviewsError(message);
    }
  };

  if (loading) {
    return (
      <section>
        <p className="muted">{t('details.loadingBook')}</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p className="errorText">{error}</p>
      </section>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <section className={styles.details}>
      <div className={styles.header}>
        <div>
          <h1>{book.title}</h1>
          <p className={styles.author}>{book.author}</p>
          <p className={styles.meta}>
            {book.year ? `${book.year}` : 'Year N/A'} · {book.language || 'Language N/A'} ·{' '}
            {book.pages ? `${book.pages} pages` : 'Pages N/A'}
          </p>
          <p className="muted">
            {t('details.rating')}: {book.rating ?? 'N/A'} {book.rating ? '★' : ''}
          </p>
          <div className={styles.tags}>
            {book.genres?.map((genre) => (
              <span key={genre} className={styles.tag}>
                {genre}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.coverWrapper}>
          {book.coverImageUrl ? (
            <img src={book.coverImageUrl} alt={book.title} className={styles.cover} />
          ) : (
            <div className={styles.placeholder}>No Cover</div>
          )}
        </div>
      </div>

      <div className={styles.body}>
        <h3>{t('details.descriptionTitle')}</h3>
        <p>{book.description}</p>

        <div className={styles.metaGrid}>
          <div>
            <h4>{t('details.isbn')}</h4>
            <p>{book.isbn || 'N/A'}</p>
          </div>
          <div>
            <h4>{t('details.price')}</h4>
            <p>{book.price ? `$${book.price}` : 'N/A'}</p>
          </div>
          <div>
            <h4>{t('details.rating')}</h4>
            <p>{book.rating ?? 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <h3>{t('details.reviewsTitle')}</h3>
        {auth.user ? (
          <ReviewForm onSubmit={handleAddReview} loading={submittingReview} error={reviewsError} />
        ) : (
          <p className="muted">{t('details.loginToReview')}</p>
        )}
        {reviewsLoading && <p className="muted">{t('details.loadingReviews')}</p>}
        {reviewsError && <p className="errorText">{reviewsError}</p>}
        {!reviewsLoading && !reviewsError && (
          <ReviewList
            reviews={reviews}
            currentUserId={auth.user?.id}
            isAdmin={auth.user?.role === 'admin'}
            onDeleteReview={handleDeleteReview}
          />
        )}
      </div>
    </section>
  );
};

export default BookDetailsPage;
