// const express = require('express');
// const {
//   getProgress,
//   completeLesson,
//   getNotes,
//   saveNotes
// } = require('../controllers/progressController');
// const { protect } = require('../middleware/auth');

// const router = express.Router();

// // Define route to get notes for a specific lesson
// router.get('/:courseId/notes/:lessonId', protect, getNotes);

// // Define other routes
// router.get('/:courseId', protect, getProgress);
// router.post('/:courseId/complete-lesson', protect, completeLesson);
// router.post('/:courseId/notes', protect, saveNotes);

// module.exports = router;

const express = require('express');
const { 
  getProgress, 
  completeLesson, 
  saveNotes,
  getNotes
} = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/:courseId', protect, getProgress);
router.post('/:courseId/complete-lesson', protect, completeLesson);
router.post('/:courseId/notes', protect, saveNotes);
router.get('/:courseId/notes/:lessonId', protect, getNotes);

module.exports = router;