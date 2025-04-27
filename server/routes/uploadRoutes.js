const express = require('express');
const {
  uploadFile,
  uploadCourseThumbnail
} = require('../controllers/uploadController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', authorize('tutor', 'admin'), uploadFile);
router.post('/courses/:id/thumbnail', uploadCourseThumbnail);

module.exports = router;