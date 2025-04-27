import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const AssignmentPage = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [textSubmission, setTextSubmission] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/assignments/${assignmentId}`);
        
        if (!response.data.success) {
          throw new Error('Failed to fetch assignment');
        }
        
        setAssignment(response.data.data.assignment);
        setSubmission(response.data.data.submission);
        
        // If there's already a submission with text, populate the form
        if (response.data.data.submission?.textSubmission) {
          setTextSubmission(response.data.data.submission.textSubmission);
        }
      } catch (err) {
        console.error('Error fetching assignment:', err);
        toast.error('Failed to load assignment');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAssignment();
  }, [assignmentId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File is too large. Maximum size is 10MB.');
        return;
      }
      
      // Check file type
      const allowedTypes = assignment?.allowedFileTypes || ['.pdf', '.doc', '.docx', '.zip'];
      const fileExt = '.' + selectedFile.name.split('.').pop().toLowerCase();
      
      if (!allowedTypes.includes(fileExt)) {
        toast.error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate based on submission type
    if (assignment.submissionType === 'file' && !file) {
      toast.error('Please upload a file');
      return;
    } else if (assignment.submissionType === 'text' && !textSubmission.trim()) {
      toast.error('Please enter your text submission');
      return;
    } else if (assignment.submissionType === 'both' && !file && !textSubmission.trim()) {
      toast.error('Please provide either a file or text submission');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const formData = new FormData();
      if (textSubmission) {
        formData.append('textSubmission', textSubmission);
      }
      if (file) {
        formData.append('assignmentFile', file);
      }
      
      const response = await api.post(`/assignments/${assignmentId}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (!response.data.success) {
        throw new Error('Failed to submit assignment');
      }
      
      setSubmission(response.data.data);
      toast.success('Assignment submitted successfully!');
      
      // Navigate to confirmation page
      navigate(`/dashboard/courses/assignment-submission/${assignmentId}`);
    } catch (err) {
      console.error('Error submitting assignment:', err);
      toast.error(err.response?.data?.message || 'Failed to submit assignment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-lg text-gray-700">Loading assignment...</p>
        </div>
      </div>
    );
  }
  
  if (!assignment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium">Assignment Not Found</h3>
          <p className="mt-1">The assignment you're looking for couldn't be found.</p>
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

  // If already submitted, redirect to submission page
  if (submission) {
    navigate(`/dashboard/courses/assignment-submission/${assignmentId}`);
    return null;
  }

  const isTextSubmissionAllowed = assignment.submissionType === 'text' || assignment.submissionType === 'both';
  const isFileSubmissionAllowed = assignment.submissionType === 'file' || assignment.submissionType === 'both';

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Assignment Header */}
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-2xl font-bold">{assignment.title}</h1>
            <p className="mt-2 text-blue-100">{assignment.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {assignment.totalPoints} points
              </div>
              <div className="bg-blue-800 px-3 py-1 rounded-full text-sm capitalize flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                {assignment.submissionType} submission
              </div>
            </div>
          </div>
          
          {/* Assignment Content */}
          <div className="p-6">
            <div className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Instructions</h2>
              <div className="text-gray-700 whitespace-pre-line">
                {assignment.instructions}
              </div>
            </div>
            
            {/* Submission Form */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Submission</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {isTextSubmissionAllowed && (
                  <div>
                    <label htmlFor="textSubmission" className="block text-sm font-medium text-gray-700 mb-2">
                      Text Submission
                    </label>
                    <textarea
                      id="textSubmission"
                      value={textSubmission}
                      onChange={(e) => setTextSubmission(e.target.value)}
                      rows="8"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your response here..."
                    ></textarea>
                  </div>
                )}
                
                {isFileSubmissionAllowed && (
                  <div>
                    <label htmlFor="fileSubmission" className="block text-sm font-medium text-gray-700 mb-2">
                      File Submission
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          Allowed file types: {assignment.allowedFileTypes.join(', ')}
                        </p>
                        {file && (
                          <div className="mt-2 text-sm text-gray-900 bg-gray-100 p-2 rounded-md">
                            Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            <button
                              type="button"
                              onClick={() => {
                                setFile(null);
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = '';
                                }
                              }}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-md flex items-center ${
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
                        Submit Assignment
                        <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage;