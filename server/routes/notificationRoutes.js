
// server/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const {
  sendCourseNotification,
  getUserNotifications,
  markAsRead
} = require('../controllers/notificationController');
const { protect, authorize } = require('../middleware/auth');

// Apply protect middleware to all routes
router.use(protect);

// Define routes
router.get('/', getUserNotifications);
router.put('/:id', markAsRead);
router.post('/course/:courseId', authorize('tutor', 'admin'), sendCourseNotification);

module.exports = router;