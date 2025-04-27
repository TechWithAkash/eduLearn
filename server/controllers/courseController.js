// // const Course = require('../models/Course');
// // const User = require('../models/User');

// // // @desc    Get all courses
// // // @route   GET /api/courses
// // // @access  Public
// // const getCourses = async (req, res) => {
// //   try {
// //     const courses = await Course.find({ isPublished: true })
// //       .populate('instructor', 'name email')
// //       .select('title description thumbnail price averageRating category grade');

// //     res.status(200).json({
// //       success: true,
// //       count: courses.length,
// //       data: courses
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Get single course
// // // @route   GET /api/courses/:id
// // // @access  Public
// // const getCourse = async (req, res) => {
// //   try {
// //     const course = await Course.findById(req.params.id)
// //       .populate('instructor', 'name email profilePicture')
// //       .populate('ratings.student', 'name profilePicture');

// //     if (!course) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Course not found'
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       data: course
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Create new course
// // // @route   POST /api/courses
// // // @access  Private (Tutors and Admins)
// // const createCourse = async (req, res) => {
// //   try {
// //     // Add user to req.body
// //     req.body.instructor = req.user.id;

// //     // Check if user is a tutor or admin
// //     if (req.user.role !== 'tutor' && req.user.role !== 'admin') {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Only tutors and admins can create courses'
// //       });
// //     }

// //     const course = await Course.create(req.body);

// //     // Add course to user's created courses
// //     await User.findByIdAndUpdate(req.user.id, {
// //       $push: { createdCourses: course._id }
// //     });

// //     res.status(201).json({
// //       success: true,
// //       data: course
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Update course
// // // @route   PUT /api/courses/:id
// // // @access  Private (Course Owner or Admin)
// // const updateCourse = async (req, res) => {
// //   try {
// //     let course = await Course.findById(req.params.id);

// //     if (!course) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Course not found'
// //       });
// //     }

// //     // Make sure user is course owner or admin
// //     if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Not authorized to update this course'
// //       });
// //     }

// //     course = await Course.findByIdAndUpdate(req.params.id, req.body, {
// //       new: true,
// //       runValidators: true
// //     });

// //     res.status(200).json({
// //       success: true,
// //       data: course
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Delete course
// // // @route   DELETE /api/courses/:id
// // // @access  Private (Course Owner or Admin)
// // const deleteCourse = async (req, res) => {
// //   try {
// //     const course = await Course.findById(req.params.id);

// //     if (!course) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Course not found'
// //       });
// //     }

// //     // Make sure user is course owner or admin
// //     if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Not authorized to delete this course'
// //       });
// //     }

// //     await course.remove();

// //     // Remove course from user's created courses
// //     await User.findByIdAndUpdate(course.instructor, {
// //       $pull: { createdCourses: course._id }
// //     });

// //     res.status(200).json({
// //       success: true,
// //       data: {}
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Enroll in a course
// // // @route   POST /api/courses/:id/enroll
// // // @access  Private (Students)
// // const enrollCourse = async (req, res) => {
// //   try {
// //     const course = await Course.findById(req.params.id);

// //     if (!course) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Course not found'
// //       });
// //     }

// //     // Check if already enrolled
// //     if (course.enrolledStudents.includes(req.user.id)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Already enrolled in this course'
// //       });
// //     }

// //     // Add student to course
// //     course.enrolledStudents.push(req.user.id);
// //     await course.save();

// //     // Add course to student's enrolled courses
// //     await User.findByIdAndUpdate(req.user.id, {
// //       $push: { enrolledCourses: course._id }
// //     });

// //     res.status(200).json({
// //       success: true,
// //       data: course
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // module.exports = {
// //   getCourses,
// //   getCourse,
// //   createCourse,
// //   updateCourse,
// //   deleteCourse,
// //   enrollCourse
// // };
// //server/controllers/courseController.js
// // const Course = require('../models/Course');
// // const User = require('../models/User');

// // // @desc    Get all courses
// // // @route   GET /api/courses
// // // @access  Public
// // const getCourses = async (req, res) => {
// //   try {
// //     const courses = await Course.find({ isPublished: true })
// //       .populate('instructor', 'name email')
// //       .select('title description thumbnail price averageRating category grade');

