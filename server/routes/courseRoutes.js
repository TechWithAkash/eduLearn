// // // // const express = require('express');
// // // // const {
// // // //   getCourses,
// // // //   getCourse,
// // // //   createCourse,
// // // //   updateCourse,
// // // //   deleteCourse,
// // // //   enrollCourse
// // // // } = require('../controllers/courseController');

// // // // const { protect, authorize } = require('../middleware/auth');

// // // // const router = express.Router();

// // // // router.route('/')
// // // //   .get(getCourses)
// // // //   .post(protect, authorize('tutor', 'admin'), createCourse);

// // // // router.route('/:id')
// // // //   .get(getCourse)
// // // //   .put(protect, updateCourse)
// // // //   .delete(protect, deleteCourse);

// // // // router.post('/:id/enroll', protect, authorize('student'), enrollCourse);

// // // // module.exports = router;

// // // const express = require('express');
// // // const {
// // //   getCourses,
// // //   getCourse,
// // //   getEnrolledCourses,
// // //   createCourse,
// // //   updateCourse,
// // //   deleteCourse,
// // //   enrollCourse
// // // } = require('../controllers/courseController');

// // // const { protect, authorize } = require('../middleware/auth');

// // // const router = express.Router();

// // // // Define this route before the /:id route to avoid parameter conflict
// // // router.get('/user/enrolled', protect, getEnrolledCourses);

// // // router.route('/')
// // //   .get(getCourses)
// // //   .post(protect, authorize('tutor', 'admin'), createCourse);

// // // router.route('/:id')
// // //   .get(getCourse)
// // //   .put(protect, updateCourse)
// // //   .delete(protect, deleteCourse);

// // // router.post('/:id/enroll', protect, authorize('student'), enrollCourse);

// // // module.exports = router;

// // // const express = require('express');
// // // const router = express.Router();
// // // const multer = require('multer');
// // // const path = require('path');
// // // const { protect, authorize } = require('../middleware/auth');
// // // const {
// // //   getCourses,
// // //   getCourse,
// // //   createCourse,
// // //   updateCourse,
// // //   deleteCourse,
// // //   enrollCourse,
// // //   getTutorCourses,
// // //   getEnrolledCourses,
// // //   // Add other controller functions as needed
// // // } = require('../controllers/courseController');
// // // const fs = require('fs');

// // // // Create uploads directory if it doesn't exist
// // // const uploadsDir = path.join(__dirname, 'uploads');
// // // if (!fs.existsSync(uploadsDir)) {
// // //   fs.mkdirSync(uploadsDir);
// // // }
// // // // Set up file storage
// // // const storage = multer.diskStorage({
// // //   destination: function(req, file, cb) {
// // //     cb(null, path.join(__dirname, '../uploads/'));
// // //   },
// // //   filename: function(req, file, cb) {
// // //     cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
// // //   }
// // // });

// // // // File filter
// // // const fileFilter = (req, file, cb) => {
// // //   // Accept images only
// // //   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
// // //     return cb(new Error('Only image files are allowed!'), false);
// // //   }
// // //   cb(null, true);
// // // };

// // // // Initialize multer
// // // const upload = multer({ 
// // //   storage: storage,
// // //   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// // //   fileFilter: fileFilter
// // // });

// // // // Course routes
// // // router.route('/')
// // //   .get(getCourses)
// // //   .post(protect, authorize('tutor', 'admin'), upload.single('coverImage'), createCourse);

// // // router.route('/tutor')
// // //   .get(protect, authorize('tutor', 'admin'), getTutorCourses);

// // // router.route('/enrolled')
// // //   .get(protect, getEnrolledCourses);

// // // router.route('/:id')
// // //   .get(getCourse)
// // //   .put(protect, authorize('tutor', 'admin'), upload.single('coverImage'), updateCourse)
// // //   .delete(protect, authorize('tutor', 'admin'), deleteCourse);

// // // router.route('/:id/enroll')
// // //   .post(protect, authorize('student'), enrollCourse);

// // // module.exports = router;


// // const express = require('express');
// // const router = express.Router();
// // const multer = require('multer');
// // const path = require('path');
// // const { protect, authorize } = require('../middleware/auth');
// // const fs = require('fs');

// // // Import controller functions - make sure all these exist in courseController.js
// // const {
// //   getCourses,
// //   getCourse,
// //   createCourse,
// //   updateCourse,
// //   deleteCourse,
// //   enrollCourse,
// //   // getTutorCourses,
// //   // getEnrolledCourses
// // } = require('../controllers/courseController');

