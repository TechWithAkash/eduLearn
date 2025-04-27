// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { api } from '../../../services/api';
// import { useAuth } from '../../../contexts/AuthContext';
// import { Doughnut, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Tooltip,
//   Legend
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Tooltip,
//   Legend
// );

// const StudentDashboard = () => {
//   const { user } = useAuth();
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [upcomingAssignments, setUpcomingAssignments] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [progressStats, setProgressStats] = useState({
//     completedCourses: 0,
//     inProgressCourses: 0,
//     notStartedCourses: 0
//   });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setIsLoading(true);
        
//         // Fetch enrolled courses
//         const coursesResponse = await api.get('/users/courses/enrolled');
//         setEnrolledCourses(coursesResponse.data.data);
        
//         // Fetch upcoming assignments
//         const assignmentsResponse = await api.get('/assignments/upcoming');
//         setUpcomingAssignments(assignmentsResponse.data.data);
        
//         // Fetch notifications
//         const notificationsResponse = await api.get('/notifications');
//         setNotifications(notificationsResponse.data.data);
        
//         // Calculate progress stats
//         const stats = {
//           completedCourses: 0,
//           inProgressCourses: 0,
//           notStartedCourses: 0
//         };
        
//         coursesResponse.data.data.forEach(course => {
//           if (course.progress === 100) {
//             stats.completedCourses++;
//           } else if (course.progress > 0) {
//             stats.inProgressCourses++;
//           } else {
//             stats.notStartedCourses++;
//           }
//         });
        
//         setProgressStats(stats);
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchDashboardData();
//   }, []);

//   // Progress chart data
//   const progressChartData = {
//     labels: ['Completed', 'In Progress', 'Not Started'],
//     datasets: [
//       {
//         data: [
//           progressStats.completedCourses,
//           progressStats.inProgressCourses,
//           progressStats.notStartedCourses
//         ],
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.7)',
//           'rgba(255, 159, 64, 0.7)',
//           'rgba(201, 203, 207, 0.7)'
//         ],
//         borderColor: [
//           'rgb(75, 192, 192)',
//           'rgb(255, 159, 64)',
//           'rgb(201, 203, 207)'
//         ],
//         borderWidth: 1
//       }
//     ]
//   };

//   // Weekly activity data
//   const activityData = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       {
//         label: 'Hours Spent',
//         data: [2.5, 3.2, 1.8, 4.0, 2.7, 1.5, 0.8],
//         borderColor: 'rgb(75, 192, 192)',
//         backgroundColor: 'rgba(75, 192, 192, 0.5)',
//         tension: 0.3
//       }
//     ]
//   };

//   return (
//     <div className="container mx-auto px-4">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">
//           Welcome back, {user?.name}!
//         </h1>
//         <p className="text-gray-600">
//           Here's an overview of your learning progress
//         </p>
//       </div>

//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <>
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
//               <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Enrolled Courses</h3>
//               <p className="mt-1 text-3xl font-bold text-gray-800">{enrolledCourses.length}</p>
//               <div className="mt-1 text-sm text-blue-600">
//                 <Link to="/dashboard/my-courses">View all courses</Link>
//               </div>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
//               <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Upcoming Assignments</h3>
//               <p className="mt-1 text-3xl font-bold text-gray-800">{upcomingAssignments.length}</p>
//               <div className="mt-1 text-sm text-yellow-600">
//                 <Link to="/dashboard/assignments">View all assignments</Link>
//               </div>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
//               <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Completed Courses</h3>
//               <p className="mt-1 text-3xl font-bold text-gray-800">{progressStats.completedCourses}</p>
//               <div className="mt-1 text-sm text-green-600">
//                 <Link to="/dashboard/certificates">View certificates</Link>
//               </div>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
//               <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Average Grade</h3>
//               <p className="mt-1 text-3xl font-bold text-gray-800">86%</p>
//               <div className="mt-1 text-sm text-purple-600">
//                 <Link to="/dashboard/grades">View detailed grades</Link>
//               </div>
//             </div>
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">Course Progress</h2>
//               <div className="h-64 flex items-center justify-center">
//                 <div style={{ maxWidth: '70%' }}>
//                   <Doughnut 
//                     data={progressChartData}
//                     options={{
//                       responsive: true,
//                       maintainAspectRatio: false,
//                       plugins: {
//                         legend: {
//                           position: 'right',
//                         }
//                       },
//                       cutout: '70%'
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Activity</h2>
//               <div className="h-64">
//                 <Line 
//                   data={activityData}
//                   options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     plugins: {
//                       legend: {
//                         display: false,
//                       },
//                     },
//                     scales: {
//                       y: {
//                         beginAtZero: true,
//                         title: {
//                           display: true,
//                           text: 'Hours'
//                         }
//                       }
//                     }
//                   }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* In Progress Courses */}
//           <div className="mb-10">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Continue Learning</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {enrolledCourses.filter(course => course.progress > 0 && course.progress < 100).slice(0, 3).map(course => (
//                 <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                   <div className="h-40 bg-gray-200 relative">
//                     {course.thumbnail ? (
//                       <img 
//                         src={course.thumbnail} 
//                         alt={course.title} 
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
//                         <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
//                         </svg>
//                       </div>
//                     )}
//                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
//                       <h3 className="text-white font-bold">{course.title}</h3>
//                     </div>
//                   </div>
//                   <div className="p-4">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-sm text-gray-600">{course.category}</span>
//                       <span className="text-sm font-medium text-blue-600">{course.progress}% complete</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//                       <div 
//                         className="bg-blue-600 h-2.5 rounded-full" 
//                         style={{ width: `${course.progress}%` }}
//                       ></div>
//                     </div>
//                     <Link 
//                       to={`/dashboard/courses/${course._id}`}
//                       className="w-full block text-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                     >
//                       Continue
//                     </Link>
//                   </div>
//                 </div>
//               ))}
              
//               {enrolledCourses.filter(course => course.progress > 0 && course.progress < 100).length === 0 && (
//                 <div className="col-span-3 py-8 text-center">
//                   <p className="text-gray-500">You don't have any courses in progress.</p>
//                   <Link to="/courses" className="mt-2 inline-block text-blue-600 hover:underline">
//                     Browse courses to start learning
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Upcoming Assignments */}
//           <div className="mb-10">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-gray-800">Upcoming Assignments</h2>
//               <Link to="/dashboard/assignments" className="text-blue-600 hover:text-blue-800 font-medium">
//                 View All
//               </Link>
//             </div>
            
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               {upcomingAssignments.length > 0 ? (
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Assignment
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Course
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Due Date
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Action
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {upcomingAssignments.map(assignment => (
//                       <tr key={assignment._id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
//                           <div className="text-sm text-gray-500">{assignment.type}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">{assignment.courseName}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">{new Date(assignment.dueDate).toLocaleDateString()}</div>
//                           <div className="text-xs text-gray-500">
//                             {getDaysDifference(new Date(assignment.dueDate), new Date())}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                             assignment.status === 'completed' ? 'bg-green-100 text-green-800' : 
//                             assignment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
//                             'bg-red-100 text-red-800'
//                           }`}>
//                             {assignment.status === 'completed' ? 'Completed' : 
//                              assignment.status === 'in-progress' ? 'In Progress' : 'Not Started'}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <Link to={`/dashboard/assignments/${assignment._id}`} className="text-blue-600 hover:text-blue-900">
//                             View
//                           </Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <div className="py-8 text-center">
//                   <p className="text-gray-500">No upcoming assignments due.</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Notifications */}
//           <div className="mb-10">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-gray-800">Recent Notifications</h2>
//               <Link to="/dashboard/notifications" className="text-blue-600 hover:text-blue-800 font-medium">
//                 View All
//               </Link>
//             </div>
            
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               {notifications.length > 0 ? (
//                 <ul className="divide-y divide-gray-200">
//                   {notifications.slice(0, 5).map(notification => (
//                     <li key={notification._id} className={`p-4 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}>
//                       <div className="flex items-start">
//                         <div className={`flex-shrink-0 rounded-full p-2 ${
//                           notification.type === 'announcement' ? 'bg-blue-100 text-blue-600' :
//                           notification.type === 'grade' ? 'bg-green-100 text-green-600' :
//                           'bg-yellow-100 text-yellow-600'
//                         }`}>
//                           {notification.type === 'announcement' ? (
//                             <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
//                             </svg>
//                           ) : notification.type === 'grade' ? (
//                             <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
//                               <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
//                               <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
//                             </svg>
//                           ) : (
//                             <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//                             </svg>
//                           )}
//                         </div>
//                         <div className="ml-3 flex-1">
//                           <div className="flex items-center justify-between">
//                             <p className="text-sm font-medium text-gray-900">
//                               {notification.title}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               {formatTime(new Date(notification.createdAt))}
//                             </p>
//                           </div>
//                           <p className="text-sm text-gray-500 mt-1">
//                             {notification.message}
//                           </p>
//                           {notification.course && (
//                             <Link to={`/dashboard/courses/${notification.course}`} className="mt-1 inline-block text-xs text-blue-600 hover:underline">
//                               View Course
//                             </Link>
//                           )}
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <div className="py-8 text-center">
//                   <p className="text-gray-500">No notifications to display.</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Recommended Courses */}
//           <div className="mb-10">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended For You</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {[1, 2, 3, 4].map(i => (
//                 <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
//                   <div className="h-40 bg-gray-200">
//                     <img 
//                       src={`https://source.unsplash.com/random/300x200?education&sig=${i}`} 
//                       alt="Course thumbnail" 
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="p-4">
//                     <h3 className="font-bold text-gray-800 mb-2">Recommended Course {i}</h3>
//                     <p className="text-sm text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm font-medium text-gray-800">$49.99</span>
//                       <Link 
//                         to={`/courses/${i}`}
//                         className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
//                       >
//                         View Course
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// // Helper functions
// const getDaysDifference = (date1, date2) => {
//   const diffTime = date1 - date2;
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
//   if (diffDays < 0) {
//     return 'Overdue';
//   } else if (diffDays === 0) {
//     return 'Due today';
//   } else if (diffDays === 1) {
//     return 'Due tomorrow';
//   } else {
//     return `Due in ${diffDays} days`;
//   }
// };

// const formatTime = (date) => {
//   const now = new Date();
//   const diffMs = now - date;
//   const diffSecs = Math.floor(diffMs / 1000);
//   const diffMins = Math.floor(diffSecs / 60);
//   const diffHours = Math.floor(diffMins / 60);
//   const diffDays = Math.floor(diffHours / 24);
  
//   if (diffDays > 7) {
//     return date.toLocaleDateString();
//   } else if (diffDays > 0) {
//     return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
//   } else if (diffHours > 0) {
//     return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
//   } else if (diffMins > 0) {
//     return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
//   } else {
//     return 'Just now';
//   }
// };

// export default StudentDashboard;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [progressStats, setProgressStats] = useState({
    completedCourses: 0,
    inProgressCourses: 0,
    notStartedCourses: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch enrolled courses
        const coursesResponse = await api.get('/courses/user/enrolled');
        console.log("Enrolled courses response:", coursesResponse.data);
        
        if (coursesResponse.data.success) {
          // Process the enrolled courses data to include progress information
          const coursesWithProgress = coursesResponse.data.data.map(course => ({
            ...course,
            progress: course.progress || Math.floor(Math.random() * 100) // Use actual progress or random for demo
          }));
          
          setEnrolledCourses(coursesWithProgress);
          
          // Calculate progress stats
          const stats = {
            completedCourses: 0,
            inProgressCourses: 0,
            notStartedCourses: 0
          };
          
          coursesWithProgress.forEach(course => {
            if (course.progress === 100) {
              stats.completedCourses++;
            } else if (course.progress > 0) {
              stats.inProgressCourses++;
            } else {
              stats.notStartedCourses++;
            }
          });
          
          setProgressStats(stats);
        }
        
        // Fetch upcoming assignments (with error handling)
        try {
          const assignmentsResponse = await api.get('/assignments/upcoming');
          if (assignmentsResponse.data.success) {
            setUpcomingAssignments(assignmentsResponse.data.data || []);
          }
        } catch (err) {
          console.error('Error fetching assignments:', err);
          setUpcomingAssignments([]);
        }
        
        // Fetch notifications (with error handling)
        try {
          const notificationsResponse = await api.get('/notifications');
          if (notificationsResponse.data.success) {
            setNotifications(notificationsResponse.data.data || []);
          }
        } catch (err) {
          console.error('Error fetching notifications:', err);
          setNotifications([]);
        }
        
        // Fetch recommended courses
        try {
          const recommendedResponse = await api.get('/courses/recommended');
          if (recommendedResponse.data.success) {
            setRecommendedCourses(recommendedResponse.data.data || []);
          } else {
            // Fallback to getting some random courses
            const allCoursesResponse = await api.get('/courses?limit=4');
            if (allCoursesResponse.data.success) {
              setRecommendedCourses(allCoursesResponse.data.data || []);
            }
          }
        } catch (err) {
          console.error('Error fetching recommended courses:', err);
          setRecommendedCourses([]);
        }
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // Progress chart data
  const progressChartData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [
          progressStats.completedCourses,
          progressStats.inProgressCourses,
          progressStats.notStartedCourses || 1 // Ensure at least 1 for empty state
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(201, 203, 207, 0.7)'
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 159, 64)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Weekly activity data
  const activityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Hours Spent',
        data: [2.5, 3.2, 1.8, 4.0, 2.7, 1.5, 0.8],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3
      }
    ]
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
          <p>{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name || 'Student'}!
        </h1>
        <p className="opacity-90">
          Here's an overview of your learning journey
        </p>
        
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-5">
              <h3 className="text-sm font-semibold text-black uppercase tracking-wide opacity-80">Enrolled Courses</h3>
              <p className="mt-1 text-blue-700 text-3xl font-bold">{enrolledCourses.length}</p>
              <div className="mt-2">
                <Link to="/dashboard/my-courses" className="text-sm text-blue-600 hover:underline inline-flex items-center">
                  View all courses
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-5">
              <h3 className="text-sm text-black font-semibold uppercase tracking-wide opacity-80">Upcoming Assignments</h3>
              <p className="mt-1 text-3xl text-blue-700 font-bold">{upcomingAssignments.length}</p>
              <div className="mt-2">
                <Link to="/dashboard/assignments" className="text-sm text-blue-500 hover:underline inline-flex items-center">
                  View assignments
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-5">
              <h3 className="text-sm text-black font-semibold uppercase tracking-wide opacity-80">Completed Courses</h3>
              <p className="mt-1 text-blue-700 text-3xl font-bold">{progressStats.completedCourses}</p>
              <div className="mt-2">
                <Link to="/dashboard/certificates" className="text-sm text-blue-500 hover:underline inline-flex items-center">
                  View certificates
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-5">
              <h3 className="text-sm text-black font-semibold uppercase tracking-wide opacity-80">Courses In Progress</h3>
              <p className="mt-1 text-blue-700 text-3xl font-bold">{progressStats.inProgressCourses}</p>
              <div className="mt-2">
                <Link to="/dashboard/my-courses?filter=in-progress" className="text-sm text-blue-500 hover:underline inline-flex items-center">
                  Continue learning
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Course Progress</h2>
              <div className="h-72 flex items-center justify-center">
                <div style={{ maxWidth: '80%' }}>
                  <Doughnut 
                    data={progressChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right',
                          labels: {
                            font: {
                              size: 13
                            },
                            padding: 20
                          }
                        },
                        tooltip: {
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          titleFont: {
                            size: 14
                          },
                          bodyFont: {
                            size: 13
                          },
                          padding: 12
                        }
                      },
                      cutout: '70%'
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Weekly Activity</h2>
              <div className="h-72">
                <Line 
                  data={activityData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                          size: 14
                        },
                        bodyFont: {
                          size: 13
                        },
                        padding: 12
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Hours',
                          font: {
                            size: 12,
                            weight: 'bold'
                          }
                        },
                        ticks: {
                          precision: 1
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* In Progress Courses */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Continue Learning</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {enrolledCourses.filter(course => course.progress > 0 && course.progress < 100).slice(0, 3).map(course => (
                <div key={course._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
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
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                      <h3 className="text-xl text-white font-bold line-clamp-2">{course.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{course.category}</span>
                      <span className="text-sm font-medium text-blue-600">{course.progress}% complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-600 mb-6 line-clamp-2">{course.description}</p>
                    <Link 
                      to={`/dashboard/courses/${course._id}`}
                      className="w-full block text-center py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              ))}
              
              {enrolledCourses.length > 0 && enrolledCourses.filter(course => course.progress > 0 && course.progress < 100).length === 0 && (
                <div className="col-span-3 py-16 text-center bg-white rounded-xl shadow-md">
                  <div className="flex flex-col items-center">
                    <svg className="w-16 h-16 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p className="text-lg text-gray-600">You have enrolled in courses but haven't started learning yet.</p>
                    <Link to="/dashboard/my-courses" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium inline-block">
                      View Your Courses
                    </Link>
                  </div>
                </div>
              )}
              
              {enrolledCourses.length === 0 && (
                <div className="col-span-3 py-16 text-center bg-white rounded-xl shadow-md">
                  <div className="flex flex-col items-center">
                    <svg className="w-16 h-16 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg text-gray-600">You haven't enrolled in any courses yet.</p>
                    <Link to="/courses" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium inline-block">
                      Browse Courses
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Upcoming Assignments</h2>
              <Link to="/dashboard/assignments" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                View All
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              {upcomingAssignments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Assignment
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Due Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {upcomingAssignments.map(assignment => (
                        <tr key={assignment._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                            <div className="text-sm text-gray-500">{assignment.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{assignment.courseName || "Course Name"}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : "No due date"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {assignment.dueDate ? getDaysDifference(new Date(assignment.dueDate), new Date()) : ""}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              assignment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              assignment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {assignment.status === 'completed' ? 'Completed' : 
                               assignment.status === 'in-progress' ? 'In Progress' : 
                               'Not Started'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link to={`/dashboard/assignments/${assignment._id}`} className="text-blue-600 hover:text-blue-900">
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-16 text-center">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <p className="text-gray-600">No upcoming assignments due.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recommended For You</h2>
              <Link to="/courses" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                Browse All Courses
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {recommendedCourses.length > 0 ? recommendedCourses.map(course => (
                <div key={course._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] border border-gray-100">
                  <div className="h-40 bg-gray-200">
                    <img 
                      src={course.thumbnail || `https://source.unsplash.com/random/300x200?education&sig=${course._id}`} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Grade {course.grade}</span>
                      <span className="ml-2 text-xs text-gray-500">{course.category}</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2" title={course.title}>
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2" title={course.description}>
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">₹{course.price}</span>
                      <Link 
                        to={`/courses/${course._id}`}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                      >
                        View Course
                      </Link>
                    </div>
                  </div>
                </div>
              )) : (
                Array(4).fill().map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] border border-gray-100">
                    <div className="h-40 bg-gray-200">
                      <img 
                        src={`https://source.unsplash.com/random/300x200?education&sig=${i}`} 
                        alt="Course thumbnail" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Grade {Math.floor(Math.random() * 12) + 1}</span>
                        <span className="ml-2 text-xs text-gray-500">Subject {i+1}</span>
                      </div>
                      <h3 className="font-bold text-gray-800 mb-2">Recommended Course {i+1}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        This course covers essential concepts and practical applications to help you master the subject.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-800">₹{(499 + i * 100).toFixed(2)}</span>
                        <Link 
                          to={`/courses/${i+1}`}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                        >
                          View Course
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Helper functions
const getDaysDifference = (date1, date2) => {
  const diffTime = date1 - date2;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return 'Overdue';
  } else if (diffDays === 0) {
    return 'Due today';
  } else if (diffDays === 1) {
    return 'Due tomorrow';
  } else {
    return `Due in ${diffDays} days`;
  }
};

const formatTime = (date) => {
  const now = new Date();
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays > 7) {
    return date.toLocaleDateString();
  } else if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffMins > 0) {
    return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
};

export default StudentDashboard;