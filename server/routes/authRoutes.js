// const express = require('express');
// const { register, login, getMe } = require('../controllers/authController');
// const { protect } = require('../middleware/auth');

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// router.get('/me', protect, getMe);
// router.post('/create-admin', protect, authorize('admin'), createAdmin);
// module.exports = router;

const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getMe, 
  protect, 
  authorize,
  createAdminUser 
} = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);

// Admin routes
router.post('/create-admin', protect, authorize('admin'), createAdminUser);

module.exports = router;