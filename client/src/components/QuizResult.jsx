import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const QuizResults = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        setIsLoading(true);
        // Get quiz details first
        const quizResponse = await api.get(`/quizzes/${quizId}`);
        
        if (!quizResponse.data.success || !quizResponse.data.data.submission) {
          // If no submission exists, redirect to quiz page
          navigate(`/dashboard/courses/quiz/${quizId}`);
          return;
        }
        
        setQuiz(quizResponse.data.data.quiz);
        setSubmission(quizResponse.data.data.submission);
      } catch (err) {
        console.error('Error fetching quiz results:', err);
        toast.error('Failed to load quiz results');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuizResults();
  }, [quizId, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-lg text-gray-700">Loading results...</p>
        </div>
      </div>
    );
  }
  
  if (!quiz || !submission) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium">Results Not Found</h3>
          <p className="mt-1">We couldn't find your quiz results.</p>
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

  const passed = submission.percentage >= quiz.passingScore;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Results Header */}
          <div className={`p-6 text-white ${passed ? 'bg-green-600' : 'bg-red-600'}`}>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{quiz.title} - Results</h1>
              <div className="text-xl font-bold">
                {submission.score} / {submission.maxScore} points
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className={`text-lg font-medium ${passed ? 'text-green-100' : 'text-red-100'}`}>
                Final Score: {submission.percentage.toFixed(1)}%
              </div>
              <div className={`ml-4 py-1 px-3 rounded-full text-sm font-medium ${
                passed ? 'bg-green-700 text-green-100' : 'bg-red-700 text-red-100'
              }`}>
                {passed ? 'PASSED' : 'FAILED'}
              </div>
            </div>
            <p className="mt-2 text-sm">
              Passing score: {quiz.passingScore}%
            </p>
          </div>
          
          {/* Score Visualization */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Score Breakdown</h2>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className={`h-4 rounded-full ${passed ? 'bg-green-500' : 'bg-red-500'}`} 
                style={{ width: `${submission.percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>0%</span>
              <span className="font-medium">{submission.percentage.toFixed(1)}%</span>
              <span>100%</span>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500">Total Questions</div>
                <div className="text-2xl font-bold text-gray-800">{quiz.questions.length}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500">Correct Answers</div>
                <div className="text-2xl font-bold text-green-600">
                  {submission.answers.filter((answer, index) => 
                    answer.selectedOption === quiz.questions[index].correctAnswer
                  ).length}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500">Incorrect Answers</div>
                <div className="text-2xl font-bold text-red-600">
                  {submission.answers.filter((answer, index) => 
                    answer.selectedOption !== quiz.questions[index].correctAnswer &&
                    answer.selectedOption !== -1
                  ).length}
                </div>
              </div>
            </div>
          </div>
          
          {/* Question Review */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Question Review</h2>
            
            <div className="space-y-6">
              {quiz.questions.map((question, questionIndex) => {
                const userAnswer = submission.answers.find(a => a.questionIndex === questionIndex);
                const isCorrect = userAnswer?.selectedOption === question.correctAnswer;
                const isUnanswered = userAnswer?.selectedOption === -1;
                
                return (
                  <div 
                    key={questionIndex}
                    className={`border rounded-lg p-5 ${
                      isUnanswered
                        ? 'border-yellow-300 bg-yellow-50'
                        : isCorrect
                          ? 'border-green-300 bg-green-50'
                          : 'border-red-300 bg-red-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-md font-medium text-gray-800">
                        {questionIndex + 1}. {question.question}
                      </h3>
                      <div className={`ml-4 px-2 py-1 rounded-md text-xs font-semibold ${
                        isUnanswered
                          ? 'bg-yellow-200 text-yellow-800'
                          : isCorrect
                            ? 'bg-green-200 text-green-800'
                            : 'bg-red-200 text-red-800'
                      }`}>
                        {isUnanswered ? 'Unanswered' : isCorrect ? 'Correct' : 'Incorrect'}
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div 
                          key={optionIndex}
                          className={`p-3 rounded-md flex items-center ${
                            optionIndex === question.correctAnswer
                              ? 'bg-green-100 border border-green-200'
                              : userAnswer?.selectedOption === optionIndex
                                ? 'bg-red-100 border border-red-200'
                                : 'bg-gray-50 border border-gray-200'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full flex-shrink-0 mr-3 flex items-center justify-center ${
                            optionIndex === question.correctAnswer
                              ? 'bg-green-500 text-white'
                              : userAnswer?.selectedOption === optionIndex
                                ? 'bg-red-500 text-white'
                                : 'bg-white border border-gray-300'
                          }`}>
                            {optionIndex === question.correctAnswer && (
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            {userAnswer?.selectedOption === optionIndex && optionIndex !== question.correctAnswer && (
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                    
                    {!isCorrect && (
                      <div className="mt-3 text-sm">
                        <span className="font-medium text-gray-700">Correct answer: </span>
                        <span className="text-green-600">{question.options[question.correctAnswer]}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate(`/dashboard/courses/${quiz.courseId}`)}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Course
              </button>
              
              {!passed && (
                <button
                  onClick={() => navigate(`/dashboard/courses/quiz/${quizId}/retake`)}
                  className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retake Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;