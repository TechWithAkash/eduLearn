// const express = require('express');
// const router = express.Router();
// const { protect, authorize } = require('../middleware/auth');
// const { getTutorEnrollments } = require('../controllers/enrollmentController');

// // Protect all routes
// router.use(protect);

// // Get enrollments for tutor's courses
// router.get('/tutor', authorize('tutor', 'admin'), getTutorEnrollments);

// module.exports = router;

// const express = require('express');
// const { 
//   getEnrollments, 
//   getTutorEnrollments, 
//   enrollInCourse,
//   unenrollFromCourse
// } = require('../controllers/enrollmentController');
// const { protect, authorize } = require('../middleware/auth');

// const router = express.Router();

// router.get('/', protect, getEnrollments);
// router.get('/tutor', protect, authorize('tutor', 'admin'), getTutorEnrollments);
// router.post('/:courseId', protect, enrollInCourse);
// router.delete('/:courseId', protect, unenrollFromCourse);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getTutorEnrollments } = require('../controllers/enrollmentController');

router.get('/tutor', protect, authorize('tutor', 'admin'), getTutorEnrollments);

module.exports = router;