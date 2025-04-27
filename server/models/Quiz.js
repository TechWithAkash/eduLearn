// const mongoose = require('mongoose');

// const QuizSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, 'Please add a title'],
//     trim: true
//   },
//   description: {
//     type: String,
//     required: [true, 'Please add a description']
//   },
//   lessonId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Lesson',
//     required: true
//   },
//   courseId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Course',
//     required: true
//   },
//   timeLimit: {
//     type: Number, // in minutes
//     default: 30
//   },
//   passingScore: {
//     type: Number,
//     default: 70 // percentage
//   },
//   questions: [
//     {
//       question: {
//         type: String,
//         required: true
//       },
//       options: [{
//         type: String,
//         required: true
//       }],
//       correctAnswer: {
//         type: Number, // index of the correct option
//         required: true
//       },
//       points: {
//         type: Number,
//         default: 1
//       }
//     }
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Quiz', QuizSchema);

const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a quiz title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a quiz description']
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
  questions: [{
    question: {
      type: String,
      required: true
    },
    options: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: Number,
      required: true
    }
  }],
  timeLimit: {
    type: Number, // in minutes
    default: 30
  },
  passingScore: {
    type: Number,
    default: 70 // percentage
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

module.exports = mongoose.model('Quiz', QuizSchema);