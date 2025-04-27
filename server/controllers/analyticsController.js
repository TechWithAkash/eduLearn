const User = require('../models/User');
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');

// @desc    Get student progress in a course
// @route   GET /api/analytics/student/:studentId/course/:courseId
// @access  Private (Student owner, Course instructor, Admin)
const getStudentProgress = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;
    
    // Check authorization
    if (req.user.role !== 'admin' && req.user.id !== studentId) {
      // Check if user is the instructor
      const course = await Course.findById(courseId);
      if (!course || course.instructor.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this information'
        });
      }
    }
    
    // Get assignments for the course
    const assignments = await Assignment.find({ course: courseId });
    
    // Get student submissions
    const submissionData = assignments.map(assignment => {
      const submission = assignment.submissions.find(sub => 
        sub.student && sub.student.toString() === studentId
      );
      
      return {
        assignmentId: assignment._id,
        title: assignment.title,
        totalMarks: assignment.totalMarks,
        completed: !!submission,
        grade: submission ? submission.grade : null,
        submittedAt: submission ? submission.submittedAt : null,
        isGraded: submission ? submission.isGraded : false
      };
    });
    
    res.status(200).json({
      success: true,
      data: {
        totalAssignments: assignments.length,
        completedAssignments: submissionData.filter(item => item.completed).length,
        submissions: submissionData
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get course analytics for instructor
// @route   GET /api/analytics/courses/:courseId
// @access  Private (Course instructor, Admin)
const getCourseAnalytics = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    // Check if user is course instructor or admin
    if (req.user.role !== 'admin') {
      const course = await Course.findById(courseId);
      if (!course || course.instructor.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this information'
        });
      }
    }
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    const assignments = await Assignment.find({ course: courseId });
    
    // Calculate average grades
    let totalGrades = 0;
    let gradedSubmissions = 0;
    
    assignments.forEach(assignment => {
      assignment.submissions.forEach(submission => {
        if (submission.isGraded) {
          totalGrades += submission.grade;
          gradedSubmissions++;
        }
      });
    });
    
    const avgGrade = gradedSubmissions > 0 ? totalGrades / gradedSubmissions : 0;
    
    res.status(200).json({
      success: true,
      data: {
        totalStudents: course.enrolledStudents.length,
        avgRating: course.averageRating || 0,
        avgGrade,
        totalAssignments: assignments.length
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

module.exports = {
  getStudentProgress,
  getCourseAnalytics
};