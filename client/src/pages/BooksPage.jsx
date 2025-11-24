import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookFilters from '../components/Books/BookFilters';
import BookGrid from '../components/Books/BookGrid';
import BookTable from '../components/Books/BookTable';
import { fetchBooks } from '../services/bookService';
import styles from '../styles/Books.module.css';
import { useLanguage } from '../context/LanguageContext';

const BooksPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [books, setBooks] = useState([]);
  const [view, setView] = useState('grid');
  const [filters, setFilters] = useState({ search: '', genre: '', year: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchBooks({
        search: filters.search || undefined,
        genre: filters.genre || undefined,
        year: filters.year || undefined,
      });
      setBooks(data);
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to load books';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (next) => {
    setFilters((prev) => ({ ...prev, ...next }));
  };

  const handleApplyFilters = () => {
    loadBooks();
  };

  const handleSelectBook = (book) => {
    navigate(`/books/${book._id}`);
  };

  return (
    <section>
      <header className={styles.pageHeader}>
        <div>
          <h1>{t('books.pageTitle')}</h1>
          <p className={styles.muted}>{t('books.pageSubtitle')}</p>
        </div>
        <button type="button" className={styles.primaryButton} onClick={handleApplyFilters}>
          {t('books.applyFilters')}
        </button>
      </header>

      <BookFilters
        search={filters.search}
        genre={filters.genre}
        year={filters.year}
        onChange={handleFilterChange}
        view={view}
        onViewChange={setView}
      />

      {loading && <p>{t('books.loadingBooks')}</p>}
      {error && <p className={styles.errorText}>{error}</p>}

      {!loading && !error && (
        <>
          {view === 'grid' ? (
            <BookGrid books={books} onSelect={handleSelectBook} />
          ) : (
            <BookTable books={books} onSelect={handleSelectBook} />
          )}
        </>
      )}
    </section>
  );
};

export default BooksPage;
