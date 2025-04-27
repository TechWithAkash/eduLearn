
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { api } from '../../services/api';

// const Home = () => {
//   const [featuredCourses, setFeaturedCourses] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchFeaturedCourses = async () => {
//       try {
//         const response = await api.get('/courses?limit=3');
//         setFeaturedCourses(response.data.data);
//       } catch (error) {
//         console.error('Error fetching featured courses:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchFeaturedCourses();
//   }, []);

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
//         <div className="container mx-auto px-6 py-20 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-6">
//             Start Your Learning Journey Today
//           </h1>
//           <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
//             Access quality education for classes 1-12 with our comprehensive learning management system.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               to="/courses"
//               className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition duration-300"
//             >
//               Explore Courses
//             </Link>
//             <Link
//               to="/register"
//               className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-blue-600 transition duration-300"
//             >
//               Sign Up Now
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Featured Courses Section */}
//       <section className="py-16 px-6 bg-gray-50">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {featuredCourses.map((course) => (
//                 <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
//                   <img
//                     src={course.thumbnail || 'https://via.placeholder.com/600x400?text=Course+Image'}
//                     alt={course.title}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-6">
//                     <div className="flex justify-between items-start mb-4">
//                       <h3 className="text-xl font-semibold">{course.title}</h3>
//                       <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
//                         Grade {course.grade}
//                       </span>
//                     </div>
//                     <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
//                     <div className="flex justify-between items-center">
//                       <p className="text-lg font-bold text-blue-600">₹{course.price}</p>
//                       <Link
//                         to={`/courses/${course._id}`}
//                         className="text-blue-600 font-medium hover:text-blue-800"
//                       >
//                         View Details →
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           <div className="text-center mt-12">
//             <Link
//               to="/courses"
//               className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
//             >
//               View All Courses
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 px-6">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center p-6 bg-white rounded-lg shadow-md">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Comprehensive Curriculum</h3>
//               <p className="text-gray-600">
//                 Curriculum aligned with national education standards for grades 1-12.
//               </p>
//             </div>
//             <div className="text-center p-6 bg-white rounded-lg shadow-md">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
//               <p className="text-gray-600">
//                 Engage with tutors and peers through discussions, quizzes, and assignments.
//               </p>
//             </div>
//             <div className="text-center p-6 bg-white rounded-lg shadow-md">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
//               <p className="text-gray-600">
//                 Monitor your learning journey with detailed progress analytics and reports.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-16 px-6 bg-gray-50">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center mb-4">
//                 <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center mr-4">
//                   <span className="text-blue-700 font-bold">RS</span>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">Rahul Sharma</h4>
//                   <p className="text-gray-600 text-sm">Class 10 Student</p>
//                 </div>
//               </div>
//               <p className="text-gray-600">
//                 "The interactive lessons and study materials helped me improve my grades significantly. 
//                 The tutors are very supportive and always available to clear doubts."
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center mb-4">
//                 <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center mr-4">
//                   <span className="text-blue-700 font-bold">AP</span>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">Ananya Patel</h4>
//                   <p className="text-gray-600 text-sm">Class 8 Student</p>
//                 </div>
//               </div>
//               <p className="text-gray-600">
//                 "I used to struggle with Mathematics, but the step-by-step video lessons and practice 
//                 quizzes made it much easier to understand complex concepts."
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center mb-4">
//                 <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center mr-4">
//                   <span className="text-blue-700 font-bold">VK</span>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">Vikram Kumar</h4>
//                   <p className="text-gray-600 text-sm">Parent</p>
//                 </div>
//               </div>
//               <p className="text-gray-600">
//                 "As a parent, I appreciate the detailed progress reports that help me track my child's learning. 
//                 The platform has been a great investment in my child's education."
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-blue-600 text-white py-16 px-6">
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
//           <p className="text-xl mb-8 max-w-3xl mx-auto">
//             Join thousands of students who are already experiencing the benefits of our platform.
//           </p>
//           <Link
//             to="/register"
//             className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition duration-300 text-lg"
//           >
//             Get Started Today
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { api } from '../../services/api';
// import { motion } from 'framer-motion';

// const Home = () => {
//   const [featuredCourses, setFeaturedCourses] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [testimonialIndex, setTestimonialIndex] = useState(0);

//   const testimonials = [
//     {
//       id: 1,
//       initials: "RS",
//       name: "Rahul Sharma",
//       role: "Class 10 Student",
//       text: "The interactive lessons and study materials helped me improve my grades significantly. The tutors are very supportive and always available to clear doubts."
//     },
//     {
//       id: 2,
//       initials: "AP",
//       name: "Ananya Patel",
//       role: "Class 8 Student",
//       text: "I used to struggle with Mathematics, but the step-by-step video lessons and practice quizzes made it much easier to understand complex concepts."
//     },
//     {
//       id: 3,
//       initials: "VK",
//       name: "Vikram Kumar",
//       role: "Parent",
//       text: "As a parent, I appreciate the detailed progress reports that help me track my child's learning. The platform has been a great investment in my child's education."
//     },
//     {
//       id: 4,
//       initials: "SJ",
//       name: "Shreya Joshi",
//       role: "Class 12 Student",
//       text: "The preparation material for competitive exams is exceptional. I've seen significant improvement in my mock test scores since joining."
//     }
//   ];

