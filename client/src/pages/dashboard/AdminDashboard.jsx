// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { api } from '../../../services/api';
// import { useAuth } from '../../../contexts/AuthContext';
// import LoadingSpinner from '../../common/LoadingSpinner';
// import { Bar, Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from 'chart.js';

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// const AdminDashboard = () => {
//   const { user } = useAuth();
//   const [isLoading, setIsLoading] = useState(true);
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalCourses: 0,
//     totalRevenue: 0,
//     activeUsers: 0
//   });
//   const [latestUsers, setLatestUsers] = useState([]);
//   const [latestCourses, setLatestCourses] = useState([]);
//   const [userRoleData, setUserRoleData] = useState({
//     labels: ['Students', 'Tutors', 'Admins'],
//     datasets: [{
//       data: [0, 0, 0],
//       backgroundColor: ['#4F46E5', '#10B981', '#F59E0B'],
//       borderWidth: 0
//     }]
//   });
//   const [monthlyRevenueData, setMonthlyRevenueData] = useState({
//     labels: [],
//     datasets: [{
//       label: 'Monthly Revenue',
//       data: [],
//       backgroundColor: 'rgba(79, 70, 229, 0.6)',
//       borderColor: '#4F46E5',
//       borderWidth: 1
//     }]
//   });

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setIsLoading(true);
        
//         // Fetch users
//         const usersRes = await api.get('/users');
//         const users = usersRes.data.data;
        
//         // Fetch courses
//         const coursesRes = await api.get('/courses');
//         const courses = coursesRes.data.data;
        
//         // Calculate user role distribution
//         const students = users.filter(user => user.role === 'student').length;
//         const tutors = users.filter(user => user.role === 'tutor').length;
//         const admins = users.filter(user => user.role === 'admin').length;
        
//         setUserRoleData({
//           labels: ['Students', 'Tutors', 'Admins'],
//           datasets: [{
//             data: [students, tutors, admins],
//             backgroundColor: ['#4F46E5', '#10B981', '#F59E0B'],
//             borderWidth: 0
//           }]
//         });
        
//         // Create monthly revenue data (mock data for demonstration)
//         const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//         const currentMonth = new Date().getMonth();
//         const recentMonths = months.slice(0, currentMonth + 1);
        
//         // Generate random revenue data (in a real app, this would come from your payment system)
//         const revenueData = recentMonths.map(() => Math.floor(Math.random() * 5000) + 1000);
//         const totalRevenue = revenueData.reduce((sum, current) => sum + current, 0);
        
//         setMonthlyRevenueData({
//           labels: recentMonths,
//           datasets: [{
//             label: 'Monthly Revenue',
//             data: revenueData,
//             backgroundColor: 'rgba(79, 70, 229, 0.6)',
//             borderColor: '#4F46E5',
//             borderWidth: 1
//           }]
//         });
        
//         // Set global stats
//         setStats({
//           totalUsers: users.length,
//           totalCourses: courses.length,
//           totalRevenue: totalRevenue,
//           activeUsers: Math.floor(users.length * 0.8) // Mock data - 80% of users are active
//         });
        
//         // Get latest users
//         const sortedUsers = [...users].sort((a, b) => 
//           new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setLatestUsers(sortedUsers.slice(0, 5));
        
