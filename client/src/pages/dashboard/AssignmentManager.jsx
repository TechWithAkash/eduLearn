// import React, { useState, useEffect } from 'react';

// import { Link } from 'react-router-dom';
// import { api } from '../../../services/api';
// import { useAuth } from '../../../contexts/AuthContext';
// import LoadingSpinner from '../../../components/common/LoadingSpinner';
// import toast from 'react-hot-toast';

// const AssignmentManagement = () => {
//   const { user } = useAuth();
//   const [assignments, setAssignments] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [filter, setFilter] = useState('all'); // all, pending, graded
//   const [courseFilter, setCourseFilter] = useState('all');
//   const [courses, setCourses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
        
//         // Fetch assignments created by this tutor
//         const assignmentsResponse = await api.get('/assignments/tutor');
        
//         // Fetch courses taught by this tutor
//         const coursesResponse = await api.get('/courses/tutor');
        
//         if (assignmentsResponse.data.success && coursesResponse.data.success) {
//           setAssignments(assignmentsResponse.data.data);
//           setCourses(coursesResponse.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching assignments:', error);
//         toast.error('Failed to load assignments');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filter assignments
//   const filteredAssignments = assignments
//     .filter(assignment => {
//       if (courseFilter !== 'all') {
//         return assignment.courseId === courseFilter;
//       }
//       return true;
//     })
//     .filter(assignment => {
//       if (filter === 'pending') return assignment.pendingSubmissions > 0;
//       if (filter === 'graded') return assignment.gradedSubmissions > 0;
//       return true;
//     })
//     .filter(assignment => 
//       assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Assignment Management</h1>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//         <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
//           <div>
//             <label htmlFor="courseFilter" className="block text-sm font-medium text-gray-700 mb-1">Course</label>
//             <select
//               id="courseFilter"
//               value={courseFilter}
//               onChange={(e) => setCourseFilter(e.target.value)}
//               className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//             >
//               <option value="all">All Courses</option>
//               {courses.map(course => (
//                 <option key={course._id} value={course._id}>{course.title}</option>
//               ))}
//             </select>
//           </div>
          
//           <div>
//             <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//             <select
//               id="filter"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//             >
//               <option value="all">All Assignments</option>
//               <option value="pending">Pending Review</option>
//               <option value="graded">Graded</option>
//             </select>
//           </div>
          
//           <div className="flex-grow">
//             <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 id="search"
//                 placeholder="Search assignments..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               />
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                   <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Assignments List */}
//       {filteredAssignments.length === 0 ? (
//         <div className="bg-white rounded-lg shadow-md p-6 text-center">
//           <p className="text-gray-500">No assignments found</p>
//           {assignments.length > 0 && (
//             <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search</p>
//           )}
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Assignment
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Course
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Due Date
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Submissions
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredAssignments.map((assignment) => {
//                   const course = courses.find(c => c._id === assignment.courseId) || {};
                  
//                   return (
//                     <tr key={assignment._id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div>
//                             <div className="text-sm font-medium text-gray-900">
//                               {assignment.title}
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               {assignment.totalPoints} points
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{course.title || 'Unknown Course'}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {assignment.dueDate ? (
//                           <div className="text-sm text-gray-900">
//                             {new Date(assignment.dueDate).toLocaleDateString()}
//                           </div>
//                         ) : (
//                           <div className="text-sm text-gray-500">No due date</div>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex flex-col">
//                           <div className="text-sm text-gray-900">
//                             <span className="font-medium">{assignment.pendingSubmissions || 0}</span> pending
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             <span className="font-medium">{assignment.totalSubmissions || 0}</span> total
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <div className="flex items-center justify-end space-x-2">
//                           <Link
//                             to={`/dashboard/tutor/assignments/${assignment._id}/submissions`}
//                             className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
//                           >
//                             View Submissions
//                           </Link>
//                           <Link
//                             to={`/dashboard/tutor/assignments/${assignment._id}/edit`}
//                             className="px-2 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
//                           >
//                             Edit
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignmentManagement;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';
import toast from 'react-hot-toast';

const AssignmentManager = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch courses first
        const coursesResponse = await api.get('/courses/tutor');
        setCourses(coursesResponse.data.data);
        
        // Fetch all assignments
        const assignmentsResponse = await api.get('/assignments/tutor');
        setAssignments(assignmentsResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load assignments');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleDeleteAssignment = async (assignmentId) => {
    if (!window.confirm('Are you sure you want to delete this assignment?')) {
      return;
    }
    
    try {
      await api.delete(`/assignments/${assignmentId}`);
      setAssignments(assignments.filter(assignment => assignment._id !== assignmentId));
      toast.success('Assignment deleted successfully');
    } catch (error) {
      console.error('Error deleting assignment:', error);
      toast.error('Failed to delete assignment');
    }
  };

  const handleCreateAssignment = () => {
    navigate('/dashboard/assignments/create');
  };

  const filteredAssignments = assignments
    .filter(assignment => 
      selectedCourse === 'all' || assignment.courseId === selectedCourse
    )
    .filter(assignment => 
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Get course name by ID
  const getCourseNameById = (courseId) => {
    const course = courses.find(c => c._id === courseId);
    return course ? course.title : 'Unknown Course';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Assignment Manager</h1>
        <button
          onClick={handleCreateAssignment}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Assignment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search assignments..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center">
              <label htmlFor="courseFilter" className="mr-2 text-gray-600">Filter by Course:</label>
              <select
                id="courseFilter"
                className="border border-gray-300 rounded-md px-3 py-2"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>{course.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No assignments found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ? 'Try a different search term' : 'Create a new assignment to get started'}
            </p>
            <div className="mt-6">
              <button
                onClick={handleCreateAssignment}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Create Assignment
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submissions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAssignments.map((assignment) => (
                  <tr key={assignment._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{assignment.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getCourseNameById(assignment.courseId)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {assignment.dueDate ? (
                        <div className="text-sm text-gray-900">
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No due date</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        assignment.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {assignment.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {assignment.submissionCount || 0} / {assignment.totalStudents || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link 
                          to={`/dashboard/assignments/edit/${assignment._id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/dashboard/assignments/grade/${assignment._id}`}
                          className="text-green-600 hover:text-green-900"
                        >
                          Grade
                        </Link>
                        <button
                          onClick={() => handleDeleteAssignment(assignment._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
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

export default AssignmentManager;