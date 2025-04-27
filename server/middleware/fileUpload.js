// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure upload directory exists
// const uploadDir = 'uploads/';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Set storage engine
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function(req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// // Check file type
// const checkFileType = (file, cb) => {
//   // Allowed extensions
//   const filetypes = /jpeg|jpg|png|gif|pdf|mp4|webm|doc|docx|ppt|pptx|xls|xlsx/;
  
//   // Check extension
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
//   // Check mime type
//   const mimetype = filetypes.test(file.mimetype);
  
//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb('Error: Unsupported file format!');
//   }
// };

// // Initialize upload
// const upload = multer({
//   storage,
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
//   fileFilter: function(req, file, cb) {
//     checkFileType(file, cb);
//   }
// });

// module.exports = upload;


const express = require('express');
const multer = require('multer');
const path = require('path');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), getUsers)
  .post(protect, authorize('admin'), createUser);

router.route('/:id')
  .get(protect, getUser)
  .put(protect, upload.single('profilePicture'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

module.exports = router;