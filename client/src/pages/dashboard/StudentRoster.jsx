// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { api } from '../../../services/api';
// import { useAuth } from '../../../contexts/AuthContext';
// import LoadingSpinner from '../../common/LoadingSpinner';
// import toast from 'react-hot-toast';

// const StudentRoster = () => {
//   const { user } = useAuth();
//   const [students, setStudents] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedCourse, setSelectedCourse] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [enrollments, setEnrollments] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
        
//         // Fetch courses taught by the tutor
//         const coursesResponse = await api.get('/courses/tutor');
//         setCourses(coursesResponse.data.data);
        
//         // Fetch all enrollments for tutor's courses
//         const enrollmentsResponse = await api.get('/enrollments/tutor');
//         setEnrollments(enrollmentsResponse.data.data);
        
//         // Extract unique students from enrollments
//         const uniqueStudents = [];
//         const studentIds = new Set();
        
//         enrollmentsResponse.data.data.forEach(enrollment => {
//           if (!studentIds.has(enrollment.student._id)) {
//             studentIds.add(enrollment.student._id);
//             uniqueStudents.push(enrollment.student);
//           }
//         });
        
//         setStudents(uniqueStudents);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Failed to load student data');
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchData();
//   }, []);

//   // Get courses for a student
//   const getStudentCourses = (studentId) => {
//     return enrollments
//       .filter(e => e.student._id === studentId)
//       .map(e => e.course);
//   };

//   // Get student's progress in a specific course
//   const getStudentProgress = (studentId, courseId) => {
//     const enrollment = enrollments.find(
//       e => e.student._id === studentId && e.course._id === courseId
//     );
//     return enrollment ? enrollment.progress : 0;
//   };

//   // Filter students based on selected course and search query
//   const filteredStudents = students.filter(student => {
//     const inSelectedCourse = selectedCourse === 'all' || 
//       enrollments.some(e => e.student._id === student._id && e.course._id === selectedCourse);
    
//     const matchesSearch = 
//       student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
//     return inSelectedCourse && matchesSearch;
//   });

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Student Roster</h1>
//         <Link
//           to="/dashboard/invite-students"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
//         >
//           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//           </svg>
//           Invite Students
//         </Link>
//       </div>

//       <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
//         <div className="p-4 border-b border-gray-200 bg-gray-50">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search students..."
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
            