//   useEffect(() => {
//     const fetchFeaturedCourses = async () => {
//       try {
//         const response = await api.get('/courses?limit=3');
//         setFeaturedCourses(response.data.data);
//       } catch (error) {
//         console.error('Error fetching featured courses:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchFeaturedCourses();

//     // Auto-rotate testimonials
//     const interval = setInterval(() => {
//       setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.6 }
//     }
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2
//       }
//     }
//   };

//   return (
//     <div className="overflow-hidden">
//       {/* Hero Section with Animated Background and Modern Design */}
//       <section className="relative bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-800 overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-black opacity-20"></div>
//           <div className="absolute -bottom-8 left-0 right-0">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-white">
//               <path fill="currentColor" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,197.3C672,213,768,203,864,186.7C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
//             </svg>
//           </div>
//         </div>

//         <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
//           <div className="flex flex-col lg:flex-row items-center justify-between">
//             <motion.div 
//               className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <motion.h1 
//                 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2, duration: 0.8 }}
//               >
//                 Elevate Your Learning Journey
//               </motion.h1>
//               <motion.p 
//                 className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed max-w-xl mx-auto lg:mx-0"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4, duration: 0.8 }}
//               >
//                 Premium education for grades 1-12 with interactive lessons, expert tutors, and personalized learning paths.
//               </motion.p>
//               <motion.div 
//                 className="flex flex-wrap gap-4 justify-center lg:justify-start"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6, duration: 0.8 }}
//               >
//                 <Link
//                   to="/courses"
//                   className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition duration-300 shadow-lg transform hover:-translate-y-1 inline-block"
//                 >
//                   Explore Courses
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-700 transition duration-300 shadow-lg transform hover:-translate-y-1 inline-block"
//                 >
//                   Sign Up Free
//                 </Link>
//               </motion.div>
              
//               <motion.div 
//                 className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.8, duration: 0.8 }}
//               >
//                 <div className="flex items-center">
//                   <span className="text-yellow-300 mr-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   </span>
//                   <span className="text-white">4.9/5 rating</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="text-white mr-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//                     </svg>
//                   </span>
//                   <span className="text-white">30-day free trial</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="text-white mr-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
//                     </svg>
//                   </span>
//                   <span className="text-white">10,000+ students</span>
//                 </div>
//               </motion.div>
//             </motion.div>
            
//             <motion.div 
//               className="lg:w-1/2 mt-8 lg:mt-0 relative"
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <div className="relative h-96 w-full max-w-md mx-auto">
//                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl shadow-2xl transform rotate-3"></div>
//                 <div className="absolute inset-0 bg-white rounded-2xl shadow-xl transform -rotate-3 overflow-hidden flex items-center justify-center">
//                   <img 
//                 src="/student-learning.jpg" 
//                     alt="Student learning online" 
//                     className="object-cover w-full h-full"
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-12 bg-white">
//         <div className="container mx-auto px-6">
//           <motion.div 
//             className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//           >
//             <motion.div variants={fadeInUp} className="p-4">
//               <h3 className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">500+</h3>
//               <p className="text-gray-600 font-medium">Courses</p>
//             </motion.div>
//             <motion.div variants={fadeInUp} className="p-4">
//               <h3 className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">100+</h3>
//               <p className="text-gray-600 font-medium">Expert Tutors</p>
//             </motion.div>
//             <motion.div variants={fadeInUp} className="p-4">
//               <h3 className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">10K+</h3>
//               <p className="text-gray-600 font-medium">Students</p>
//             </motion.div>
//             <motion.div variants={fadeInUp} className="p-4">
//               <h3 className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">95%</h3>
//               <p className="text-gray-600 font-medium">Success Rate</p>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Featured Courses Section with Card Animation */}
//       <section className="py-20 px-6 bg-gray-50">
//         <div className="container mx-auto">
//           <motion.div 
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
//             <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Discover our top-rated courses designed to help students excel in their academic journey
//             </p>
//           </motion.div>

//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
//             </div>
//           ) : (
//             <motion.div 
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//               variants={staggerContainer}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.1 }}
//             >
//               {featuredCourses.map((course, index) => (
//                 <motion.div 
//                   key={course._id} 
//                   className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
//                   variants={fadeInUp}
//                 >
//                   <div className="relative overflow-hidden h-56">
//                     <img
//                       src={course.thumbnail || '/api/placeholder/600/400'}
//                       alt={course.title}
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
//                       <div className="p-4 w-full">
//                         <Link
//                           to={`/courses/${course._id}`}
//                           className="inline-block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//                         >
//                           View Details
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <div className="flex justify-between items-start mb-2">
//                       <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
//                         Grade {course.grade}
//                       </span>
//                       <div className="flex items-center">
//                         <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                         <span className="ml-1 text-gray-600 text-sm">4.8</span>
//                       </div>
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
//                     <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    
//                     <div className="flex justify-between items-center pt-3 border-t border-gray-100">
//                       <p className="text-xl font-bold text-blue-600">₹{course.price}</p>
//                       <div className="flex items-center text-sm text-gray-500">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         8 weeks
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
          
//           <motion.div 
//             className="text-center mt-12"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             viewport={{ once: true }}
//           >
//             <Link
//               to="/courses"
//               className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 inline-flex items-center shadow-lg"
//             >
//               View All Courses
//               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
//               </svg>
//             </Link>
//           </motion.div>
//         </div>
//       </section>

//       {/* Features Section with Modern UI */}
//       <section className="py-20 px-6 bg-white overflow-hidden">
//         <div className="container mx-auto">
//           <motion.div 
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Students Love Us</h2>
//             <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Our platform is designed with student success in mind, focusing on engagement, accessibility, and results
//             </p>
//           </motion.div>

//           <motion.div 
//             className="grid grid-cols-1 md:grid-cols-3 gap-12"
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.1 }}
//           >
//             <motion.div variants={fadeInUp} className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
//               <div className="absolute top-0 right-0 -mt-6 -mr-6">
//                 <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                   </svg>
//                 </div>
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 mb-4">Comprehensive Curriculum</h3>
//               <p className="text-gray-600 mb-6">
//                 Our curriculum is aligned with national education standards and covers all subjects for grades 1-12 with in-depth lessons and resources.
//               </p>
//               <ul className="space-y-2">
//                 {['NCERT Aligned', 'Expert-designed', 'Regular updates'].map((item, i) => (
//                   <li key={i} className="flex items-center text-gray-600">
//                     <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
            
//             <motion.div variants={fadeInUp} className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
//               <div className="absolute top-0 right-0 -mt-6 -mr-6">
//                 <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                   </svg>
//                 </div>
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 mb-4">Interactive Learning</h3>
//               <p className="text-gray-600 mb-6">
//                 Engage with interactive content, participate in discussions, take quizzes, and complete assignments to reinforce your learning.
//               </p>
//               <ul className="space-y-2">
//                 {['Live sessions', 'Interactive quizzes', 'Peer discussions'].map((item, i) => (
//                   <li key={i} className="flex items-center text-gray-600">
//                     <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
            
//             <motion.div variants={fadeInUp} className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
//               <div className="absolute top-0 right-0 -mt-6 -mr-6">
//                 <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                   </svg>
//                 </div>
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 mb-4">Progress Tracking</h3>
//               <p className="text-gray-600 mb-6">
//                 Monitor your learning journey with detailed analytics, performance metrics, and personalized progress reports.
//               </p>
//               <ul className="space-y-2">
//                 {['Detailed analytics', 'Performance insights', 'Goal tracking'].map((item, i) => (
//                   <li key={i} className="flex items-center text-gray-600">
//                     <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Animated Testimonials Section */}
//       <section className="py-20 px-6 bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-900 relative overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-blue-600 opacity-10"></div>
//           <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white to-transparent opacity-5"></div>
//         </div>
        
//         <div className="container mx-auto relative z-10">
//           <motion.div 
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Students Say</h2>
//             <div className="w-24 h-1 bg-blue-400 mx-auto mb-4"></div>
//             <p className="text-xl text-blue-100 max-w-2xl mx-auto">
//               Join thousands of satisfied students who have transformed their learning experience
//             </p>
//           </motion.div>

//           <div className="max-w-4xl mx-auto">
//             <div className="relative">
//               <motion.div 
//                 className="bg-white rounded-2xl p-8 shadow-xl"
//                 key={testimonialIndex}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <div className="flex flex-col md:flex-row items-center mb-6">
//                   <div className="mb-4 md:mb-0 md:mr-6">
//                     <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
//                       <span className="text-blue-700 font-bold text-xl">{testimonials[testimonialIndex].initials}</span>
//                     </div>
//                   </div>
//                   <div className="text-center md:text-left">
//                     <h4 className="font-bold text-xl text-gray-800">{testimonials[testimonialIndex].name}</h4>
//                     <p className="text-blue-600">{testimonials[testimonialIndex].role}</p>
//                   </div>
//                   <div className="hidden md:flex ml-auto">
//                   <svg className="w-12 h-12 text-blue-100" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M10 8c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zm20 2c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zM12 24c0-2.209 1.791-4 4-4s4 1.791 4 4v4H12v-4zm-6-14c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zm2 14c0-1.657.672-3.157 1.757-4.243C8.843 18.772 7.895 18 6.5 18c-2.761 0-5 2.239-5 5v3h6v-2zm18-4.243c1.085 1.086 1.757 2.586 1.757 4.243v2h6v-3c0-2.761-2.239-5-5-5-1.395 0-2.343.772-3.243 1.757 1.085 1.086 1.757 2.586 1.757 4.243v2h6v-3c0-2.761-2.239-5-5-5-1.395 0-2.343.772-3.243 1.757z" />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="relative">
//                   <svg className="w-10 h-10 text-blue-100 absolute -top-6 -left-6" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
//                   </svg>
//                   <p className="text-gray-700 text-lg leading-relaxed">{testimonials[testimonialIndex].text}</p>
//                 </div>
//               </motion.div>
              
