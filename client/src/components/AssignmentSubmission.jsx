import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const AssignmentSubmission = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [grade, setGrade] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [isResubmitting, setIsResubmitting] = useState(false);

  const isInstructor = user?.role === 'instructor' || user?.role === 'admin';

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/assignments/${assignmentId}/submission`);
        
        if (!response.data.success) {
          throw new Error('Failed to fetch assignment submission');
        }
        
        setAssignment(response.data.data.assignment);
        setSubmission(response.data.data.submission);
        
        if (response.data.data.submission?.feedback) {
          setFeedback(response.data.data.submission.feedback);
        }
        
        if (response.data.data.submission?.grade !== undefined) {
          setGrade(response.data.data.submission.grade.toString());
        }
      } catch (err) {
        console.error('Error fetching submission:', err);
        toast.error('Failed to load submission details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSubmission();
  }, [assignmentId]);

  const handleGradeSubmit = async (e) => {
    e.preventDefault();
    
    if (!grade && !feedback) {
      toast.error('Please provide a grade or feedback');
      return;
    }
    
    try {
      setIsGrading(true);
      
      const gradeData = {
        grade: grade !== '' ? parseFloat(grade) : undefined,
        feedback
      };
      
      const response = await api.post(`/assignments/${assignmentId}/grade`, gradeData);
      
      if (!response.data.success) {
        throw new Error('Failed to submit grade');
      }
      
      setSubmission(response.data.data);
      toast.success('Grade submitted successfully!');
    } catch (err) {
      console.error('Error submitting grade:', err);
      toast.error(err.response?.data?.message || 'Failed to submit grade');
    } finally {
      setIsGrading(false);
    }
  };

  const handleResubmission = async () => {
    try {
      setIsResubmitting(true);
      
      const response = await api.post(`/assignments/${assignmentId}/allow-resubmission`);
      
      if (!response.data.success) {
        throw new Error('Failed to allow resubmission');
      }
      
      setSubmission(response.data.data);
      toast.success('Resubmission allowed!');
    } catch (err) {
      console.error('Error allowing resubmission:', err);
      toast.error(err.response?.data?.message || 'Failed to allow resubmission');
    } finally {
      setIsResubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-lg text-gray-700">Loading submission...</p>
        </div>
      </div>
    );
  }
  
  if (!submission) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium">Submission Not Found</h3>
          <p className="mt-1">You haven't submitted this assignment yet.</p>
          <div className="mt-4 flex gap-2">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              onClick={() => navigate(`/dashboard/courses/assignment/${assignmentId}`)}
            >
              Submit Now
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Format the submission date
  const submittedDate = new Date(submission.submittedAt).toLocaleString();
  
  // Calculate status and styles
  let statusText = 'Submitted';
  let statusColor = 'bg-yellow-100 text-yellow-800';
  
  if (submission.graded) {
    statusText = 'Graded';
    statusColor = 'bg-green-100 text-green-800';
  } else if (submission.feedback) {
    statusText = 'Feedback Provided';
    statusColor = 'bg-blue-100 text-blue-800';
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Go back"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Assignment Submission</h1>
            </div>
            <div className={`px-3 py-1 rounded-full ${statusColor} text-sm font-medium inline-flex items-center`}>
              <span className="mr-1 h-2 w-2 rounded-full bg-current"></span>
              {statusText}
            </div>
          </div>
          
          {/* Assignment details */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div className="bg-blue-600 text-white p-6">
              <h2 className="text-xl font-bold">{assignment.title}</h2>
              <p className="mt-2 text-blue-100">{assignment.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="bg-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {assignment.totalPoints} points
                </div>
                {assignment.dueDate && (
                  <div className="bg-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                )}
                <div className="bg-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Submitted: {submittedDate}
                </div>
              </div>
            </div>
            
            {/* Submission Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Submission Content */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Your Submission</h3>
                  
                  {submission.textSubmission && (
                    <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                      <h4 className="font-medium text-gray-700 mb-2">Text Submission</h4>
                      <div className="whitespace-pre-line text-gray-600">
                        {submission.textSubmission}
                      </div>
                    </div>
                  )}
                  
                  {submission.fileUrl && (
                    <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                      <h4 className="font-medium text-gray-700 mb-2">File Submission</h4>
                      <a 
                        href={submission.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {submission.fileName || 'Download Submission File'}
                      </a>
                    </div>
                  )}
                  
                  {!submission.textSubmission && !submission.fileUrl && (
                    <div className="bg-yellow-50 rounded-md p-4 border border-yellow-200 text-yellow-700">
                      No submission content found.
                    </div>
                  )}
                  
                  {isInstructor && !submission.allowResubmission && (
                    <div className="pt-4">
                      <button
                        onClick={handleResubmission}
                        disabled={isResubmitting}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          isResubmitting 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        }`}
                      >
                        {isResubmitting ? 'Processing...' : 'Allow Resubmission'}
                      </button>
                    </div>
                  )}
                  
                  {submission.allowResubmission && !isInstructor && (
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-700">
                            You can resubmit this assignment. 
                            <Link
                              to={`/dashboard/courses/assignment/${assignmentId}`}
                              className="font-medium text-green-700 underline ml-1"
                            >
                              Submit again
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Grading Section */}
                <div className={`space-y-4 ${submission.graded ? 'bg-green-50' : 'bg-gray-50'} rounded-md p-4 border ${submission.graded ? 'border-green-200' : 'border-gray-200'}`}>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {submission.graded ? 'Grade & Feedback' : 'Awaiting Feedback'}
                  </h3>
                  
                  {submission.grade !== undefined && (
                    <div className="flex items-center">
                      <div className={`text-2xl font-bold ${submission.graded ? 'text-green-600' : 'text-gray-500'}`}>
                        {submission.grade} / {assignment.totalPoints}
                      </div>
                      <div className="ml-2 text-sm text-gray-500">
                        points
                      </div>
                    </div>
                  )}
                  
                  {submission.feedback ? (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 mb-2">Instructor Feedback</h4>
                      <div className="whitespace-pre-line text-gray-600 bg-white p-3 rounded-md border border-gray-200">
                        {submission.feedback}
                      </div>
                    </div>
                  ) : submission.graded ? (
                    <div className="mt-4 text-gray-600">
                      No additional feedback provided.
                    </div>
                  ) : (
                    <div className="mt-4 text-gray-600">
                      Your submission is being reviewed. Check back later for feedback.
                    </div>
                  )}
                  
                  {/* Grading Form for Instructors */}
                  {isInstructor && (
                    <form onSubmit={handleGradeSubmit} className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-4">Instructor Grading</h4>
                      
                      <div className="mb-4">
                        <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                          Grade (out of {assignment.totalPoints} points)
                        </label>
                        <input
                          type="number"
                          id="grade"
                          value={grade}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= assignment.totalPoints)) {
                              setGrade(value);
                            }
                          }}
                          min="0"
                          max={assignment.totalPoints}
                          step="0.1"
                          className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Enter grade (0-${assignment.totalPoints})`}
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                          Feedback (optional)
                        </label>
                        <textarea
                          id="feedback"
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          rows="4"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Provide feedback for the student..."
                        ></textarea>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isGrading}
                          className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                            isGrading 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          {isGrading ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                              Submitting...
                            </div>
                          ) : (
                            'Submit Grade & Feedback'
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Back to Course
            </button>
            
            {!isInstructor && submission.graded && (
              <button
                onClick={() => window.location.href = '/dashboard/my-grades'}
                className="px-4 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
              >
                View All Grades
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmission;