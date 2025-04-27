const Discussion = require('../models/Discussion');
const Course = require('../models/Course');

// @desc    Create discussion thread
// @route   POST /api/courses/:courseId/discussions
// @access  Private (Enrolled students, Course instructor, Admin)
const createDiscussion = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Check if user is enrolled, instructor, or admin
    const isEnrolled = course.enrolledStudents.includes(req.user.id);
    const isInstructor = course.instructor.toString() === req.user.id;
    
    if (!isEnrolled && !isInstructor && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You must be enrolled in this course to create a discussion'
      });
    }
    
    const discussion = await Discussion.create({
      title: req.body.title,
      content: req.body.content,
      course: req.params.courseId,
      author: req.user.id
    });
    
    res.status(201).json({
      success: true,
      data: discussion
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get all discussions for a course
// @route   GET /api/courses/:courseId/discussions
// @access  Private (Enrolled students, Course instructor, Admin)
const getDiscussions = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Check if user is enrolled, instructor, or admin
    const isEnrolled = course.enrolledStudents.includes(req.user.id);
    const isInstructor = course.instructor.toString() === req.user.id;
    
    if (!isEnrolled && !isInstructor && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access these discussions'
      });
    }
    
    const discussions = await Discussion.find({ course: req.params.courseId })
      .populate('author', 'name profilePicture')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: discussions.length,
      data: discussions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Add comment to discussion
// @route   POST /api/discussions/:id/comments
// @access  Private (Enrolled students, Course instructor, Admin)
const addComment = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: 'Discussion not found'
      });
    }
    
    const course = await Course.findById(discussion.course);
    
    // Check if user is enrolled, instructor, or admin
    const isEnrolled = course.enrolledStudents.includes(req.user.id);
    const isInstructor = course.instructor.toString() === req.user.id;
    
    if (!isEnrolled && !isInstructor && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You must be enrolled in this course to comment'
      });
    }
    
    discussion.comments.push({
      content: req.body.content,
      author: req.user.id
    });
    
    await discussion.save();
    
    const updatedDiscussion = await Discussion.findById(req.params.id)
      .populate('author', 'name profilePicture')
      .populate('comments.author', 'name profilePicture');
    
    res.status(200).json({
      success: true,
      data: updatedDiscussion
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
  createDiscussion,
  getDiscussions,
  addComment
};