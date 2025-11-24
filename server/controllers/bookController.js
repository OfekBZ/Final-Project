const Book = require('../models/Book');
const { createBookSchema, updateBookSchema } = require('../validations/bookValidation');

const getBooks = async (req, res) => {
  try {
    const { search, genre, year } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (genre) {
      filter.genres = { $in: [genre] };
    }

    if (year) {
      const parsedYear = parseInt(year, 10);
      if (!Number.isNaN(parsedYear)) {
        filter.year = parsedYear;
      }
    }

    const books = await Book.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch books' });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch book' });
  }
};

const createBook = async (req, res) => {
  try {
    const { error, value } = createBookSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingIsbn = value.isbn ? await Book.findOne({ isbn: value.isbn }) : null;
    if (existingIsbn) {
      return res.status(409).json({ message: 'A book with this ISBN already exists' });
    }

    const book = await Book.create(value);
    return res.status(201).json({ book, message: 'Book created successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create book' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { error, value } = updateBookSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (value.isbn) {
      const duplicate = await Book.findOne({ isbn: value.isbn, _id: { $ne: req.params.id } });
      if (duplicate) {
        return res.status(409).json({ message: 'A book with this ISBN already exists' });
      }
    }

    const updated = await Book.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json({ book: updated, message: 'Book updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update book' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete book' });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
