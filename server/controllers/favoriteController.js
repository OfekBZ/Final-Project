const User = require('../models/User');
const Book = require('../models/Book');

const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ favorites: user.favorites || [] });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load favorites' });
  }
};

const addFavorite = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const alreadyFavorite = user.favorites.some((fav) => fav.toString() === bookId);
    if (alreadyFavorite) {
      return res.status(200).json({ message: 'Book already in favorites' });
    }

    user.favorites.push(bookId);
    await user.save();

    return res.status(200).json({ message: 'Added to favorites', favorites: user.favorites });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add favorite' });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const bookId = req.params.id;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.favorites = user.favorites.filter((fav) => fav.toString() !== bookId);
    await user.save();

    return res.status(200).json({ message: 'Removed from favorites', favorites: user.favorites });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to remove favorite' });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