//               <div className="flex justify-center mt-8">
//                 {testimonials.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setTestimonialIndex(index)}
//                     className={`h-3 w-3 rounded-full mx-1 focus:outline-none transition-colors duration-300 ${
//                       index === testimonialIndex ? 'bg-white' : 'bg-blue-200 bg-opacity-40'
//                     }`}
//                     aria-label={`Go to testimonial ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action Section */}
//       <section className="py-20 px-6 bg-gradient-to-r from-blue-700 to-indigo-800 relative overflow-hidden">
//         <div className="absolute top-0 left-0 w-full">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-white opacity-5">
//             <path fill="currentColor" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
//           </svg>
//         </div>
        
//         <div className="container mx-auto relative z-10">
//           <motion.div 
//             className="max-w-3xl mx-auto text-center"
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
//               Ready to Transform Your Learning Experience?
//             </h2>
//             <p className="text-xl text-blue-100 mb-10 leading-relaxed">
//               Join thousands of students who are already benefiting from our platform. 
//               Start your journey to academic excellence today!
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 to="/register"
//                 className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition duration-300 shadow-lg transform hover:-translate-y-1"
//               >
//                 Start Free Trial
//               </Link>
//               <Link
//                 to="/contact"
//                 className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-700 transition duration-300 shadow-lg transform hover:-translate-y-1"
//               >
//                 Contact Sales
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Tutors Section */}
//       <section className="py-20 px-6 bg-white">
//         <div className="container mx-auto">
//           <motion.div 
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Expert Tutors</h2>
//             <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Learn from experienced educators passionate about helping students achieve their academic goals
//             </p>
//           </motion.div>

//           <motion.div 
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.1 }}
//           >
//             {[
//               { name: "Dr. Priya Verma", subject: "Mathematics", years: 12, image: "/api/placeholder/300/300" },
//               { name: "Prof. Amit Kapoor", subject: "Physics & Chemistry", years: 15, image: "/api/placeholder/300/300" },
//               { name: "Ms. Deepika Patel", subject: "English Literature", years: 8, image: "/api/placeholder/300/300" },
//               { name: "Mr. Rajiv Mehta", subject: "Computer Science", years: 10, image: "/api/placeholder/300/300" }
//             ].map((tutor, index) => (
//               <motion.div 
//                 key={index} 
//                 variants={fadeInUp}
//                 className="bg-gray-50 rounded-xl p-6 text-center group hover:shadow-xl transition-all duration-300"
//               >
//                 <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
//                   <img 
//                     src={tutor.image} 
//                     alt={tutor.name} 
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-blue-600 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                     <div className="flex space-x-2">
//                       <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors duration-300">
//                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
//                         </svg>
//                       </a>
//                       <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors duration-300">
//                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
//                         </svg>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800">{tutor.name}</h3>
//                 <p className="text-blue-600 mb-2">{tutor.subject}</p>
//                 <p className="text-gray-600 text-sm">{tutor.years} Years Experience</p>
//                 <Link
//                   to="/tutors"
//                   className="mt-4 text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
//                 >
//                   View Profile
//                   <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
//                   </svg>
//                 </Link>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-20 px-6 bg-gray-50">
//         <div className="container mx-auto">
//           <motion.div 
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
//             <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Find answers to common questions about our platform, courses, and teaching methodology
//             </p>
//           </motion.div>

//           <div className="max-w-3xl mx-auto">
//             <motion.div 
//               className="space-y-6"
//               variants={staggerContainer}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.1 }}
//             >
//               {[
//                 {
//                   question: "How do online classes work?",
//                   answer: "Our online classes combine live sessions with recorded lessons, interactive quizzes, and assignments. Students can attend scheduled live classes or watch recordings at their convenience. All materials are accessible through our user-friendly learning platform."
//                 },
//                 {
//                   question: "Are the tutors qualified?",
//                   answer: "Absolutely! All our tutors are highly qualified with relevant degrees and extensive teaching experience. They undergo a rigorous selection process and regular training to ensure they provide the highest quality education."
//                 },
//                 {
//                   question: "How can parents track their child's progress?",
//                   answer: "Parents receive regular progress reports and have access to a dedicated parent dashboard. This shows attendance records, assignment completion status, quiz scores, and tutor feedback, providing full visibility into your child's learning journey."
//                 },
//                 {
//                   question: "Do you provide preparation for competitive exams?",
//                   answer: "Yes, we offer specialized courses for various competitive exams including olympiads, NTSE, JEE, NEET, and more. These courses include exam-specific curriculum, practice tests, and personalized guidance from expert coaches."
//                 },
//                 {
//                   question: "What if my child needs extra help?",
//                   answer: "We offer one-on-one doubt clearing sessions where students can schedule time with tutors to address specific challenges. Additionally, our community forums allow students to ask questions and receive help from both tutors and peers."
//                 }
//               ].map((faq, index) => (
//                 <motion.div 
//                   key={index} 
//                   className="bg-white rounded-xl shadow-md overflow-hidden"
//                   variants={fadeInUp}
//                 >
//                   <details className="group">
//                     <summary className="flex items-center justify-between px-6 py-4 cursor-pointer">
//                       <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
//                       <span className="ml-4 flex-shrink-0 text-blue-600 group-open:rotate-180 transition-transform duration-300">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </span>
//                     </summary>
//                     <div className="px-6 py-4 border-t border-gray-100">
//                       <p className="text-gray-600">{faq.answer}</p>
//                     </div>
//                   </details>
//                 </motion.div>
//               ))}
//             </motion.div>
            
