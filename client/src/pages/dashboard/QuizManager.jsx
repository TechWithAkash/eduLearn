import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';

const QuizManager = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch quizzes created by the user
      const quizzesResponse = await api.get('/quizzes/tutor');
      
      if (quizzesResponse.data.success) {
        setQuizzes(quizzesResponse.data.data);
      } else {
        toast.error('Failed to fetch quizzes');
      }
      
      // Fetch courses for filtering
      const coursesResponse = await api.get('/courses/tutor');
      
      if (coursesResponse.data.success) {
        setCourses(coursesResponse.data.data);
      } else {
        toast.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (confirmDelete !== quizId) {
      setConfirmDelete(quizId);
      return;
    }
    
    try {
      const response = await api.delete(`/quizzes/${quizId}`);
      
      if (response.data.success) {
        toast.success('Quiz deleted successfully');
        // Remove the deleted quiz from state
        setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
      } else {
        toast.error(response.data.message || 'Failed to delete quiz');
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setConfirmDelete(null);
    }
  };

  const togglePublishStatus = async (quiz) => {
    try {
      const response = await api.put(`/quizzes/${quiz._id}`, {
        isPublished: !quiz.isPublished
      });
      
      if (response.data.success) {
        toast.success(`Quiz ${quiz.isPublished ? 'unpublished' : 'published'} successfully`);
        
        // Update the quiz in state
        setQuizzes(quizzes.map(q => 
          q._id === quiz._id ? { ...q, isPublished: !q.isPublished } : q
        ));
      } else {
        toast.error(response.data.message || 'Failed to update quiz');
      }
    } catch (error) {
      console.error('Error updating quiz:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  // Filter quizzes based on search, course, and status
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || quiz.courseId === selectedCourse;
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'published' && quiz.isPublished) ||
      (selectedStatus === 'draft' && !quiz.isPublished);
      
    return matchesSearch && matchesCourse && matchesStatus;
  });

  // Sort quizzes
  const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
    if (sortBy === 'title') {
      return sortOrder === 'asc' 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortBy === 'questions') {
      return sortOrder === 'asc'
        ? a.questions.length - b.questions.length
        : b.questions.length - a.questions.length;
    } else if (sortBy === 'createdAt') {
      return sortOrder === 'asc'
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  // Find course name by ID
  const getCourseNameById = (courseId) => {
    const course = courses.find(c => c._id === courseId);
    return course ? course.title : 'Unknown Course';
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Render sort arrow
  const renderSortArrow = (field) => {
    if (sortBy !== field) return null;
    
    return sortOrder === 'asc' ? (
      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Quiz Manager</h1>
        <Link
          to="/dashboard/create-quiz"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Create New Quiz
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="all">All Courses</option>
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>{course.title}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {quizzes.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No quizzes found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new quiz.</p>
            <div className="mt-6">
              <Link
                to="/dashboard/create-quiz"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Create New Quiz
              </Link>
            </div>
          </div>
        ) : sortedQuizzes.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="text-sm font-medium text-gray-900">No quizzes match your filters</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCourse('all');
                setSelectedStatus('all');
              }}
              className="mt-4 text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('title')}
                  >
                    <div className="flex items-center">
                      Quiz Title
                      {renderSortArrow('title')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('questions')}
                  >
                    <div className="flex items-center">
                      Questions
                      {renderSortArrow('questions')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center">
                      Created
                      {renderSortArrow('createdAt')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedQuizzes.map((quiz) => (
                  <tr key={quiz._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                          <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                          <div className="text-sm text-gray-500">
                            {quiz.description.length > 50 
                              ? `${quiz.description.substring(0, 50)}...` 
                              : quiz.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getCourseNameById(quiz.courseId)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{quiz.questions.length} questions</div>
                      <div className="text-sm text-gray-500">
                        {quiz.timeLimit ? `${quiz.timeLimit} min time limit` : 'No time limit'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        quiz.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {quiz.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(quiz.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => togglePublishStatus(quiz)}
                          className={`px-2 py-1 rounded ${
                            quiz.isPublished
                              ? 'text-yellow-700 bg-yellow-100 hover:bg-yellow-200'
                              : 'text-green-700 bg-green-100 hover:bg-green-200'
                          }`}
                        >
                          {quiz.isPublished ? 'Unpublish' : 'Publish'}
                        </button>
                        
                        <Link
                          to={`/dashboard/edit-quiz/${quiz._id}`}
                          className="text-indigo-600 hover:text-indigo-900 px-2 py-1"
                        >
                          Edit
                        </Link>
                        
                        <button
                          onClick={() => handleDeleteQuiz(quiz._id)}
                          className={`${
                            confirmDelete === quiz._id
                              ? 'bg-red-600 text-white'
                              : 'text-red-600 hover:text-red-900'
                          } px-2 py-1 rounded`}
                        >
                          {confirmDelete === quiz._id ? 'Confirm' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizManager;