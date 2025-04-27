const upload = require('../middleware/fileUpload');
const Course = require('../models/Course');

// @desc    Upload file
// @route   POST /api/upload
// @access  Private (Tutors, Admins)
const uploadFile = async (req, res) => {
  try {
    // Single file upload
    upload.single('file')(req, res, function(err) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err
        });
      }
      
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a file'
        });
      }
      
      res.status(200).json({
        success: true,
        data: {
          fileName: req.file.filename,
          filePath: `/uploads/${req.file.filename}`
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Upload course thumbnail
// @route   POST /api/courses/:id/thumbnail
// @access  Private (Course owner, Admin)
const uploadCourseThumbnail = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Check permissions
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this course'
      });
    }
    
    upload.single('thumbnail')(req, res, async function(err) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err
        });
      }
      
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a thumbnail image'
        });
      }
      
      course.thumbnail = `/uploads/${req.file.filename}`;
      await course.save();
      
      res.status(200).json({
        success: true,
        data: course
      });
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
  uploadFile,
  uploadCourseThumbnail
};