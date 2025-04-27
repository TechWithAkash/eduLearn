// const mongoose = require('mongoose');

// const AssignmentSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, 'Please add a title'],
//     trim: true,
//     maxlength: [100, 'Title cannot be more than 100 characters']
//   },
//   description: {
//     type: String,
//     required: [true, 'Please add a description']
//   },
//   course: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Course',
//     required: true
//   },
//   module: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true
//   },
//   type: {
//     type: String,
//     enum: ['quiz', 'assignment'],
//     required: true
//   },
//   totalMarks: {
//     type: Number,
//     required: true
//   },
//   dueDate: {
//     type: Date,
//     required: true
//   },
//   questions: [{
//     question: {
//       type: String,
//       required: true
//     },
//     type: {
//       type: String,
//       enum: ['multiple-choice', 'true-false', 'short-answer', 'essay'],
//       required: true
//     },
//     options: [String], // For multiple choice
//     correctAnswer: String, // For objective questions
//     marks: {
//       type: Number,
//       required: true
//     }
//   }],
//   submissions: [{
//     student: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//     answers: [{
//       questionId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true
//       },
//       answer: String
//     }],
//     submittedAt: {
//       type: Date,
//       default: Date.now
//     },
//     grade: {
//       type: Number,
//       default: 0
//     },
//     feedback: String,
//     isGraded: {
//       type: Boolean,
//       default: false
//     }
//   }],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Assignment', AssignmentSchema);

const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an assignment title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide an assignment description']
  },
  instructions: {
    type: String,
    required: [true, 'Please provide assignment instructions']
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  dueDate: {
    type: Date
  },
  totalPoints: {
    type: Number,
    required: true,
    default: 100
  },
  submissionType: {
    type: String,
    enum: ['text', 'file', 'both'],
    default: 'both'
  },
  allowedFileTypes: {
    type: [String],
    default: ['pdf', 'doc', 'docx', 'zip']
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);