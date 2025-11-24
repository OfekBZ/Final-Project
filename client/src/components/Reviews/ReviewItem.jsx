import styles from './Reviews.module.css';

const renderStars = (rating) => {
  const full = '★'.repeat(Math.round(rating));
  const empty = '☆'.repeat(5 - Math.round(rating));
  return `${full}${empty}`;
};

const ReviewItem = ({ review, canDelete, onDelete }) => {
  return (
    <div className={styles.reviewItem}>
      <div className={styles.reviewHeader}>
        <div>
          <p className={styles.reviewer}>{review.user?.name || 'User'}</p>
          <p className={styles.rating}>{renderStars(review.rating)} ({review.rating})</p>
        </div>
        <span className={styles.timestamp}>{new Date(review.createdAt).toLocaleString()}</span>
      </div>
      {review.text && <p className={styles.text}>{review.text}</p>}
      {canDelete && (
        <button className={styles.deleteBtn} type="button" onClick={() => onDelete(review._id)}>
          Delete
        </button>
      )}
    </div>
  );
};

export default ReviewItem;
