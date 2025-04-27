// // const express = require('express');
// // const {
// //   createAssignment,
// //   getCourseAssignments,
// //   submitAssignment,
// //   gradeAssignment
// // } = require('../controllers/assignmentController');
// // const { protect, authorize } = require('../middleware/auth');

// // const router = express.Router({ mergeParams: true });

// // router.use(protect);

// // router.route('/')
// //   .post(authorize('tutor', 'admin'), createAssignment);

// // router.route('/course/:courseId')
// //   .get(getCourseAssignments);

// // router.route('/:id/submit')
// //   .post(authorize('student'), submitAssignment);

// // router.route('/:id/grade/:submissionId')
// //   .post(authorize('tutor', 'admin'), gradeAssignment);

// // module.exports = router;


// // const express = require('express');
// // const multer = require('multer');
// // const path = require('path');
// // const {
// //   getAssignment,
// //   submitAssignment,
// //   gradeSubmission,
// //   getCourseAssignments
// // } = require('../controllers/assignmentController');
// // const { protect, authorize } = require('../middleware/auth');

// // // Set up file upload
// // const storage = multer.diskStorage({
// //   destination: function(req, file, cb) {
// //     cb(null, 'uploads/assignments');
// //   },
// //   filename: function(req, file, cb) {
// //     cb(null, `${Date.now()}-${req.user.id}${path.extname(file.originalname)}`);
// //   }
// // });

// // const upload = multer({
// //   storage,
// //   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
// //   fileFilter: function(req, file, cb) {
// //     // Check allowed file types
// //     const allowedTypes = ['.pdf', '.doc', '.docx', '.zip', '.jpg', '.jpeg', '.png'];
// //     const ext = path.extname(file.originalname).toLowerCase();
// //     if (allowedTypes.includes(ext)) {
// //       return cb(null, true);
// //     }
// //     cb(new Error('Invalid file type. Only PDF, DOC, DOCX, ZIP, JPG, JPEG, and PNG files are allowed.'));
// //   }
// // });

// // const router = express.Router({ mergeParams: true });

// // router.get('/:id', protect, getAssignment);
// // router.post('/:id/submit', protect, upload.single('assignmentFile'), submitAssignment);
// // router.put('/submissions/:id/grade', protect, authorize('admin', 'instructor'), gradeSubmission);
// // router.get('/course/:courseId', protect, getCourseAssignments);

// // module.exports = router;

// const express = require('express');
// const { 
//   getAssignment, 
//   submitAssignment, 
//   getCourseAssignments, 
//   loadAssignment 
// } = require('../controllers/assignmentController');
// const { protect } = require('../middleware/auth');

// const router = express.Router();

// router.get('/:id', protect, loadAssignment, getAssignment);
// router.post('/:id/submit', protect, loadAssignment, submitAssignment);
// router.get('/course/:courseId', protect, getCourseAssignments);

// module.exports = router;

const express = require('express');
const { 
  getAssignment, 
  submitAssignment, 
  getCourseAssignments, 
  loadAssignment 
} = require('../controllers/assignmentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Put more specific routes first
router.get('/course/:courseId', protect, getCourseAssignments);

// Then more general routes
router.get('/:id', protect, loadAssignment, getAssignment);
router.post('/:id/submit', protect, loadAssignment, submitAssignment);

module.exports = router;