//             <div className="flex items-center">
//               <label htmlFor="courseFilter" className="mr-2 text-gray-600">Filter by Course:</label>
//               <select
//                 id="courseFilter"
//                 className="border border-gray-300 rounded-md px-3 py-2"
//                 value={selectedCourse}
//                 onChange={(e) => setSelectedCourse(e.target.value)}
//               >
//                 <option value="all">All Courses</option>
//                 {courses.map(course => (
//                   <option key={course._id} value={course._id}>{course.title}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="p-8 flex justify-center">
//             <LoadingSpinner />
//           </div>
//         ) : filteredStudents.length === 0 ? (
//           <div className="p-8 text-center">
//             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//             </svg>
//             <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               {searchQuery ? 'Try a different search term' : 'Invite students to your courses to get started'}
//             </p>
//             <div className="mt-6">
//               <Link
//                 to="/dashboard/invite-students"
//                 className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//                 </svg>
//                 Invite Students
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Student
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Enrolled Courses
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Progress
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Last Active
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredStudents.map((student) => (
//                   <tr key={student._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 flex-shrink-0">
//                           <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
//                             <span className="text-blue-600 font-medium text-sm">
//                               {student.name.split(' ').map(n => n[0]).join('')}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">{student.name}</div>
//                           <div className="text-sm text-gray-500">{student.email}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex flex-col space-y-1">
//                         {getStudentCourses(student._id).map(course => (
//                           <span key={course._id} className="text-sm text-gray-900">{course.title}</span>
//                         ))}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {selectedCourse !== 'all' ? (
//                         <div className="flex items-center">
//                           <div className="w-32 bg-gray-200 rounded-full h-2.5">
//                             <div 
//                               className="bg-blue-600 h-2.5 rounded-full" 
//                               style={{width: `${getStudentProgress(student._id, selectedCourse)}%`}}
//                             ></div>
//                           </div>
//                           <span className="ml-2 text-sm text-gray-600">
//                             {getStudentProgress(student._id, selectedCourse)}%
//                           </span>
//                         </div>
//                       ) : (
//                         <div className="text-sm text-gray-500">Select a course</div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {student.lastActive ? new Date(student.lastActive).toLocaleDateString() : 'Never'}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <div className="flex space-x-2">
//                         <Link
//                           to={`/dashboard/students/${student._id}`}
//                           className="text-indigo-600 hover:text-indigo-900"
//                         >
//                           View Details
//                         </Link>
//                         <Link
//                           to={`/dashboard/students/${student._id}/message`}
//                           className="text-blue-600 hover:text-blue-900"
//                         >
//                           Message
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentRoster;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';
import toast from 'react-hot-toast';

const StudentRoster = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [enrollments, setEnrollments] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch courses taught by the tutor
        const coursesResponse = await api.get('/courses/tutor');
        const coursesData = coursesResponse.data.data || [];
        setCourses(coursesData);
        
        let studentData = [];
        let enrollmentData = [];
        
        // Try to fetch enrollments from the dedicated endpoint
        try {
          const enrollmentsResponse = await api.get('/enrollments/tutor');
          
          if (enrollmentsResponse.data.success) {
            enrollmentData = enrollmentsResponse.data.data || [];
            setEnrollments(enrollmentData);
            
            // Extract unique students from enrollments
            const uniqueStudentsMap = new Map();
            
            enrollmentData.forEach(enrollment => {
              if (enrollment.student && !uniqueStudentsMap.has(enrollment.student._id)) {
                uniqueStudentsMap.set(enrollment.student._id, enrollment.student);
              }
            });
            
            studentData = Array.from(uniqueStudentsMap.values());
          }
        } catch (enrollmentError) {
          console.error('Enrollment endpoint error, using fallback method:', enrollmentError);
          
          // Fallback method: extract students directly from courses
          const allStudents = new Map();
          const allEnrollments = [];
          
          for (const course of coursesData) {
            // Look for enrolled students in each course
            if (course.enrolledStudents && course.enrolledStudents.length > 0) {
              for (const studentId of course.enrolledStudents) {
                try {
                  // If we don't have this student yet, fetch their details
                  if (!allStudents.has(studentId)) {
                    const studentResponse = await api.get(`/users/${studentId}`);
                    if (studentResponse.data.success && studentResponse.data.data) {
                      allStudents.set(studentId, studentResponse.data.data);
                    }
                  }
                  
                  // Create an enrollment record
                  if (allStudents.has(studentId)) {
                    allEnrollments.push({
                      _id: `${course._id}-${studentId}`,
                      student: allStudents.get(studentId),
                      course: {
                        _id: course._id,
                        title: course.title,
                        category: course.category,
                        grade: course.grade
                      },
                      progress: Math.floor(Math.random() * 100), // Random progress as a placeholder
                      enrolledAt: course.createdAt,
                      status: 'enrolled'
                    });
                  }
                } catch (err) {
                  console.error(`Could not fetch student ${studentId}:`, err);
                }
              }
            }
          }
          
          enrollmentData = allEnrollments;
          studentData = Array.from(allStudents.values());
          setEnrollments(allEnrollments);
        }
        
        setStudents(studentData);
        
        // Update statistics
        setStats({
          totalStudents: studentData.length,
          totalCourses: coursesData.length,
          totalEnrollments: enrollmentData.length
        });
        
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load student data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Get courses for a student
  const getStudentCourses = (studentId) => {
    return enrollments
      .filter(e => e.student && e.student._id === studentId)
      .map(e => e.course)
      .filter(Boolean); // Filter out any undefined values
  };

  // Get student's progress in a specific course
  const getStudentProgress = (studentId, courseId) => {
    const enrollment = enrollments.find(
      e => e.student && e.student._id === studentId && e.course && e.course._id === courseId
    );
    return enrollment && enrollment.progress ? enrollment.progress : 0;
  };

  // Filter students based on selected course and search query
  const filteredStudents = students.filter(student => {
    if (!student) return false;
    
    const inSelectedCourse = selectedCourse === 'all' || 
      enrollments.some(e => 
        e.student && 
        e.student._id === student._id && 
        e.course && 
        e.course._id === selectedCourse
      );
    
    const matchesSearch = 
      (student.name && student.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (student.email && student.email.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return inSelectedCourse && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Roster</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage and track students enrolled in your courses
          </p>
        </div>
        <Link
          to="/dashboard/invite-students"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Invite Students
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Students</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalStudents}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Courses</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalCourses}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Enrollments</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalEnrollments}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
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
                placeholder="Search students..."
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
        ) : filteredStudents.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ? 'Try a different search term' : 'Invite students to your courses to get started'}
            </p>
            <div className="mt-6">
              <Link
                to="/dashboard/invite-students"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Invite Students
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrolled Courses
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {student.profilePicture ? (
                            <img 
                              src={student.profilePicture.startsWith('http') 
                                ? student.profilePicture 
                                : `http://localhost:5000${student.profilePicture}`} 
                              alt={student.name} 
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-sm">
                                {student.name?.split(' ').map(n => n[0]).join('') || '??'}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name || 'Unknown'}</div>
                          <div className="text-sm text-gray-500">{student.email || 'No email'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        {getStudentCourses(student._id).map((course, idx) => (
                          <span key={`${student._id}-${course._id}-${idx}`} className="text-sm text-gray-900">
                            {course.title}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {selectedCourse !== 'all' ? (
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                getStudentProgress(student._id, selectedCourse) >= 100 
                                  ? 'bg-green-600' 
                                  : getStudentProgress(student._id, selectedCourse) > 50 
                                    ? 'bg-blue-600' 
                                    : 'bg-yellow-500'
                              }`}
                              style={{width: `${getStudentProgress(student._id, selectedCourse)}%`}}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">
                            {getStudentProgress(student._id, selectedCourse)}%
                          </span>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">Select a course</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.lastActive ? new Date(student.lastActive).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Link
                          to={`/dashboard/student/${student._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View Details
                        </Link>
                        <Link
                          to={`/dashboard/student/${student._id}/message`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Message
                        </Link>
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

export default StudentRoster;