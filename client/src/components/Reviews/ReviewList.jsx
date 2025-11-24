import ReviewItem from './ReviewItem';
import styles from './Reviews.module.css';

const ReviewList = ({ reviews, currentUserId, isAdmin, onDeleteReview }) => {
  if (!reviews.length) {
    return <p className={styles.empty}>No reviews yet.</p>;
  }

  return (
    <div className={styles.list}>
      {reviews.map((review) => {
        const canDelete = isAdmin || review.user?._id === currentUserId;
        return (
          <ReviewItem
            key={review._id}
            review={review}
            canDelete={canDelete}
            onDelete={onDeleteReview}
          />
        );
      })}
    </div>
  );
};

export default ReviewList;
