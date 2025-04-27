import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';
import toast from 'react-hot-toast';

const GradeAssignments = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSubmissionIndex, setCurrentSubmissionIndex] = useState(0);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState("all"); // all, graded, ungraded

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch assignment details
        const assignmentResponse = await api.get(`/assignments/${assignmentId}`);
        const assignmentData = assignmentResponse.data.data;
        setAssignment(assignmentData);
        
        // Fetch course details
        const courseResponse = await api.get(`/courses/${assignmentData.courseId}`);
        setCourse(courseResponse.data.data);
        
        // Fetch all submissions for this assignment
        const submissionsResponse = await api.get(`/assignments/${assignmentId}/submissions`);
        setSubmissions(submissionsResponse.data.data);
        
        // Reset current submission if needed
        if (submissionsResponse.data.data.length > 0) {
          setCurrentSubmissionIndex(0);
          const submission = submissionsResponse.data.data[0];
          setGrade(submission.grade || "");
          setFeedback(submission.feedback || "");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load assignment data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [assignmentId]);

  // Handle changing to the next or previous submission
  const changeSubmission = (direction) => {
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentSubmissionIndex + 1) % submissions.length;
    } else {
      newIndex = (currentSubmissionIndex - 1 + submissions.length) % submissions.length;
    }
    
    setCurrentSubmissionIndex(newIndex);
    const submission = submissions[newIndex];
    setGrade(submission.grade || "");
    setFeedback(submission.feedback || "");
  };

  // Handle saving the grade and feedback
  const saveGrade = async () => {
    if (!submissions.length) return;
    
    const currentSubmission = submissions[currentSubmissionIndex];
    
    try {
      setIsSubmitting(true);
      
      const response = await api.put(`/assignments/${assignmentId}/submissions/${currentSubmission._id}/grade`, {
        grade: parseFloat(grade),
        feedback
      });
      
      if (response.data.success) {
        // Update the submissions array with the updated submission
        const updatedSubmissions = [...submissions];
        updatedSubmissions[currentSubmissionIndex] = {
          ...currentSubmission,
          grade: parseFloat(grade),
          feedback,
          status: 'graded'
        };
        
        setSubmissions(updatedSubmissions);
        toast.success('Grade saved successfully');
      }
    } catch (error) {
      console.error('Error saving grade:', error);
      toast.error('Failed to save grade');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter submissions based on the selected filter
  const filteredSubmissions = submissions.filter(submission => {
    if (filter === 'all') return true;
    if (filter === 'graded') return submission.status === 'graded';
    if (filter === 'ungraded') return submission.status !== 'graded';
    return true;
  });

  // Get the current submission
  const currentSubmission = submissions[currentSubmissionIndex];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-yellow-700">Assignment not found. It may have been deleted.</p>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/dashboard/assignments')}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Back to Assignments
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <button
            onClick={() => navigate('/dashboard/assignments')}
            className="text-gray-600 hover:text-gray-800 mb-2 flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Assignments
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Grade: {assignment.title}
          </h1>
          <p className="text-gray-600">
            {course?.title} • {submissions.length} submissions
          </p>
        </div>
        
        <div className="flex items-center">
          <div className="mr-4">
            <label htmlFor="filterSubmissions" className="block text-sm font-medium text-gray-700 mb-1">Filter:</label>
            <select
              id="filterSubmissions"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Submissions</option>
              <option value="graded">Graded</option>
              <option value="ungraded">Ungraded</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => changeSubmission('prev')}
              disabled={submissions.length <= 1}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <span className="text-sm text-gray-600">
              {submissions.length > 0 ? (
                <>Submission {currentSubmissionIndex + 1} of {submissions.length}</>
              ) : (
                <>No submissions</>
              )}
            </span>
            
            <button
              onClick={() => changeSubmission('next')}
              disabled={submissions.length <= 1}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No submissions yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            There are no submissions for this assignment yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submission Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-indigo-700 text-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {currentSubmission?.student?.name || 'Unknown Student'}
                    </h2>
                    <p className="text-indigo-200 text-sm">
                      Submitted: {new Date(currentSubmission?.submittedAt).toLocaleDateString()} at {new Date(currentSubmission?.submittedAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    {currentSubmission?.status === 'graded' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Graded
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Awaiting Grade
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Submission</h3>
                
                {currentSubmission?.textSubmission && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Text Submission:</h4>
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 prose max-w-none whitespace-pre-line">
                      {currentSubmission.textSubmission}
                    </div>
                  </div>
                )}
                
                {currentSubmission?.fileSubmission && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">File Submission:</h4>
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <div className="flex items-center">
                        <svg className="w-8 h-8 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {currentSubmission.fileSubmission.fileName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(currentSubmission.fileSubmission.fileSize / 1024 / 1024).toFixed(2)} MB • {currentSubmission.fileSubmission.fileType}
                          </p>
                        </div>
                        <a
                          href={currentSubmission.fileSubmission.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-4 px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Grading Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-800 text-white p-4">
                <h2 className="text-lg font-semibold">Assignment Grading</h2>
                <p className="text-gray-300 text-sm">
                  Max Points: {assignment.totalPoints}
                </p>
              </div>
              
              <div className="p-6">
                <form onSubmit={(e) => { e.preventDefault(); saveGrade(); }}>
                  <div className="mb-4">
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                      Grade (out of {assignment.totalPoints})
                    </label>
                    <input
                      type="number"
                      id="grade"
                      min="0"
                      max={assignment.totalPoints}
                      step="0.1"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Enter grade (0-${assignment.totalPoints})`}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                      Feedback
                    </label>
                    <textarea
                      id="feedback"
                      rows="6"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Provide feedback to the student..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Save Grade
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Submission List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
              <div className="bg-gray-800 text-white p-4">
                <h2 className="text-lg font-semibold">All Submissions</h2>
              </div>
              
              <div className="overflow-y-auto max-h-80">
                {filteredSubmissions.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No submissions match your filter
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {filteredSubmissions.map((submission, index) => (
                      <li key={submission._id}>
                        <button
                          onClick={() => {
                            setCurrentSubmissionIndex(submissions.findIndex(s => s._id === submission._id));
                            setGrade(submission.grade || "");
                            setFeedback(submission.feedback || "");
                          }}
                          className={`w-full text-left p-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
                            index === currentSubmissionIndex ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {submission.student?.name || 'Unknown Student'}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(submission.submittedAt).toLocaleDateString()}
                              </p>
                            </div>
                            {submission.status === 'graded' ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {submission.grade}/{assignment.totalPoints}
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Ungraded
                              </span>
                            )}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeAssignments;