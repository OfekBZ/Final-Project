import BookCard from './BookCard';
import styles from './BookGrid.module.css';

const BookGrid = ({ books, onSelect }) => {
  if (!books.length) {
    return <p className={styles.empty}>No books found.</p>;
  }

  return (
    <div className={styles.grid}>
      {books.map((book) => (
        <BookCard key={book._id} book={book} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default BookGrid;
