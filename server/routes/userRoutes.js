const express = require('express');
const { getMe, updateMe } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/me', getMe);
router.patch('/me', updateMe);

module.exports = router;