// //     res.status(200).json({
// //       success: true,
// //       count: courses.length,
// //       data: courses
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Get single course
// // // @route   GET /api/courses/:id
// // // @access  Public
// // const getCourse = async (req, res) => {
// //   try {
// //     // Check if the id parameter is "enrolled" to prevent the ObjectId casting error
// //     if (req.params.id === 'enrolled') {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Invalid course ID'
// //       });
// //     }

// //     const course = await Course.findById(req.params.id)
// //       .populate('instructor', 'name email profilePicture')
// //       .populate('ratings.student', 'name profilePicture');
    
// //     if (!course) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Course not found'
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       data: course
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };
// // // Add these functions if they don't exist

// // // @desc    Get all courses created by a tutor
// // // @route   GET /api/courses/tutor
// // // @access  Private (Tutors only)
// // const getTutorCourses = async (req, res) => {
// //   try {
// //     const courses = await Course.find({ instructor: req.user.id })
// //       .sort({ createdAt: -1 })
// //       .populate('instructor', 'name avatar');
    
// //     res.status(200).json({
// //       success: true,
// //       count: courses.length,
// //       data: courses
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Get courses enrolled by a student
// // // @route   GET /api/courses/enrolled
// // // @access  Private (Students only)
// // const getEnrolledCourses = async (req, res) => {
// //   try {
// //     // Find user and populate their enrolledCourses
// //     const user = await User.findById(req.user.id).populate({
// //       path: 'enrolledCourses',
// //       populate: {
// //         path: 'instructor',
// //         select: 'name avatar'
// //       }
// //     });

// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'User not found'
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       count: user.enrolledCourses.length,
// //       data: user.enrolledCourses
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Create new course
// // // @route   POST /api/courses
// // // @access  Private (Tutors and Admins)
// // const createCourse = async (req, res) => {
// //   try {
// //     // Ensure req.body exists
// //     if (!req.body) {
// //       req.body = {};
// //     }

// //     // Log what's being received
// //     console.log("Creating course with user:", req.user);
    
// //     // Set instructor to the current user ID
// //     req.body.instructor = req.user.id;

// //     // Check user role
// //     if (req.user.role !== 'tutor' && req.user.role !== 'admin') {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Only tutors and admins can create courses'
// //       });
// //     }

// //     // Parse modules if it's a string
// //     if (typeof req.body.modules === 'string') {
// //       req.body.modules = JSON.parse(req.body.modules);
// //     }

// //     // Set cover image path if a file was uploaded
// //     if (req.file) {
// //       req.body.coverImage = `/uploads/${req.file.filename}`;
// //     }

// //     // Create the course
// //     const course = await Course.create(req.body);
    
// //     // Add course to user's created courses
// //     await User.findByIdAndUpdate(req.user.id, {
// //       $push: { createdCourses: course._id }
// //     });

// //     res.status(201).json({
// //       success: true,
// //       data: course
// //     });
// //   } catch (error) {
// //     console.error("Error creating course:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: error.message || 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Get enrolled courses for a user
// // // @route   GET /api/courses/user/enrolled
// // // // @access  Private
// // // const getEnrolledCourses = async (req, res) => {
// // //   try {
// // //     const user = await User.findById(req.user.id).populate('enrolledCourses');
    
// // //     if (!user) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'User not found'
// // //       });
// // //     }

// // //     res.status(200).json({
// // //       success: true,
// // //       count: user.enrolledCourses.length,
// // //       data: user.enrolledCourses
// // //     });
// // //   } catch (error) {
// // //     console.error(error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Server Error'
// // //     });
// // //   }
// // // };

// // // @desc    Create new course
// // // @route   POST /api/courses
// // // @access  Private (Tutors and Admins)
// // // const createCourse = async (req, res) => {
// // //   try {
// // //     // Add user to req.body
// // //     req.body.instructor = req.user.id;

// // //     // Check if user is a tutor or admin
// // //     if (req.user.role !== 'tutor' && req.user.role !== 'admin') {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Only tutors and admins can create courses'
// // //       });
// // //     }

// // //     const course = await Course.create(req.body);
    
// // //     // Add course to user's created courses
// // //     await User.findByIdAndUpdate(req.user.id, {
// // //       $push: { createdCourses: course._id }
// // //     });

// // //     res.status(201).json({
// // //       success: true,
// // //       data: course
// // //     });
// // //   } catch (error) {
// // //     console.error(error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Server Error'
// // //     });
// // //   }
// // // };

// // // Find the createCourse function and update it

// // // const createCourse = async (req, res) => {
// // //   try {
// // //     // Ensure req.body exists
// // //     if (!req.body) {
// // //       req.body = {};
// // //     }

