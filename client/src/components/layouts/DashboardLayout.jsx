// import React, { useState } from 'react';
// import { Outlet, Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../contexts/AuthContext';

// const DashboardLayout = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   // Different sidebar links based on user role
//   const sidebarLinks = () => {
//     if (user.role === 'student') {
//       return [
//         { name: 'Dashboard', path: '/dashboard' },
//         { name: 'My Courses', path: '/dashboard/my-courses' },
//         { name: 'Assignments', path: '/dashboard/assignments' },
//         { name: 'Grades', path: '/dashboard/grades' },
//         { name: 'Profile', path: '/dashboard/profile' },
//       ];
//     } else if (user.role === 'tutor') {
//       return [
//         { name: 'Dashboard', path: '/dashboard' },
//         { name: 'My Courses', path: '/dashboard/my-courses' },
//         { name: 'Create Course', path: '/dashboard/create-course' },
//         { name: 'Assignments', path: '/dashboard/assignments' },
//         { name: 'Students', path: '/dashboard/students' },
//         { name: 'Profile', path: '/dashboard/profile' },
//       ];
//     } else if (user.role === 'admin') {
//       return [
//         { name: 'Dashboard', path: '/dashboard' },
//         { name: 'Users', path: '/dashboard/users' },
//         { name: 'Courses', path: '/dashboard/courses' },
//         { name: 'Reports', path: '/dashboard/reports' },
//         { name: 'Profile', path: '/dashboard/profile' },
//       ];
//     }
//     return [];
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Mobile sidebar overlay */}
//       <div
//         className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${
//           sidebarOpen ? 'block' : 'hidden'
//         }`}
//         onClick={() => setSidebarOpen(false)}
//       ></div>

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-white border-r lg:translate-x-0 lg:static lg:inset-0 ${
//           sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
//         }`}
//       >
//         <div className="flex items-center justify-center mt-8">
//           <div className="flex items-center">
//             <span className="mx-2 text-xl font-semibold text-gray-800">LMS Dashboard</span>
//           </div>
//         </div>

//         <nav className="mt-10">
//           {sidebarLinks().map((link, index) => (
//             <Link
//               key={index}
//               className="flex items-center px-6 py-2 mt-4 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//               to={link.path}
//               onClick={() => setSidebarOpen(false)}
//             >
//               <span className="mx-3">{link.name}</span>
//             </Link>
//           ))}
//           <button
//             onClick={handleLogout}
//             className="flex items-center px-6 py-2 mt-4 text-gray-600 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
//           >
//             <span className="mx-3">Logout</span>
//           </button>
//         </nav>
//       </div>

//       {/* Content area */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
//           <div className="flex items-center">
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="text-gray-500 focus:outline-none lg:hidden"
//             >
//               <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </button>
//           </div>
          
//           <div className="flex items-center">
//             <div className="relative">
//               <span className="text-gray-700">Welcome, {user?.name}</span>
//             </div>
//           </div>
//         </header>
        
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [greeting, setGreeting] = useState('');

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Different sidebar links based on user role
  const sidebarLinks = () => {
    if (user.role === 'student') {
      return [
        { name: 'Dashboard', path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'My Courses', path: '/dashboard/my-courses', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
        { name: 'Assignments', path: '/dashboard/assignments', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
        { name: 'Grades', path: '/dashboard/grades', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { name: 'Profile', path: '/dashboard/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
      ];
    } else if (user.role === 'tutor') {
      return [
        { name: 'Dashboard', path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'My Courses', path: '/dashboard/my-courses', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
        { name: 'Create Course', path: '/dashboard/create-course', icon: 'M12 4v16m8-8H4' },
        { name: 'Assignments', path: '/dashboard/assignment', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
        { name: 'Students', path: '/dashboard/students', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { name: 'Profile', path: '/dashboard/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
      ];
    } // Within the sidebarLinks function, replace the tutor section with this:
    else if (user.role === 'tutor') {
      return [
        { 
          name: 'Dashboard', 
          path: '/dashboard', 
          icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
        },
        { 
          name: 'My Courses', 
          path: '/dashboard/my-courses', 
          icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' 
        },
        { 
          name: 'Course Manager', 
          path: '/dashboard/course-manager', 
          icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' 
        },
        { 
          name: 'Assignment Manager', 
          path: '/dashboard/assignment-manager', 
          icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' 
        },
        { 
          name: 'Quiz Manager', 
          path: '/dashboard/quiz-manager', 
          icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' 
        },
        { 
          name: 'Students', 
          path: '/dashboard/students', 
          icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' 
        },
        { 
          name: 'Analytics', 
          path: '/dashboard/courses/analytics', 
          icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' 
        },
        { 
          name: 'Profile', 
          path: '/dashboard/profile', 
          icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' 
        },
      ];
    }
    // else if (user.role === 'tutor') {
    //   return [
    //     { 
    //       name: 'Dashboard', 
    //       path: '/dashboard', 
    //       icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
    //     },
    //     { 
    //       name: 'My Courses', 
    //       path: '/dashboard/my-courses', 
    //       icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' 
    //     },
    //     { 
    //       name: 'Course Manager', 
    //       path: '/dashboard/course-manager', 
    //       icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' 
    //     },
    //     { 
    //       name: 'Assignment Manager', 
    //       path: '/dashboard/assignment-manager', 
    //       icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' 
    //     },
    //     { 
    //       name: 'Quiz Manager', 
    //       path: '/dashboard/quiz-manager', 
    //       icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' 
    //     },
    //     { 
    //       name: 'Students', 
    //       path: '/dashboard/students', 
    //       icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' 
    //     },
    //     { 
    //       name: 'Analytics', 
    //       path: '/dashboard/courses/analytics', 
    //       icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' 
    //     },
    //     { 
    //       name: 'Profile', 
    //       path: '/dashboard/profile', 
    //       icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' 
    //     },
    //   ];
    // }
    return [];
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-white shadow-lg lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        }`}
      >
        <div className="flex items-center justify-center p-6 border-b">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="mx-2 text-xl font-bold text-gray-800">EduLearn</span>
          </div>
        </div>

        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {sidebarLinks().map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={index}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                >
                  <svg 
                    className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon} />
                  </svg>
                  {link.name}
                </Link>
              );
            })}
          </div>
          
          <div className="pt-6 mt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 transition-colors rounded-lg hover:bg-gray-100 hover:text-gray-900"
            >
              <svg className="w-5 h-5 mr-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 focus:outline-none lg:hidden"
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-800 lg:ml-3">
              {sidebarLinks().find(link => link.path === location.pathname)?.name || 'Dashboard'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex">
              <div className="relative">
                <input
                  className="w-full px-4 py-2 pl-10 text-sm bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-300"
                  type="text"
                  placeholder="Search..."
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <button className="p-1 text-gray-500 rounded-full hover:text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            <div className="relative flex items-center">
              <div className="flex-shrink-0 rounded-full p-1 bg-blue-100 text-blue-500 font-semibold h-8 w-8 flex items-center justify-center">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                {user?.name}
              </span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container px-6 py-8 mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                {greeting}, {user?.name?.split(' ')[0]}!
              </h3>
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
            
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;