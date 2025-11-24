const express = require('express');
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getFavorites);
router.post('/:id', authMiddleware, addFavorite);
router.delete('/:id', authMiddleware, removeFavorite);

module.exports = router;
