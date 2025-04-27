
// //server/index.js
// require('dotenv').config(); // 👈 this must be first
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const path = require('path');
// const errorHandler = require('./middleware/errorHandler');
// const analyticsRoutes = require('./routes/analyticsRoutes');
// const notificationRoutes = require('./routes/notificationRoutes');
// const progressRoutes = require('./routes/progressRoutes');

// // Routes
// const authRoutes = require('./routes/authRoutes');
// const courseRoutes = require('./routes/courseRoutes');
// const userRoutes = require('./routes/userRoutes');
// const discussionRoutes = require('./routes/discussionRoutes');
// const uploadRoutes = require('./routes/uploadRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');
// const quizRoutes = require('./routes/quizRoutes');
// const assignmentRoutes = require('./routes/assignmentRoutes');


// // Load environment variables
// dotenv.config();

// // Initialize express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/courses', courseRoutes);
// app.use('/api/users', userRoutes);
// // app.use('/api/assignments', assignmentRoutes);
// app.use('/api/courses/:courseId/discussions', discussionRoutes);
// app.use('/api/upload', uploadRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/progress', progressRoutes);
// // Add these routes to your express app
// app.use('/api/quizzes', require('./routes/quizRoutes'));
// app.use('/api/assignments', require('./routes/assignmentRoutes'));
// // Health check route
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'ok', message: 'Server is running' });
// });

// // Global error handler
// app.use(errorHandler);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


//server.index.js
require('dotenv').config(); // 👈 only once
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const multer = require('multer');

// Routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const progressRoutes = require('./routes/progressRoutes');
const quizRoutes = require('./routes/quizRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Create multer upload instance
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max file size
});
// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/auth', authRoutes);
// Apply the multer middleware to the user update route
app.use('/api/users/:id', upload.single('profilePicture'));

app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses/:courseId/discussions', discussionRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/payments', paymentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/enrollments', enrollmentRoutes);
// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
