// //server/models/Course.js
// const mongoose = require('mongoose');

// const CourseSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, 'Please add a course title'],
//     trim: true,
//     maxlength: [100, 'Title cannot be more than 100 characters']
//   },
//   description: {
//     type: String,
//     required: [true, 'Please add a description'],
//     maxlength: [1000, 'Description cannot be more than 1000 characters']
//   },
//   category: {
//     type: String,
//     required: [true, 'Please add a category'],
//     enum: [
//       'Mathematics',
//       'Science',
//       'Social Studies',
//       'Language Arts',
//       'Computer Science',
//       'Arts',
//       'Physical Education',
//       'Other'
//     ]
//   },
//   grade: {
//     type: String,
//     required: [true, 'Please specify grade level'],
//     enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
//   },
//   instructor: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   thumbnail: {
//     type: String,
//     default: 'default-course.jpg'
//   },
//   price: {
//     type: Number,
//     required: [true, 'Please add a price']
//   },
//   isPublished: {
//     type: Boolean,
//     default: false
//   },
//   modules: [{
//     title: {
//       type: String,
//       required: [true, 'Please add a module title']
//     },
//     description: {
//       type: String
//     },
//     lessons: [{
//       title: {
//         type: String,
//         required: [true, 'Please add a lesson title']
//       },
//       type: {
//         type: String,
//         enum: ['video', 'pdf', 'quiz', 'assignment'],
//         required: true
//       },
//       content: {
//         type: String,  // URL for videos/pdfs, content for quizzes/assignments
//         required: true
//       },
//       duration: Number,  // in minutes, for videos
//       order: Number
//     }]
//   }],
//   enrolledStudents: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }],
//   ratings: [{
//     student: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     },
//     rating: {
//       type: Number,
//       min: 1,
//       max: 5,
//       required: true
//     },
//     review: String,
//     date: {
//       type: Date,
//       default: Date.now
//     }
//   }],
//   averageRating: {
//     type: Number,
//     min: 0,
//     max: 5
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Calculate average rating when ratings are modified
// CourseSchema.pre('save', function(next) {
//   if (this.ratings.length > 0) {
//     this.averageRating = this.ratings.reduce((acc, item) => item.rating + acc, 0) / this.ratings.length;
//   } else {
//     this.averageRating = 0;
//   }
//   next();
// });

// module.exports = mongoose.model('Course', CourseSchema);


const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a lesson title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Lesson content is required']
  },
  videoUrl: {
    type: String
  },
  duration: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    enum: ['text', 'video', 'quiz', 'assignment'],
    default: 'text'
  },
  order: {
    type: Number,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a module title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    required: true
  },
  lessons: [lessonSchema]
}, { timestamps: true });

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  category: {
    type: String,
    enum: [
      'Web Development',
      'Mobile Development',
      'Data Science',
      'Machine Learning',
      'DevOps',
      'Cloud Computing',
      'Cybersecurity',
      'Blockchain',
      'Game Development',
      'Design',
      'Photography',
      'Marketing',
      'Business',
      'Personal Development',
      'Other',
      'Computer Science',
    ],
    required: [true, 'Please select a category']
  },
  grade: {
    type: String,
    required: [true, 'Please specify grade level']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'all-levels'],
    default: 'all-levels'
  },
  price: {
    type: Number,
    default: 0
  },
  isFree: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverImage: {
    type: String,
    default: 'default-course.jpg'
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  ratings: [{
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    review: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  modules: [moduleSchema]
}, { timestamps: true });

// Generate slug from title
CourseSchema.pre('save', function(next) {
  if (!this.isModified('title')) {
    next();
    return;
  }
  this.slug = this.title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-') + '-' + Date.now().toString().slice(-4);
  next();
});

// Calculate average rating
CourseSchema.pre('save', function(next) {
  if (this.ratings.length > 0) {
    this.averageRating = this.ratings.reduce((acc, item) => item.rating + acc, 0) / this.ratings.length;
  }
  next();
});

module.exports = mongoose.model('Course', CourseSchema);