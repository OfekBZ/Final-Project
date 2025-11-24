import { useState } from 'react';
import styles from './Reviews.module.css';

const ReviewForm = ({ onSubmit, loading, error }) => {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');
    if (!rating || rating < 1 || rating > 5) {
      setValidationError('Rating must be between 1 and 5');
      return;
    }
    if (text && text.length < 3) {
      setValidationError('Review text must be at least 3 characters');
      return;
    }
    onSubmit({ rating: Number(rating), text });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fieldRow}>
        <label className={styles.label} htmlFor="rating">
          Rating
        </label>
        <select
          id="rating"
          className={styles.select}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          disabled={loading}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.fieldColumn}>
        <label className={styles.label} htmlFor="reviewText">
          Review
        </label>
        <textarea
          id="reviewText"
          className={styles.textarea}
          placeholder="Share your thoughts about this book"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
          rows={4}
        />
      </div>

      {(validationError || error) && (
        <p className={styles.error}>{validationError || error}</p>
      )}

      <button className={styles.submit} type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
