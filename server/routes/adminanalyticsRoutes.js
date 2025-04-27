const express = require('express');
const router = express.Router();
const { 
  getAdminStats, 
  getEnrollmentTrend,
  getActiveUsers
} = require('../controllers/adminanalyticsController');
const { protect, authorize } = require('../middleware/auth');

// Admin dashboard routes
router.get('/admin/stats', protect, authorize('admin'), getAdminStats);
router.get('/enrollment-trend', protect, authorize('admin'), getEnrollmentTrend);
router.get('/active-users', protect, authorize('admin'), getActiveUsers);

module.exports = router;