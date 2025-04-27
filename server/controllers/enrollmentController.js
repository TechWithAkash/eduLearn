// // const Course = require('../models/Course');
// // const User = require('../models/User');

// // // @desc    Get enrollments for tutor's courses
// // // @route   GET /api/enrollments/tutor
// // // @access  Private (Tutors only)
// // exports.getTutorEnrollments = async (req, res) => {
// //   try {
// //     // Verify the user is a tutor
// //     if (req.user.role !== 'tutor' && req.user.role !== 'admin') {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Only tutors can access this resource'
// //       });
// //     }

// //     // Find all courses created by this tutor
// //     const tutorCourses = await Course.find({ instructor: req.user.id })
// //       .populate('students', 'name email profilePicture lastActive');

// //     // Format the data for the client
// //     const enrollmentData = [];

// //     for (const course of tutorCourses) {
// //       // For each student in the course
// //       if (course.students && course.students.length > 0) {
// //         for (const student of course.students) {
// //           // Calculate random progress for demo purposes
// //           // In a real app, you'd fetch actual progress data
// //           const progress = Math.floor(Math.random() * 100);
          
// //           enrollmentData.push({
// //             student: {
// //               _id: student._id,
// //               name: student.name,
// //               email: student.email,
// //               profilePicture: student.profilePicture,
// //               lastActive: student.lastActive || new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
// //             },
// //             course: {
// //               _id: course._id,
// //               title: course.title,
// //               category: course.category,
// //               grade: course.grade
// //             },
// //             enrolledAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
// //             progress: progress,
// //             status: progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'not-started'
// //           });
// //         }
// //       }
// //     }

// //     res.status(200).json({
// //       success: true,
// //       count: enrollmentData.length,
// //       data: enrollmentData
// //     });
// //   } catch (error) {
// //     console.error('Error fetching tutor enrollments:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// // const Course = require('../models/Course');
// // const User = require('../models/User');
// // const Progress = require('../models/Progress');
// // const mongoose = require('mongoose');

// // @desc    Get enrollments for courses taught by a tutor
// // @route   GET /api/enrollments/tutor
// // @access  Private (Tutors)
// // exports.getTutorEnrollments = async (req, res) => {
// //   try {
// //     // Find all courses where the logged in user is the instructor
// //     const courses = await Course.find({ instructor: req.user.id });
    
// //     if (!courses || courses.length === 0) {
// //       return res.status(200).json({
// //         success: true,
// //         data: []
// //       });
// //     }
    
// //     // Get course IDs
// //     const courseIds = courses.map(course => course._id);
    
// //     // Get all progress records for these courses
// //     const progressRecords = await Progress.find({
// //       course: { $in: courseIds }
// //     }).populate('student', 'name email profilePicture lastActive')
// //       .populate('course', 'title category grade');
    
// //     // Format the data as enrollment records
// //     const enrollments = progressRecords.map(progress => ({
// //       _id: progress._id,
// //       student: progress.student,
// //       course: progress.course,
// //       progress: progress.percentage,
// //       completedLessons: progress.completedLessons,
// //       enrolledAt: progress.createdAt,
// //       lastAccessed: progress.updatedAt,
// //       status: 'enrolled'
// //     }));

// //     res.status(200).json({
// //       success: true,
// //       count: enrollments.length,
// //       data: enrollments
// //     });
// //   } catch (error) {
// //     console.error('Error fetching tutor enrollments:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server Error'
// //     });
// //   }
// // };

// const Course = require('../models/Course');
// const User = require('../models/User');
// const mongoose = require('mongoose');

// exports.getTutorEnrollments = async (req, res) => {
//   try {
//     // Find courses where the current user is the instructor
//     const courses = await Course.find({ instructor: req.user.id })
//       .select('_id title category grade students')
//       .populate('students', 'name email profilePicture lastActive');
    
//     // Format the data for the client
//     const enrollments = [];
    
//     for (const course of courses) {
//       if (course.students && course.students.length > 0) {
//         for (const student of course.students) {
//           // For demo purposes, generate random progress
//           const progress = Math.floor(Math.random() * 100);
          
//           enrollments.push({
//             _id: `${course._id}-${student._id}`,
//             student: student,
//             course: {
//               _id: course._id,
//               title: course.title,
//               category: course.category,
//               grade: course.grade
//             },
//             progress: progress,
//             enrolledAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
//             status: progress === 100 ? 'completed' : 'in-progress'
//           });
//         }
//       }
//     }
    
//     res.status(200).json({
//       success: true,
//       count: enrollments.length,
//       data: enrollments
//     });
//   } catch (error) {
//     console.error('Error fetching tutor enrollments:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');

exports.getTutorEnrollments = async (req, res) => {
  try {
    // Find courses where the current user is the instructor
    const courses = await Course.find({ instructor: req.user.id })
      .populate('students', 'name email profilePicture lastActive');
    
    // Format the data for the client
    const enrollments = [];
    
    for (const course of courses) {
      if (course.students && course.students.length > 0) {
        for (const student of course.students) {
          // For demo purposes, generate random progress
          const progress = Math.floor(Math.random() * 100);
          
          enrollments.push({
            student: student,
            course: {
              _id: course._id,
              title: course.title,
              category: course.category,
              grade: course.grade
            },
            progress: progress,
            enrolledAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
            status: progress === 100 ? 'completed' : 'in-progress'
          });
        }
      }
    }
    
    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    console.error('Error fetching tutor enrollments:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};