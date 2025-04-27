// const Progress = require('../models/Progress');
// const User = require('../models/User');
// const Course = require('../models/Course');

// // @desc    Get progress for a course
// // @route   GET /api/progress/:courseId
// // @access  Private
// exports.getProgress = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const userId = req.user.id;

//     // Find existing progress
//     let progress = await Progress.findOne({
//       student: userId,
//       course: courseId
//     });

//     // If no progress found, create new progress object
//     if (!progress) {
//       progress = {
//         percentage: 0,
//         completedLessons: [],
//         lastAccessedModule: 0,
//         lastAccessedLesson: 0
//       };
//     }

//     res.status(200).json({
//       success: true,
//       data: progress
//     });
//   } catch (error) {
//     console.error('Error fetching progress:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// // @desc    Complete a lesson
// // @route   POST /api/progress/:courseId/complete-lesson
// // @access  Private
// exports.completeLesson = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const { lessonId, moduleId, moduleIndex, lessonIndex } = req.body;
//     const userId = req.user.id;

//     // Find existing progress or create new one
//     let progress = await Progress.findOne({
//       student: userId,
//       course: courseId
//     });

//     if (!progress) {
//       progress = new Progress({
//         student: userId,
//         course: courseId,
//         completedLessons: [],
//         percentage: 0,
//         lastAccessedModule: moduleIndex,
//         lastAccessedLesson: lessonIndex
//       });
//     }

//     // Check if lesson is already completed
//     if (!progress.completedLessons.includes(lessonId)) {
//       progress.completedLessons.push(lessonId);
      
//       // Get course data to calculate percentage
//       const course = await Course.findById(courseId);
//       const totalLessons = course.modules.reduce(
//         (total, module) => total + module.lessons.length, 
//         0
//       );
      
//       // Calculate percentage
//       progress.percentage = Math.round((progress.completedLessons.length / totalLessons) * 100);
//     }

//     // Update last accessed module and lesson
//     progress.lastAccessedModule = moduleIndex;
//     progress.lastAccessedLesson = lessonIndex;

//     // Save progress
//     await progress.save();

//     res.status(200).json({
//       success: true,
//       data: progress
//     });
//   } catch (error) {
//     console.error('Error completing lesson:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// // @desc    Save notes for a lesson
// // @route   POST /api/progress/:courseId/notes
// // @access  Private
// exports.saveNotes = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const { lessonId, notes } = req.body;
//     const userId = req.user.id;

//     // Find existing progress
//     let progress = await Progress.findOne({
//       student: userId,
//       course: courseId
//     });

//     if (!progress) {
//       return res.status(404).json({
//         success: false,
//         message: 'Progress not found'
//       });
//     }

//     // Update or add notes
//     const noteIndex = progress.notes.findIndex(note => note.lessonId === lessonId);
    
//     if (noteIndex >= 0) {
//       progress.notes[noteIndex].content = notes;
//     } else {
//       progress.notes.push({
//         lessonId,
//         content: notes
//       });
//     }

//     // Save progress
//     await progress.save();

//     res.status(200).json({
//       success: true,
//       data: progress.notes
//     });
//   } catch (error) {
//     console.error('Error saving notes:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

const Progress = require('../models/Progress');
const User = require('../models/User');
const Course = require('../models/Course');
const mongoose = require('mongoose');

// @desc    Get progress for a course
// @route   GET /api/progress/:courseId
// @access  Private
exports.getProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    // Find existing progress
    let progress = await Progress.findOne({
      student: userId,
      course: courseId
    });

    // If no progress found, create new progress object
    if (!progress) {
      progress = {
        percentage: 0,
        completedLessons: [],
        lastAccessedModule: 0,
        lastAccessedLesson: 0,
        notes: []
      };
    }

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Complete a lesson
// @route   POST /api/progress/:courseId/complete-lesson
// @access  Private
exports.completeLesson = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { lessonId, moduleId, moduleIndex, lessonIndex } = req.body;
    const userId = req.user.id;

    // Find existing progress or create new one
    let progress = await Progress.findOne({
      student: userId,
      course: courseId
    });

    if (!progress) {
      progress = new Progress({
        student: userId,
        course: courseId,
        completedLessons: [],
        percentage: 0,
        lastAccessedModule: moduleIndex,
        lastAccessedLesson: lessonIndex
      });
    }

    // Check if lesson is already completed
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      
      // Get course data to calculate percentage
      const course = await Course.findById(courseId);
      const totalLessons = course.modules.reduce(
        (total, module) => total + module.lessons.length, 
        0
      );
      
      // Calculate percentage
      progress.percentage = Math.round((progress.completedLessons.length / totalLessons) * 100);
    }

    // Update last accessed module and lesson
    progress.lastAccessedModule = moduleIndex;
    progress.lastAccessedLesson = lessonIndex;

    // Save progress
    await progress.save();

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Error completing lesson:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get notes for a specific lesson
// @route   GET /api/progress/:courseId/notes/:lessonId
// @access  Private
// exports.getNotes = async (req, res) => {
//   try {
//     const { courseId, lessonId } = req.params;
//     const userId = req.user.id;

