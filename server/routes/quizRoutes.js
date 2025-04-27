// const express = require('express');
// const {
//   getQuiz,
//   submitQuiz,
//   getCourseQuizzes
// } = require('../controllers/quizController');
// const { protect, authorize } = require('../middleware/auth');

// const router = express.Router({ mergeParams: true });

// router.get('/:id', protect, getQuiz);
// router.post('/:id/submit', protect, submitQuiz);
// router.get('/course/:courseId', protect, getCourseQuizzes);

// module.exports = router;

const express = require('express');
const { getQuiz, submitQuiz, getCourseQuizzes } = require('../controllers/quizController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/:id', protect, getQuiz);
router.post('/:id/submit', protect, submitQuiz);
router.get('/course/:courseId', protect, getCourseQuizzes);

module.exports = router;