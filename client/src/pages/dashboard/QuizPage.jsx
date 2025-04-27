import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmission, setHasSubmission] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/quizzes/${quizId}`);
        
        if (!response.data.success) {
          throw new Error('Failed to fetch quiz');
        }
        
        const quizData = response.data.data.quiz;
        setQuiz(quizData);
        
        // Initialize answers array with -1 for each question (unanswered)
        setAnswers(quizData.questions.map((_, index) => ({ 
          questionIndex: index, 
          selectedOption: -1 
        })));
        
        // Set time limit
        setTimeLeft(quizData.timeLimit * 60); // convert to seconds
        
        // Check if the user has already submitted this quiz
        if (response.data.data.submission && response.data.data.submission.submitted) {
          setHasSubmission(true);
        }
      } catch (err) {
        console.error('Error fetching quiz:', err);
        toast.error('Failed to load quiz');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuiz();
  }, [quizId]);

  // Timer effect
  useEffect(() => {
    if (!quiz || timeLeft <= 0 || hasSubmission) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
      
      setTimeSpent(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quiz, timeLeft, hasSubmission]);

  // Format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex].selectedOption = optionIndex;
    setAnswers(newAnswers);
  };

  const moveToQuestion = (index) => {
    if (index >= 0 && index < quiz.questions.length) {
      setCurrentQuestion(index);
    }
  };

  const submitQuiz = async () => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      const response = await api.post(`/quizzes/${quizId}/submit`, {
        answers,
        timeSpent
      });
      
      if (response.data.success) {
        toast.success('Quiz submitted successfully');
        navigate(`/dashboard/courses/quiz/${quizId}/results`);
      } else {
        throw new Error(response.data.message || 'Failed to submit quiz');
      }
    } catch (err) {
      console.error('Error submitting quiz:', err);
      toast.error('Failed to submit quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-lg text-gray-700">Loading quiz...</p>
        </div>
      </div>
    );
  }
  
  if (hasSubmission) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="bg-blue-100 text-blue-800 py-3 px-4 rounded-lg inline-flex items-center mb-6">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              You've already completed this quiz
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{quiz.title}</h1>
            <p className="text-gray-600 mb-8">
              You have already submitted this quiz. Would you like to view your results?
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate(`/dashboard/courses/quiz/${quizId}/results`)}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
              >
                View Results
              </button>
              
              <button
                onClick={() => navigate(`/dashboard/courses/${quiz.courseId}`)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium"
              >
                Return to Course
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium">Quiz Not Found</h3>
          <p className="mt-1">The quiz you're looking for couldn't be found.</p>
          <button
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Quiz Header */}
          <div className="bg-blue-600 text-white p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold">{quiz.title}</h1>
                <p className="mt-2 text-blue-100">{quiz.questions.length} questions • {quiz.timeLimit} minutes</p>
              </div>
              <div className="mt-4 md:mt-0 bg-blue-700 rounded-lg px-6 py-3 text-center">
                <p className="text-xs uppercase font-semibold opacity-80">Time Remaining</p>
                <p className={`text-2xl font-bold ${timeLeft < 60 ? 'text-red-300' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
                <span>
                  {answers.filter(a => a.selectedOption !== -1).length} of {quiz.questions.length} answered
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Current Question */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {currentQuestion + 1}. {quiz.questions[currentQuestion].question}
              </h2>
              
              <div className="space-y-3">
                {quiz.questions[currentQuestion].options.map((option, optionIndex) => (
                  <div 
                    key={optionIndex}
                    onClick={() => handleAnswerSelect(currentQuestion, optionIndex)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      answers[currentQuestion].selectedOption === optionIndex
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 flex-shrink-0 rounded-full border flex items-center justify-center mr-3 ${
                        answers[currentQuestion].selectedOption === optionIndex
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300'
                      }`}>
                        {answers[currentQuestion].selectedOption === optionIndex && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className={`${answers[currentQuestion].selectedOption === optionIndex ? 'text-blue-800 font-medium' : 'text-gray-700'}`}>
                        {option}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Question Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
              <button
                onClick={() => moveToQuestion(currentQuestion - 1)}
                disabled={currentQuestion === 0}
                className={`px-4 py-2 rounded-md inline-flex items-center ${
                  currentQuestion === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              
              {/* Question Pills */}
              <div className="flex flex-wrap justify-center gap-2">
                {quiz.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => moveToQuestion(index)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      index === currentQuestion
                        ? 'bg-blue-600 text-white'
                        : answers[index].selectedOption !== -1
                          ? 'bg-green-100 text-green-800 border border-green-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              {currentQuestion < quiz.questions.length - 1 ? (
                <button
                  onClick={() => moveToQuestion(currentQuestion + 1)}
                  className="px-4 py-2 rounded-md inline-flex items-center text-gray-700 hover:bg-gray-100"
                >
                  Next
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={submitQuiz}
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-md inline-flex items-center ${
                    isSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Quiz
                      <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
            
            {/* Submit Button */}
            <div className="border-t border-gray-200 pt-6 flex justify-center">
              <button
                onClick={submitQuiz}
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-md inline-flex items-center ${
                  isSubmitting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Quiz
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;