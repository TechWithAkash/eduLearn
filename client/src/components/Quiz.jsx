import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const timerRef = useRef(null);
  const [existingSubmission, setExistingSubmission] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/quizzes/${quizId}`);
        
        if (!response.data.success) {
          throw new Error('Failed to fetch quiz');
        }
        
        setQuiz(response.data.data.quiz);
        
        // Check if there's an existing submission
        if (response.data.data.submission) {
          setExistingSubmission(response.data.data.submission);
        }
      } catch (err) {
        console.error('Error fetching quiz:', err);
        toast.error('Failed to load quiz');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuiz();
    
    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quizId]);

  const startQuiz = () => {
    if (quiz.timeLimit) {
      setTimeLeft(quiz.timeLimit * 60); // Convert minutes to seconds
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            handleSubmitQuiz();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    setQuizStarted(true);
    toast.success('Quiz started! Good luck!');
  };

  const handleAnswerSelect = (questionId, optionId, isMultiple = false) => {
    if (isMultiple) {
      // For multiple choice questions (checkboxes)
      setAnswers((prev) => {
        const currentSelections = prev[questionId] || [];
        
        if (currentSelections.includes(optionId)) {
          // If already selected, remove it
          return {
            ...prev,
            [questionId]: currentSelections.filter(id => id !== optionId)
          };
        } else {
          // If not selected, add it
          return {
            ...prev,
            [questionId]: [...currentSelections, optionId]
          };
        }
      });
    } else {
      // For single choice questions (radio buttons)
      setAnswers((prev) => ({
        ...prev,
        [questionId]: optionId
      }));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!confirmation && !timeLeft) {
      setConfirmation(true);
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Check if all questions are answered
      const questionsAnswered = Object.keys(answers).length;
      const totalQuestions = quiz.questions.length;
      
      if (questionsAnswered < totalQuestions) {
        const unansweredCount = totalQuestions - questionsAnswered;
        if (!window.confirm(`You have ${unansweredCount} unanswered question${unansweredCount > 1 ? 's' : ''}. Are you sure you want to submit?`)) {
          setIsSubmitting(false);
          return;
        }
      }
      
      const response = await api.post(`/quizzes/${quizId}/submit`, { answers });
      
      if (!response.data.success) {
        throw new Error('Failed to submit quiz');
      }
      
      // Clear the timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      toast.success('Quiz submitted successfully!');
      
      // Navigate to results page
      navigate(`/dashboard/courses/quiz-result/${quizId}`);
    } catch (err) {
      console.error('Error submitting quiz:', err);
      toast.error(err.response?.data?.message || 'Failed to submit quiz');
      setIsSubmitting(false);
      setConfirmation(false);
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

  // Redirect to results page if already submitted
  if (existingSubmission) {
    navigate(`/dashboard/courses/quiz-result/${quizId}`);
    return null;
  }

  // Format time left
  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Welcome screen before starting the quiz
  if (!quizStarted) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 text-white p-6">
              <h1 className="text-2xl font-bold">{quiz.title}</h1>
              <p className="mt-2 text-blue-100">{quiz.description}</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6 space-y-4">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>This quiz contains {quiz.questions.length} questions</p>
                </div>
                
                {quiz.timeLimit && (
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Time limit: {quiz.timeLimit} minutes</p>
                  </div>
                )}
                
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Total points: {quiz.totalPoints} points</p>
                </div>
                
                {quiz.passingScore && (
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Passing score: {quiz.passingScore}%</p>
                  </div>
                )}
                
                {quiz.allowRetake === false && (
                  <div className="flex items-center text-red-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p>You cannot retake this quiz after submission.</p>
                  </div>
                )}
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Important:</strong> Once you start the quiz, you cannot leave the page. Make sure you're ready before starting.
                      {quiz.timeLimit && ' The quiz will automatically submit when the time is up.'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  Back to Course
                </button>
                
                <button
                  onClick={startQuiz}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render quiz
  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;
  const isMultipleSelect = question.type === 'multiple';
  const selectedAnswers = answers[question._id] || (isMultipleSelect ? [] : null);

  return (
    <div className="bg-gray-50 min-h-screen py-4">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Quiz Header */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 truncate">{quiz.title}</h1>
            
            {quiz.timeLimit && (
              <div className={`text-sm font-mono px-3 py-1 rounded-full flex items-center ${
                timeLeft && timeLeft < 60 
                  ? 'bg-red-100 text-red-800 animate-pulse' 
                  : timeLeft && timeLeft < 300 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-gray-100 text-gray-800'
              }`}>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatTime(timeLeft)}
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <div>Question {currentQuestion + 1} of {quiz.questions.length}</div>
              <div>{Object.keys(answers).length} answered</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Question Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {question.text}
                {question.points && (
                  <span className="ml-2 text-sm text-gray-500 font-normal">
                    ({question.points} {question.points === 1 ? 'point' : 'points'})
                  </span>
                )}
              </h2>
              
              {question.image && (
                <div className="mb-6">
                  <img 
                    src={question.image} 
                    alt="Question illustration" 
                    className="max-w-full h-auto rounded-md mx-auto"
                  />
                </div>
              )}
              
              <div className="space-y-3">
                {question.options.map((option) => (
                  <div
                    key={option._id}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      isMultipleSelect
                        ? selectedAnswers.includes(option._id)
                          ? 'bg-blue-50 border-blue-300'
                          : 'hover:bg-gray-50 border-gray-200'
                        : selectedAnswers === option._id
                          ? 'bg-blue-50 border-blue-300'
                          : 'hover:bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => handleAnswerSelect(question._id, option._id, isMultipleSelect)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        {isMultipleSelect ? (
                          <div className={`w-5 h-5 border ${
                            selectedAnswers.includes(option._id)
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300'
                          } rounded flex items-center justify-center`}>
                            {selectedAnswers.includes(option._id) && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        ) : (
                          <div className={`w-5 h-5 border ${
                            selectedAnswers === option._id
                              ? 'border-blue-500'
                              : 'border-gray-300'
                          } rounded-full flex items-center justify-center`}>
                            {selectedAnswers === option._id && (
                              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-700">{option.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {isMultipleSelect && (
                <div className="mt-4 text-sm text-gray-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Select all that apply
                </div>
              )}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={isFirstQuestion}
              className={`px-4 py-2 rounded-md flex items-center ${
                isFirstQuestion
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <div className="flex space-x-3">
              {!isLastQuestion ? (
                <button
                  onClick={nextQuestion}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  Next
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-md flex items-center ${
                    isSubmitting || confirmation
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : confirmation ? (
                    <>
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Click again to confirm
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
          </div>
          
          {/* Question Navigation */}
          <div className="bg-white rounded-lg shadow-md p-4 mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Questions</h3>
            <div className="flex flex-wrap gap-2">
              {quiz.questions.map((q, index) => (
                <button
                  key={q._id}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentQuestion === index
                      ? 'bg-blue-600 text-white'
                      : answers[q._id]
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;