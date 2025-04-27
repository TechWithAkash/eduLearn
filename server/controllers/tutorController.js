const Course = require('../models/Course');
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const Quiz = require('../models/Quiz');

// @desc    Get tutor dashboard data
// @route   GET /api/tutors/dashboard
// @access  Private (Tutors only)
const getDashboardData = async (req, res) => {
  try {
    // Verify the user is a tutor
    if (req.user.role !== 'tutor' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only tutors can access this resource'
      });
    }

    // Get tutor's courses
    const courses = await Course.find({ instructor: req.user.id })
      .populate('students', 'name email');

    // Get assignments for these courses
    const courseIds = courses.map(course => course._id);
    const assignments = await Assignment.find({ course: { $in: courseIds } })
      .populate('submissions.student', 'name');

    // Get quizzes for these courses
    const quizzes = await Quiz.find({ course: { $in: courseIds } });

    // Calculate total unique students
    const allStudentIds = new Set();
    courses.forEach(course => {
      course.students.forEach(student => {
        allStudentIds.add(student._id.toString());
      });
    });

    // Calculate completion rates for courses
    const completionRates = courses.map(course => ({
      id: course._id,
      title: course.title,
      completionRate: Math.floor(Math.random() * 100) // Example calculation, replace with actual
    }));

    // Get recent activities
    const recentActivities = [];
    
    // Add recent enrollments
    courses.forEach(course => {
      if (course.students && course.students.length > 0) {
        course.students.slice(0, 2).forEach(student => {
          recentActivities.push({
            id: student._id,
            type: 'enrollment',
            date: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
            title: 'New Enrollment',
            studentName: student.name,
            courseName: course.title,
            description: `${student.name} enrolled in ${course.title}`
          });
        });
      }
    });

    // Add recent assignment submissions
    assignments.forEach(assignment => {
      if (assignment.submissions && assignment.submissions.length > 0) {
        assignment.submissions.slice(0, 2).forEach(submission => {
          if (submission.student) {
            recentActivities.push({
              id: submission._id,
              type: 'submission',
              date: submission.submittedAt || new Date(),
              title: 'Assignment Submission',
              studentName: submission.student.name,
              courseName: assignment.title,
              description: `${submission.student.name} submitted assignment "${assignment.title}"`
            });
          }
        });
      }
    });

    // Sort activities by date
    recentActivities.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Count pending grading items
    const pendingGrading = assignments.reduce((count, assignment) => {
      return count + assignment.submissions.filter(sub => !sub.isGraded).length;
    }, 0);

    // Send response
    res.status(200).json({
      success: true,
      data: {
        totalCourses: courses.length,
        totalStudents: allStudentIds.size,
        totalAssignments: assignments.length,
        totalQuizzes: quizzes.length,
        completionRates,
        recentActivities: recentActivities.slice(0, 10),
        pendingGrading
      }
    });
  } catch (error) {
    console.error('Error in tutor dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

module.exports = {
  getDashboardData
};