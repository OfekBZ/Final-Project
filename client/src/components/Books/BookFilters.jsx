import styles from './BookFilters.module.css';

const BookFilters = ({ search, genre, year, onChange, view, onViewChange }) => {
  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Search by title, author, description"
        value={search}
        onChange={(e) => onChange({ search: e.target.value })}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => onChange({ genre: e.target.value })}
        className={styles.input}
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => onChange({ year: e.target.value })}
        className={styles.input}
      />
      <div className={styles.viewToggle}>
        <button
          type="button"
          className={`${styles.toggle} ${view === 'grid' ? styles.active : ''}`}
          onClick={() => onViewChange('grid')}
        >
          Grid
        </button>
        <button
          type="button"
          className={`${styles.toggle} ${view === 'table' ? styles.active : ''}`}
          onClick={() => onViewChange('table')}
        >
          Table
        </button>
      </div>
    </div>
  );
};

export default BookFilters;
