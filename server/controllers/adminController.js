const User = require('../models/User');
const Book = require('../models/Book');
const Review = require('../models/Review');

const getStats = async (req, res) => {
  try {
    const [usersCount, booksCount, reviewsCount] = await Promise.all([
      User.countDocuments(),
      Book.countDocuments(),
      Review.countDocuments(),
    ]);
    return res.status(200).json({ usersCount, booksCount, reviewsCount });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch stats' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('_id name email role createdAt')
      .sort({ createdAt: -1 });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch users' });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (req.user.id === id) {
      return res.status(400).json({ message: 'You cannot change your own role' });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select(
      '_id name email role createdAt'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user, message: 'Role updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update user role' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id === id) {
      return res.status(400).json({ message: 'You cannot delete yourself' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await Review.deleteMany({ user: id });
    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete user' });
  }
};

module.exports = {
  getStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
};