// // //     // Log what's being received
// // //     console.log("Request body:", req.body);
// // //     console.log("Request file:", req.file);
// // //     console.log("Request user:", req.user);

// // //     // Set instructor to the current user ID
// // //     req.body.instructor = req.user.id;

// // //     // Check user role
// // //     if (req.user.role !== 'tutor' && req.user.role !== 'admin') {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Only tutors and admins can create courses'
// // //       });
// // //     }

// // //     // Parse modules if it's a string
// // //     if (typeof req.body.modules === 'string') {
// // //       req.body.modules = JSON.parse(req.body.modules);
// // //     }

// // //     // Set cover image path if a file was uploaded
// // //     if (req.file) {
// // //       req.body.coverImage = `/uploads/${req.file.filename}`;
// // //     }

// // //     // Create the course
// // //     const course = await Course.create(req.body);
    
// // //     // Add course to user's created courses
// // //     await User.findByIdAndUpdate(req.user.id, {
// // //       $push: { createdCourses: course._id }
// // //     });

// // //     res.status(201).json({
// // //       success: true,
// // //       data: course
// // //     });
// // //   } catch (error) {
// // //     console.error("Error creating course:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: error.message || 'Server Error'
// // //     });
// // //   }
// // // };

// // // @desc    Update course
// // // @route   PUT /api/courses/:id
// // // @access  Private (Course Owner or Admin)
// // const updateCourse = async (req, res) => {
// //   try {
// //     let course = await Course.findById(req.params.id);

// //     if (!course) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Course not found'
// //       });
// //     }

// //     // Make sure user is course owner or admin
// //     if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Not authorized to update this course'
// //       });
// //     }

// //     course = await Course.findByIdAndUpdate(req.params.id, req.body, {
// //       new: true,
// //       runValidators: true
// //     });

// //     res.status(200).json({
// //       success: true,
// //       data: course
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Delete course
// // // @route   DELETE /api/courses/:id
// // // @access  Private (Course Owner or Admin)
// // const deleteCourse = async (req, res) => {
// //   try {
// //     const course = await Course.findById(req.params.id);

// //     if (!course) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Course not found'
// //       });
// //     }

// //     // Make sure user is course owner or admin
// //     if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Not authorized to delete this course'
// //       });
// //     }

// //     await course.remove();

// //     // Remove course from user's created courses
// //     await User.findByIdAndUpdate(course.instructor, {
// //       $pull: { createdCourses: course._id }
// //     });

// //     res.status(200).json({
// //       success: true,
// //       data: {}
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Enroll in a course
// // // @route   POST /api/courses/:id/enroll
// // // @access  Private (Students)
// // const enrollCourse = async (req, res) => {
// //   try {
// //     const course = await Course.findById(req.params.id);

// //     if (!course) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Course not found'
// //       });
// //     }

// //     // Check if already enrolled
// //     if (course.enrolledStudents.includes(req.user.id)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Already enrolled in this course'
// //       });
// //     }

// //     // Add student to course
// //     course.enrolledStudents.push(req.user.id);
// //     await course.save();

// //     // Add course to student's enrolled courses
// //     await User.findByIdAndUpdate(req.user.id, {
// //       $push: { enrolledCourses: course._id }
// //     });

// //     res.status(200).json({
// //       success: true,
// //       data: course
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // module.exports = {
// //   getCourses,
// //   getCourse,
// //   getEnrolledCourses,
// //   createCourse,
// //   updateCourse,
// //   deleteCourse,
// //   enrollCourse
// // };

// // server/controllers/courseController.js
// const Course = require('../models/Course');
// const User = require('../models/User');

// // @desc    Get all courses
// // @route   GET /api/courses
// // @access  Public
// const getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find().populate('instructor', 'name avatar');
    
//     res.status(200).json({
//       success: true,
//       count: courses.length,
//       data: courses
//     });
//   } catch (error) {
//     console.error('Error getting courses:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// // @desc    Get single course
// // @route   GET /api/courses/:id
// // @access  Public
// const getCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id).populate('instructor', 'name avatar');
    
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: 'Course not found'
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       data: course
//     });
//   } catch (error) {
//     console.error('Error getting course:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// // @desc    Create new course
// // @route   POST /api/courses
// // @access  Private (Tutors and Admins)
// const createCourse = async (req, res) => {
//   try {
//     console.log('Creating course with user:', req.user);
    
//     // Add user to req.body as instructor
//     req.body.instructor = req.user.id;
    
//     // Parse modules JSON if it's a string
//     if (typeof req.body.modules === 'string') {
//       req.body.modules = JSON.parse(req.body.modules);
//     }
    
//     // Set cover image path if file was uploaded
//     if (req.file) {
//       req.body.coverImage = `/uploads/${req.file.filename}`;
//     }
    
//     const course = await Course.create(req.body);
    
//     // Add course to user's created courses
//     await User.findByIdAndUpdate(req.user.id, {
//       $push: { createdCourses: course._id }
//     });
    
//     res.status(201).json({
//       success: true,
//       data: course
//     });
//   } catch (error) {
//     console.error('Error creating course:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Server Error'
//     });
//   }
// };

// // @desc    Update course
// // @route   PUT /api/courses/:id
// // @access  Private (Course owner only)
// const updateCourse = async (req, res) => {
//   try {
//     let course = await Course.findById(req.params.id);
    
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: 'Course not found'
//       });
//     }
    
//     // Make sure user is course owner
//     if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
//       return res.status(401).json({
//         success: false,
//         message: 'Not authorized to update this course'
//       });
//     }
    
//     // Parse modules if it's a string
//     if (typeof req.body.modules === 'string') {
//       req.body.modules = JSON.parse(req.body.modules);
//     }
    
//     // Update cover image if new file was uploaded
//     if (req.file) {
//       req.body.coverImage = `/uploads/${req.file.filename}`;
//     }
    
//     course = await Course.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true
//     });
    
//     res.status(200).json({
//       success: true,
//       data: course
//     });
//   } catch (error) {
//     console.error('Error updating course:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Server Error'
//     });
//   }
// };

// // @desc    Delete course
// // @route   DELETE /api/courses/:id
// // @access  Private (Course owner only)
// const deleteCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
    
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: 'Course not found'
//       });
//     }
    
//     // Make sure user is course owner
//     if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
//       return res.status(401).json({
//         success: false,
//         message: 'Not authorized to delete this course'
//       });
//     }
    
//     await course.remove();
    
//     res.status(200).json({
//       success: true,
//       data: {}
//     });
//   } catch (error) {
//     console.error('Error deleting course:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// // @desc    Enroll in course
// // @route   POST /api/courses/:id/enroll
// // @access  Private (Students only)
// const enrollCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
    
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: 'Course not found'
//       });
//     }
    
//     // Check if user is already enrolled
//     const user = await User.findById(req.user.id);
//     if (user.enrolledCourses.includes(course._id)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Already enrolled in this course'
//       });
//     }
    
//     // Add course to user's enrolled courses
//     await User.findByIdAndUpdate(req.user.id, {
//       $push: { enrolledCourses: course._id }
//     });
    
//     // Add user to course's students
//     await Course.findByIdAndUpdate(req.params.id, {
//       $push: { students: req.user.id }
//     });
    
//     res.status(200).json({
//       success: true,
//       data: { message: 'Successfully enrolled in course' }
//     });
//   } catch (error) {
//     console.error('Error enrolling in course:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Server Error'
//     });
//   }
// };

// module.exports = {
//   getCourses,
//   getCourse,
//   createCourse,
//   updateCourse,
//   deleteCourse,
//   enrollCourse
// };

