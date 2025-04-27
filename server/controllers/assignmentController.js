// // const Assignment = require('../models/Assignment');
// // const Course = require('../models/Course');

// // // @desc    Create assignment
// // // @route   POST /api/assignments
// // // @access  Private (Tutor, Admin)
// // const createAssignment = async (req, res) => {
// //   try {
// //     // Check if course exists and user is instructor
// //     const course = await Course.findById(req.body.course);
    
// //     if (!course) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Course not found'
// //       });
// //     }
    
// //     // Check if user is course instructor or admin
// //     if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Not authorized to create assignments for this course'
// //       });
// //     }
    
// //     const assignment = await Assignment.create(req.body);
    
// //     res.status(201).json({
// //       success: true,
// //       data: assignment
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Get all assignments for a course
// // // @route   GET /api/courses/:courseId/assignments
// // // @access  Private (Enrolled students, Course instructor, Admin)
// // const getCourseAssignments = async (req, res) => {
// //   try {
// //     const course = await Course.findById(req.params.courseId);
    
// //     if (!course) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Course not found'
// //       });
// //     }
    
// //     // Check if user is enrolled, instructor, or admin
// //     const isEnrolled = course.enrolledStudents.includes(req.user.id);
// //     const isInstructor = course.instructor.toString() === req.user.id;
    
// //     if (!isEnrolled && !isInstructor && req.user.role !== 'admin') {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Not authorized to access these assignments'
// //       });
// //     }
    
// //     const assignments = await Assignment.find({ course: req.params.courseId });
    
// //     res.status(200).json({
// //       success: true,
// //       count: assignments.length,
// //       data: assignments
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Submit assignment
// // // @route   POST /api/assignments/:id/submit
// // // @access  Private (Students)
// // const submitAssignment = async (req, res) => {
// //   try {
// //     const assignment = await Assignment.findById(req.params.id);
    
// //     if (!assignment) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Assignment not found'
// //       });
// //     }
    
// //     const course = await Course.findById(assignment.course);
    
// //     // Check if student is enrolled
// //     if (!course.enrolledStudents.includes(req.user.id)) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'You must be enrolled in this course to submit assignments'
// //       });
// //     }
    
// //     // Check if already submitted
// //     const alreadySubmitted = assignment.submissions.find(
// //       submission => submission.student.toString() === req.user.id
// //     );
    
// //     if (alreadySubmitted) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'You have already submitted this assignment'
// //       });
// //     }
    
// //     // Check due date
// //     if (new Date(assignment.dueDate) < new Date()) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Assignment submission deadline has passed'
// //       });
// //     }
    
// //     // Add submission
// //     assignment.submissions.push({
// //       student: req.user.id,
// //       answers: req.body.answers
// //     });
    
// //     await assignment.save();
    
// //     res.status(200).json({
// //       success: true,
// //       message: 'Assignment submitted successfully'
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Grade assignment
// // // @route   POST /api/assignments/:id/grade/:submissionId
// // // @access  Private (Tutor, Admin)
// // const gradeAssignment = async (req, res) => {
// //   try {
// //     const assignment = await Assignment.findById(req.params.id);
    
// //     if (!assignment) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Assignment not found'
// //       });
// //     }
    
// //     const course = await Course.findById(assignment.course);
    
// //     // Check if user is instructor or admin
// //     if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Not authorized to grade assignments for this course'
// //       });
// //     }
    
// //     // Find submission
// //     const submission = assignment.submissions.id(req.params.submissionId);
    
// //     if (!submission) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Submission not found'
// //       });
// //     }
    
// //     // Update grade
// //     submission.grade = req.body.grade;
// //     submission.feedback = req.body.feedback;
// //     submission.isGraded = true;
    
// //     await assignment.save();
    
// //     res.status(200).json({
// //       success: true,
// //       message: 'Assignment graded successfully'
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
// //   createAssignment,
// //   getCourseAssignments,
// //   submitAssignment,
// //   gradeAssignment
// // };

// //server/controllers/assignmentController.js

// // const Assignment = require('../models/Assignment');
// // const AssignmentSubmission = require('../models/AssignmentSubmission');
// // const Course = require('../models/Course');
// // const Progress = require('../models/Progress');
// // const aws = require('aws-sdk');
// // const multer = require('multer');
// // const multerS3 = require('multer-s3');
// // const path = require('path');

// // // Configure AWS S3
// // aws.config.update({
// //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// //   region: process.env.AWS_REGION
// // });

