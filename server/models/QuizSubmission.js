const mongoose = require('mongoose');

const QuizSubmissionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  answers: [{
    questionIndex: Number,
    selectedOption: Number
  }],
  score: {
    type: Number,
    required: true
  },
  maxScore: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  passed: {
    type: Boolean,
    required: true
  },
  timeSpent: {
    type: Number,
    default: 0 // in seconds
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure a student can have only one submission per quiz
QuizSubmissionSchema.index({ student: 1, quiz: 1 }, { unique: true });

module.exports = mongoose.model('QuizSubmission', QuizSubmissionSchema);