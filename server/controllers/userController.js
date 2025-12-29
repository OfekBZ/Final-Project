const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { updateProfileSchema } = require('../validations/userValidation');

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  favorites: user.favorites,
});

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'Profile fetched', data: sanitizeUser(user) });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load profile' });
  }
};

const updateMe = async (req, res) => {
  try {
    const { error, value } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (value.name) {
      user.name = value.name;
    }

    if (value.password) {
      user.password = await bcrypt.hash(value.password, 10);
    }

    await user.save();

    return res.status(200).json({ message: 'Profile updated successfully', data: sanitizeUser(user) });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update profile' });
  }
};

module.exports = {
  getMe,
  updateMe,
};
