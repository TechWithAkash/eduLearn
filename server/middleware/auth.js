// // server/middleware/auth.js
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const mongoose = require('mongoose');
// // @desc    Register user
// // @route   POST /api/auth/register
// // @access  Public
// const register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Check if user exists
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({
//         success: false,
//         message: 'User already exists'
//       });
//     }

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password,
//       role: role || 'student',
//     });

//     if (user) {
//       res.status(201).json({
//         success: true,
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           token: generateToken(user._id)
//         }
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// // @access  Public
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check for user email
//     const user = await User.findOne({ email }).select('+password');

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     // Check if password matches
//     const isMatch = await user.matchPassword(password);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         token: generateToken(user._id)
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// // @desc    Get current logged in user
// // @route   GET /api/auth/me
// // @access  Private
// const getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     res.status(200).json({
//       success: true,
//       user
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };
  

// // Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE
//   });
// };

// // Middleware to protect routes
// // const protect = async (req, res, next) => {
// //     let token;
  
// //     // Check if authorization header exists and starts with Bearer
// //     if (
// //       req.headers.authorization &&
// //       req.headers.authorization.startsWith('Bearer')
// //     ) {
// //       try {
// //         // Get token from header
// //         token = req.headers.authorization.split(' ')[1];
  
// //         // Verify token
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
// //         // Get user from the token
// //         req.user = await User.findById(decoded.id).select('-password');
  
// //         next();
// //       } catch (error) {
// //         console.error(error);
// //         res.status(401).json({ success: false, message: 'Not authorized' });
// //       }
// //     }
  
// //     if (!token) {
// //       res.status(401).json({ success: false, message: 'Not authorized, no token' });
// //     }
// //   };
// // Update the protect middleware

// // Protect routes
// const protect = async (req, res, next) => {
//   try {
//     let token;

//     // Check for token in Authorization header
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith('Bearer')
//     ) {
//       // Extract token
//       token = req.headers.authorization.split(' ')[1];
//     } 
//     // You could also check cookies if you're using them
//     else if (req.cookies && req.cookies.token) {
//       token = req.cookies.token;
//     }

//     // Make sure token exists
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'Not authorized to access this route'
//       });
//     }

//     try {
//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Find user by id
//       const user = await User.findById(decoded.id);

//       if (!user) {
//         return res.status(401).json({
//           success: false,
//           message: 'User not found'
//         });
//       }

//       // Add user to request object
//       req.user = user;
//       next();
//     } catch (err) {
//       return res.status(401).json({
//         success: false,
//         message: 'Not authorized to access this route'
//       });
//     }
//   } catch (error) {
//     console.error('Auth middleware error:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Server error in authentication'
//     });
//   }
// };
// // Authorize middleware
// const authorize = (...roles) => {
//     return (req, res, next) => {
//       if (!roles.includes(req.user.role)) {
//         return res.status(403).json({
//           success: false,
//           message: `User role '${req.user.role}' is not authorized to access this route`
//         });
//       }
//       next();
//     };
//   };

//   require('dotenv').config();


// const createAdminUser = async () => {
//   try {
//     // Connect to database
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
    
//     // Check if any admin exists
//     const adminExists = await User.findOne({ role: 'admin' });
    
//     if (adminExists) {
//       console.log('Admin user already exists');
//       process.exit(0);
//     }
    
//     // Admin credentials - preferably from environment variables
//     const name = process.env.ADMIN_NAME || 'System Admin';
//     const email = process.env.ADMIN_EMAIL;
//     const password = process.env.ADMIN_PASSWORD;
    
//     if (!email || !password) {
//       console.error('Admin email and password must be provided in environment variables');
//       process.exit(1);
//     }
    
//     // Create admin user
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
    
//     const admin = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: 'admin'
//     });
    
//     console.log(`Admin user created successfully: ${admin.email}`);
//     process.exit(0);
//   } catch (error) {
//     console.error('Error creating admin user:', error);
//     process.exit(1);
//   }
// };

// createAdminUser();

// module.exports = {
//   register,
//   login,
//   getMe,
//   protect,
//   authorize,
//   createAdminUser    // <<< Add protect here!

// };

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Load environment variables
require('dotenv').config();

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student',
    });

    if (user) {
      res.status(201).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id)
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// // @access  Public
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check for user email
//     const user = await User.findOne({ email }).select('+password');

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     // Check if password matches
//     const isMatch = await user.matchPassword(password);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     // Update last login time
//     user.lastLogin = Date.now();
//     await user.save({ validateBeforeSave: false });

//     res.status(200).json({
//       success: true,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         token: generateToken(user._id)
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// Fix the login function

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Add debug logs
//     console.log(`Login attempt for email: ${email}`);
    
//     // Check for user email
//     const user = await User.findOne({ email }).select('+password');

//     if (!user) {
//       console.log(`User not found with email: ${email}`);
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     console.log(`User found: ${user.name}, role: ${user.role}`);

//     // Check if password matches
//     const isMatch = await user.matchPassword(password);
//     console.log(`Password match result: ${isMatch}`);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     // Generate token
//     const token = generateToken(user._id);

//     // Update last login time
//     user.lastLogin = Date.now();
//     await user.save({ validateBeforeSave: false });

//     res.status(200).json({
//       success: true,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         token
//       }
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };
// Update the login function:

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(`Login attempt for email: ${email}`);
    
    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log(`User not found with email: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log(`User found: ${user.name}, role: ${user.role}`);
    console.log(`Stored password hash: ${user.password.substring(0, 10)}...`);

    // Check if password matches using direct bcrypt comparison
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
      console.log(`Direct bcrypt comparison result: ${isMatch}`);
    } catch (err) {
      console.error('Error during password comparison:', err);
    }

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('Password matches! Generating token...');
    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '30d'
    });

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};
// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create admin user via API
// @route   POST /api/auth/create-admin
// @access  Private/Admin
const createAdminUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password'
      });
    }
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    // Create admin user
    const user = await User.create({
      name,
      email,
      password,
      role: 'admin'
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
      message: 'Server Error'
    });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// Protect routes
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Extract token
      token = req.headers.authorization.split(' ')[1];
    } 
    // You could also check cookies if you're using them
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by id
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

// Authorize middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};

module.exports = {
  register,
  login,
  getMe,
  protect,
  authorize,
  createAdminUser
};