// // const s3 = new aws.S3();

// // // Set up multer for file uploads
// // const upload = multer({
// //   storage: multerS3({
// //     s3: s3,
// //     bucket: process.env.AWS_S3_BUCKET,
// //     acl: 'public-read',
// //     key: function (req, file, cb) {
// //       cb(null, `assignments/${Date.now()}_${path.basename(file.originalname)}`);
// //     }
// //   }),
// //   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
// //   fileFilter: function(req, file, cb) {
// //     const assignment = req.assignment;
    
// //     if (!assignment) {
// //       return cb(new Error('Assignment not found'), false);
// //     }
    
// //     const fileExt = path.extname(file.originalname).toLowerCase().substring(1);
    
// //     if (assignment.allowedFileTypes.includes(fileExt)) {
// //       return cb(null, true);
// //     }
    
// //     cb(new Error('File type not allowed'), false);
// //   }
// // }).single('file');

// // // Middleware to load assignment
// // exports.loadAssignment = async (req, res, next) => {
// //   try {
// //     const { id } = req.params;
    
// //     const assignment = await Assignment.findById(id);
    
// //     if (!assignment) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Assignment not found'
// //       });
// //     }
    
// //     req.assignment = assignment;
// //     next();
// //   } catch (error) {
// //     console.error('Error loading assignment:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Get an assignment by ID
// // // @route   GET /api/assignments/:id
// // // @access  Private
// // exports.getAssignment = async (req, res) => {
// //   try {
// //     const userId = req.user.id;
// //     const assignment = req.assignment;
    
// //     // Check if the user has already submitted this assignment
// //     const submission = await AssignmentSubmission.findOne({
// //       assignment: assignment._id,
// //       student: userId
// //     });
    
// //     res.status(200).json({
// //       success: true,
// //       data: {
// //         assignment,
// //         submission
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Error getting assignment:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Submit an assignment
// // // @route   POST /api/assignments/:id/submit
// // // @access  Private
// // exports.submitAssignment = async (req, res) => {
// //   upload(req, res, async function(err) {
// //     if (err) {
// //       return res.status(400).json({
// //         success: false,
// //         message: err.message
// //       });
// //     }
    
// //     try {
// //       const userId = req.user.id;
// //       const assignment = req.assignment;
// //       const { textSubmission } = req.body;
      
// //       // Validate submission based on assignment type
// //       if (assignment.submissionType === 'text' && !textSubmission) {
// //         return res.status(400).json({
// //           success: false,
// //           message: 'Text submission is required'
// //         });
// //       }
      
// //       if (assignment.submissionType === 'file' && !req.file) {
// //         return res.status(400).json({
// //           success: false,
// //           message: 'File submission is required'
// //         });
// //       }
      
// //       // Check for due date
// //       const now = new Date();
// //       let status = 'submitted';
      
// //       if (assignment.dueDate && now > new Date(assignment.dueDate)) {
// //         status = 'late';
// //       }
      
// //       // Prepare file submission data
// //       let fileSubmission = null;
      
// //       if (req.file) {
// //         fileSubmission = {
// //           fileName: req.file.originalname,
// //           fileUrl: req.file.location,
// //           fileType: path.extname(req.file.originalname).toLowerCase().substring(1),
// //           fileSize: req.file.size
// //         };
// //       }
      
// //       // Check if submission already exists
// //       let submission = await AssignmentSubmission.findOne({
// //         assignment: assignment._id,
// //         student: userId
// //       });
      
// //       if (submission) {
// //         // Update existing submission
// //         submission.textSubmission = textSubmission || submission.textSubmission;
        
// //         if (fileSubmission) {
// //           submission.fileSubmission = fileSubmission;
// //         }
        
// //         submission.status = submission.status === 'graded' ? 'resubmitted' : status;
// //         submission.updatedAt = now;
// //       } else {
// //         // Create new submission
// //         submission = new AssignmentSubmission({
// //           student: userId,
// //           assignment: assignment._id,
// //           courseId: assignment.courseId,
// //           textSubmission,
// //           fileSubmission,
// //           status
// //         });
// //       }
      
// //       await submission.save();
      
// //       // Update progress to mark the lesson as completed
// //       const progress = await Progress.findOne({
// //         student: userId,
// //         course: assignment.courseId
// //       });
      
// //       if (progress) {
// //         // Check if this lesson is already marked as completed
// //         if (!progress.completedLessons.includes(assignment.lessonId)) {
// //           progress.completedLessons.push(assignment.lessonId);
          
