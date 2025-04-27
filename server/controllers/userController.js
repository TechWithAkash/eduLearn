// const User = require('../models/User');

// // @desc    Get all users
// // @route   GET /api/users
// // @access  Private (Admin only)
// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find().select('-password');
    
//     res.status(200).json({
//       success: true,
//       count: users.length,
//       data: users
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// // @desc    Get single user
// // @route   GET /api/users/:id
// // @access  Private (Admin or profile owner)
// const getUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id)
//       .select('-password')
//       .populate('enrolledCourses', 'title thumbnail')
//       .populate('createdCourses', 'title thumbnail');
    
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     // Check permission (admin or profile owner)
//     if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized to access this profile'
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       data: user
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// // @desc    Update user
// // @route   PUT /api/users/:id
// // @access  Private (Admin or profile owner)
// const updateUser = async (req, res) => {
//   try {
//     // Check permission (admin or profile owner)
//     if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized to update this profile'
//       });
//     }
    
//     // Remove fields that shouldn't be updated directly
//     const { password, role, ...updateData } = req.body;
    
//     // Only admin can update role
//     if (req.user.role === 'admin' && role) {
//       updateData.role = role;
//     }
    
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true, runValidators: true }
//     ).select('-password');
    
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       data: user
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// // @desc    Delete user
// // @route   DELETE /api/users/:id
// // @access  Private (Admin only)
// const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
    
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }
    
//     await user.remove();
    
//     res.status(200).json({
//       success: true,
//       data: {}
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// module.exports = {
//   getUsers,
//   getUser,
//   updateUser,
//   deleteUser
// };

const User = require('../models/User');
const Course = require('../models/Course');

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin only)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private (Admin or profile owner)
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('enrolledCourses', 'title thumbnail')
      .populate('createdCourses', 'title thumbnail');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check permission (admin or profile owner)
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this profile'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create new user (Admin only)
// @route   POST /api/users
// @access  Private (Admin only)
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student',
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Admin or profile owner)
// const updateUser = async (req, res) => {
//   try {
//     // Check permission (admin or profile owner)
//     if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized to update this profile'
//       });
//     }
    
//     // Remove fields that shouldn't be updated directly
//     const { password, role, ...updateData } = req.body;
    
//     // Only admin can update role
//     if (req.user.role === 'admin' && role) {
//       updateData.role = role;
//     }
    
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true, runValidators: true }
//     ).select('-password');
    
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       data: user
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// Fix the updateUser function to properly handle missing req.body

const updateUser = async (req, res) => {
  try {
    // Check permission
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }
    
    console.log('Update user request body:', req.body);
    console.log('Update user request file:', req.file);
    
    // Create update data object
    const updateData = {};
    
    // Safely add fields that may be in the form data
    if (req.body && req.body.name) updateData.name = req.body.name;
    if (req.body && req.body.bio !== undefined) updateData.bio = req.body.bio;
    if (req.body && req.body.phone !== undefined) updateData.phone = req.body.phone;
    if (req.body && req.body.address !== undefined) updateData.address = req.body.address;
    
    // Only admin can update role
    if (req.user.role === 'admin' && req.body && req.body.role) {
      updateData.role = req.body.role;
    }
    
    // Handle profile picture if it exists in req.file
    if (req.file) {
      updateData.profilePicture = `/uploads/${req.file.filename}`;
    }
    
    // Check if there's any data to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No update data provided'
      });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    await user.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get user statistics (Admin only)
// @route   GET /api/users/stats
// @access  Private (Admin only)
const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const students = await User.countDocuments({ role: 'student' });
    const tutors = await User.countDocuments({ role: 'tutor' });
    const admins = await User.countDocuments({ role: 'admin' });
    
    // Get recent users (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const newUsers = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
    
    res.status(200).json({
      success: true,
      data: {
        total: totalUsers,
        students,
        tutors,
        admins,
        newUsers
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

// @desc    Get recent users (Admin only)
// @route   GET /api/users/recent
// @access  Private (Admin only)
const getRecentUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update user's active status (Admin only)
// @route   PUT /api/users/:id/status
// @access  Private (Admin only)
const updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;
    
    if (isActive === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide isActive status'
      });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
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
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
  getRecentUsers,
  updateUserStatus
};