//             <motion.div 
//               className="text-center mt-12"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               viewport={{ once: true }}
//             >
//               <p className="text-gray-600 mb-4">Still have questions?</p>
//               <Link
//                 to="/contact"
//                 className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 inline-flex items-center"
//               >
//                 Contact our support team
//                 <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                 </svg>
//               </Link>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Mobile App Section */}
//       <section className="py-20 px-6 bg-blue-50 overflow-hidden">
//         <div className="container mx-auto">
//           <div className="flex flex-col lg:flex-row items-center">
//             <motion.div 
//               className="lg:w-1/2 mb-12 lg:mb-0 relative"
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//             >
//               <div className="relative max-w-md mx-auto">
//                 <div className="absolute inset-0 bg-blue-200 rounded-full filter blur-3xl opacity-30 transform -rotate-6"></div>
//                 <img 
//                   src="/student123.png" 
//                   alt="Educational Mobile App" 
//                   className="relative z-10 mx-auto"
//                 />
//               </div>
//             </motion.div>
            
//             <motion.div 
//               className="lg:w-1/2 lg:pl-16"
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Learn Anytime, Anywhere</h2>
//               <p className="text-xl text-gray-600 mb-8">
//                 Download our mobile app to access all your courses, practice exercises, and study materials on the go.
//               </p>
              
//               <div className="space-y-6 mb-8">
//                 {[
//                   {
//                     title: "Offline Access",
//                     desc: "Download lessons for offline viewing when you don't have internet access"
//                   },
//                   {
//                     title: "Real-time Notifications",
//                     desc: "Get timely updates about assignments, live classes, and new content"
//                   },
//                   {
//                     title: "Interactive Practice",
//                     desc: "Practice with interactive quizzes and flashcards for better retention"
//                   }
//                 ].map((feature, index) => (
//                   <div key={index} className="flex">
//                     <div className="flex-shrink-0 mt-1">
//                       <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white">
//                         <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                         </svg>
//                       </div>
//                     </div>
//                     <div className="ml-4">
//                       <h3 className="text-lg font-medium text-gray-800">{feature.title}</h3>
//                       <p className="mt-1 text-gray-600">{feature.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="flex flex-wrap gap-4">
//                 <a href="#" className="inline-block">
//                   <img src="/api/placeholder/200/60" alt="Download on App Store" className="h-14" />
//                 </a>
//                 <a href="#" className="inline-block">
//                   <img src="/api/placeholder/200/60" alt="Get it on Google Play" className="h-14" />
//                 </a>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Newsletter Section */}
//       <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-black opacity-10"></div>
//         </div>
        
//         <div className="container mx-auto relative z-10">
//           <motion.div 
//             className="max-w-xl mx-auto text-center"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Stay Updated</h2>
//             <p className="text-xl text-blue-100 mb-8">
//               Subscribe to our newsletter for educational tips, exclusive offers, and updates on new courses
//             </p>
            
//             <form className="flex flex-col sm:flex-row gap-2">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//               />
//               <button
//                 type="submit"
//                 className="bg-indigo-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-800 transition duration-300 shadow-lg"
//               >
//                 Subscribe
//               </button>
//             </form>
//             <p className="mt-4 text-sm text-blue-100">
//               We respect your privacy. Unsubscribe at any time.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white pt-16 pb-8 px-6">
//         <div className="container mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
//             <div>
//               <h3 className="text-2xl font-bold mb-6">EduLearn</h3>
//               <p className="text-gray-400 mb-6">
//                 Empowering students with quality education and personalized learning experiences to achieve academic excellence.
//               </p>
//               <div className="flex space-x-4">
//                 {['facebook', 'twitter', 'instagram', 'youtube'].map((social, i) => (
//                   <a 
//                     key={i}
//                     href="#"
//                     className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
//                   >
//                     <span className="sr-only">{social}</span>
//                     <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
//                     </svg>
//                   </a>
//                 ))}
//               </div>
//             </div>
            
