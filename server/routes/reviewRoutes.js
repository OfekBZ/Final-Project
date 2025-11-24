const express = require('express');
const {
  getReviewsForBook,
  addReview,
  deleteReview,
} = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/book/:bookId', getReviewsForBook);
router.post('/book/:bookId', authMiddleware, addReview);
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;
