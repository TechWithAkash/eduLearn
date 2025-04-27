// File: server/routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const {
  getStudentProgress,
  getCourseAnalytics
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');


// Apply protect middleware to all routes
router.use(protect);

// Define routes
router.get('/student/:studentId/course/:courseId', getStudentProgress);
router.get('/courses/:courseId', getCourseAnalytics);

module.exports = router;