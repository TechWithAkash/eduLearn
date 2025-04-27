// //Header.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//     setIsMenuOpen(false);
//   };

//   return (
//     <header className="bg-white shadow">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex">
//             <div className="flex-shrink-0 flex items-center">
//               <Link to="/" className="text-2xl font-bold text-blue-600">LMS Portal</Link>
//             </div>
//             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//               <Link to="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                 Home
//               </Link>
//               <Link to="/courses" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                 Courses
//               </Link>
//               <Link to="/about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                 About
//               </Link>
//             </div>
//           </div>
          
//           <div className="hidden sm:ml-6 sm:flex sm:items-center">
//             {user ? (
//               <div className="ml-3 relative">
//                 <div>
//                   <button 
//                     onClick={() => setIsMenuOpen(!isMenuOpen)}
//                     className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                   >
//                     <span className="sr-only">Open user menu</span>
//                     <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
//                       {user.name.charAt(0).toUpperCase()}
//                     </div>
//                   </button>
//                 </div>
//                 {isMenuOpen && (
//                   <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
//                     <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
//                       Dashboard
//                     </Link>
//                     <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
//                       Profile
//                     </Link>
//                     <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                       Sign out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex space-x-4">
//                 <Link to="/login" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
//                   Login
//                 </Link>
//                 <Link to="/register" className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
//                   Register
//                 </Link>
//               </div>
//             )}
//           </div>
          
//           <div className="-mr-2 flex items-center sm:hidden">
//             <button 
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//             >
//               <span className="sr-only">Open main menu</span>
//               {isMenuOpen ? (
//                 <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="sm:hidden">
//           <div className="pt-2 pb-3 space-y-1">
//             <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" onClick={() => setIsMenuOpen(false)}>
//               Home
//             </Link>
//             <Link to="/courses" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" onClick={() => setIsMenuOpen(false)}>
//               Courses
//             </Link>
//             <Link to="/about" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" onClick={() => setIsMenuOpen(false)}>
//               About
//             </Link>
//           </div>
          
//           {user ? (
//             <div className="pt-4 pb-3 border-t border-gray-200">
//               <div className="flex items-center px-4">
//                 <div className="flex-shrink-0">
//                   <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center">
//                     {user.name.charAt(0).toUpperCase()}
//                   </div>
//                 </div>
//                 <div className="ml-3">
//                   <div className="text-base font-medium text-gray-800">{user.name}</div>
//                   <div className="text-sm font-medium text-gray-500">{user.email}</div>
//                 </div>
//               </div>
//               <div className="mt-3 space-y-1">
//                 <Link to="/dashboard" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
//                   Dashboard
//                 </Link>
//                 <Link to="/dashboard/profile" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
//                   Profile
//                 </Link>
//                 <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
//                   Sign out
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="pt-4 pb-3 border-t border-gray-200">
//               <div className="flex items-center justify-around">
//                 <Link to="/login" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
//                   Login
//                 </Link>
//                 <Link to="/register" className="block px-4 py-2 text-base font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={() => setIsMenuOpen(false)}>
//                   Register
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`${isScrolled ? 'bg-white shadow-md' : 'bg-white/95'} fixed top-0 w-full z-50 transition-all duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex-shrink-0 mr-2">
                <svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L4 8L12 12L20 8L12 4Z" fill="currentColor" />
                  <path d="M4 12L12 16L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 16L12 20L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">LMS Portal</span>
            </Link>
            
            <nav className="hidden md:ml-8 md:flex md:space-x-6">
              <Link 
                to="/" 
                className={`px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/') 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/courses" 
                className={`px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/courses') 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Courses
              </Link>
              <Link 
                to="/about" 
                className={`px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/about') 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                About
              </Link>
            </nav>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-3 bg-white rounded-full p-1 hover:bg-gray-50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 pr-2">{user.name.split(' ')[0]}</span>
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 transform transition-all origin-top-right">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs font-medium text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition duration-150">
                      Dashboard
                    </Link>
                    <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition duration-150">
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-150"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150">
                  Login
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-indigo-700 shadow-sm transition duration-150">
                  Register
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition duration-150"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <nav className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/courses') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              Courses
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/about') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              About
            </Link>
          </nav>
          
          {user ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500 truncate">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600">
                  Dashboard
                </Link>
                <Link to="/dashboard/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600">
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center justify-around px-4 py-2">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-md text-base font-medium w-1/2 text-center">
                  Login
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-md text-base font-medium hover:from-blue-700 hover:to-indigo-700 shadow-sm w-1/2 text-center">
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;