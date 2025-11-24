import styles from './BookTable.module.css';

const BookTable = ({ books, onSelect }) => {
  if (!books.length) {
    return <p className={styles.empty}>No books found.</p>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Genres</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} onClick={() => onSelect?.(book)} className={styles.row}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year || 'N/A'}</td>
              <td>{book.genres?.join(', ') || 'N/A'}</td>
              <td>{book.language || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
