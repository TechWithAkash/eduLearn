// const express = require('express');
// const {
//   getUsers,
//   getUser,
//   updateUser,
//   deleteUser
// } = require('../controllers/userController');
// const { protect, authorize } = require('../middleware/auth');

// const router = express.Router();

// router.use(protect); // All user routes are protected

// router.route('/')
//   .get(authorize('admin'), getUsers);

// router.route('/:id')
//   .get(getUser)
//   .put(updateUser)
//   .delete(authorize('admin'), deleteUser);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser,
  getUserStats,
  getRecentUsers,
  updateUserStatus
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// Protect all routes
router.use(protect);

// Admin-only routes
router.route('/')
  .get(authorize('admin'), getUsers)
  .post(authorize('admin'), createUser);

router.get('/stats', authorize('admin'), getUserStats);
router.get('/recent', authorize('admin'), getRecentUsers);

// Routes for both admin and users (with permission checks inside controllers)
router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(authorize('admin'), deleteUser);

router.put('/:id/status', authorize('admin'), updateUserStatus);

module.exports = router;