//             <div>
//               <h3 className="text-xl font-bold mb-6">Quick Links</h3>
//               <ul className="space-y-3">
//                 {['Home', 'About Us', 'Courses', 'Tutors', 'Testimonials', 'Contact'].map((link, i) => (
//                   <li key={i}>
//                     <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors duration-300">
//                       {link}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-xl font-bold mb-6">Student Resources</h3>
//               <ul className="space-y-3">
//                 {['Study Materials', 'Practice Tests', 'Video Tutorials', 'Doubt Forum', 'Blog', 'FAQ'].map((link, i) => (
//                   <li key={i}>
//                     <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors duration-300">
//                       {link}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-xl font-bold mb-6">Contact Us</h3>
//               <ul className="space-y-4">
//                 <li className="flex">
//                   <svg className="h-6 w-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                   <span className="text-gray-400">
//                     123 Education Street, Learning City
//                   </span>
//                 </li>
//                 <li className="flex">
//                   <svg className="h-6 w-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                   </svg>
//                   <span className="text-gray-400">
//                     +91 9876543210
//                   </span>
//                 </li>
//                 <li className="flex">
//                   <svg className="h-6 w-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                   <span className="text-gray-400">
//                     contact@edulearn.com
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="pt-8 border-t border-gray-800 text-center">
//             <p className="text-gray-400">
//               &copy; {new Date().getFullYear()} EduLearn. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { motion } from 'framer-motion';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState({
    features: false,
    courses: false,
    testimonials: false
  });

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const response = await api.get('/courses?limit=3');
        setFeaturedCourses(response.data.data);
      } catch (error) {
        console.error('Error fetching featured courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedCourses();

    // Add scroll observer for animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'features-section') {
            setIsVisible(prev => ({ ...prev, features: true }));
          } else if (entry.target.id === 'courses-section') {
            setIsVisible(prev => ({ ...prev, courses: true }));
          } else if (entry.target.id === 'testimonials-section') {
            setIsVisible(prev => ({ ...prev, testimonials: true }));
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.animate-section');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-gray-50 overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, index) => (
              <div 
                key={index}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5,
                  animation: `float ${Math.random() * 10 + 10}s linear infinite`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              <span className="block">Transform Your</span>
              <span className="block text-yellow-300">Learning Journey</span>
            </h1>
            <motion.p 
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Access quality education for classes 1-12 with our award-winning learning platform designed for the modern student.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link
                to="/courses"
                className="group relative overflow-hidden bg-white text-blue-700 font-bold px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 text-lg"
              >
                <span className="relative z-10">Explore Courses</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link
                to="/register"
                className="group relative overflow-hidden bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 text-lg"
              >
                <span className="relative z-10">Sign Up Free</span>
                <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <span className="group-hover:text-blue-700 transition-colors duration-300 relative z-10">Sign Up Free</span>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-20 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Online learning platform" 
                className="w-full object-cover"
                style={{ maxHeight: "500px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <div className="flex items-center mb-2">
                    <div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Start Your First Lesson Today</h3>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          >
            <svg className="w-10 h-10 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <motion.div 
                className="text-5xl font-bold text-blue-600 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <span className="counter-animation">10k+</span>
              </motion.div>
              <p className="text-gray-600">Active students</p>
            </div>
            <div className="p-6">
              <motion.div 
                className="text-5xl font-bold text-blue-600 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="counter-animation">500+</span>
              </motion.div>
              <p className="text-gray-600">Video lessons</p>
            </div>
            <div className="p-6">
              <motion.div 
                className="text-5xl font-bold text-blue-600 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <span className="counter-animation">95%</span>
              </motion.div>
              <p className="text-gray-600">Satisfaction rate</p>
            </div>
            <div className="p-6">
              <motion.div 
                className="text-5xl font-bold text-blue-600 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <span className="counter-animation">50+</span>
              </motion.div>
              <p className="text-gray-600">Expert tutors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses-section" className="py-24 px-6 bg-gray-50 animate-section">
        <motion.div 
          className="container mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.courses ? "visible" : "hidden"}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <motion.p 
                variants={itemVariants} 
                className="text-blue-600 font-semibold mb-2"
              >
                LEARN AT YOUR OWN PACE
              </motion.p>
              <motion.h2 
                variants={itemVariants} 
                className="text-4xl font-bold text-gray-800 mb-4"
              >
                Featured Courses
              </motion.h2>
              <motion.p 
                variants={itemVariants} 
                className="text-gray-600 max-w-lg"
              >
                Explore our top-rated courses designed to help students excel in their academic journey
              </motion.p>
            </div>
            <motion.div variants={itemVariants}>
              <Link
                to="/courses"
                className="inline-flex items-center text-blue-600 font-semibold group mt-6 md:mt-0"
              >
                View all courses
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </motion.div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="w-12 h-12 rounded-full absolute border-4 border-blue-200"></div>
                <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-blue-600 border-t-transparent"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course, index) => (
                <motion.div 
                  key={course._id} 
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={course.thumbnail || `https://source.unsplash.com/600x400/?education,study,${index}`}
                      alt={course.title}
                      className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-full">
                        Grade {course.grade}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1">{course.title}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-blue-600">₹{course.price}</p>
                        <p className="text-xs text-gray-500">One-time payment</p>
                      </div>
                      <Link
                        to={`/courses/${course._id}`}
                        className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          <motion.div 
            variants={itemVariants}
            className="text-center mt-16"
          >
            <Link
              to="/courses"
              className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold rounded-lg group bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              <span className="relative z-10 text-white">Explore All Courses</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-24 px-6 bg-white animate-section">
        <motion.div 
          className="container mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.features ? "visible" : "hidden"}
        >
          <motion.p 
            variants={itemVariants}
            className="text-blue-600 font-semibold mb-2 text-center"
          >
            OUR BENEFITS
          </motion.p>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-20"
          >
            Why Choose Our Platform
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="absolute -top-10 left-0 w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center shadow-md">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div className="pt-12 pl-6">
                <h3 className="text-2xl font-bold mb-4">Comprehensive Curriculum</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our curriculum is meticulously crafted to align with national education standards for grades 1-12, ensuring that students receive a well-rounded education that prepares them for academic success.
                </p>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Aligned with CBSE, ICSE & State boards
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Regular updates with latest syllabus
                  </li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="absolute -top-10 left-0 w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center shadow-md">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                </svg>
              </div>
              <div className="pt-12 pl-6">
                <h3 className="text-2xl font-bold mb-4">Interactive Learning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our platform goes beyond traditional learning methods by incorporating interactive elements that engage students and make learning enjoyable while enhancing retention and understanding.
                </p>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Live sessions with expert tutors
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Gamified quizzes and assignments
                  </li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="absolute -top-10 left-0 w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center shadow-md">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <div className="pt-12 pl-6">
                <h3 className="text-2xl font-bold mb-4">Progress Tracking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our advanced analytics and reporting system allows students and parents to monitor progress in real-time, identify areas for improvement, and celebrate achievements along the learning journey.
                </p>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Detailed performance analytics
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Personalized improvement suggestions
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-24"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">Personalized Learning Experience</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Our AI-powered system adapts to each student's learning style and pace, providing a truly personalized education experience that maximizes learning outcomes.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <p className="text-gray-700">Adaptive learning paths based on performance</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <p className="text-gray-700">Smart recommendations for study materials</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <p className="text-gray-700">Regular assessments to identify knowledge gaps</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-300 rounded-full opacity-20"></div>
                  <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-300 rounded-full opacity-20"></div>
                  <div className="relative z-10">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                      alt="Personalized learning" 
                      className="rounded-xl shadow-lg w-full"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                        <p className="font-semibold">2x faster learning rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials-section" className="py-24 px-6 bg-gray-50 animate-section">
        <motion.div 
          className="container mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.testimonials ? "visible" : "hidden"}
        >
          <motion.p 
            variants={itemVariants}
            className="text-blue-600 font-semibold mb-2 text-center"
          >
            TESTIMONIALS
          </motion.p>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-6"
          >
            What Our Students Say
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-center mb-16 max-w-2xl mx-auto"
          >
            Hear from our community of students and parents about how our platform has transformed their learning experience
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-lg relative"
            >
              <div className="absolute -top-6 left-8">
                <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 01.707.293l.707.707L15.657 3a1 1 0 01.707.293l.707.707L17 9h-2l-.707.707L14 10l.707.707L15 11v4.343a1 1 0 01-.293.707l-.707.707H9.657a1 1 0 01-.707-.293L8.343 16 8 15.657l-.707-.707L7 14.343v-4.686a1 1 0 01.293-.707L8 8.343V7.5A1.5 1.5 0 019.5 6H10V2z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <div className="pt-6">
                <div className="flex items-center mb-6">
                  <div className="h-14 w-14 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt="Rahul Sharma" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Rahul Sharma</h4>
                    <p className="text-gray-600 text-sm">Class 10 Student</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "The interactive lessons and study materials helped me improve my grades significantly. 
                  The tutors are very supportive and always available to clear doubts. I've seen my math scores improve from 68% to 92% in just one semester!"
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-blue-600 font-semibold">Favorite subject: Mathematics</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-lg relative md:mt-12"
            >
              <div className="absolute -top-6 left-8">
                <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 01.707.293l.707.707L15.657 3a1 1 0 01.707.293l.707.707L17 9h-2l-.707.707L14 10l.707.707L15 11v4.343a1 1 0 01-.293.707l-.707.707H9.657a1 1 0 01-.707-.293L8.343 16 8 15.657l-.707-.707L7 14.343v-4.686a1 1 0 01.293-.707L8 8.343V7.5A1.5 1.5 0 019.5 6H10V2z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <div className="pt-6">
                <div className="flex items-center mb-6">
                  <div className="h-14 w-14 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="Ananya Patel" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Ananya Patel</h4>
                    <p className="text-gray-600 text-sm">Class 8 Student</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "I used to struggle with Mathematics, but the step-by-step video lessons and practice 
                  quizzes made it much easier to understand complex concepts. The visualizations and examples really 
                  helped me grasp difficult topics that I couldn't understand in class."
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-blue-600 font-semibold">Improved in: Science & Math</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-lg relative"
            >
              <div className="absolute -top-6 left-8">
                <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 01.707.293l.707.707L15.657 3a1 1 0 01.707.293l.707.707L17 9h-2l-.707.707L14 10l.707.707L15 11v4.343a1 1 0 01-.293.707l-.707.707H9.657a1 1 0 01-.707-.293L8.343 16 8 15.657l-.707-.707L7 14.343v-4.686a1 1 0 01.293-.707L8 8.343V7.5A1.5 1.5 0 019.5 6H10V2z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <div className="pt-6">
                <div className="flex items-center mb-6">
                  <div className="h-14 w-14 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/men/62.jpg" 
                      alt="Vikram Kumar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Vikram Kumar</h4>
                    <p className="text-gray-600 text-sm">Parent</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "As a parent, I appreciate the detailed progress reports that help me track my child's learning. 
                  The platform has been a great investment in my child's education. I can see exactly where they need help
                  and the parent-teacher communication tools are excellent."
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-blue-600 font-semibold">Parent of: 7th & 9th graders</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-blue-600 font-semibold mb-2">SIMPLE & INTUITIVE</p>
            <h2 className="text-4xl font-bold mb-6">How Our Platform Works</h2>
            <p className="text-gray-600">
              Getting started with our learning platform is easy. Follow these simple steps to begin your educational journey.
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-1 bg-blue-100 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  ),
                  title: "Create an Account",
                  description: "Sign up with your email or social media accounts in just a few clicks"
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                  ),
                  title: "Browse Courses",
                  description: "Explore our catalog and choose the courses that match your grade and interests"
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                  ),
                  title: "Enroll & Pay",
                  description: "Select your preferred courses and complete a secure one-time payment"
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                    </svg>
                  ),
                  title: "Start Learning",
                  description: "Access course materials immediately and begin your learning journey"
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <div className="flex flex-col items-center">
                    <div className="bg-white border-2 border-blue-100 rounded-full p-6 shadow-lg relative mb-6">
                      <div className="absolute -top-2 -right-2 bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-center">{step.title}</h3>
                    <p className="text-gray-600 text-center">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-blue-600 font-semibold mb-2">FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="text-4xl font-bold mb-6">Got Questions?</h2>
            <p className="text-gray-600">
              Find answers to the most common questions about our platform and services
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "What age groups or classes is your platform suitable for?",
                answer: "Our learning platform is designed for students from Class 1 to Class 12, covering all major academic boards including CBSE, ICSE, and State boards. We offer age-appropriate content for each grade level."
              },
              {
                question: "How do the live classes work?",
                answer: "Our live classes are conducted by experienced teachers through our integrated video conferencing tool. Students can interact with teachers, ask questions, and participate in discussions. All sessions are recorded and available for later review."
              },
              {
                question: "Can parents track their child's progress?",
                answer: "Absolutely! Parents receive dedicated access to a dashboard that shows comprehensive progress reports, attendance records, assignment completion, and test scores. You'll receive regular updates on your child's learning journey."
              },
              {
                question: "What subjects do you cover?",
                answer: "We offer comprehensive coverage of all major subjects including Mathematics, Science, English, Social Studies, and Languages. Additionally, we provide specialized courses for competitive exams preparation."
              },
              {
                question: "Is there a mobile app available?",
                answer: "Yes, our platform is accessible through both web browsers and dedicated mobile apps available for iOS and Android devices. All features are fully functional across devices for seamless learning."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <details className="group bg-white rounded-lg shadow-md">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-lg">
                    {faq.question}
                    <span className="transition-transform duration-300 group-open:rotate-180">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-800">
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 10 }).map((_, index) => (
              <div 
                key={index}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 400 + 100}px`,
                  height: `${Math.random() * 400 + 100}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5,
                  animation: `float ${Math.random() * 10 + 20}s linear infinite`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Ready to Transform Your Learning Experience?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl mb-10 text-blue-100"
            >
              Join thousands of students who are already experiencing the benefits of our platform. Start your journey today!
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/register"
                className="group relative overflow-hidden bg-white text-blue-700 font-bold px-10 py-4 rounded-lg hover:shadow-xl transition-all duration-300 text-lg inline-flex items-center justify-center"
              >
                <span className="mr-2">Get Started Now</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link
                to="/contact"
                className="text-white font-bold px-10 py-4 border-2 border-white/40 rounded-lg hover:bg-white/10 transition-all duration-300 text-lg inline-flex items-center justify-center"
              >
                Talk to an Advisor
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-blue-50 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="text-gray-600 mb-6">
                  Subscribe to our newsletter to receive the latest news, updates, and educational resources.
                </p>
                <form className="space-y-4">
                  <div>
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 w-full"
                  >
                    Subscribe Now
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-4">
                  By subscribing, you agree to receive marketing emails from us. No spam, we promise!
                </p>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1516321165247-4aa89df9b03c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                  alt="Newsletter" 
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add this at the end of your component before the closing tag */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .counter-animation {
          display: inline-block;
          position: relative;
          animation: countUp 2s forwards;
        }
        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;