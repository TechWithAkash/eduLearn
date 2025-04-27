import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../../../services/api';
import toast from 'react-hot-toast';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const location = useLocation();

  useEffect(() => {
    // Check for filter parameter in URL
    const queryParams = new URLSearchParams(location.search);
    const filterParam = queryParams.get('filter');
    if (filterParam) {
      setActiveFilter(filterParam);
    }
    
    fetchCourses();
  }, [location.search]);

  // const fetchCourses = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
      
  //     const response = await api.get('/courses/user/enrolled');
      
  //     if (response.data.success) {
  //       // Add progress data if not already present
  //       const coursesWithProgress = response.data.data.map(course => ({
  //         ...course,
  //         progress: course.progress || Math.floor(Math.random() * 100) // Use actual progress or random for demo
  //       }));
        
  //       setCourses(coursesWithProgress);
  //     } else {
  //       setError('Failed to load enrolled courses');
  //       toast.error('Failed to load your courses');
  //     }
  //   } catch (err) {
  //     console.error('Error fetching enrolled courses:', err);
  //     setError('An error occurred while fetching your courses. Please try again.');
  //     toast.error('Failed to load your courses');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Update the fetchCourses function

const fetchCourses = async () => {
  try {
    setIsLoading(true);
    setError(null);
    
    let response;
    try {
      // Try the new endpoint first
      response = await api.get('/courses/enrolled');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // Fall back to the old endpoint
        response = await api.get('/courses/user/enrolled');
      } else {
        throw err;
      }
    }
    
    if (response.data.success) {
      // Add progress data if not already present
      const coursesWithProgress = response.data.data.map(course => ({
        ...course,
        progress: course.progress || Math.floor(Math.random() * 100) // Use actual progress or random for demo
      }));
      
      setCourses(coursesWithProgress);
    } else {
      setError('Failed to load enrolled courses');
      toast.error('Failed to load your courses');
    }
  } catch (err) {
    console.error('Error fetching enrolled courses:', err);
    setError('An error occurred while fetching your courses. Please try again.');
    toast.error('Failed to load your courses');
  } finally {
    setIsLoading(false);
  }
};
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Filter courses
  const filteredCourses = courses.filter(course => {
    // First apply text search
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Then apply category filter
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'in-progress') return matchesSearch && course.progress > 0 && course.progress < 100;
    if (activeFilter === 'completed') return matchesSearch && course.progress === 100;
    if (activeFilter === 'not-started') return matchesSearch && course.progress === 0;
    
    return matchesSearch;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'progress-asc':
        return a.progress - b.progress;
      case 'progress-desc':
        return b.progress - a.progress;
      case 'recent':
      default:
        // Assuming there's an enrolledAt field, otherwise fallback to course creation date
        const dateA = a.enrolledAt ? new Date(a.enrolledAt) : new Date(a.createdAt);
        const dateB = b.enrolledAt ? new Date(b.enrolledAt) : new Date(b.createdAt);
        return dateB - dateA;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
        <p className="text-gray-600">Manage and track your enrolled courses</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="md:w-2/5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search courses..." 
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 md:w-3/5 md:justify-end">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button 
                type="button" 
                className={`px-4 py-2 text-sm font-medium ${
                  activeFilter === 'all' 
                    ? 'text-white bg-blue-600 hover:bg-blue-700'
                    : 'text-gray-700 bg-white hover:bg-gray-50'
                } border border-gray-200 rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-500`}
                onClick={() => handleFilterChange('all')}
              >
                All Courses
              </button>
              <button 
                type="button" 
                className={`px-4 py-2 text-sm font-medium ${
                  activeFilter === 'in-progress' 
                    ? 'text-white bg-blue-600 hover:bg-blue-700'
                    : 'text-gray-700 bg-white hover:bg-gray-50'
                } border-t border-b border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-500`}
                onClick={() => handleFilterChange('in-progress')}
              >
                In Progress
              </button>
              <button 
                type="button" 
                className={`px-4 py-2 text-sm font-medium ${
                  activeFilter === 'completed' 
                    ? 'text-white bg-blue-600 hover:bg-blue-700'
                    : 'text-gray-700 bg-white hover:bg-gray-50'
                } border-t border-b border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-500`}
                onClick={() => handleFilterChange('completed')}
              >
                Completed
              </button>
              <button 
                type="button" 
                className={`px-4 py-2 text-sm font-medium ${
                  activeFilter === 'not-started' 
                    ? 'text-white bg-blue-600 hover:bg-blue-700'
                    : 'text-gray-700 bg-white hover:bg-gray-50'
                } border border-gray-200 rounded-r-lg focus:z-10 focus:ring-2 focus:ring-blue-500`}
                onClick={() => handleFilterChange('not-started')}
              >
                Not Started
              </button>
            </div>
            
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="recent">Recently Enrolled</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="progress-asc">Progress (Low to High)</option>
              <option value="progress-desc">Progress (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
          <p>{error}</p>
          <button 
            onClick={fetchCourses}
            className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Course Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase">Total Courses</p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-1">{courses.length}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase">Completed</p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-1">
                    {courses.filter(course => course.progress === 100).length}
                  </h3>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-yellow-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase">In Progress</p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-1">
                    {courses.filter(course => course.progress > 0 && course.progress < 100).length}
                  </h3>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-red-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase">Not Started</p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-1">
                    {courses.filter(course => course.progress === 0).length}
                  </h3>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          {sortedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedCourses.map((course) => (
                <div 
                  key={course._id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] border border-gray-100"
                >
                  <div className="h-48 bg-gray-200 relative">
                    {course.thumbnail ? (
                      <img 
                        src={course.thumbnail} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
                        <svg className="w-16 h-16 opacity-75" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      {course.progress === 100 ? (
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                          COMPLETED
                        </span>
                      ) : course.progress > 0 ? (
                        <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                          IN PROGRESS
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                          NOT STARTED
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                      <h3 className="text-xl text-white font-bold line-clamp-2">{course.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">{course.category}</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Grade {course.grade}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2 h-10">{course.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-medium text-blue-600">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            course.progress === 100 
                              ? 'bg-green-600' 
                              : course.progress > 60 
                                ? 'bg-blue-600' 
                                : course.progress > 30 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                          }`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Link 
                        to={`/dashboard/courses/${course._id}`}
                        className="w-full block text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                      </Link>
                      <button
                        className="w-full block text-center py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => window.open(`/courses/${course._id}`, '_blank')}
                      >
                        View Course Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-16 text-center">
              <div className="flex flex-col items-center">
                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                
                {courses.length === 0 ? (
                  <>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">You haven't enrolled in any courses yet</h3>
                    <p className="text-gray-600 mb-6">Browse our course catalog to find courses that interest you</p>
                    <Link to="/courses" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      Browse Courses
                    </Link>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No courses match your search</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setActiveFilter('all');
                      }} 
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyCourses;


// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { api } from '../../../services/api';
// import toast from 'react-hot-toast';
// import { AuthContext } from '../../../contexts/AuthContext';

// const MyCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('recent');
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
  
//   const isFaculty = user?.role === 'tutor' || user?.role === 'admin';

//   useEffect(() => {
//     // Check for filter parameter in URL
//     const queryParams = new URLSearchParams(location.search);
//     const filterParam = queryParams.get('filter');
//     if (filterParam) {
//       setActiveFilter(filterParam);
//     }
    
//     fetchCourses();
//   }, [location.search, user?.role]);

//   const fetchCourses = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
      
//       let response;
      
//       // Different endpoints based on user role
//       if (isFaculty) {
//         // For faculty, fetch courses they've created
//         try {
//           response = await api.get('/courses/tutor');
//         } catch (err) {
//           if (err.response && err.response.status === 404) {
//             // Alternative endpoint
//             response = await api.get('/courses/instructor');
//           } else {
//             throw err;
//           }
//         }
//       } else {
//         // For students, fetch enrolled courses
//         try {
//           response = await api.get('/courses/enrolled');
//         } catch (err) {
//           if (err.response && err.response.status === 404) {
//             response = await api.get('/courses/user/enrolled');
//           } else {
//             throw err;
//           }
//         }
//       }
      
//       if (response.data.success) {
//         let processedCourses;
        
//         if (isFaculty) {
//           // Process faculty courses
//           processedCourses = response.data.data.map(course => ({
//             ...course,
//             studentsCount: course.students?.length || 0,
//             publishStatus: course.isPublished ? 'Published' : 'Draft'
//           }));
//         } else {
//           // Process student courses
//           processedCourses = response.data.data.map(course => ({
//             ...course,
//             progress: course.progress || Math.floor(Math.random() * 100)
//           }));
//         }
        
//         setCourses(processedCourses);
//       } else {
//         const message = isFaculty ? 'Failed to load your created courses' : 'Failed to load enrolled courses';
//         setError(message);
//         toast.error(message);
//       }
//     } catch (err) {
//       console.error(isFaculty ? 'Error fetching created courses:' : 'Error fetching enrolled courses:', err);
//       const message = isFaculty 
//         ? 'An error occurred while fetching your created courses. Please try again.' 
//         : 'An error occurred while fetching your enrolled courses. Please try again.';
//       setError(message);
//       toast.error(message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleFilterChange = (filter) => {
//     setActiveFilter(filter);
//   };

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//   };

//   // Filter courses
//   const filteredCourses = courses.filter(course => {
//     // First apply text search
//     const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
//     if (isFaculty) {
//       // Faculty filtering
//       if (activeFilter === 'all') return matchesSearch;
//       if (activeFilter === 'published') return matchesSearch && course.isPublished;
//       if (activeFilter === 'draft') return matchesSearch && !course.isPublished;
//       if (activeFilter === 'with-students') return matchesSearch && course.studentsCount > 0;
//     } else {
//       // Student filtering
//       if (activeFilter === 'all') return matchesSearch;
//       if (activeFilter === 'in-progress') return matchesSearch && course.progress > 0 && course.progress < 100;
//       if (activeFilter === 'completed') return matchesSearch && course.progress === 100;
//       if (activeFilter === 'not-started') return matchesSearch && course.progress === 0;
//     }
    
//     return matchesSearch;
//   });

//   // Sort courses
//   const sortedCourses = [...filteredCourses].sort((a, b) => {
//     switch (sortBy) {
//       case 'title-asc':
//         return a.title.localeCompare(b.title);
//       case 'title-desc':
//         return b.title.localeCompare(a.title);
//       case 'recent':
//       default:
//         const dateA = new Date(a.createdAt);
//         const dateB = new Date(b.createdAt);
//         return dateB - dateA;
      
//       // Faculty-specific sorting
//       case 'students-asc':
//         return (a.studentsCount || 0) - (b.studentsCount || 0);
//       case 'students-desc':
//         return (b.studentsCount || 0) - (a.studentsCount || 0);
        
//       // Student-specific sorting
//       case 'progress-asc':
//         return (a.progress || 0) - (b.progress || 0);
//       case 'progress-desc':
//         return (b.progress || 0) - (a.progress || 0);
//     }
//   });

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8 flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             {isFaculty ? 'My Created Courses' : 'My Enrolled Courses'}
//           </h1>
//           <p className="text-gray-600">
//             {isFaculty 
//               ? 'Manage the courses you have created' 
//               : 'Manage and track your enrolled courses'}
//           </p>
//         </div>
        
//         {isFaculty && (
//           <Link 
//             to="/dashboard/create-course" 
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//             Create New Course
//           </Link>
//         )}
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div className="md:w-2/5">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//               <input 
//                 type="text" 
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Search courses..." 
//                 value={searchTerm}
//                 onChange={handleSearch}
//               />
//             </div>
//           </div>
          
//           <div className="flex flex-col sm:flex-row gap-4 md:w-3/5 md:justify-end">
//             <div className="inline-flex rounded-md shadow-sm" role="group">
//               <button 
//                 type="button" 
//                 className={`px-4 py-2 text-sm font-medium ${
//                   activeFilter === 'all' 
//                     ? 'text-white bg-blue-600 hover:bg-blue-700'
//                     : 'text-gray-700 bg-white hover:bg-gray-50'
//                 } border border-gray-200 rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-500`}
//                 onClick={() => handleFilterChange('all')}
//               >
//                 All Courses
//               </button>
              
//               {isFaculty ? (
//                 // Faculty filters
//                 <>
//                   <button 
//                     type="button" 
//                     className={`px-4 py-2 text-sm font-medium ${
//                       activeFilter === 'published' 
//                         ? 'text-white bg-blue-600 hover:bg-blue-700'
//                         : 'text-gray-700 bg-white hover:bg-gray-50'
//                     } border-t border-b border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-500`}
//                     onClick={() => handleFilterChange('published')}
//                   >
//                     Published
//                   </button>
//                   <button 
//                     type="button" 
//                     className={`px-4 py-2 text-sm font-medium ${
//                       activeFilter === 'draft' 
//                         ? 'text-white bg-blue-600 hover:bg-blue-700'
//                         : 'text-gray-700 bg-white hover:bg-gray-50'
//                     } border-t border-b border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-500`}
//                     onClick={() => handleFilterChange('draft')}
//                   >
//                     Drafts
//                   </button>
//                   <button 
//                     type="button" 
//                     className={`px-4 py-2 text-sm font-medium ${
//                       activeFilter === 'with-students' 
//                         ? 'text-white bg-blue-600 hover:bg-blue-700'
//                         : 'text-gray-700 bg-white hover:bg-gray-50'
//                     } border border-gray-200 rounded-r-lg focus:z-10 focus:ring-2 focus:ring-blue-500`}
//                     onClick={() => handleFilterChange('with-students')}
//                   >
//                     With Students
//                   </button>
//                 </>
//               ) : (
//                 // Student filters
//                 <>
//                   <button 
//                     type="button" 
//                     className={`px-4 py-2 text-sm font-medium ${
//                       activeFilter === 'in-progress' 
//                         ? 'text-white bg-blue-600 hover:bg-blue-700'
//                         : 'text-gray-700 bg-white hover:bg-gray-50'
//                     } border-t border-b border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-500`}
//                     onClick={() => handleFilterChange('in-progress')}
//                   >
//                     In Progress
//                   </button>
//                   <button 
//                     type="button" 
//                     className={`px-4 py-2 text-sm font-medium ${
//                       activeFilter === 'completed' 
//                         ? 'text-white bg-blue-600 hover:bg-blue-700'
//                         : 'text-gray-700 bg-white hover:bg-gray-50'
//                     } border-t border-b border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-500`}
//                     onClick={() => handleFilterChange('completed')}
//                   >
//                     Completed
//                   </button>
//                   <button 
//                     type="button" 
//                     className={`px-4 py-2 text-sm font-medium ${
//                       activeFilter === 'not-started' 
//                         ? 'text-white bg-blue-600 hover:bg-blue-700'
//                         : 'text-gray-700 bg-white hover:bg-gray-50'
//                     } border border-gray-200 rounded-r-lg focus:z-10 focus:ring-2 focus:ring-blue-500`}
//                     onClick={() => handleFilterChange('not-started')}
//                   >
//                     Not Started
//                   </button>
//                 </>
//               )}
//             </div>
            
//             <select
//               value={sortBy}
//               onChange={handleSortChange}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="recent">Most Recent</option>
//               <option value="title-asc">Title (A-Z)</option>
//               <option value="title-desc">Title (Z-A)</option>
              
//               {isFaculty ? (
//                 // Faculty sorting options
//                 <>
//                   <option value="students-asc">Students (Low to High)</option>
//                   <option value="students-desc">Students (High to Low)</option>
//                 </>
//               ) : (
//                 // Student sorting options
//                 <>
//                   <option value="progress-asc">Progress (Low to High)</option>
//                   <option value="progress-desc">Progress (High to Low)</option>
//                 </>
//               )}
//             </select>
//           </div>
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
//         </div>
//       ) : error ? (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
//           <p>{error}</p>
//           <button 
//             onClick={fetchCourses}
//             className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
//           >
//             Try Again
//           </button>
//         </div>
//       ) : (
//         <>
//           {/* Course Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//             {isFaculty ? (
//               // Faculty stats
//               <>
//                 <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-sm font-semibold text-gray-500 uppercase">Total Courses</p>
//                       <h3 className="text-3xl font-bold text-gray-800 mt-1">{courses.length}</h3>
//                     </div>
//                     <div className="p-3 bg-blue-100 rounded-lg">
//                       <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-sm font-semibold text-gray-500 uppercase">Published</p>
//                       <h3 className="text-3xl font-bold text-gray-800 mt-1">
//                         {courses.filter(course => course.isPublished).length}
//                       </h3>
//                     </div>
//                     <div className="p-3 bg-green-100 rounded-lg">
//                       <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-yellow-500">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-sm font-semibold text-gray-500 uppercase">Drafts</p>
//                       <h3 className="text-3xl font-bold text-gray-800 mt-1">
//                         {courses.filter(course => !course.isPublished).length}
//                       </h3>
//                     </div>
//                     <div className="p-3 bg-yellow-100 rounded-lg">
//                       <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-500">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-sm font-semibold text-gray-500 uppercase">Total Students</p>
//                       <h3 className="text-3xl font-bold text-gray-800 mt-1">
//                         {courses.reduce((sum, course) => sum + (course.students?.length || 0), 0)}
//                       </h3>
//                     </div>
//                     <div className="p-3 bg-purple-100 rounded-lg">
//                       <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               // Student stats
//               <>
//                 <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-sm font-semibold text-gray-500 uppercase">Total Courses</p>
//                       <h3 className="text-3xl font-bold text-gray-800 mt-1">{courses.length}</h3>
//                     </div>
//                     <div className="p-3 bg-blue-100 rounded-lg">
//                       <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-sm font-semibold text-gray-500 uppercase">Completed</p>
//                       <h3 className="text-3xl font-bold text-gray-800 mt-1">
//                         {courses.filter(course => course.progress === 100).length}
//                       </h3>
//                     </div>
//                     <div className="p-3 bg-green-100 rounded-lg">
//                       <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-yellow-500">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-sm font-semibold text-gray-500 uppercase">In Progress</p>
//                       <h3 className="text-3xl font-bold text-gray-800 mt-1">
//                         {courses.filter(course => course.progress > 0 && course.progress < 100).length}
//                       </h3>
//                     </div>
//                     <div className="p-3 bg-yellow-100 rounded-lg">
//                       <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-red-500">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-sm font-semibold text-gray-500 uppercase">Not Started</p>
//                       <h3 className="text-3xl font-bold text-gray-800 mt-1">
//                         {courses.filter(course => course.progress === 0).length}
//                       </h3>
//                     </div>
//                     <div className="p-3 bg-red-100 rounded-lg">
//                       <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Courses Grid */}
//           {sortedCourses.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {sortedCourses.map((course) => (
//                 <div 
//                   key={course._id} 
//                   className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] border border-gray-100"
//                 >
//                   <div className="h-48 bg-gray-200 relative">
//                     {course.coverImage ? (
//                       <img 
//                         src={course.coverImage.startsWith('http') ? course.coverImage : `http://localhost:5000${course.coverImage}`} 
//                         alt={course.title} 
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
//                         <svg className="w-16 h-16 opacity-75" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
//                         </svg>
//                       </div>
//                     )}
                    
//                     <div className="absolute top-4 right-4">
//                       {isFaculty ? (
//                         // Faculty badge
//                         <span className={`text-white text-xs font-bold px-2 py-1 rounded-md ${
//                           course.isPublished ? 'bg-green-500' : 'bg-yellow-500'
//                         }`}>
//                           {course.isPublished ? 'PUBLISHED' : 'DRAFT'}
//                         </span>
//                       ) : (
//                         // Student badge
//                         course.progress === 100 ? (
//                           <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
//                             COMPLETED
//                           </span>
//                         ) : course.progress > 0 ? (
//                           <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-md">
//                             IN PROGRESS
//                           </span>
//                         ) : (
//                           <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
//                             NOT STARTED
//                           </span>
//                         )
//                       )}
//                     </div>
                    
//                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
//                       <h3 className="text-xl text-white font-bold line-clamp-2">{course.title}</h3>
//                     </div>
//                   </div>
                  
//                   <div className="p-6">
//                     <div className="flex flex-wrap gap-2 mb-3">
//                       <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">{course.category}</span>
//                       <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Grade {course.grade}</span>
//                       {isFaculty && (
//                         <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
//                           {course.students?.length || 0} Students
//                         </span>
//                       )}
//                     </div>
                    
//                     <p className="text-gray-600 mb-4 line-clamp-2 h-10">{course.description}</p>
                    
//                     {isFaculty ? (
//                       // Faculty course info
//                       <div className="mb-4">
//                         <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
//                           <span>Created: {new Date(course.createdAt).toLocaleDateString()}</span>
//                           <span>{course.modules?.length || 0} Modules</span>
//                         </div>
                        
//                         {course.students?.length > 0 && (
//                           <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
//                             <div 
//                               className="h-2.5 rounded-full bg-blue-600"
//                               style={{ width: '100%' }}
//                             ></div>
//                           </div>
//                         )}
//                       </div>
//                     ) : (
//                       // Student progress bar
//                       <div className="mb-4">
//                         <div className="flex justify-between items-center mb-1">
//                           <span className="text-sm font-medium text-gray-700">Progress</span>
//                           <span className="text-sm font-medium text-blue-600">{course.progress}%</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2.5">
//                           <div 
//                             className={`h-2.5 rounded-full ${
//                               course.progress === 100 
//                                 ? 'bg-green-600' 
//                                 : course.progress > 60 
//                                   ? 'bg-blue-600' 
//                                   : course.progress > 30 
//                                     ? 'bg-yellow-500' 
//                                     : 'bg-red-500'
//                             }`}
//                             style={{ width: `${course.progress}%` }}
//                           ></div>
//                         </div>
//                       </div>
//                     )}
                    
//                     <div className="flex flex-col gap-2">
//                       {isFaculty ? (
//                         // Faculty action buttons
//                         <>
//                           <Link 
//                             to={`/dashboard/edit-course/${course._id}`}
//                             className="w-full block text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                           >
//                             Edit Course
//                           </Link>
//                           <div className="grid grid-cols-2 gap-2">
//                             <Link
//                               to={`/dashboard/course/${course._id}/analytics`}
//                               className="block text-center py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//                             >
//                               Analytics
//                             </Link>
//                             <Link
//                               to={`/courses/${course._id}`}
//                               className="block text-center py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                             >
//                               Preview
//                             </Link>
//                           </div>
//                         </>
//                       ) : (
//                         // Student action buttons
//                         <>
//                           <Link 
//                             to={`/dashboard/courses/${course._id}`}
//                             className="w-full block text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                           >
//                             {course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
//                           </Link>
//                           <button
//                             className="w-full block text-center py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                             onClick={() => window.open(`/courses/${course._id}`, '_blank')}
//                           >
//                             View Course Details
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl shadow-md p-16 text-center">
//               <div className="flex flex-col items-center">
//                 <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
                
//                 {courses.length === 0 ? (
//                   isFaculty ? (
//                     // Faculty empty state
//                     <>
//                       <h3 className="text-xl font-bold text-gray-800 mb-2">You haven't created any courses yet</h3>
//                       <p className="text-gray-600 mb-6">Start creating your first course to share your knowledge</p>
//                       <Link to="/dashboard/create-course" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
//                         Create Your First Course
//                       </Link>
//                     </>
//                   ) : (
//                     // Student empty state
//                     <>
//                       <h3 className="text-xl font-bold text-gray-800 mb-2">You haven't enrolled in any courses yet</h3>
//                       <p className="text-gray-600 mb-6">Browse our course catalog to find courses that interest you</p>
//                       <Link to="/courses" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
//                         Browse Courses
//                       </Link>
//                     </>
//                   )
//                 ) : (
//                   <>
//                     <h3 className="text-xl font-bold text-gray-800 mb-2">No courses match your search</h3>
//                     <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
//                     <button 
//                       onClick={() => {
//                         setSearchTerm('');
//                         setActiveFilter('all');
//                       }} 
//                       className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
//                     >
//                       Clear Filters
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default MyCourses;