const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate('instructor', 'name avatar');
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    console.error('Error getting courses:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name avatar');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error getting course:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get courses created by a tutor
// @route   GET /api/courses/tutor
// @access  Private (Tutors only)
const getTutorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id })
      .sort({ createdAt: -1 })
      .populate('instructor', 'name avatar');
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    console.error('Error getting tutor courses:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get courses enrolled by a student
// @route   GET /api/courses/enrolled
// @access  Private (Students only)
// const getEnrolledCourses = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).populate({
//       path: 'enrolledCourses',
//       populate: {
//         path: 'instructor',
//         select: 'name avatar'
//       }
//     });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       count: user.enrolledCourses.length,
//       data: user.enrolledCourses
//     });
//   } catch (error) {
//     console.error('Error getting enrolled courses:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };
// Add this function if it's not already there

// @desc    Get courses enrolled by current user
// @route   GET /api/courses/enrolled
// @access  Private
const getEnrolledCourses = async (req, res) => {
  try {
    // Find user and populate their enrolledCourses
    const user = await User.findById(req.user.id).populate({
      path: 'enrolledCourses',
      populate: {
        path: 'instructor',
        select: 'name avatar'
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Add progress data (you'd replace this with actual progress tracking)
    const coursesWithProgress = user.enrolledCourses.map(course => {
      // Convert Mongoose document to plain object
      const courseObj = course.toObject();
      
      // Add progress data if it doesn't exist
      if (!courseObj.progress) {
        courseObj.progress = Math.floor(Math.random() * 100);
      }
      
      return courseObj;
    });

    res.status(200).json({
      success: true,
      count: coursesWithProgress.length,
      data: coursesWithProgress
    });
  } catch (error) {
    console.error('Error getting enrolled courses:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Tutors and Admins)
const createCourse = async (req, res) => {
  try {
    console.log("Creating course with user:", req.user);
    
    // Add user to req.body as instructor
    req.body.instructor = req.user.id;
    
    // Parse modules JSON if it's a string
    if (typeof req.body.modules === 'string') {
      req.body.modules = JSON.parse(req.body.modules);
    }
    
    // Validate required fields
    if (!req.body.grade) {
      return res.status(400).json({
        success: false,
        message: 'Grade level is required'
      });
    }
    
    // Set cover image path if file was uploaded
    if (req.file) {
      req.body.coverImage = `/uploads/${req.file.filename}`;
    }
    
    // Ensure content is set for text lessons
    if (req.body.modules) {
      req.body.modules.forEach(module => {
        if (module.lessons) {
          module.lessons.forEach(lesson => {
            if (lesson.type === 'text' && (!lesson.content || lesson.content.trim() === '')) {
              lesson.content = 'Default content for this lesson'; // Set default content if empty
            }
          });
        }
      });
    }
    
    const course = await Course.create(req.body);
    
    // Add course to user's created courses
    await User.findByIdAndUpdate(req.user.id, {
      $push: { createdCourses: course._id }
    });
    
    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error creating course:', error);
    
    // Send a more detailed error response
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};
// Add this new function to handle recommended courses

// @desc    Get recommended courses
// @route   GET /api/courses/recommended
// @access  Private
// Add this function to your courseController.js file

/**
 * @desc    Get recommended courses for a user
 * @route   GET /api/courses/recommended
 * @access  Private
 */
// exports.getRecommendedCourses = async (req, res) => {
//   try {
//     // Get user's current enrolled courses to exclude them from recommendations
//     const enrolledCourses = await Course.find({ 
//       students: req.user.id
//     }).select('_id');
    
//     const enrolledCourseIds = enrolledCourses.map(course => course._id);
    
//     // Query courses not enrolled in, limit to 4
//     const recommendedCourses = await Course.find({
//       _id: { $nin: enrolledCourseIds },
//       isPublished: true
//     })
//     .sort({ createdAt: -1 })
//     .limit(4)
//     .populate('instructor', 'name');
    
//     res.status(200).json({
//       success: true,
//       count: recommendedCourses.length,
//       data: recommendedCourses
//     });
//   } catch (error) {
//     console.error('Error getting recommended courses:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };
// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Course owner only)

/**
 * @desc    Get recommended courses for a user
 * @route   GET /api/courses/recommended
 * @access  Private
 */
// exports.getRecommendedCourses = async (req, res) => {
//   try {
//     // Find courses the user is enrolled in
//     const enrolledCourses = await Course.find({ 
//       students: req.user.id 
//     }).select('_id category');
    
//     // Extract categories from enrolled courses for better recommendations
//     const enrolledCategories = enrolledCourses.map(course => course.category);
//     const enrolledIds = enrolledCourses.map(course => course._id);
    
//     // Find recommended courses: prioritize same categories, exclude enrolled
//     let recommendedCourses = await Course.find({
//       _id: { $nin: enrolledIds },
//       isPublished: true,
//       category: { $in: enrolledCategories }
//     })
//     .limit(3)
//     .populate('instructor', 'name profilePicture');
    
//     // If we don't have enough recommendations, add some other popular courses
//     if (recommendedCourses.length < 3) {
//       const moreRecommendations = await Course.find({
//         _id: { $nin: [...enrolledIds, ...recommendedCourses.map(c => c._id)] },
//         isPublished: true
//       })
//       .sort({ studentsCount: -1 })  // Most popular courses first
//       .limit(3 - recommendedCourses.length)
//       .populate('instructor', 'name profilePicture');
      
//       recommendedCourses = [...recommendedCourses, ...moreRecommendations];
//     }
    
//     res.status(200).json({
//       success: true,
//       count: recommendedCourses.length,
//       data: recommendedCourses
//     });
//   } catch (error) {
//     console.error('Error getting recommended courses:', error);
//     res.status(500).json({
//       success: false, 
//       message: 'Server Error'
//     });
//   }
// };


/**
 * @desc    Get recommended courses for the current user
 * @route   GET /api/courses/recommended
 * @access  Private
 */
const getRecommendedCourses = async (req, res) => {
  try {
    // Find courses the user is enrolled in
    const userEnrollments = await Course.find({ 
      students: req.user.id 
    }).select('_id category');
    
    // Extract categories and enrolled course IDs
    const userCategories = userEnrollments.map(course => course.category).filter(Boolean);
    const enrolledCourseIds = userEnrollments.map(course => course._id);
    
    let recommendedCourses = [];
    
    // If user has enrolled in courses, recommend similar ones
    if (userCategories.length > 0) {
      recommendedCourses = await Course.find({
        _id: { $nin: enrolledCourseIds },
        category: { $in: userCategories },
        isPublished: true
      })
      .limit(3)
      .populate('instructor', 'name');
    }
    
    // If we still need more recommendations, add popular courses
    if (recommendedCourses.length < 3) {
      const additionalCourses = await Course.find({
        _id: { 
          $nin: [...enrolledCourseIds, ...recommendedCourses.map(c => c._id)]
        },
        isPublished: true
      })
      .sort({ createdAt: -1 })
      .limit(3 - recommendedCourses.length)
      .populate('instructor', 'name');
      
      recommendedCourses = [...recommendedCourses, ...additionalCourses];
    }
    
    return res.status(200).json({
      success: true,
      count: recommendedCourses.length,
      data: recommendedCourses
    });
  } catch (error) {
    console.error('Error getting recommended courses:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Make sure user is course owner
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this course'
      });
    }
    
    // Parse modules if it's a string
    if (typeof req.body.modules === 'string') {
      req.body.modules = JSON.parse(req.body.modules);
    }
    
    // Ensure content is set for text lessons
    if (req.body.modules) {
      req.body.modules.forEach(module => {
        if (module.lessons) {
          module.lessons.forEach(lesson => {
            if (lesson.type === 'text' && (!lesson.content || lesson.content.trim() === '')) {
              lesson.content = 'Default content for this lesson'; // Set default content if empty
            }
          });
        }
      });
    }
    
    // Update cover image if new file was uploaded
    if (req.file) {
      req.body.coverImage = `/uploads/${req.file.filename}`;
    }
    
    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error updating course:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Course owner only)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Make sure user is course owner
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this course'
      });
    }
    
    await Course.findByIdAndDelete(req.params.id);
    
    // Also remove course from user's created courses
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { createdCourses: req.params.id }
    });
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private (Students only)
// const enrollCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
    
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: 'Course not found'
//       });
//     }
    
//     // Check if user is already enrolled
//     const user = await User.findById(req.user.id);
//     if (user.enrolledCourses.includes(course._id)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Already enrolled in this course'
//       });
//     }
    
//     // Add course to user's enrolled courses
//     await User.findByIdAndUpdate(req.user.id, {
//       $push: { enrolledCourses: course._id }
//     });
    
//     // Add user to course's students
//     await Course.findByIdAndUpdate(req.params.id, {
//       $push: { students: req.user.id }
//     });
    
//     res.status(200).json({
//       success: true,
//       data: { message: 'Successfully enrolled in course' }
//     });
//   } catch (error) {
//     console.error('Error enrolling in course:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Server Error'
//     });
//   }
// };
/**
 * @desc    Enroll a student in a course
 * @route   POST /api/courses/:id/enroll
 * @access  Private (Student only)
 */
const enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    // Verify the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user is already enrolled
    if (course.students && course.students.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course'
      });
    }

    // Add user to course students
    course.students = course.students || [];
    course.students.push(userId);
    await course.save();

    // Create initial progress record
    await Progress.create({
      student: userId,
      course: courseId,
      percentage: 0,
      completedLessons: []
    });

    return res.status(200).json({
      success: true,
      message: 'Successfully enrolled in the course',
      data: course
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
module.exports = {
  getCourses,
  getCourse,
  getTutorCourses,
  getEnrolledCourses,
  getRecommendedCourses,  // Added this
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse  // Added this
};