// //           // Update progress percentage
// //           const course = await Course.findById(assignment.courseId);
// //           if (course) {
// //             const totalLessons = course.modules.reduce((total, module) => 
// //               total + module.lessons.length, 0);
            
// //             progress.percentage = Math.round((progress.completedLessons.length / totalLessons) * 100);
// //           }
          
// //           await progress.save();
// //         }
// //       }
      
// //       res.status(200).json({
// //         success: true,
// //         data: submission
// //       });
// //     } catch (error) {
// //       console.error('Error submitting assignment:', error);
// //       res.status(500).json({
// //         success: false,
// //         message: 'Server Error'
// //       });
// //     }
// //   });
// // };

// // // @desc    Get all assignments for a course
// // // @route   GET /api/courses/:courseId/assignments
// // // @access  Private
// // exports.getCourseAssignments = async (req, res) => {
// //   try {
// //     const { courseId } = req.params;
// //     const userId = req.user.id;
    
// //     const assignments = await Assignment.find({ courseId });
    
// //     // Get all submissions for this user
// //     const submissions = await AssignmentSubmission.find({
// //       student: userId,
// //       courseId
// //     });
    
// //     // Map assignment data with submission status
// //     const assignmentData = assignments.map(assignment => {
// //       const submission = submissions.find(s => s.assignment.toString() === assignment._id.toString());
      
// //       return {
// //         ...assignment.toObject(),
// //         submission: submission ? {
// //           status: submission.status,
// //           submittedAt: submission.submittedAt,
// //           grade: submission.grade
// //         } : null
// //       };
// //     });
    
// //     res.status(200).json({
// //       success: true,
// //       data: assignmentData
// //     });
// //   } catch (error) {
// //     console.error('Error getting course assignments:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };


// const Assignment = require('../models/Assignment');
// const AssignmentSubmission = require('../models/AssignmentSubmission');
// const Course = require('../models/Course');
// const Progress = require('../models/Progress');
// const path = require('path');
// const multer = require('multer');
// const admin = require('firebase-admin');
// const { v4: uuidv4 } = require('uuid');
// const mongoose = require('mongoose');

// // Initialize Firebase Admin SDK
// // Note: You should set up your Firebase admin configuration in a central place
// // and import it here rather than initializing it in this file
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
//     }),
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET
//   });
// }

// const bucket = admin.storage().bucket();

// // Set up multer for file handling
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
//   fileFilter: function(req, file, cb) {
//     const assignment = req.assignment;
    
//     if (!assignment) {
//       return cb(new Error('Assignment not found'), false);
//     }
    
//     const fileExt = path.extname(file.originalname).toLowerCase().substring(1);
    
//     if (assignment.allowedFileTypes.includes(fileExt)) {
//       return cb(null, true);
//     }
    
//     cb(new Error('File type not allowed'), false);
//   }
// }).single('file');

// // // Middleware to load assignment
// // exports.loadAssignment = async (req, res, next) => {
// //   try {
// //     const { id } = req.params;
    
// //     const assignment = await Assignment.findById(id);
    
// //     if (!assignment) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Assignment not found'
// //       });
// //     }
    
// //     req.assignment = assignment;
// //     next();
// //   } catch (error) {
// //     console.error('Error loading assignment:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // Find the loadAssignment function and update it to handle route parameter validation

// // exports.loadAssignment = async (req, res, next) => {
// //   try {
// //     // Skip this middleware if the ID is part of a route like '/tutor'
// //     if (req.params.id === 'tutor' || req.params.id === 'dashboard' || req.params.id === 'enrolled') {
// //       return next();
// //     }
    
// //     // Validate ID format before querying
// //     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Invalid assignment ID format: ${req.params.id}`
// //       });
// //     }

// //     const assignment = await Assignment.findById(req.params.id)
// //       .populate('course', 'title')
// //       .populate('submissions.student', 'name email');
      
// //     if (!assignment) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Assignment not found'
// //       });
// //     }

// //     req.assignment = assignment;
// //     next();
// //   } catch (error) {
// //     console.error('Error loading assignment:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server error loading assignment'
// //     });
// //   }
// // };
// // // @desc    Get an assignment by ID
// // // @route   GET /api/assignments/:id
// // // @access  Private
// // exports.getAssignment = async (req, res) => {
// //   try {
// //     const userId = req.user.id;
// //     const assignment = req.assignment;
    
