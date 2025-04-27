// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { api } from '../../services/api';

// const CoursesList = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     category: '',
//     grade: '',
//     search: ''
//   });

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get('/courses');
//         setCourses(response.data.data);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//         setError('Failed to load courses. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({
//       ...filters,
//       [name]: value
//     });
//   };

//   const filteredCourses = courses.filter(course => {
//     return (
//       (filters.category === '' || course.category === filters.category) &&
//       (filters.grade === '' || course.grade === filters.grade) &&
//       (filters.search === '' || 
//         course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
//         course.description.toLowerCase().includes(filters.search.toLowerCase()))
//     );
//   });

//   const categories = [
//     'Mathematics',
//     'Science',
//     'Social Studies',
//     'Language Arts',
//     'Computer Science',
//     'Arts',
//     'Physical Education',
//     'Other'
//   ];

//   const grades = [
//     '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
//   ];

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <div className="text-center">
//           <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
//           <p className="mt-2 text-gray-600">Loading courses...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//           <strong className="font-bold">Error!</strong>
//           <span className="block sm:inline"> {error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="mb-12">
//         <h1 className="text-3xl font-bold mb-6">Courses</h1>
        
//         {/* Filters */}
//         <div className="bg-gray-50 p-6 rounded-lg mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
//                 Search
//               </label>
//               <input
//                 type="text"
//                 id="search"
//                 name="search"
//                 value={filters.search}
//                 onChange={handleFilterChange}
//                 placeholder="Search courses..."
//                 className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//                 Category
//               </label>
//               <select
//                 id="category"
//                 name="category"
//                 value={filters.category}
//                 onChange={handleFilterChange}
//                 className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               >
//                 <option value="">All Categories</option>
//                 {categories.map((category) => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div>
//               <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
//                 Grade Level
//               </label>
//               <select
//                 id="grade"
//                 name="grade"
//                 value={filters.grade}
//                 onChange={handleFilterChange}
//                 className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               >
//                 <option value="">All Grades</option>
//                 {grades.map((grade) => (
//                   <option key={grade} value={grade}>Class {grade}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="flex items-end">
//               <button
//                 onClick={() => setFilters({ category: '', grade: '', search: '' })}
//                 className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Results count */}
//         <p className="text-gray-600 mb-6">
//           Showing {filteredCourses.length} of {courses.length} courses
//         </p>
        
//         {/* Course grid */}
//         {filteredCourses.length === 0 ? (
//           <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                   <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-yellow-700">
//                   No courses found matching your criteria. Please try adjusting your filters.
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {filteredCourses.map((course) => (
//               <div key={course._id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
//                 <img 
//                   src={course.thumbnail ? `http://localhost:5000${course.thumbnail}` : "https://via.placeholder.com/600x400?text=Course"} 
//                   alt={course.title} 
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-2">
//                     <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
//                       {course.category}
//                     </span>
//                     <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
//                       Class {course.grade}
//                     </span>
//                   </div>
//                   <h3 className="text-xl font-bold mt-2 mb-2">{course.title}</h3>
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  
//                   <div className="flex items-center mb-4">
//                     <div className="text-yellow-500 flex">
//                       {[...Array(5)].map((_, i) => (
//                         <svg 
//                           key={i} 
//                           className={`w-4 h-4 ${i < Math.floor(course.averageRating || 0) ? 'text-yellow-500' : 'text-gray-300'}`} 
//                           fill="currentColor" 
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       ))}
//                     </div>
//                     <span className="text-gray-600 text-sm ml-1">
//                       ({course.averageRating ? course.averageRating.toFixed(1) : '0.0'})
//                     </span>
//                     <span className="text-gray-500 text-sm ml-3">
//                       {course.enrolledStudents.length} student{course.enrolledStudents.length !== 1 ? 's' : ''}
//                     </span>
//                   </div>
                  
//                   <div className="flex justify-between items-center">
//                     <span className="font-bold text-lg">₹{course.price}</span>
//                     <Link 
//                       to={`/courses/${course._id}`} 
//                       className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CoursesList;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [filters, setFilters] = useState({
    category: '',
    grade: '',
    priceRange: ''
  });

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        let url = '/courses';
        const queryParams = [];

        if (filters.category) {
          queryParams.push(`category=${filters.category}`);
        }
        if (filters.grade) {
          queryParams.push(`grade=${filters.grade}`);
        }
        if (filters.priceRange) {
          const [min, max] = filters.priceRange.split('-');
          if (min) queryParams.push(`minPrice=${min}`);
          if (max) queryParams.push(`maxPrice=${max}`);
        }
        if (searchQuery) {
          queryParams.push(`search=${searchQuery}`);
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join('&')}`;
        }

        const response = await api.get(url);
        setCourses(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [filters, searchQuery]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // The useEffect will trigger the API call with the updated searchQuery
  };

  const categories = [
    'All',
    'Mathematics',
    'Science',
    'Social Studies',
    'Language Arts',
    'Computer Science',
    'Arts',
    'Physical Education'
  ];

  const grades = [
    'All',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12'
  ];

  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Under ₹500', value: '0-500' },
    { label: '₹500 - ₹1000', value: '500-1000' },
    { label: '₹1000 - ₹2000', value: '1000-2000' },
    { label: 'Over ₹2000', value: '2000-' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Browse Courses</h1>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              placeholder="Search for courses..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category === 'All' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade Level
                </label>
                <select
                  name="grade"
                  value={filters.grade}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {grades.map((grade, index) => (
                    <option key={index} value={grade === 'All' ? '' : grade}>
                      {grade === 'All' ? 'All Grades' : `Grade ${grade}`}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {priceRanges.map((range, index) => (
                    <option key={index} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Course List */}
          <div className="md:w-3/4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 text-red-800 p-4 rounded-md">{error}</div>
            ) : courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                    <img
                      src={course.thumbnail || 'https://via.placeholder.com/600x400?text=Course+Image'}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold">{course.title}</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          Grade {course.grade}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-bold text-blue-600">₹{course.price}</p>
                        <Link
                          to={`/courses/${course._id}`}
                          className="text-blue-600 font-medium hover:text-blue-800"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search query to find courses.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesList;