const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getDashboardData } = require('../controllers/tutorController');

// Protect all routes
router.use(protect);
router.use(authorize('tutor', 'admin'));

// Get dashboard data
router.get('/dashboard', getDashboardData);

module.exports = router;