// // // Create uploads directory at server root level (not inside routes)
// // const uploadsDir = path.join(__dirname, '../uploads/');
// // if (!fs.existsSync(uploadsDir)) {
// //   fs.mkdirSync(uploadsDir, { recursive: true });
// // }

// // // Set up file storage
// // // const storage = multer.diskStorage({
// // //   destination: function(req, file, cb) {
// // //     cb(null, uploadsDir);
// // //   },
// // //   filename: function(req, file, cb) {
// // //     cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
// // //   }
// // // });
// // // Configure multer for file uploads
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, uploadsDir);
// //   },
// //   filename: (req, file, cb) => {
// //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// //     const ext = path.extname(file.originalname);
// //     cb(null, uniqueSuffix + ext);
// //   }
// // });

// // // File filter
// // const fileFilter = (req, file, cb) => {
// //   // Accept images only
// //   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
// //     return cb(new Error('Only image files are allowed!'), false);
// //   }
// //   cb(null, true);
// // };

// // // Initialize multer
// // const upload = multer({ 
// //   storage: storage,
// //   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// //   fileFilter: fileFilter
// // });

// // // Course routes
// // router.route('/')
// //   .get(getCourses)
// //   .post(protect, authorize('tutor', 'admin'), upload.single('coverImage'), createCourse);

// // // Only define routes with handlers that exist
// // router.get('/tutor', protect, authorize('tutor', 'admin'), getTutorCourses);
// // router.get('/enrolled', protect, getEnrolledCourses);

// // router.route('/:id')
// //   .get(getCourse)
// //   .put(protect, authorize('tutor', 'admin'), upload.single('coverImage'), updateCourse)
// //   .delete(protect, authorize('tutor', 'admin'), deleteCourse);

// // router.post('/:id/enroll', protect, authorize('student'), enrollCourse);

// // module.exports = router;

// // server/routes/courseRoutes.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { protect, authorize } = require('../middleware/auth');

// // Import course controller - uncomment/modify as needed based on your actual controller
// const {
//   getCourses,
//   getCourse,
//   createCourse,
//   updateCourse,
//   deleteCourse,
//   enrollCourse
//   // getTutorCourses,  // Uncomment if this function exists in your controller
//   // getEnrolledCourses // Uncomment if this function exists in your controller
// } = require('../controllers/courseController');

// // Create uploads directory if it doesn't exist
// const uploadsDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = path.extname(file.originalname);
//     cb(null, uniqueSuffix + ext);
//   }
// });

// const upload = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     // Accept images only
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//       return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
//   }
// });

// // Define routes
// router.route('/')
//   .get(getCourses)
//   .post(protect, authorize('tutor', 'admin'), upload.single('coverImage'), createCourse);

// router.route('/:id')
//   .get(getCourse)
//   .put(protect, authorize('tutor', 'admin'), upload.single('coverImage'), updateCourse)
//   .delete(protect, authorize('tutor', 'admin'), deleteCourse);

// router.route('/:id/enroll')
//   .post(protect, authorize('student'), enrollCourse);

// // Add these routes only if the corresponding controller functions exist
// // If you want to add these routes, make sure the controller functions exist!
// /*
// router.route('/tutor')
//   .get(protect, authorize('tutor', 'admin'), getTutorCourses);

// router.route('/enrolled')
//   .get(protect, getEnrolledCourses);
// */

// module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect, authorize } = require('../middleware/auth');

// Import all the controller functions
// const {
//   getCourses,
//   getCourse,
//   createCourse,
//   updateCourse,
//   deleteCourse,
//   enrollCourse,
//   getTutorCourses,
//   getEnrolledCourses,
//   getRecommendedCourses,
// } = require('../controllers/courseController');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getTutorCourses,
  getEnrolledCourses,
  getRecommendedCourses,
} = require('../controllers/courseController');
// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Define routes
// Special routes first
router.get('/tutor', protect, authorize('tutor', 'admin'), getTutorCourses);

router.get('/enrolled', protect, getEnrolledCourses);
router.get('/user/enrolled', protect, getEnrolledCourses);
router.get('/recommended', protect, getRecommendedCourses);
// Standard CRUD routes
router.route('/')
  .get(getCourses)
  .post(protect, authorize('tutor', 'admin'), upload.single('coverImage'), createCourse);

// Course-specific routes
router.route('/:id')
  .get(getCourse)
  .put(protect, authorize('tutor', 'admin'), upload.single('coverImage'), updateCourse)
  .delete(protect, authorize('tutor', 'admin'), deleteCourse);

// Enrollment route
router.post('/:id/enroll', protect, authorize('student'), enrollCourse);

module.exports = router;