// //server/controllers/paymentController.js
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// const Course = require('../models/Course');
// const User = require('../models/User');

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // @desc    Create order for course purchase
// // @route   POST /api/payments/courses/:id
// // @access  Private (Students)
// const createOrder = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
    
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: 'Course not found'
//       });
//     }
    
//     // Check if already enrolled
//     if (course.enrolledStudents.includes(req.user.id)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Already enrolled in this course'
//       });
//     }
    
//     // Create Razorpay order
//     const options = {
//       amount: course.price * 100, // Amount in paise
//       currency: 'INR',
//       receipt: `course_${course._id}_user_${req.user.id}`,
//       payment_capture: 1 // Auto-capture
//     };
    
//     const order = await razorpay.orders.create(options);
    
//     res.status(200).json({
//       success: true,
//       order
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// // @desc    Verify payment and enroll student
// // @route   POST /api/payments/verify
// // @access  Private (Students)
// const verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       courseId
//     } = req.body;
    
//     // Verify signature
//     const body = razorpay_order_id + '|' + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest('hex');
    
//     const isAuthentic = expectedSignature === razorpay_signature;
    
//     if (!isAuthentic) {
//       return res.status(400).json({
//         success: false,
//         message: 'Payment verification failed'
//       });
//     }
    
//     // Enroll student in course
//     const course = await Course.findById(courseId);
    
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: 'Course not found'
//       });
//     }
    
//     // Add student to course
//     course.enrolledStudents.push(req.user.id);
//     await course.save();
    
//     // Add course to student's enrolled courses
//     await User.findByIdAndUpdate(req.user.id, {
//       $push: { enrolledCourses: course._id }
//     });
    
//     res.status(200).json({
//       success: true,
//       message: 'Payment successful and enrollment completed'
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
//   createOrder,
//   verifyPayment
// };

const Razorpay = require('razorpay');
const crypto = require('crypto');
const Course = require('../models/Course');
const User = require('../models/User');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Create order for course purchase
// @route   POST /api/payments/courses/:id
// @access  Private (Students)
const createOrder = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Check if already enrolled
    if (course.enrolledStudents && course.enrolledStudents.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }
    
    // Create a shorter receipt ID (max 40 chars)
    // Use timestamp + shortened IDs for uniqueness
    const timestamp = Date.now().toString().slice(-8);
    const shortCourseId = course._id.toString().slice(-6);
    const shortUserId = req.user.id.toString().slice(-6);
    const receipt = `rcpt_${timestamp}_${shortCourseId}_${shortUserId}`;
    
    // Create Razorpay order
    const options = {
      amount: course.price * 100, // Amount in paise
      currency: 'INR',
      receipt: receipt, // This is now guaranteed to be under 40 chars
      payment_capture: 1 // Auto-capture
    };
    
    const order = await razorpay.orders.create(options);
    
    res.status(200).json({
      success: true,
      order,
      course: {
        id: course._id,
        title: course.title,
        price: course.price
      }
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order. Please try again later.'
    });
  }
};

// @desc    Verify payment and enroll student
// @route   POST /api/payments/verify
// @access  Private (Students)
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId
    } = req.body;
    
    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');
    
    const isAuthentic = expectedSignature === razorpay_signature;
    
    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
    
    // Enroll student in course
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Initialize enrolledStudents array if it doesn't exist
    if (!course.enrolledStudents) {
      course.enrolledStudents = [];
    }
    
    // Check if user is already enrolled (double-check)
    if (course.enrolledStudents.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }
    
    // Add student to course
    course.enrolledStudents.push(req.user.id);
    await course.save();
    
    // Add course to student's enrolled courses
    await User.findByIdAndUpdate(req.user.id, {
      $push: { enrolledCourses: course._id }
    });
    
    // Could also create a payment record in a separate collection if needed
    
    res.status(200).json({
      success: true,
      message: 'Payment successful and enrollment completed'
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process payment. Please try again later.'
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment
};