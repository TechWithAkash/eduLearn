const User = require('../models/User');
const Course = require('../models/Course');
const Progress = require('../models/Progress');
const Payment = require('../models/Payment');

/**
 * @desc    Get admin dashboard statistics
 * @route   GET /api/analytics/admin/stats
 * @access  Private (Admin only)
 */
exports.getAdminStats = async (req, res) => {
  try {
    // Get user statistics
    const totalUsers = await User.countDocuments();
    const students = await User.countDocuments({ role: 'student' });
    const tutors = await User.countDocuments({ role: 'tutor' });
    const admins = await User.countDocuments({ role: 'admin' });
    
    // Get course statistics
    const totalCourses = await Course.countDocuments();
    const publishedCourses = await Course.countDocuments({ isPublished: true });
    const draftCourses = await Course.countDocuments({ isPublished: false });
    
    // Get enrollment statistics
    const totalEnrollments = await Progress.countDocuments();
    
    // Get this month's enrollments
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const enrollmentsThisMonth = await Progress.countDocuments({ 
      createdAt: { $gte: startOfMonth } 
    });
    
    // Get revenue statistics
    const revenueData = await Payment.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;
    
    // Get this month's revenue
    const revenueThisMonth = await Payment.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    
    const monthlyRevenue = revenueThisMonth.length > 0 ? revenueThisMonth[0].total : 0;
    
    res.status(200).json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          students,
          tutors,
          admins
        },
        courses: {
          total: totalCourses,
          published: publishedCourses,
          drafts: draftCourses
        },
        enrollments: {
          total: totalEnrollments,
          thisMonth: enrollmentsThisMonth
        },
        revenue: {
          total: totalRevenue,
          thisMonth: monthlyRevenue
        }
      }
    });
  } catch (error) {
    console.error('Error getting admin stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};