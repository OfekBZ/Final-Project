const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    genres: [{ type: String, trim: true }],
    tags: [{ type: String, trim: true }],
    year: { type: Number },
    pages: { type: Number },
    isbn: { type: String, unique: true, sparse: true, trim: true },
    language: { type: String, trim: true },
    coverImageUrl: { type: String, trim: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    price: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