// //     // Check if the user has already submitted this assignment
// //     const submission = await AssignmentSubmission.findOne({
// //       assignment: assignment._id,
// //       student: userId
// //     });
    
// //     res.status(200).json({
// //       success: true,
// //       data: {
// //         assignment,
// //         submission
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Error getting assignment:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Submit an assignment
// // // @route   POST /api/assignments/:id/submit
// // // @access  Private
// // exports.submitAssignment = async (req, res) => {
// //   upload(req, res, async function(err) {
// //     if (err) {
// //       return res.status(400).json({
// //         success: false,
// //         message: err.message
// //       });
// //     }
    
// //     try {
// //       const userId = req.user.id;
// //       const assignment = req.assignment;
// //       const { textSubmission } = req.body;
      
// //       // Validate submission based on assignment type
// //       if (assignment.submissionType === 'text' && !textSubmission) {
// //         return res.status(400).json({
// //           success: false,
// //           message: 'Text submission is required'
// //         });
// //       }
      
// //       if (assignment.submissionType === 'file' && !req.file) {
// //         return res.status(400).json({
// //           success: false,
// //           message: 'File submission is required'
// //         });
// //       }
      
// //       // Check for due date
// //       const now = new Date();
// //       let status = 'submitted';
      
// //       if (assignment.dueDate && now > new Date(assignment.dueDate)) {
// //         status = 'late';
// //       }
      
// //       // Prepare file submission data
// //       let fileSubmission = null;
      
// //       if (req.file) {
// //         // Upload file to Firebase Storage
// //         const fileName = `assignments/${assignment._id}/${userId}/${uuidv4()}-${req.file.originalname}`;
// //         const fileBuffer = req.file.buffer;
        
// //         const fileUpload = bucket.file(fileName);
        
// //         // Set metadata
// //         const metadata = {
// //           contentType: req.file.mimetype,
// //         };
        
// //         // Upload file
// //         await fileUpload.save(fileBuffer, {
// //           metadata: metadata,
// //           public: true
// //         });
        
// //         // Get the public URL
// //         const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        
// //         fileSubmission = {
// //           fileName: req.file.originalname,
// //           fileUrl: fileUrl,
// //           fileType: path.extname(req.file.originalname).toLowerCase().substring(1),
// //           fileSize: req.file.size
// //         };
// //       }
      
// //       // Check if submission already exists
// //       let submission = await AssignmentSubmission.findOne({
// //         assignment: assignment._id,
// //         student: userId
// //       });
      
// //       if (submission) {
// //         // Update existing submission
// //         submission.textSubmission = textSubmission || submission.textSubmission;
        
// //         if (fileSubmission) {
// //           submission.fileSubmission = fileSubmission;
// //         }
        
// //         submission.status = submission.status === 'graded' ? 'resubmitted' : status;
// //         submission.updatedAt = now;
// //       } else {
// //         // Create new submission
// //         submission = new AssignmentSubmission({
// //           student: userId,
// //           assignment: assignment._id,
// //           courseId: assignment.courseId,
// //           textSubmission,
// //           fileSubmission,
// //           status
// //         });
// //       }
      
// //       await submission.save();
      
// //       // Update progress to mark the lesson as completed
// //       const progress = await Progress.findOne({
// //         student: userId,
// //         course: assignment.courseId
// //       });
      
// //       if (progress) {
// //         // Check if this lesson is already marked as completed
// //         if (!progress.completedLessons.includes(assignment.lessonId)) {
// //           progress.completedLessons.push(assignment.lessonId);
          
// //           // Update progress percentage
// //           const course = await Course.findById(assignment.courseId);
// //           if (course) {
// //             const totalLessons = course.modules.reduce((total, module) => 
// //               total + module.lessons.length, 0);
            
// //             progress.percentage = Math.round((progress.completedLessons.length / totalLessons) * 100);
// //           }
          
// //           await progress.save();
// //         }
// //       }
      
// //       res.status(200).json({
// //         success: true,
// //         data: submission
// //       });
// //     } catch (error) {
// //       console.error('Error submitting assignment:', error);
// //       res.status(500).json({
// //         success: false,
// //         message: 'Server Error'
// //       });
// //     }
// //   });
// // };

// // // @desc    Grade an assignment submission
// // // @route   POST /api/assignments/:id/grade/:submissionId
// // // @access  Private (Tutor)
// // exports.gradeAssignment = async (req, res) => {
// //   try {
// //     const { submissionId } = req.params;
// //     const { grade, feedback } = req.body;
    
