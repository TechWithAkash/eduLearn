const Notification = require('../models/Notification');
const Course = require('../models/Course');

// @desc    Send notification to course students
// @route   POST /api/notifications/course/:courseId
// @access  Private (Course instructor, Admin)
const sendCourseNotification = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, message, type } = req.body;
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Check if user is course instructor or admin
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to send notifications for this course'
      });
    }
    
    // Create a notification for each enrolled student
    const notifications = await Promise.all(
      course.enrolledStudents.map(studentId => {
        return Notification.create({
          title,
          message,
          recipient: studentId,
          course: courseId,
          type: type || 'announcement'
        });
      })
    );
    
    res.status(201).json({
      success: true,
      count: notifications.length,
      message: `Notification sent to ${notifications.length} students`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .sort('-createdAt')
      .populate('course', 'title');
    
    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id
// @access  Private
const markAsRead = async (req, res) => {
  try {
    let notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }
    
    // Check if user is the recipient
    if (notification.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this notification'
      });
    }
    
    notification.isRead = true;
    await notification.save();
    
    res.status(200).json({
      success: true,
      data: notification
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
  sendCourseNotification,
  getUserNotifications,
  markAsRead
};