//     // Find progress
//     const progress = await Progress.findOne({
//       student: userId,
//       course: courseId
//     });

//     if (!progress) {
//       return res.status(200).json({
//         success: true,
//         data: null
//       });
//     }

//     // Find notes for the lesson
//     const noteEntry = progress.notes.find(note => note.lessonId === lessonId);
    
//     res.status(200).json({
//       success: true,
//       data: noteEntry || null
//     });
//   } catch (error) {
//     console.error('Error fetching notes:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// @desc    Save notes for a lesson
// @route   POST /api/progress/:courseId/notes
// @access  Private
// exports.saveNotes = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const { lessonId, notes } = req.body;
//     const userId = req.user.id;

//     // Find existing progress or create new one
//     let progress = await Progress.findOne({
//       student: userId,
//       course: courseId
//     });

//     if (!progress) {
//       progress = new Progress({
//         student: userId,
//         course: courseId,
//         completedLessons: [],
//         percentage: 0,
//         lastAccessedModule: 0,
//         lastAccessedLesson: 0,
//         notes: []
//       });
//     }

//     // Update or add notes
//     const noteIndex = progress.notes.findIndex(note => note.lessonId === lessonId);
    
//     if (noteIndex >= 0) {
//       progress.notes[noteIndex].content = notes;
//       progress.notes[noteIndex].updatedAt = Date.now();
//     } else {
//       progress.notes.push({
//         lessonId,
//         content: notes,
//         updatedAt: Date.now()
//       });
//     }

//     // Save progress
//     await progress.save();

//     res.status(200).json({
//       success: true,
//       data: progress.notes.find(note => note.lessonId === lessonId)
//     });
//   } catch (error) {
//     console.error('Error saving notes:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error'
//     });
//   }
// };

// Add these functions if they don't exist

// @desc    Get notes for a specific lesson
// @route   GET /api/progress/:courseId/notes/:lessonId
// @access  Private
exports.getNotes = async (req, res) => {
    try {
      const { courseId, lessonId } = req.params;
      const userId = req.user.id;
  
      // Find progress
      const progress = await Progress.findOne({
        student: userId,
        course: courseId
      });
  
      if (!progress) {
        return res.status(200).json({
          success: true,
          data: null
        });
      }
  
      // Find notes for the lesson
      const noteEntry = progress.notes.find(note => 
        note.lessonId.toString() === lessonId
      );
      
      res.status(200).json({
        success: true,
        data: noteEntry || null
      });
    } catch (error) {
      console.error('Error fetching notes:', error);
      res.status(500).json({
        success: false,
        message: 'Server Error'
      });
    }
  };
  
  // @desc    Save notes for a lesson
  // @route   POST /api/progress/:courseId/notes
  // @access  Private
  exports.saveNotes = async (req, res) => {
    try {
      const { courseId } = req.params;
      const { lessonId, notes } = req.body;
      const userId = req.user.id;
  
      // Find existing progress or create new one
      let progress = await Progress.findOne({
        student: userId,
        course: courseId
      });
  
      if (!progress) {
        progress = new Progress({
          student: userId,
          course: courseId,
          completedLessons: [],
          percentage: 0,
          lastAccessedModule: 0,
          lastAccessedLesson: 0,
          notes: []
        });
      }
  
      // Update or add notes
      const noteIndex = progress.notes.findIndex(note => 
        note.lessonId && note.lessonId.toString() === lessonId
      );
      
      if (noteIndex >= 0) {
        progress.notes[noteIndex].content = notes;
        progress.notes[noteIndex].updatedAt = Date.now();
      } else {
        progress.notes.push({
          lessonId,
          content: notes,
          updatedAt: Date.now()
        });
      }
  
      // Save progress
      await progress.save();
  
      res.status(200).json({
        success: true,
        data: progress.notes.find(note => note.lessonId.toString() === lessonId)
      });
    } catch (error) {
      console.error('Error saving notes:', error);
      res.status(500).json({
        success: false,
        message: 'Server Error'
      });
    }
  };