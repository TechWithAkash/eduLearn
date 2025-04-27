import { Link } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';
// // --- These Propelry Fetch the real data 
import React, { useState, useEffect } from 'react';
const AdminDashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    activeUsers: 0,
    totalRevenue: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch users
        const usersRes = await api.get('/users');
        const users = usersRes.data.data || [];
        
        // Fetch courses
        const coursesRes = await api.get('/courses');
        const courses = coursesRes.data.data || [];
        
        // Set stats
        setStats({
          totalUsers: users.length,
          totalCourses: courses.length,
          activeUsers: users.filter(user => user.isActive).length,
          totalRevenue: 25600 // Mock data
        });
        
        // Get recent users
        const sortedUsers = [...users].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRecentUsers(sortedUsers.slice(0, 5));
        
        // Get recent courses
        const sortedCourses = [...courses].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRecentCourses(sortedCourses.slice(0, 5));
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-500 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase">Total Courses</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalCourses}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase">Active Users</p>
              <p className="text-2xl font-bold text-gray-800">{stats.activeUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">${stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Users */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Recent Users</h2>
          <Link to="/dashboard/users" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentUsers.map(user => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="font-medium text-gray-600">{user.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                      user.role === 'tutor' ? 'bg-green-100 text-green-800' : 
                      'bg-blue-100 text-blue-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recent Courses */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Recent Courses</h2>
          <Link to="/dashboard/courses" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </Link>
        </div>
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
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentCourses.map(course => (
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
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


// ---> This not Fetch Real data 
// import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { api } from '../../services/api';
// // import { useAuth } from '../../contexts/AuthContext';
// // import LoadingSpinner from '../../components/common/LoadingSpinner';
// // import toast from 'react-hot-toast';

// const AdminDashboard = () => {
//   const { user } = useAuth();
//   const [isLoading, setIsLoading] = useState(true);
//   const [stats, setStats] = useState({
//     users: { total: 0, students: 0, tutors: 0, admins: 0 },
//     courses: { total: 0, active: 0, draft: 0 },
//     enrollments: { total: 0, thisMonth: 0 },
//     revenue: { total: 0, thisMonth: 0 }
//   });
//   const [recentUsers, setRecentUsers] = useState([]);
//   const [recentCourses, setRecentCourses] = useState([]);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setIsLoading(true);
        
//         // Fetch dashboard overview data
//         const dashboardResponse = await api.get('/reports/dashboard');
//         if (dashboardResponse.data && dashboardResponse.data.success) {
//           const dashboardData = dashboardResponse.data.data;
//           setStats({
//             users: dashboardData.users || stats.users,
//             courses: {
//               total: dashboardData.courses.total || 0,
//               active: dashboardData.courses.published || 0,
//               draft: dashboardData.courses.drafts || 0
//             },
//             enrollments: {
//               total: dashboardData.enrollments.total || 0,
//               thisMonth: dashboardData.enrollments.newEnrollments || 0
//             },
//             revenue: dashboardData.revenue || stats.revenue
//           });
//         }
        
//         // Fetch recent users
//         const usersResponse = await api.get('/users/recent');
//         if (usersResponse.data && usersResponse.data.success) {
//           setRecentUsers(usersResponse.data.data || []);
//         }
        
//         // Fetch recent courses
//         const coursesResponse = await api.get('/courses/recent');
//         if (coursesResponse.data && coursesResponse.data.success) {
//           setRecentCourses(coursesResponse.data.data || []);
//         }
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//         toast.error('Failed to load dashboard data. Please try again later.');
        
//         // If API calls fail, use fallback data for development/testing
//         if (process.env.NODE_ENV === 'development') {
//           console.warn('Using fallback data for development');
//           setStats({
//             users: { total: 125, students: 95, tutors: 25, admins: 5 },
//             courses: { total: 48, active: 35, draft: 13 },
//             enrollments: { total: 520, thisMonth: 75 },
//             revenue: { total: 15400, thisMonth: 2200 }
//           });
          
//           setRecentUsers([
//             { _id: '1', name: 'John Smith', email: 'john@example.com', role: 'student', createdAt: '2023-04-20T10:30:00Z' },
//             { _id: '2', name: 'Sarah Williams', email: 'sarah@example.com', role: 'tutor', createdAt: '2023-04-19T14:15:00Z' },
//             { _id: '3', name: 'Michael Johnson', email: 'michael@example.com', role: 'student', createdAt: '2023-04-18T09:45:00Z' },
//             { _id: '4', name: 'Emily Brown', email: 'emily@example.com', role: 'student', createdAt: '2023-04-17T16:20:00Z' },
//           ]);
          
//           setRecentCourses([
//             { _id: '1', title: 'Introduction to JavaScript', category: 'Programming', instructor: { name: 'Sarah Williams' }, studentsCount: 38, isPublished: true, createdAt: '2023-04-15T08:30:00Z' },
//             { _id: '2', title: 'Advanced Python Development', category: 'Programming', instructor: { name: 'Robert Davis' }, studentsCount: 25, isPublished: true, createdAt: '2023-04-14T11:45:00Z' },
//             { _id: '3', title: 'Digital Marketing Fundamentals', category: 'Marketing', instructor: { name: 'Jennifer Lee' }, studentsCount: 42, isPublished: true, createdAt: '2023-04-12T14:20:00Z' },
//             { _id: '4', title: 'Introduction to Data Science', category: 'Data Science', instructor: { name: 'Alex Turner' }, studentsCount: 15, isPublished: false, createdAt: '2023-04-10T09:15:00Z' },
//           ]);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchDashboardData();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
//         {/* Total Users Stats */}
//         <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
//           <div className="flex justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Total Users</p>
//               <p className="text-2xl font-bold text-gray-800">{stats.users.total}</p>
//               <div className="flex mt-2 text-xs space-x-2">
//                 <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{stats.users.students} Students</span>
//                 <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">{stats.users.tutors} Tutors</span>
//               </div>
//             </div>
//             <div className="p-3 bg-blue-100 rounded-full">
//               <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//               </svg>
//             </div>
//           </div>
//           <Link to="/dashboard/users" className="text-blue-600 text-sm flex items-center mt-4">
//             View all users
//             <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//             </svg>
//           </Link>
//         </div>

//         {/* Courses Stats */}
//         <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
//           <div className="flex justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Total Courses</p>
//               <p className="text-2xl font-bold text-gray-800">{stats.courses.total}</p>
//               <div className="flex mt-2 text-xs space-x-2">
//                 <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">{stats.courses.active} Active</span>
//                 <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">{stats.courses.draft} Draft</span>
//               </div>
//             </div>
//             <div className="p-3 bg-green-100 rounded-full">
//               <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//               </svg>
//             </div>
//           </div>
//           <Link to="/dashboard/courses" className="text-green-600 text-sm flex items-center mt-4">
//             View all courses
//             <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//             </svg>
//           </Link>
//         </div>

//         {/* Enrollments Stats */}
//         <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
//           <div className="flex justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Total Enrollments</p>
//               <p className="text-2xl font-bold text-gray-800">{stats.enrollments.total}</p>
//               <div className="mt-2 text-xs">
//                 <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
//                   +{stats.enrollments.thisMonth} this month
//                 </span>
//               </div>
//             </div>
//             <div className="p-3 bg-purple-100 rounded-full">
//               <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//               </svg>
//             </div>
//           </div>
//           <Link to="/dashboard/reports" className="text-purple-600 text-sm flex items-center mt-4">
//             View enrollment reports
//             <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//             </svg>
//           </Link>
//         </div>

//         {/* Revenue Stats */}
//         <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
//           <div className="flex justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Total Revenue</p>
//               <p className="text-2xl font-bold text-gray-800">${stats.revenue.total.toLocaleString()}</p>
//               <div className="mt-2 text-xs">
//                 <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
//                   ${stats.revenue.thisMonth.toLocaleString()} this month
//                 </span>
//               </div>
//             </div>
//             <div className="p-3 bg-yellow-100 rounded-full">
//               <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//           </div>
//           <Link to="/dashboard/reports" className="text-yellow-600 text-sm flex items-center mt-4">
//             View financial reports
//             <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//             </svg>
//           </Link>
//         </div>
//       </div>

//       {/* Recent Activity Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* Recent Users */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//             <h3 className="text-lg font-medium text-gray-900">Recent Users</h3>
//           </div>
//           {recentUsers.length > 0 ? (
//             <ul className="divide-y divide-gray-200">
//               {recentUsers.map(user => (
//                 <li key={user._id} className="px-6 py-4 hover:bg-gray-50">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
//                       <span className="text-gray-700 font-medium">{user.name ? user.name.charAt(0) : '?'}</span>
//                     </div>
//                     <div className="ml-4 flex-1">
//                       <div className="text-sm font-medium text-gray-900">{user.name}</div>
//                       <div className="text-sm text-gray-500">{user.email}</div>
//                     </div>
//                     <div>
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                         user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
//                         user.role === 'tutor' ? 'bg-green-100 text-green-800' : 
//                         'bg-blue-100 text-blue-800'
//                       }`}>
//                         {user.role}
//                       </span>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <div className="p-6 text-center text-gray-500">No users found</div>
//           )}
//           <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
//             <Link to="/dashboard/users" className="text-blue-600 hover:text-blue-900 text-sm font-medium">View all users</Link>
//           </div>
//         </div>

//         {/* Recent Courses */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//             <h3 className="text-lg font-medium text-gray-900">Recent Courses</h3>
//           </div>
//           {recentCourses.length > 0 ? (
//             <ul className="divide-y divide-gray-200">
//               {recentCourses.map(course => (
//                 <li key={course._id} className="px-6 py-4 hover:bg-gray-50">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0 h-10 w-16 bg-gray-200 rounded flex items-center justify-center">
//                       {course.coverImage ? (
//                         <img src={course.coverImage} alt={course.title} className="h-10 w-16 object-cover rounded" />
//                       ) : (
//                         <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                         </svg>
//                       )}
//                     </div>
//                     <div className="ml-4 flex-1">
//                       <div className="text-sm font-medium text-gray-900">{course.title}</div>
//                       <div className="text-sm text-gray-500">{course.category || 'Uncategorized'}</div>
//                     </div>
//                     <div className="flex flex-col items-end">
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                         course.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {course.isPublished ? 'Published' : 'Draft'}
//                       </span>
//                       <span className="text-gray-500 text-xs mt-1">
//                         {course.studentsCount || 0} students
//                       </span>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <div className="p-6 text-center text-gray-500">No courses found</div>
//           )}
//           <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
//             <Link to="/dashboard/courses" className="text-blue-600 hover:text-blue-900 text-sm font-medium">View all courses</Link>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-lg shadow p-6 mb-6">
//         <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <Link to="/dashboard/users" className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100">
//             <div className="p-2 rounded-md bg-blue-200 text-blue-600 mr-4">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//               </svg>
//             </div>
//             <div>
//               <h4 className="text-sm font-medium text-gray-900">Manage Users</h4>
//               <p className="text-xs text-gray-500">View, edit, and manage user accounts</p>
//             </div>
//           </Link>
          
//           <Link to="/dashboard/courses" className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100">
//             <div className="p-2 rounded-md bg-green-200 text-green-600 mr-4">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//               </svg>
//             </div>
//             <div>
//               <h4 className="text-sm font-medium text-gray-900">Manage Courses</h4>
//               <p className="text-xs text-gray-500">Review and manage course content</p>
//             </div>
//           </Link>
          
//           <Link to="/dashboard/reports" className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100">
//             <div className="p-2 rounded-md bg-purple-200 text-purple-600 mr-4">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//             </div>
//             <div>
//               <h4 className="text-sm font-medium text-gray-900">View Reports</h4>
//               <p className="text-xs text-gray-500">Access analytics and platform reports</p>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;