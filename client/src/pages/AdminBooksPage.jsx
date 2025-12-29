import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchBooks } from '../services/bookService';
import { createBook, updateBook, deleteBook } from '../services/adminBookService';
import adminStyles from '../styles/Admin.module.css';
import formStyles from '../styles/AdminBooks.module.css';

const emptyForm = {
  title: '',
  author: '',
  description: '',
  genres: '',
  tags: '',
  year: '',
  pages: '',
  isbn: '',
  language: '',
  coverImageUrl: '',
  price: '',
};

const AdminBooksPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [formError, setFormError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!auth.user || auth.user.role !== 'admin') {
      navigate('/');
    }
  }, [auth, navigate]);

  const loadBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchBooks();
      setBooks(Array.isArray(data) ? data : data?.books || []);
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to load books';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.user?.role === 'admin') {
      loadBooks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user?.role]);

  const handleDelete = async (bookId) => {
    if (!window.confirm('Delete this book?')) return;
    setActionId(bookId);
    setError('');
    setStatus('');
    try {
      await deleteBook(bookId);
      setBooks((prev) => prev.filter((book) => book._id !== bookId));
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to delete book';
      setError(message);
    } finally {
      setActionId(null);
    }
  };

  const urlRegex = /^https?:\/\/\S+/i;

  const buildPayload = () => {
    const trimmedTitle = form.title.trim();
    const trimmedAuthor = form.author.trim();
    const trimmedDescription = form.description.trim();

    if (!trimmedTitle) {
      setFormError('Title is required');
      return null;
    }
    if (!trimmedAuthor) {
      setFormError('Author is required');
      return null;
    }
    if (!trimmedDescription || trimmedDescription.length < 10) {
      setFormError('Description must be at least 10 characters');
      return null;
    }
    if (form.coverImageUrl && !urlRegex.test(form.coverImageUrl.trim())) {
      setFormError('Enter a valid cover image URL (http/https)');
      return null;
    }

    const payload = {
      title: trimmedTitle,
      author: trimmedAuthor,
      description: trimmedDescription,
    };

    if (form.genres.trim()) {
      payload.genres = form.genres
        .split(',')
        .map((g) => g.trim())
        .filter(Boolean);
    }

    if (form.tags.trim()) {
      payload.tags = form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }

    if (form.year) {
      const parsedYear = parseInt(form.year, 10);
      if (Number.isNaN(parsedYear)) {
        setFormError('Year must be a number');
        return null;
      }
      payload.year = parsedYear;
    }

    if (form.pages) {
      const parsedPages = parseInt(form.pages, 10);
      if (Number.isNaN(parsedPages)) {
        setFormError('Pages must be a number');
        return null;
      }
      payload.pages = parsedPages;
    }

    if (form.price) {
      const parsedPrice = Number(form.price);
      if (Number.isNaN(parsedPrice)) {
        setFormError('Price must be a number');
        return null;
      }
      payload.price = parsedPrice;
    }

    if (form.language.trim()) {
      payload.language = form.language.trim();
    }

    if (form.isbn.trim()) {
      payload.isbn = form.isbn.trim();
    }

    if (form.coverImageUrl.trim()) {
      payload.coverImageUrl = form.coverImageUrl.trim();
    }

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setStatus('');
    const payload = buildPayload();
    if (!payload) return;

    setActionId(editing?._id || 'new');
    try {
      if (editing) {
        await updateBook(editing._id, payload);
        setStatus('Book updated successfully');
      } else {
        await createBook(payload);
        setStatus('Book created successfully');
      }
      await loadBooks();
      setForm(emptyForm);
      setEditing(null);
      setShowForm(false);
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to save book';
      setFormError(message);
    } finally {
      setActionId(null);
    }
  };

  const startCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
    setFormError('');
    setStatus('');
  };

  const startEdit = (book) => {
    setEditing(book);
    setForm({
      title: book.title || '',
      author: book.author || '',
      description: book.description || '',
      genres: book.genres?.join(', ') || '',
      tags: book.tags?.join(', ') || '',
      year: book.year || '',
      pages: book.pages || '',
      isbn: book.isbn || '',
      language: book.language || '',
      coverImageUrl: book.coverImageUrl || '',
      price: book.price ?? '',
    });
    setShowForm(true);
    setFormError('');
    setStatus('');
  };

  return (
    <section>
      <div className={formStyles.actionsBar}>
        <div>
          <h1>Admin Books</h1>
          <p className={adminStyles.muted}>Create, edit, and remove books in the catalog.</p>
        </div>
        <button type="button" className={adminStyles.button} onClick={startCreate}>
          Add Book
        </button>
      </div>

      {status && <p className={formStyles.successText}>{status}</p>}
      {error && <p className={adminStyles.errorText}>{error}</p>}

      {showForm && (
        <form className={formStyles.formCard} onSubmit={handleSubmit} noValidate>
          <div className={formStyles.inlineRow}>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor="title">
                Title *
              </label>
              <input
                id="title"
                className={formStyles.input}
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor="author">
                Author *
              </label>
              <input
                id="author"
                className={formStyles.input}
                value={form.author}
                onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="description">
              Description *
            </label>
            <textarea
              id="description"
              className={formStyles.textarea}
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className={formStyles.inlineRow}>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor="genres">
                Genres (comma separated)
              </label>
              <input
                id="genres"
                className={formStyles.input}
                value={form.genres}
                onChange={(e) => setForm((prev) => ({ ...prev, genres: e.target.value }))}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor="tags">
                Tags (comma separated)
              </label>
              <input
                id="tags"
                className={formStyles.input}
                value={form.tags}
                onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
              />
            </div>
          </div>

          <div className={formStyles.inlineRow}>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor="year">
                Year
              </label>
              <input
                id="year"
                className={formStyles.input}
                value={form.year}
                onChange={(e) => setForm((prev) => ({ ...prev, year: e.target.value }))}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor="pages">
                Pages
              </label>
              <input
                id="pages"
                className={formStyles.input}
                value={form.pages}
                onChange={(e) => setForm((prev) => ({ ...prev, pages: e.target.value }))}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor="price">
                Price
              </label>
              <input
                id="price"
                className={formStyles.input}
                value={form.price}
                onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
              />
            </div>
          </div>

          <div className={formStyles.inlineRow}>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor="language">
                Language
              </label>
              <input
                id="language"
                className={formStyles.input}
                value={form.language}
                onChange={(e) => setForm((prev) => ({ ...prev, language: e.target.value }))}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor="isbn">
                ISBN
              </label>
              <input
                id="isbn"
                className={formStyles.input}
                value={form.isbn}
                onChange={(e) => setForm((prev) => ({ ...prev, isbn: e.target.value }))}
              />
            </div>
          </div>

          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="coverImageUrl">
              Cover Image URL
            </label>
            <input
              id="coverImageUrl"
              className={formStyles.input}
              value={form.coverImageUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, coverImageUrl: e.target.value }))}
            />
          </div>

          {formError && <p className={formStyles.errorText}>{formError}</p>}

          <div className={formStyles.formActions}>
            <button className={formStyles.button} type="submit" disabled={actionId === (editing?._id || 'new')}>
              {editing ? 'Save Changes' : 'Create Book'}
            </button>
            <button
              className={formStyles.ghostButton}
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditing(null);
                setFormError('');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <p className={adminStyles.muted}>Loading books...</p>}

      {!loading && (
        <div className={adminStyles.tableWrapper}>
          <table className={adminStyles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.year || 'N/A'}</td>
                  <td>{new Date(book.updatedAt || book.createdAt).toLocaleString()}</td>
                  <td>
                    <div className={formStyles.formActions}>
                      <button
                        type="button"
                        className={adminStyles.button}
                        onClick={() => startEdit(book)}
                        disabled={actionId === book._id}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={adminStyles.deleteBtn}
                        onClick={() => handleDelete(book._id)}
                        disabled={actionId === book._id}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {books.length === 0 && !error && !loading && <p className={adminStyles.muted}>No books yet.</p>}
        </div>
      )}
    </section>
  );
};

export default AdminBooksPage;
