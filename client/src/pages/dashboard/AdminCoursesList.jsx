// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { api } from '../../services/api';
// import LoadingSpinner from '../../components/common/LoadingSpinner';
// import toast from 'react-hot-toast';

// const CourseManagement = () => {
//   const [courses, setCourses] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [statusFilter, setStatusFilter] = useState('all');
  
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setIsLoading(true);
//         const response = await api.get('/courses/admin/all');
//         setCourses(response.data.data);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//         toast.error('Failed to load courses');
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchCourses();
//   }, []);
  
//   // Get unique categories for filter dropdown
//   const categories = [...new Set(courses.map(course => course.category))].filter(Boolean);
  
//   // Filter courses based on search query and filters
//   const filteredCourses = courses.filter(course => {
//     const matchesSearch = 
//       course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
//     const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    
//     const matchesStatus = statusFilter === 'all' || 
//       (statusFilter === 'published' && course.isPublished) ||
//       (statusFilter === 'draft' && !course.isPublished);
    
//     return matchesSearch && matchesCategory && matchesStatus;
//   });
  
//   const handleDeleteCourse = async (courseId) => {
//     if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
//       try {
//         await api.delete(`/courses/${courseId}`);
//         setCourses(courses.filter(course => course._id !== courseId));
//         toast.success('Course deleted successfully');
//       } catch (error) {
//         console.error('Error deleting course:', error);
//         toast.error('Failed to delete course');
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Course Management</h1>
//         <Link
//           to="/admin/courses/new"
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
//         >
//           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//           </svg>
//           Add New Course
//         </Link>
//       </div>
      
//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Search courses..."
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
          
//           <div className="flex items-center">
//             <label htmlFor="categoryFilter" className="mr-2 text-gray-600">Category:</label>
//             <select
//               id="categoryFilter"
//               className="border border-gray-300 rounded-md px-3 py-2 w-full"
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//             >
//               <option value="all">All Categories</option>
//               {categories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>
          
//           <div className="flex items-center">
//             <label htmlFor="statusFilter" className="mr-2 text-gray-600">Status:</label>
//             <select
//               id="statusFilter"
//               className="border border-gray-300 rounded-md px-3 py-2 w-full"
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="published">Published</option>
//               <option value="draft">Draft</option>
//             </select>
//           </div>
//         </div>
//       </div>
      
//       {/* Courses Table */}
//       {isLoading ? (
//         <div className="flex justify-center p-8">
//           <LoadingSpinner />
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Course
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Instructor
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Students
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredCourses.map((course) => (
//                   <tr key={course._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <div className="h-10 w-16 flex-shrink-0">
//                           {course.coverImage ? (
//                             <img 
//                               src={course.coverImage} 
//                               alt={course.title} 
//                               className="h-10 w-16 rounded object-cover"
//                             />
//                           ) : (
//                             <div className="h-10 w-16 rounded bg-gray-200 flex items-center justify-center">
//                               <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                               </svg>
//                             </div>
//                           )}
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">{course.title}</div>
//                           <div className="text-xs text-gray-500">Created: {new Date(course.createdAt).toLocaleDateString()}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
//                         {course.category || 'Uncategorized'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{course.instructor?.name || 'Unknown'}</div>
//                       <div className="text-xs text-gray-500">{course.instructor?.email || ''}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 py-1 text-xs rounded-full ${
//                         course.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {course.isPublished ? 'Published' : 'Draft'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {course.studentsCount || 0}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <div className="flex space-x-2">
//                         <Link
//                           to={`/admin/courses/${course._id}`}
//                           className="text-indigo-600 hover:text-indigo-900"
//                         >
//                           Edit
//                         </Link>
//                         <Link
//                           to={`/admin/courses/${course._id}/content`}
//                           className="text-blue-600 hover:text-blue-900"
//                         >
//                           Content
//                         </Link>
//                         <button
//                           onClick={() => handleDeleteCourse(course._id)}
//                           className="text-red-600 hover:text-red-900"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseManagement;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../services/api';
import LoadingSpinner from '../../common/LoadingSpinner';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/courses');
        setCourses(response.data.data || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/courses/${courseId}`);
        setCourses(courses.filter(course => course._id !== courseId));
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  // Get unique categories
  const categories = [...new Set(courses.map(course => course.category).filter(Boolean))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'published' && course.isPublished) || 
      (statusFilter === 'draft' && !course.isPublished);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Courses Management</h1>
        <Link 
          to="/dashboard/courses/create"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Create New Course
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.map(course => (
                  <tr key={course._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded overflow-hidden">
                          {course.thumbnail ? (
                            <img src={course.thumbnail} alt="" className="h-10 w-10 object-cover" />
                          ) : (
                            <div className="h-10 w-10 flex items-center justify-center bg-gray-300">
                              <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{course.title}</div>
                          <div className="text-xs text-gray-500 truncate" style={{ maxWidth: '200px' }}>
                            {course.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.instructor?.name || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{course.category || 'Uncategorized'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${course.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {course.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.enrollments || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link 
                        to={`/dashboard/courses/${course._id}`}
                        className="text-blue-600 hover:text-blue-900 mr-2"
                      >
                        View
                      </Link>
                      <Link 
                        to={`/dashboard/courses/${course._id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDeleteCourse(course._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesList;