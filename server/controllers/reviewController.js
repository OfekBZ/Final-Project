const Review = require('../models/Review');
const Book = require('../models/Book');
const { createReviewSchema } = require('../validations/reviewValidation');

const computeAndSetAverageRating = async (bookId) => {
  const reviews = await Review.find({ book: bookId });
  if (!reviews.length) {
    await Book.findByIdAndUpdate(bookId, { rating: 0 });
    return;
  }
  const avg =
    reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / (reviews.length || 1);
  await Book.findByIdAndUpdate(bookId, { rating: Number(avg.toFixed(2)) });
};

const getReviewsForBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ book: bookId })
      .populate('user', 'name role')
      .sort({ createdAt: -1 });
    return res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load reviews' });
  }
};

const addReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { error, value } = createReviewSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const existing = await Review.findOne({ book: bookId, user: req.user.id });
    if (existing) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = await Review.create({
      book: bookId,
      user: req.user.id,
      rating: value.rating,
      text: value.text,
    });

    await computeAndSetAverageRating(bookId);

    return res.status(201).json({ review, message: 'Review added successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to add review' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const isOwner = review.user.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    await Review.findByIdAndDelete(reviewId);
    await computeAndSetAverageRating(review.book);

    return res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete review' });
  }
};

module.exports = {
  getReviewsForBook,
  addReview,
  deleteReview,
};