// //     // Validate input
// //     if (!grade || grade < 0 || grade > 100) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Grade must be a number between 0 and 100'
// //       });
// //     }
    
// //     // Find submission
// //     const submission = await AssignmentSubmission.findById(submissionId);
    
// //     if (!submission) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Submission not found'
// //       });
// //     }
    
// //     // Check if the assignment matches
// //     if (submission.assignment.toString() !== req.assignment._id.toString()) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Submission does not belong to this assignment'
// //       });
// //     }
    
// //     // Update submission with grade and feedback
// //     submission.grade = grade;
// //     submission.feedback = feedback;
// //     submission.status = 'graded';
// //     submission.gradedAt = Date.now();
// //     submission.gradedBy = req.user.id;
    
// //     await submission.save();
    
// //     res.status(200).json({
// //       success: true,
// //       data: submission
// //     });
// //   } catch (error) {
// //     console.error('Error grading assignment:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // // @desc    Get all assignment submissions for a specific assignment
// // // @route   GET /api/assignments/:id/submissions
// // // @access  Private (Tutor)
// // exports.getAssignmentSubmissions = async (req, res) => {
// //   try {
// //     const submissions = await AssignmentSubmission.find({
// //       assignment: req.assignment._id
// //     }).populate('student', 'name email');
    
// //     res.status(200).json({
// //       success: true,
// //       count: submissions.length,
// //       data: submissions
// //     });
// //   } catch (error) {
// //     console.error('Error getting assignment submissions:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // Add this at the top of the file if it doesn't exist

// // Fix the loadAssignment function
// // exports.loadAssignment = async (req, res) => {
// //   try {
// //     const { assignmentId } = req.params;
    
// //     const assignment = await Assignment.findById(assignmentId)
// //       .populate('courseId', 'title')
// //       .populate('lessonId', 'title');
    
// //     if (!assignment) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Assignment not found'
// //       });
// //     }
    
// //     res.status(200).json({
// //       success: true,
// //       data: assignment
// //     });
// //   } catch (error) {
// //     console.error('Error loading assignment:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // Add this at the top if it's missing

// // Fix the loadAssignment function if it has the mongoose error
// exports.loadAssignment = async (req, res) => {
//   try {
//     const { assignmentId } = req.params;
    
//     const assignment = await Assignment.findById(assignmentId)
//       .populate('courseId', 'title')
//       .populate('lessonId', 'title');
    
//     if (!assignment) {
//       return res.status(404).json({
//         success: false,
//         message: 'Assignment not found'
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       data: assignment
//     });
//   } catch (error) {
//     console.error('Error loading assignment:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };
// // @desc    Get all assignments for a course
// // @route   GET /api/courses/:courseId/assignments
// // @access  Private
// exports.getCourseAssignments = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const userId = req.user.id;
    
//     const assignments = await Assignment.find({ courseId });
    
//     // If user is a student, get their submissions
//     if (req.user.role === 'student') {
//       // Get all submissions for this user
//       const submissions = await AssignmentSubmission.find({
//         student: userId,
//         courseId
//       });
      
//       // Map assignment data with submission status
//       const assignmentData = assignments.map(assignment => {
//         const submission = submissions.find(s => 
//           s.assignment.toString() === assignment._id.toString()
//         );
        
//         return {
//           ...assignment.toObject(),
//           submission: submission ? {
//             status: submission.status,
//             submittedAt: submission.submittedAt,
//             grade: submission.grade
//           } : null
//         };
//       });
      
//       return res.status(200).json({
//         success: true,
//         count: assignmentData.length,
//         data: assignmentData
//       });
//     }
    
//     // For tutors, return assignments with submission counts
//     if (req.user.role === 'tutor' || req.user.role === 'admin') {
//       const assignmentIds = assignments.map(a => a._id);
      
//       // Get submission counts for each assignment
//       const submissionCounts = await AssignmentSubmission.aggregate([
//         { $match: { assignment: { $in: assignmentIds } } },
//         { $group: { _id: '$assignment', count: { $sum: 1 } } }
//       ]);
      
//       // Create a map of assignment ID to submission count
//       const submissionCountMap = {};
//       submissionCounts.forEach(item => {
//         submissionCountMap[item._id] = item.count;
//       });
      
//       // Add submission count to each assignment
//       const assignmentData = assignments.map(assignment => ({
//         ...assignment.toObject(),
//         submissionCount: submissionCountMap[assignment._id] || 0
//       }));
      