//         // Get latest courses
//         const sortedCourses = [...courses].sort((a, b) => 
//           new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setLatestCourses(sortedCourses.slice(0, 5));
        
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="container mx-auto px-4">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
//         <p className="text-gray-600">Platform overview and management</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
//           <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Total Users</h3>
//           <p className="mt-1 text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
//           <div className="mt-1 text-sm text-green-600 flex items-center">
//             <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
//             </svg>
//             <span>8% from last month</span>
//           </div>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
//           <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Total Courses</h3>
//           <p className="mt-1 text-3xl font-bold text-gray-800">{stats.totalCourses}</p>
//           <div className="mt-1 text-sm text-green-600 flex items-center">
//             <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
//             </svg>
//             <span>12% from last month</span>
//           </div>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
//           <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Total Revenue</h3>
//           <p className="mt-1 text-3xl font-bold text-gray-800">${stats.totalRevenue.toLocaleString()}</p>
//           <div className="mt-1 text-sm text-green-600 flex items-center">
//             <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
//             </svg>
//             <span>15% from last month</span>
//           </div>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
//           <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Active Users</h3>
//           <p className="mt-1 text-3xl font-bold text-gray-800">{stats.activeUsers}</p>
//           <div className="mt-1 text-sm text-green-600 flex items-center">
//             <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
//             </svg>
//             <span>5% from last month</span>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Revenue</h2>
//           <div className="h-64">
//             <Bar 
//               data={monthlyRevenueData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: {
//                     display: false,
//                   },
//                 },
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                     ticks: {
//                       callback: function(value) {
//                         return '$' + value;
//                       }
//                     }
//                   }
//                 }
//               }}
//             />
//           </div>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">User Distribution</h2>
//           <div className="h-64 flex items-center justify-center">
//             <div style={{ maxWidth: '70%' }}>
//               <Doughnut 
//                 data={userRoleData}
//                 options={{
//                   responsive: true,
//                   maintainAspectRatio: false,
//                   plugins: {
//                     legend: {
//                       position: 'right',
//                     }
//                   },
//                   cutout: '70%'
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recently Added Users */}
//       <div className="mb-10">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-800">Recent Users</h2>
//           <Link to="/dashboard/users" className="text-blue-600 hover:text-blue-800 font-medium">View All Users</Link>
//         </div>
        
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {latestUsers.map(user => (
//                 <tr key={user._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
//                         {user.name.charAt(0).toUpperCase()}
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{user.name}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-500">{user.email}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       user.role === 'admin' ? 'bg-yellow-100 text-yellow-800' : 
//                       user.role === 'tutor' ? 'bg-green-100 text-green-800' : 
//                       'bg-indigo-100 text-indigo-800'
//                     }`}>
//                       {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(user.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <Link to={`/dashboard/users/${user._id}`} className="text-blue-600 hover:text-blue-900 mr-4">
//                       View
//                     </Link>
//                     <Link to={`/dashboard/users/${user._id}/edit`} className="text-indigo-600 hover:text-indigo-900">
//                       Edit
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Recently Added Courses */}
//       <div className="mb-10">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-800">Recent Courses</h2>
//           <Link to="/dashboard/courses" className="text-blue-600 hover:text-blue-800 font-medium">View All Courses</Link>
//         </div>
        
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {latestCourses.map(course => (
//                 <tr key={course._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded">
//                         {course.thumbnail ? (
//                           <img src={course.thumbnail} alt="" className="h-10 w-10 rounded object-cover" />
//                         ) : (
//                           <div className="h-10 w-10 rounded flex items-center justify-center bg-gray-200 text-gray-400">
//                             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
//                             </svg>
//                           </div>
//                         )}
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{course.title}</div>
//                         <div className="text-sm text-gray-500">Grade {course.grade}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{course.instructorName || 'Unknown'}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-500">{course.category}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">${course.price}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       course.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                     }`}>
//                       {course.isPublished ? 'Published' : 'Draft'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <Link to={`/dashboard/courses/${course._id}`} className="text-blue-600 hover:text-blue-900 mr-4">
//                       View
//                     </Link>
//                     <Link to={`/dashboard/courses/${course._id}/edit`} className="text-indigo-600 hover:text-indigo-900">
//                       Edit
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="mb-10">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Link to="/dashboard/users/create" className="block p-6 bg-indigo-50 rounded-lg shadow-md hover:bg-indigo-100 transition-colors duration-200">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-indigo-500 text-white mr-4">
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Add New User</h3>
//                 <p className="text-sm text-gray-600">Create a new student, tutor or admin account</p>
//               </div>
//             </div>
//           </Link>
          
//           <Link to="/dashboard/courses/create" className="block p-6 bg-green-50 rounded-lg shadow-md hover:bg-green-100 transition-colors duration-200">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-green-500 text-white mr-4">
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Create Course</h3>
//                 <p className="text-sm text-gray-600">Add a new course to the platform</p>
//               </div>
//             </div>
//           </Link>
          
//           <Link to="/dashboard/reports" className="block p-6 bg-purple-50 rounded-lg shadow-md hover:bg-purple-100 transition-colors duration-200">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-purple-500 text-white mr-4">
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Generate Reports</h3>
//                 <p className="text-sm text-gray-600">View and export platform analytics</p>
//               </div>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';
import toast from 'react-hot-toast';

// If you're using recharts for charts, import these
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    users: { total: 0, students: 0, tutors: 0, admins: 0 },
    courses: { total: 0, published: 0, drafts: 0 },
    enrollments: { total: 0, thisMonth: 0 },
    revenue: { total: 0, thisMonth: 0 },
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch admin dashboard stats
        const statsResponse = await api.get('/analytics/admin/stats');
        if (statsResponse.data.success) {
          setStats(statsResponse.data.data);
        }
        
        // Fetch recent users
        const recentUsersResponse = await api.get('/users/recent');
        if (recentUsersResponse.data.success) {
          setRecentUsers(recentUsersResponse.data.data);
        }
        
        // Fetch recent courses
        const recentCoursesResponse = await api.get('/courses/recent');
        if (recentCoursesResponse.data.success) {
          setRecentCourses(recentCoursesResponse.data.data);
        }
      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}. Here's what's happening with your platform.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Users Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{stats.users.total}</p>
              <div className="flex mt-2 space-x-2 text-xs">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{stats.users.students} Students</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">{stats.users.tutors} Tutors</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <Link to="/admin/users" className="text-blue-600 text-sm flex items-center mt-4">
            Manage Users 
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {/* Courses Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Courses</p>
              <p className="text-2xl font-bold text-gray-800">{stats.courses.total}</p>
              <div className="flex mt-2 space-x-2 text-xs">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">{stats.courses.published} Published</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">{stats.courses.drafts} Drafts</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <Link to="/admin/courses" className="text-green-600 text-sm flex items-center mt-4">
            Manage Courses
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {/* Enrollments Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Enrollments</p>
              <p className="text-2xl font-bold text-gray-800">{stats.enrollments.total}</p>
              <div className="mt-2 text-xs">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                  +{stats.enrollments.thisMonth} this month
                </span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <Link to="/admin/enrollments" className="text-purple-600 text-sm flex items-center mt-4">
            View Enrollments
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {/* Revenue Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">${stats.revenue.total.toLocaleString()}</p>
              <div className="mt-2 text-xs">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                  ${stats.revenue.thisMonth.toLocaleString()} this month
                </span>
              </div>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <Link to="/admin/finance" className="text-yellow-600 text-sm flex items-center mt-4">
            Financial Reports
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Two columns layout for Recent Users and Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recently Joined Users</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentUsers.map(user => (
              <div key={user._id} className="p-4 hover:bg-gray-50 transition duration-150">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    {user.profilePicture ? (
                      <img 
                        src={user.profilePicture} 
                        alt={user.name} 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="ml-auto flex items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'student' ? 'bg-blue-100 text-blue-800' : 
                      user.role === 'tutor' ? 'bg-green-100 text-green-800' : 
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {user.role}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <Link to="/admin/users" className="text-blue-600 text-sm flex items-center justify-center">
              View All Users
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M5 7l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Recent Courses */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recently Added Courses</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentCourses.map(course => (
              <div key={course._id} className="p-4 hover:bg-gray-50 transition duration-150">
                <div className="flex">
                  <div className="h-16 w-24 flex-shrink-0">
                    {course.coverImage ? (
                      <img 
                        src={course.coverImage} 
                        alt={course.title} 
                        className="h-16 w-24 rounded object-cover"
                      />
                    ) : (
                      <div className="h-16 w-24 rounded bg-gray-200 flex items-center justify-center">
                        <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">{course.title}</p>
                    <p className="text-xs text-gray-500">{course.category}</p>
                    <div className="mt-1 flex items-center">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        course.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {course.isPublished ? 'Published' : 'Draft'}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        by {course.instructor?.name || 'Unknown'}
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col items-end">
                    <span className="text-sm font-semibold">{course.studentsCount || 0} students</span>
                    <span className="text-xs text-gray-500">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <Link to="/admin/courses" className="text-green-600 text-sm flex items-center justify-center">
              View All Courses
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M5 7l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/admin/users/new" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150 flex flex-col items-center text-center">
            <svg className="h-8 w-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span className="text-sm font-medium">Add New User</span>
          </Link>
          
          <Link to="/admin/courses/new" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150 flex flex-col items-center text-center">
            <svg className="h-8 w-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">Create Course</span>
          </Link>
          
          <Link to="/admin/reports" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150 flex flex-col items-center text-center">
            <svg className="h-8 w-8 text-purple-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium">Generate Reports</span>
          </Link>
          
          <Link to="/admin/settings" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150 flex flex-col items-center text-center">
            <svg className="h-8 w-8 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium">Platform Settings</span>
          </Link>
        </div>
      </div>
      
      {/* System Health */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">System Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">Server Status</h3>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Operational</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full" style={{ width: '98%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">98% Uptime</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">Database</h3>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Healthy</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">65% Storage Used</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">API Requests</h3>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Normal</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: '42%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">42% of Capacity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;