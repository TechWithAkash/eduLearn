const mongoose = require('mongoose');

const AssignmentSubmissionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  textSubmission: {
    type: String
  },
  fileSubmission: {
    fileName: String,
    fileUrl: String,
    fileType: String,
    fileSize: Number
  },
  grade: {
    score: {
      type: Number,
      default: null
    },
    feedback: {
      type: String,
      default: ''
    },
    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    gradedAt: {
      type: Date
    }
  },
  status: {
    type: String,
    enum: ['submitted', 'late', 'graded', 'resubmitted'],
    default: 'submitted'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure a student can have only one submission per assignment
AssignmentSubmissionSchema.index({ student: 1, assignment: 1 }, { unique: true });

module.exports = mongoose.model('AssignmentSubmission', AssignmentSubmissionSchema);