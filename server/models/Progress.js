const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  completedLessons: [String],
  percentage: {
    type: Number,
    default: 0
  },
  lastAccessedModule: {
    type: Number,
    default: 0
  },
  lastAccessedLesson: {
    type: Number,
    default: 0
  },
  notes: [
    {
      lessonId: String,
      content: String,
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create a compound index on student and course
ProgressSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);