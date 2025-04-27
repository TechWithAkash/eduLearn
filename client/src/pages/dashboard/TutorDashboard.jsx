// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { api } from '../../../services/api';
// import { useAuth } from '../../../contexts/AuthContext';
// import LoadingSpinner from '../../common/LoadingSpinner';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const TutorDashboard = () => {
//   const { user } = useAuth();
//   const [courses, setCourses] = useState([]);
//   const [pendingAssignments, setPendingAssignments] = useState([]);
//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     totalCourses: 0,
//     averageRating: 0,
//   });
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [],
//   });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setIsLoading(true);
        
//         // Fetch tutor's courses
//         const coursesRes = await api.get(`/users/${user._id}`);
//         const tutorData = coursesRes.data.data;
//         const tutorCourses = tutorData.createdCourses || [];
//         setCourses(tutorCourses);
        
//         // Calculate stats
//         let totalStudents = 0;
//         let ratingsSum = 0;
//         let ratingsCount = 0;
//         let assignmentsToGrade = [];
//         let courseStudentData = [];
        
//         // Collect data from each course
//         for (const course of tutorCourses) {
//           // Get detailed course info with students
//           const courseRes = await api.get(`/courses/${course._id}`);
//           const courseData = courseRes.data.data;
          
//           totalStudents += courseData.enrolledStudents.length;
          
//           // Add to chart data
//           courseStudentData.push({
//             courseName: courseData.title,
//             studentCount: courseData.enrolledStudents.length
//           });
          
//           // Calculate average rating
//           if (courseData.ratings && courseData.ratings.length) {
//             ratingsSum += courseData.averageRating * courseData.ratings.length;
//             ratingsCount += courseData.ratings.length;
//           }
          
//           // Get assignments that need grading
//           const assignmentsRes = await api.get(`/assignments/course/${course._id}`);
//           const assignments = assignmentsRes.data.data;
          
//           const ungraded = assignments.flatMap(assignment => {
//             return assignment.submissions
//               .filter(submission => !submission.isGraded)
//               .map(submission => ({
//                 ...submission,
//                 assignmentTitle: assignment.title,
//                 courseTitle: courseData.title,
//                 courseId: course._id,
//                 assignmentId: assignment._id,
//                 student: submission.student
//               }));
//           });
          
//           assignmentsToGrade = [...assignmentsToGrade, ...ungraded];
//         }
        
//         // Set pending assignments for grading
//         setPendingAssignments(assignmentsToGrade);
        
//         // Set overall stats
//         setStats({
//           totalStudents,
//           totalCourses: tutorCourses.length,
//           averageRating: ratingsCount > 0 ? (ratingsSum / ratingsCount).toFixed(1) : 'N/A'
//         });
        
//         // Prepare chart data
//         setChartData({
//           labels: courseStudentData.map(item => item.courseName),
//           datasets: [
//             {
//               label: 'Students Enrolled',
//               data: courseStudentData.map(item => item.studentCount),
//               backgroundColor: 'rgba(53, 162, 235, 0.5)',
//               borderColor: 'rgb(53, 162, 235)',
//               borderWidth: 1
//             }
//           ]
//         });
        
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [user._id]);

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="container mx-auto px-4">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Tutor Dashboard</h1>
//         <p className="text-gray-600">Manage your courses and students</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
//           <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Total Courses</h3>
//           <p className="mt-1 text-3xl font-bold text-gray-800">{stats.totalCourses}</p>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
//           <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Total Students</h3>
//           <p className="mt-1 text-3xl font-bold text-gray-800">{stats.totalStudents}</p>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
//           <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Average Rating</h3>
//           <p className="mt-1 text-3xl font-bold text-gray-800">{stats.averageRating}</p>
//           <div className="flex mt-2">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <svg 
//                 key={star}
//                 className={`h-5 w-5 ${parseFloat(stats.averageRating) >= star ? 'text-yellow-400' : 'text-gray-300'}`}
//                 fill="currentColor" 
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Chart Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Students Per Course</h2>
//         <div className="h-64">
//           {chartData.labels.length > 0 ? (
//             <Bar 
//               data={chartData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: {
//                     position: 'top',
//                   },
//                   title: {
//                     display: false,
//                   },
//                 },
//               }}
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-500">No course data available</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* My Courses Section */}
//       <div className="mb-10">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-800">My Courses</h2>
//           <div className="flex space-x-2">
//             <Link to="/dashboard/my-courses" className="text-blue-600 hover:text-blue-800 font-medium">
//               View All
//             </Link>
//             <Link to="/dashboard/create-course" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
//               Create New Course
//             </Link>
//           </div>
//         </div>
        
