// server/routes/paymentRoutes.js
const express = require('express');
const {
  createOrder,
  verifyPayment
} = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/courses/:id', authorize('student'), createOrder);
router.post('/verify', authorize('student'), verifyPayment);

module.exports = router;