//       return res.status(200).json({
//         success: true,
//         count: assignmentData.length,
//         data: assignmentData
//       });
//     }
    
//     // Fallback - just return assignments
//     res.status(200).json({
//       success: true,
//       count: assignments.length,
//       data: assignments
//     });
//   } catch (error) {
//     console.error('Error getting course assignments:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// // @desc    Create a new assignment
// // @route   POST /api/assignments
// // @access  Private (Tutor)
// exports.createAssignment = async (req, res) => {
//   try {
//     const { 
//       title, 
//       description, 
//       instructions, 
//       courseId, 
//       lessonId,
//       dueDate, 
//       totalPoints, 
//       submissionType, 
//       allowedFileTypes, 
//       isPublished 
//     } = req.body;
    
//     // Validate required fields
//     if (!title || !courseId || !lessonId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide all required fields'
//       });
//     }
    
//     // Create new assignment
//     const assignment = new Assignment({
//       title,
//       description,
//       instructions,
//       courseId,
//       lessonId,
//       dueDate,
//       totalPoints: totalPoints || 100,
//       submissionType: submissionType || 'text',
//       allowedFileTypes: allowedFileTypes || ['pdf', 'doc', 'docx'],
//       isPublished: isPublished !== undefined ? isPublished : false,
//       createdBy: req.user.id
//     });
    
//     await assignment.save();
    
//     res.status(201).json({
//       success: true,
//       data: assignment
//     });
//   } catch (error) {
//     console.error('Error creating assignment:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// // @desc    Update an assignment
// // @route   PUT /api/assignments/:id
// // @access  Private (Tutor)
// exports.updateAssignment = async (req, res) => {
//   try {
//     const assignment = req.assignment;
    
//     // Check if the user is the creator of the assignment
//     if (assignment.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized to update this assignment'
//       });
//     }
    
//     // Update assignment fields
//     const updatedAssignment = await Assignment.findByIdAndUpdate(
//       assignment._id,
//       { $set: req.body },
//       { new: true, runValidators: true }
//     );
    
//     res.status(200).json({
//       success: true,
//       data: updatedAssignment
//     });
//   } catch (error) {
//     console.error('Error updating assignment:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// // @desc    Delete an assignment
// // @route   DELETE /api/assignments/:id
// // @access  Private (Tutor)
// exports.deleteAssignment = async (req, res) => {
//   try {
//     const assignment = req.assignment;
    
//     // Check if the user is the creator of the assignment
//     if (assignment.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized to delete this assignment'
//       });
//     }
    
//     // Delete all submissions for this assignment
//     await AssignmentSubmission.deleteMany({ assignment: assignment._id });
    
//     // Delete the assignment
//     await Assignment.findByIdAndDelete(assignment._id);
    
//     res.status(200).json({
//       success: true,
//       data: {}
//     });
//   } catch (error) {
//     console.error('Error deleting assignment:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// module.exports = exports;

const mongoose = require('mongoose');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');

/**
 * @desc    Middleware to load an assignment
 * @param   {Object} req - Request object
 * @param   {Object} res - Response object
 * @param   {Function} next - Next middleware function
 */
exports.loadAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }
    
    // Attach the assignment to the request object
    req.assignment = assignment;
    next();
  } catch (error) {
    console.error('Error loading assignment:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get an assignment
 * @route   GET /api/assignments/:id
 * @access  Private
 */
exports.getAssignment = async (req, res) => {
  try {
    // Assignment already loaded by middleware
    const assignment = req.assignment;
    
    // Populate any additional data needed
    await assignment.populate('courseId', 'title');
    
    res.status(200).json({
      success: true,
      data: assignment
    });
  } catch (error) {
    console.error('Error getting assignment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Submit an assignment
 * @route   POST /api/assignments/:id/submit
 * @access  Private (Students)
 */
exports.submitAssignment = async (req, res) => {
  try {
    const { content, attachmentUrl } = req.body;
    const assignment = req.assignment;
    
    // Create submission
    const submission = await Submission.create({
      assignment: assignment._id,
      student: req.user.id,
      content,
      attachmentUrl,
      submittedAt: Date.now()
    });
    
    res.status(201).json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error('Error submitting assignment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get all assignments for a course
 * @route   GET /api/assignments/course/:courseId
 * @access  Private
 */
exports.getCourseAssignments = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const assignments = await Assignment.find({ courseId })
      .sort({ dueDate: 1 });
    
    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    console.error('Error getting course assignments:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};