//         {courses.length === 0 ? (
//           <div className="bg-white p-6 rounded-lg shadow-md text-center">
//             <p className="text-gray-600 mb-4">You haven't created any courses yet.</p>
//             <Link to="/dashboard/create-course" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//               Create Your First Course
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {courses.slice(0, 6).map(course => (
//               <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                 <div className="relative h-40 bg-gray-200">
//                   {course.thumbnail ? (
//                     <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
//                   ) : (
//                     <div className="flex items-center justify-center h-full bg-gray-200 text-gray-400">
//                       <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                   )}
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
//                     <h3 className="text-lg font-semibold text-white">{course.title}</h3>
//                   </div>
//                   <div className="absolute top-0 right-0 m-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">
//                     {course.grade}
//                   </div>
//                   <div className="absolute top-0 left-0 m-2 px-2 py-1 bg-gray-800 bg-opacity-75 text-white text-xs rounded">
//                     {course.isPublished ? 'Published' : 'Draft'}
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center">
//                       <svg className="w-5 h-5 text-gray-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
//                       </svg>
//                       <span className="text-sm text-gray-600">
//                         {course.enrolledStudents?.length || 0} Students
//                       </span>
//                     </div>
//                     <div className="flex items-center">
//                       <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="text-sm text-gray-600">
//                         {course.averageRating || 'N/A'}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <Link to={`/dashboard/courses/${course._id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
//                       Manage Course
//                     </Link>
//                     <Link to={`/dashboard/courses/${course._id}/edit`} className="text-gray-600 hover:text-gray-800 text-sm">
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                       </svg>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Assignments to Grade */}
//       <div className="mb-10">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-800">Assignments to Grade</h2>
//           <Link to="/dashboard/assignments" className="text-blue-600 hover:text-blue-800 font-medium">View All</Link>
//         </div>
        
//         {pendingAssignments.length === 0 ? (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <p className="text-gray-600 text-center">No assignments pending for grading.</p>
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {pendingAssignments.slice(0, 5).map((submission, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{submission.studentName}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{submission.assignmentTitle}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{submission.courseTitle}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">
//                         {new Date(submission.submittedAt).toLocaleDateString()}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <Link to={`/dashboard/assignments/grade/${submission.assignmentId}/${submission._id}`} className="text-blue-600 hover:text-blue-900">
//                         Grade
//                       </Link>
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

// export default TutorDashboard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const TutorDashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalAssignments: 0,
    totalQuizzes: 0,
    completionRates: [],
    recentActivities: [],
    pendingGrading: 0
  });

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await api.get('/tutors/dashboard');
  //       setStats(response.data.data);
  //     } catch (error) {
  //       console.error('Error fetching dashboard data:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchDashboardData();
  // }, []);

  // Update the useEffect function in TutorDashboard.jsx

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      try {
        // First try to use the dedicated dashboard endpoint
        const response = await api.get('/tutors/dashboard');
        setStats(response.data.data);
      } catch (error) {
        // If the endpoint doesn't exist, fall back to manual data collection
        console.log("Dashboard API not available, using fallback data collection");
        
        // Fetch courses created by the tutor
        const coursesRes = await api.get('/courses/tutor');
        const courses = coursesRes.data.data || [];
        
        // Initialize statistics object
        const dashboardStats = {
          totalCourses: courses.length,
          totalStudents: 0,
          totalAssignments: 0,
          totalQuizzes: 0,
          completionRates: [],
          recentActivities: [],
          pendingGrading: 0
        };
        
        // Process each course for additional data
        for (const course of courses) {
          // Add course completion rate (dummy data for now)
          dashboardStats.completionRates.push({
            id: course._id,
            title: course.title,
            completionRate: Math.floor(Math.random() * 100)
          });
          
          // Count students
          dashboardStats.totalStudents += course.students?.length || 0;
          
          // Add dummy recent activities
          if (course.students && course.students.length) {
            dashboardStats.recentActivities.push({
              id: course._id,
              type: 'enrollment',
              date: new Date(),
              title: 'Course Enrollment',
              description: `New student enrolled in ${course.title}`,
              courseName: course.title,
              studentName: 'Student'
            });
          }
          
          // Try to fetch assignments for this course
          try {
            const assignmentsRes = await api.get(`/assignments/course/${course._id}`);
            const assignments = assignmentsRes.data.data || [];
            dashboardStats.totalAssignments += assignments.length;
            
            // Count pending submissions
            assignments.forEach(assignment => {
              const pendingSubmissions = assignment.submissions?.filter(s => !s.isGraded)?.length || 0;
              dashboardStats.pendingGrading += pendingSubmissions;
              
              // Add dummy submission activity
              if (pendingSubmissions > 0) {
                dashboardStats.recentActivities.push({
                  id: assignment._id,
                  type: 'submission',
                  date: new Date(),
                  title: 'Assignment Submission',
                  description: `New submission for "${assignment.title}"`,
                  courseName: course.title,
                  studentName: 'Student'
                });
              }
            });
          } catch (err) {
            console.log("Could not fetch assignments for course", course._id);
          }
          
          // Try to fetch quizzes for this course
          try {
            const quizzesRes = await api.get(`/quizzes/course/${course._id}`);
            const quizzes = quizzesRes.data.data || [];
            dashboardStats.totalQuizzes += quizzes.length;
          } catch (err) {
            console.log("Could not fetch quizzes for course", course._id);
          }
        }
        
        // Sort activities by date and limit to 10
        dashboardStats.recentActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
        dashboardStats.recentActivities = dashboardStats.recentActivities.slice(0, 10);
        
        // Update state with collected data
        setStats(dashboardStats);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set default data structure with zeros to prevent UI errors
      setStats({
        totalCourses: 0,
        totalStudents: 0,
        totalAssignments: 0,
        totalQuizzes: 0,
        completionRates: [],
        recentActivities: [],
        pendingGrading: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  fetchDashboardData();
}, [user._id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Chart data for course completion rates
  const completionChartData = {
    labels: stats.completionRates.map(course => course.title),
    datasets: [
      {
        label: 'Completion Rate (%)',
        data: stats.completionRates.map(course => course.completionRate),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart data for student activity distribution
  const activityDistributionData = {
    labels: ['Courses', 'Assignments', 'Quizzes', 'Discussions'],
    datasets: [
      {
        data: [stats.totalCourses, stats.totalAssignments, stats.totalQuizzes, stats.totalStudents],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tutor Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Courses</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalCourses}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/dashboard/courses" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View all courses →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Students</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalStudents}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/dashboard/students" className="text-green-600 hover:text-green-800 text-sm font-medium">
              Manage students →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Assignments</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalAssignments}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/dashboard/assignments" className="text-yellow-600 hover:text-yellow-800 text-sm font-medium">
              Manage assignments →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Quizzes</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalQuizzes}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/dashboard/quizzes" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
              Manage quizzes →
            </Link>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Course Completion Rates</h2>
          <div className="h-64">
            <Bar 
              data={completionChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `${context.raw}% completion rate`;
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: function(value) {
                        return value + '%';
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Content Distribution</h2>
          <div className="h-64 flex justify-center">
            <div className="w-3/4">
              <Doughnut 
                data={activityDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Items Requiring Attention */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Items Requiring Attention</h2>
          <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
            {stats.pendingGrading} pending
          </div>
        </div>

        {stats.pendingGrading > 0 ? (
          <div className="space-y-4">
            {stats.recentActivities.filter(item => item.type === 'submission').map((item, index) => (
              <div key={index} className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-md">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      {item.studentName} submitted an assignment in {item.courseName}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-2">
                  <Link 
                    to={`/dashboard/assignments/grade/${item.id}`}
                    className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                  >
                    Grade submission →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No pending items</h3>
            <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
        
        {stats.recentActivities.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {stats.recentActivities.map((activity, index) => (
              <div key={index} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'enrollment' ? 'bg-green-100 text-green-600' :
                    activity.type === 'submission' ? 'bg-orange-100 text-orange-600' :
                    activity.type === 'completion' ? 'bg-blue-100 text-blue-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type === 'enrollment' && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    )}
                    {activity.type === 'submission' && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    )}
                    {activity.type === 'completion' && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {activity.type === 'quiz' && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorDashboard;

