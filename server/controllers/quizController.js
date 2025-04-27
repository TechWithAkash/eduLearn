const Quiz = require('../models/Quiz');
const QuizSubmission = require('../models/QuizSubmission');
const Course = require('../models/Course');
const User = require('../models/User');
const Progress = require('../models/Progress');

// @desc    Get a quiz by ID
// @route   GET /api/quizzes/:id
// @access  Private
exports.getQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const quiz = await Quiz.findById(id);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Check if the user has already submitted this quiz
    const submission = await QuizSubmission.findOne({
      quiz: id,
      student: userId
    });

    // If requesting results page, include submission
    if (req.query.results === 'true' && submission) {
      return res.status(200).json({
        success: true,
        data: {
          quiz,
          submission
        }
      });
    }

    // For the quiz taking page, don't send the correct answers
    const sanitizedQuiz = {
      ...quiz.toObject(),
      questions: quiz.questions.map(q => ({
        ...q,
        correctAnswer: undefined
      }))
    };

    res.status(200).json({
      success: true,
      data: {
        quiz: sanitizedQuiz,
        submission: submission ? { submitted: true } : null
      }
    });
  } catch (error) {
    console.error('Error getting quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Submit a quiz
// @route   POST /api/quizzes/:id/submit
// @access  Private
exports.submitQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers, timeSpent } = req.body;
    const userId = req.user.id;

    const quiz = await Quiz.findById(id);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Calculate score
    let score = 0;
    const maxScore = quiz.questions.length;
    
    answers.forEach(answer => {
      const question = quiz.questions[answer.questionIndex];
      if (question && answer.selectedOption === question.correctAnswer) {
        score++;
      }
    });

    const percentage = (score / maxScore) * 100;
    const passed = percentage >= quiz.passingScore;

    // Save submission
    let submission = await QuizSubmission.findOne({
      quiz: id,
      student: userId
    });

    if (submission) {
      // Update existing submission
      submission.answers = answers;
      submission.score = score;
      submission.maxScore = maxScore;
      submission.percentage = percentage;
      submission.passed = passed;
      submission.timeSpent = timeSpent;
      submission.submittedAt = Date.now();
    } else {
      // Create new submission
      submission = new QuizSubmission({
        student: userId,
        quiz: id,
        courseId: quiz.courseId,
        answers,
        score,
        maxScore,
        percentage,
        passed,
        timeSpent,
      });
    }

    await submission.save();

    // Update user progress
    const progress = await Progress.findOne({
      student: userId,
      course: quiz.courseId
    });

    if (progress) {
      // Check if this lesson is already marked as completed
      if (!progress.completedLessons.includes(quiz.lessonId)) {
        progress.completedLessons.push(quiz.lessonId);
        
        // Update progress percentage
        const course = await Course.findById(quiz.courseId);
        if (course) {
          const totalLessons = course.modules.reduce((total, module) => 
            total + module.lessons.length, 0);
          
          progress.percentage = Math.round((progress.completedLessons.length / totalLessons) * 100);
        }
        
        await progress.save();
      }
    }

    res.status(200).json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get all quizzes for a course
// @route   GET /api/courses/:courseId/quizzes
// @access  Private
exports.getCourseQuizzes = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const quizzes = await Quiz.find({ courseId });
    
    // Get all submissions for this user
    const submissions = await QuizSubmission.find({
      student: userId,
      courseId
    });

    // Map quiz results with submission status
    const quizData = quizzes.map(quiz => {
      const submission = submissions.find(s => s.quiz.toString() === quiz._id.toString());
      
      return {
        ...quiz.toObject(),
        submission: submission ? {
          score: submission.score,
          maxScore: submission.maxScore,
          percentage: submission.percentage,
          passed: submission.passed,
          submittedAt: submission.submittedAt
        } : null
      };
    });

    res.status(200).json({
      success: true,
      data: quizData
    });
  } catch (error) {
    console.error('Error getting course quizzes:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};