// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { api } from '../../services/api';
// import { useAuth } from '../../contexts/AuthContext';
// import toast from 'react-hot-toast';

// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeModule, setActiveModule] = useState(null);
//   const [isEnrolling, setIsEnrolling] = useState(false);
  
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get(`/courses/${courseId}`);
//         setCourse(response.data.data);
        
//         // Set first module as active by default if there are modules
//         if (response.data.data.modules && response.data.data.modules.length > 0) {
//           setActiveModule(response.data.data.modules[0]);
//         }
//       } catch (error) {
//         console.error('Error fetching course:', error);
//         setError('Failed to load course details. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourse();
//   }, [courseId]);

//   const handleEnroll = async () => {
//     if (!user) {
//       navigate('/login', { state: { from: { pathname: `/courses/${courseId}` } } });
//       return;
//     }

//     try {
//       setIsEnrolling(true);
      
//       // Create order for payment
//       const orderResponse = await api.post(`/payments/courses/${courseId}`);
//       const { order } = orderResponse.data;
      
//       // Open Razorpay checkout
//       const options = {
//         key: 'rzp_test_Nrm3u4UBQNU32A', // Use env variable in production
//         amount: order.amount,
//         currency: order.currency,
//         name: 'LMS Portal',
//         description: `Enrollment for ${course.title}`,
//         order_id: order.id,
//         handler: async function(response) {
//           // Verify payment and complete enrollment
//           const verifyResponse = await api.post('/payments/verify', {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             courseId: course._id
//           });
          
//           if (verifyResponse.data.success) {
//             setCourse({
//               ...course,
//               enrolledStudents: [...course.enrolledStudents, user._id]
//             });
//             toast.success('Successfully enrolled in course!');
//             navigate('/dashboard');
//           }
//         },
//         prefill: {
//           name: user.name,
//           email: user.email
//         },
//         theme: {
//           color: '#2563EB'
//         }
//       };
      
//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       console.error('Enrollment error:', error);
//       toast.error('Failed to process enrollment. Please try again.');
//     } finally {
//       setIsEnrolling(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <div className="text-center">
//           <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
//           <p className="mt-2 text-gray-600">Loading course details...</p>
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

//   if (!course) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
//           <strong className="font-bold">Not Found!</strong>
//           <span className="block sm:inline"> Course does not exist or has been removed.</span>
//         </div>
//       </div>
//     );
//   }

//   const isEnrolled = user && course.enrolledStudents.includes(user._id);
//   const isInstructor = user && course.instructor._id === user._id;

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Course Info */}
//         <div className="lg:col-span-2">
//           <nav className="flex mb-4" aria-label="Breadcrumb">
//             <ol className="inline-flex items-center space-x-1 md:space-x-3">
//               <li className="inline-flex items-center">
//                 <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
//               </li>
//               <li>
//                 <div className="flex items-center">
//                   <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
//                   </svg>
//                   <Link to="/courses" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">Courses</Link>
//                 </div>
//               </li>
//               <li aria-current="page">
//                 <div className="flex items-center">
//                   <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
//                   </svg>
//                   <span className="ml-1 text-gray-500 md:ml-2">{course.title}</span>
//                 </div>
//               </li>
//             </ol>
//           </nav>
          
//           <div className="mb-8">
//             <div className="flex flex-wrap gap-2 mb-4">
//               <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
//                 {course.category}
//               </span>
//               <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
//                 Class {course.grade}
//               </span>
//             </div>
            
//             <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            
//             <div className="flex items-center mb-4">
//               <div className="text-yellow-500 flex">
//                 {[...Array(5)].map((_, i) => (
//                   <svg 
//                     key={i} 
//                     className={`w-5 h-5 ${i < Math.floor(course.averageRating || 0) ? 'text-yellow-500' : 'text-gray-300'}`} 
//                     fill="currentColor" 
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//               </div>
//               <span className="text-gray-600 text-sm ml-1">
//                 ({course.averageRating ? course.averageRating.toFixed(1) : '0.0'})
//               </span>
//               <span className="text-gray-500 text-sm ml-3">
//                 {course.enrolledStudents.length} student{course.enrolledStudents.length !== 1 ? 's' : ''}
//               </span>
//             </div>
            
//             <p className="text-gray-500 mb-2">Created by <span className="font-medium">{course.instructor.name}</span></p>
//           </div>
          
//           <div className="mb-8">
//             <img 
//               src={course.thumbnail ? `http://localhost:5000${course.thumbnail}` : "https://via.placeholder.com/800x450?text=Course"} 
//               alt={course.title} 
//               className="w-full h-auto rounded-lg mb-6"
//             />
            
//             <div className="prose max-w-none">
//               <h2 className="text-2xl font-bold mb-4">About This Course</h2>
//               <p className="text-gray-700 mb-4">{course.description}</p>
//             </div>
//           </div>
          
//           {/* Course Content Preview */}
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold mb-4">Course Content</h2>
            
//             {course.modules.length === 0 ? (
//               <p className="text-gray-500">This course doesn't have any content yet.</p>
//             ) : (
//               <div className="border border-gray-200 rounded-lg">
//                 {course.modules.map((module, index) => (
//                   <div key={module._id || index} className="border-b border-gray-200 last:border-b-0">
//                     <button
//                       className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 focus:outline-none"
//                       onClick={() => setActiveModule(activeModule === module ? null : module)}
//                     >
//                       <div className="flex items-center">
//                         <span className="font-medium">{index + 1}. {module.title}</span>
//                         <span className="ml-2 text-sm text-gray-500">
//                           ({module.lessons?.length || 0} {module.lessons?.length === 1 ? 'lesson' : 'lessons'})
//                         </span>
//                       </div>
//                       <svg
//                         className={`w-5 h-5 transition-transform ${activeModule === module ? 'transform rotate-180' : ''}`}
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </button>
                    
//                     {activeModule === module && (
//                       <div className="p-4 bg-gray-50">
//                         {module.lessons && module.lessons.length > 0 ? (
//                           <ul className="space-y-2">
//                             {module.lessons.map((lesson, lessonIndex) => (
//                               <li key={lesson._id || lessonIndex} className="flex items-center">
//                                 <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   {lesson.type === 'video' && (
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
//                                   )}
//                                   {lesson.type === 'pdf' && (
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                                   )}
//                                   {lesson.type === 'quiz' && (
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                   )}
//                                   {lesson.type === 'assignment' && (
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                                   )}
//                                 </svg>
//                                 <span className="text-gray-700">
//                                   {lessonIndex + 1}. {lesson.title}
//                                   {lesson.duration && <span className="ml-2 text-xs text-gray-500">({lesson.duration} min)</span>}
//                                 </span>
//                                 {!isEnrolled && !isInstructor && (
//                                   <svg className="w-5 h-5 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                                   </svg>
//                                 )}
//                               </li>
//                             ))}
//                           </ul>
//                         ) : (
//                           <p className="text-gray-500">This module doesn't have any lessons yet.</p>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
          
//           {/* Reviews Section */}
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>
            
//             {course.ratings && course.ratings.length > 0 ? (
//               <div className="space-y-4">
//                 {course.ratings.map((rating, index) => (
//                   <div key={index} className="border border-gray-200 rounded-lg p-4">
//                     <div className="flex justify-between items-start">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//                           {rating.student.name ? rating.student.name.charAt(0).toUpperCase() : 'U'}
//                         </div>
//                         <div>
//                           <p className="font-medium">{rating.student.name || 'Anonymous'}</p>
//                           <div className="flex text-yellow-500">
//                             {[...Array(5)].map((_, i) => (
//                               <svg 
//                                 key={i} 
//                                 className={`w-4 h-4 ${i < rating.rating ? 'text-yellow-500' : 'text-gray-300'}`} 
//                                 fill="currentColor" 
//                                 viewBox="0 0 20 20"
//                               >
//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                               </svg>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                       <span className="text-sm text-gray-500">
//                         {new Date(rating.date).toLocaleDateString()}
//                       </span>
//                     </div>
//                     {rating.review && (
//                       <p className="mt-3 text-gray-700">{rating.review}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No reviews yet.</p>
//             )}
//           </div>
//         </div>
        
//         {/* Course Sidebar */}
//         <div className="lg:col-span-1">
//           <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 sticky top-6">
//             <div className="mb-4">
//               <p className="text-3xl font-bold">₹{course.price}</p>
//             </div>
            
//             {isEnrolled ? (
//               <Link 
//                 to={`/dashboard/my-courses/${courseId}`}
//                 className="block w-full bg-green-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition duration-200"
//               >
//                 Go to Course
//               </Link>
//             ) : isInstructor ? (
//               <Link 
//                 to={`/dashboard/edit-course/${courseId}`}
//                 className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
//               >
//                 Edit Course
//               </Link>
//             ) : (
//               <button 
//                 onClick={handleEnroll}
//                 disabled={isEnrolling}
//                 className="w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:bg-blue-400"
//               >
//                 {isEnrolling ? 'Processing...' : 'Enroll Now'}
//               </button>
//             )}
            
//             <div className="mt-6">
//               <h3 className="font-semibold text-lg mb-3">This course includes:</h3>
//               <ul className="space-y-2">
//                 <li className="flex items-center text-gray-700">
//                   <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//                   </svg>
//                   Full lifetime access
//                 </li>
//                 <li className="flex items-center text-gray-700">
//                   <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//                   </svg>
//                   Access on mobile and desktop
//                 </li>
//                 <li className="flex items-center text-gray-700">
//                   <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//                   </svg>
//                   Assignment & quizzes
//                 </li>
//                 <li className="flex items-center text-gray-700">
//                   <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//                   </svg>
//                   Certificate of completion
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { api } from '../../services/api';
// import { useAuth } from '../../contexts/AuthContext';
// import toast from 'react-hot-toast';

// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
  
//   const [course, setCourse] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [paymentLoading, setPaymentLoading] = useState(false);

//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         setIsLoading(true);
//         const response = await api.get(`/courses/${courseId}`);
//         setCourse(response.data.data);
        
//         // Check if user is enrolled in this course
//         if (user && response.data.data.enrolledStudents) {
//           setIsEnrolled(response.data.data.enrolledStudents.includes(user._id));
//         }
//       } catch (err) {
//         console.error('Error fetching course details:', err);
//         setError('Failed to load course details. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCourseDetails();
//   }, [courseId, user]);

//   const handleEnrollment = async () => {
//     if (!user) {
//       toast.error('Please login to enroll in this course');
//       navigate('/login');
//       return;
//     }

//     if (user.role !== 'student') {
//       toast.error('Only students can enroll in courses');
//       return;
//     }

//     try {
//       setPaymentLoading(true);
      
//       // Step 1: Create a payment order
//       const orderResponse = await api.post(`/payments/courses/${courseId}`);
//       const { order } = orderResponse.data;
      
//       // Step 2: Initialize Razorpay
//       const options = {
//         key: 'rzp_test_Nrm3u4UBQNU32A', // Replace with your actual Razorpay key_id
//         amount: order.amount,
//         currency: order.currency,
//         name: 'LMS Portal',
//         description: `Enrollment for ${course.title}`,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             // Step 3: Verify payment and complete enrollment
//             await api.post('/payments/verify', {
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_signature: response.razorpay_signature,
//               courseId: course._id
//             });
            
//             setIsEnrolled(true);
//             toast.success('Successfully enrolled in the course!');
//           } catch (error) {
//             console.error('Payment verification error:', error);
//             toast.error('Payment verification failed. Please contact support.');
//           } finally {
//             setPaymentLoading(false);
//           }
//         },
//         prefill: {
//           name: user.name,
//           email: user.email
//         },
//         theme: {
//           color: '#3B82F6'
//         }
//       };
      
//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       console.error('Enrollment error:', error);
//       toast.error('Failed to process enrollment. Please try again later.');
//       setPaymentLoading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-red-100 text-red-800 p-4 rounded-md">{error}</div>
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md">
//           Course not found
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50">
//       {/* Course Header */}
//       <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-start gap-8">
//             <div className="md:w-2/3">
//               <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
//               <p className="text-lg mb-6">{course.description}</p>
//               <div className="flex flex-wrap gap-4 mb-6">
//                 <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
//                   Grade {course.grade}
//                 </span>
//                 <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
//                   {course.category}
//                 </span>
//                 <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
//                   {course.enrolledStudents?.length || 0} students enrolled
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <div className="flex items-center mr-4">
//                   <div className="h-10 w-10 rounded-full bg-white text-blue-600 flex items-center justify-center">
//                     {course.instructor?.name ? course.instructor.name.charAt(0).toUpperCase() : 'T'}
//                   </div>
//                   <span className="ml-2">{course.instructor?.name || 'Instructor'}</span>
//                 </div>
//                 {course.averageRating && (
//                   <div className="flex items-center">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <svg
//                           key={i}
//                           className={`w-5 h-5 ${
//                             i < Math.round(course.averageRating)
//                               ? 'text-yellow-400'
//                               : 'text-gray-300'
//                           }`}
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       ))}
//                     </div>
//                     <span className="ml-2">{course.averageRating.toFixed(1)}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="md:w-1/3 mt-6 md:mt-0">
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <div className="mb-4">
//                   <img
//                     src={course.thumbnail || 'https://via.placeholder.com/600x400?text=Course+Image'}
//                     alt={course.title}
//                     className="w-full h-48 object-cover rounded-md"
//                   />
//                 </div>
//                 <div className="text-center">
//                   <p className="text-gray-800 text-2xl font-bold mb-6">₹{course.price}</p>
//                   {isEnrolled ? (
//                     <div className="mb-4">
//                       <div className="bg-green-500 text-white py-2 px-4 rounded-md">
//                         You are enrolled in this course
//                       </div>
//                       <button
//                         className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
//                         onClick={() => navigate('/dashboard')}
//                       >
//                         Go to Dashboard
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                       onClick={handleEnrollment}
//                       disabled={paymentLoading}
//                     >
//                       {paymentLoading ? 'Processing...' : 'Enroll Now'}
//                     </button>
//                   )}
//                 </div>
//                 <div className="mt-6">
//                   <h3 className="font-semibold mb-2 text-gray-800">This course includes:</h3>
//                   <ul className="space-y-2 text-gray-600">
//                     <li className="flex items-center">
//                       <svg
//                         className="w-4 h-4 mr-2 text-green-500"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       {course.modules?.length || 0} learning modules
//                     </li>
//                     <li className="flex items-center">
//                       <svg
//                         className="w-4 h-4 mr-2 text-green-500"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       Assignments & quizzes
//                     </li>
//                     <li className="flex items-center">
//                       <svg
//                         className="w-4 h-4 mr-2 text-green-500"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       Discussion forum access
//                     </li>
//                     <li className="flex items-center">
//                       <svg
//                         className="w-4 h-4 mr-2 text-green-500"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       Lifetime access
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Course Content */}
//       <div className="container mx-auto px-4 py-12">
//         <div className="mb-8 border-b">
//           <div className="flex overflow-x-auto">
//             <button
//               className={`py-2 px-4 font-medium ${
//                 activeTab === 'overview'
//                   ? 'border-b-2 border-blue-600 text-blue-600'
//                   : 'text-gray-600 hover:text-blue-600'
//               }`}
//               onClick={() => setActiveTab('overview')}
//             >
//               Overview
//             </button>
//             <button
//               className={`py-2 px-4 font-medium ${
//                 activeTab === 'curriculum'
//                   ? 'border-b-2 border-blue-600 text-blue-600'
//                   : 'text-gray-600 hover:text-blue-600'
//               }`}
//               onClick={() => setActiveTab('curriculum')}
//             >
//               Curriculum
//             </button>
//             <button
//               className={`py-2 px-4 font-medium ${
//                 activeTab === 'reviews'
//                   ? 'border-b-2 border-blue-600 text-blue-600'
//                   : 'text-gray-600 hover:text-blue-600'
//               }`}
//               onClick={() => setActiveTab('reviews')}
//             >
//               Reviews
//             </button>
//           </div>
//         </div>

//         {activeTab === 'overview' && (
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-semibold mb-4">Course Overview</h2>
//             <p className="text-gray-700 mb-6">{course.description}</p>
            
//             <div className="mb-6">
//               <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-start">
//                   <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   <span>Understand key concepts of {course.category}</span>
//                 </div>
//                 <div className="flex items-start">
//                   <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   <span>Apply concepts to solve real-world problems</span>
//                 </div>
//                 <div className="flex items-start">
//                   <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   <span>Develop critical thinking and analytical skills</span>
//                 </div>
//                 <div className="flex items-start">
//                   <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   <span>Prepare for exams and assessments</span>
//                 </div>
//               </div>
//             </div>
            
//             <div>
//               <h3 className="text-xl font-semibold mb-3">About the Instructor</h3>
//               <div className="flex items-center mb-4">
//                 <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center mr-4">
//                   {course.instructor?.name ? course.instructor.name.charAt(0).toUpperCase() : 'T'}
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">{course.instructor?.name || 'Instructor'}</h4>
//                   <p className="text-gray-600">{course.instructor?.email || 'instructor@example.com'}</p>
//                 </div>
//               </div>
//               <p className="text-gray-700">
//                 Experienced educator specializing in {course.category} with years of teaching experience.
//               </p>
//             </div>
//           </div>
//         )}

//         {activeTab === 'curriculum' && (
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-semibold mb-4">Course Curriculum</h2>
            
//             {course.modules && course.modules.length > 0 ? (
//               <div className="space-y-4">
//                 {course.modules.map((module, moduleIndex) => (
//                   <div key={moduleIndex} className="border rounded-md overflow-hidden">
//                     <div className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer">
//                       <h3 className="font-semibold">
//                         Module {moduleIndex + 1}: {module.title}
//                       </h3>
//                       <span className="text-sm text-gray-600">
//                         {module.lessons?.length || 0} lessons
//                       </span>
//                     </div>
//                     <div className="divide-y">
//                       {module.lessons?.map((lesson, lessonIndex) => (
//                         <div key={lessonIndex} className="px-4 py-3 flex justify-between items-center">
//                           <div className="flex items-center">
//                             <div className="mr-3">
//                               {lesson.type === 'video' && (
//                                 <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                                 </svg>
//                               )}
//                               {lesson.type === 'pdf' && (
//                                 <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
//                                 </svg>
//                               )}
//                               {lesson.type === 'quiz' && (
//                                 <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
//                                 </svg>
//                               )}
//                               {lesson.type === 'assignment' && (
//                                 <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
//                                 </svg>
//                               )}
//                             </div>
//                             <span>{lesson.title}</span>
//                           </div>
//                           {!isEnrolled && (
//                             <span className="text-sm bg-gray-100 px-2 py-1 rounded">
//                               {lesson.type === 'video' && lesson.duration ? `${lesson.duration} min` : 'Locked'}
//                             </span>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600 italic">No curriculum information available yet.</p>
//             )}
//           </div>
//         )}

//         {activeTab === 'reviews' && (
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-semibold mb-4">Student Reviews</h2>
            
//             {course.ratings && course.ratings.length > 0 ? (
//               <div className="space-y-6">
//                 {course.ratings.map((rating, index) => (
//                   <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
//                     <div className="flex items-center mb-3">
//                       <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
//                         {rating.student?.name ? rating.student.name.charAt(0).toUpperCase() : 'S'}
//                       </div>
//                       <div>
//                         <h4 className="font-semibold">{rating.student?.name || 'Student'}</h4>
//                         <div className="flex items-center">
//                           <div className="flex">
//                             {[...Array(5)].map((_, i) => (
//                               <svg
//                                 key={i}
//                                 className={`w-4 h-4 ${
//                                   i < rating.rating
//                                     ? 'text-yellow-400'
//                                     : 'text-gray-300'
//                                 }`}
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                                 xmlns="http://www.w3.org/2000/svg"
//                               >
//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                               </svg>
//                             ))}
//                           </div>
//                           <span className="ml-1 text-sm text-gray-600">
//                             {new Date(rating.date).toLocaleDateString()}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     {rating.review && <p className="text-gray-700">{rating.review}</p>}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600 italic">No reviews yet. Be the first to review this course!</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;



import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeModule, setActiveModule] = useState(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        setRazorpayLoaded(true);
      };
      document.body.appendChild(script);
    };

    if (!window.Razorpay) {
      loadRazorpayScript();
    } else {
      setRazorpayLoaded(true);
    }
  }, []);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/courses/${courseId}`);
        setCourse(response.data.data);
        
        // Check if user is enrolled in this course
        if (user && response.data.data.enrolledStudents) {
          setIsEnrolled(response.data.data.enrolledStudents.includes(user._id));
        }
        
        // Set first module as active by default if there are modules
        if (response.data.data.modules && response.data.data.modules.length > 0) {
          setActiveModule(response.data.data.modules[0]);
        }
      } catch (err) {
        console.error('Error fetching course details:', err);
        setError('Failed to load course details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, user]);

  const handleEnrollment = async () => {
    if (!user) {
      toast.error('Please login to enroll in this course');
      navigate('/login', { state: { from: `/courses/${courseId}` } });
      return;
    }

    if (user.role !== 'student') {
      toast.error('Only students can enroll in courses');
      return;
    }

    if (!razorpayLoaded) {
      toast.error('Payment system is loading. Please try again in a moment.');
      return;
    }

    try {
      setIsEnrolling(true);
      
      // Step 1: Create a payment order
      const orderResponse = await api.post(`/payments/courses/${courseId}`);
      
      if (!orderResponse.data.success) {
        toast.error(orderResponse.data.message || 'Failed to create order');
        setIsEnrolling(false);
        return;
      }
      
      const { order, course: courseData } = orderResponse.data;
      
      // Step 2: Configure payment options
      const options = {
        key: 'rzp_test_Nrm3u4UBQNU32A', // Using the key from your .env file
        amount: order.amount,
        currency: order.currency,
        name: 'LMS Platform',
        description: `Enrollment for ${course.title}`,
        order_id: order.id,
        handler: async function(response) {
          try {
            // Step 3: Verify the payment on your server
            const paymentVerifyResponse = await api.post('/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: courseId
            });
            
            // if (paymentVerifyResponse.data.success) {
              setIsEnrolled(true);
              toast.success('Enrollment successful!');
              // Refresh course data or redirect to course content
              setTimeout(() => {
                navigate(`/dashboard/courses/${courseId}`);
              }, 2000);
            
              if (paymentVerifyResponse.data.success) {
                setIsEnrolled(true);
                toast.success('Enrollment successful!');
                // Change the redirect to go to the main dashboard instead
                setTimeout(() => {
                  navigate('/dashboard/my-courses'); // Change from `/dashboard/courses/${courseId}` to '/dashboard'
                }, 2000);
            } else {
              toast.error(paymentVerifyResponse.data.message || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Failed to verify payment. Please contact support.');
          } finally {
            setIsEnrolling(false);
          }
        },
        prefill: {
          name: user.name || '',
          email: user.email || '',
        },
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: function() {
            setIsEnrolling(false);
          }
        }
      };
      
      // Step 3: Create Razorpay instance and open payment modal
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
      
    } catch (error) {
      console.error('Enrollment error:', error);
      toast.error('Failed to process enrollment. Please try again later.');
      setIsEnrolling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-800 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md">
          Course not found
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg mb-6">{course.description}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                  Grade {course.grade}
                </span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                  {course.category}
                </span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                  {course.enrolledStudents?.length || 0} students enrolled
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <div className="h-10 w-10 rounded-full bg-white text-blue-600 flex items-center justify-center">
                    {course.instructor?.name ? course.instructor.name.charAt(0).toUpperCase() : 'T'}
                  </div>
                  <span className="ml-2">{course.instructor?.name || 'Instructor'}</span>
                </div>
                {course.averageRating && (
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(course.averageRating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2">{course.averageRating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="md:w-1/3 mt-6 md:mt-0">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <img
                    src={course.thumbnail || 'https://via.placeholder.com/600x400?text=Course+Image'}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
                <div className="text-center">
                  <p className="text-gray-800 text-2xl font-bold mb-6">₹{course.price}</p>
                  {isEnrolled ? (
                    <div className="mb-4">
                      <div className="bg-green-500 text-white py-2 px-4 rounded-md">
                        You are enrolled in this course
                      </div>
                      <button
                        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        onClick={() => navigate('/dashboard')}
                      >
                        Go to Dashboard
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                      onClick={handleEnrollment}
                      disabled={isEnrolling}
                    >
                      {isEnrolling ? 'Processing...' : 'Enroll Now'}
                    </button>
                  )}
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2 text-gray-800">This course includes:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {course.modules?.length || 0} learning modules
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Assignments & quizzes
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Discussion forum access
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Lifetime access
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 border-b">
          <div className="flex overflow-x-auto">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'curriculum'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('curriculum')}
            >
              Curriculum
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Course Overview</h2>
            <p className="text-gray-700 mb-6">{course.description}</p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Understand key concepts of {course.category}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Apply concepts to solve real-world problems</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Develop critical thinking and analytical skills</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Prepare for exams and assessments</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">About the Instructor</h3>
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center mr-4">
                  {course.instructor?.name ? course.instructor.name.charAt(0).toUpperCase() : 'T'}
                </div>
                <div>
                  <h4 className="font-semibold">{course.instructor?.name || 'Instructor'}</h4>
                  <p className="text-gray-600">{course.instructor?.email || 'instructor@example.com'}</p>
                </div>
              </div>
              <p className="text-gray-700">
                Experienced educator specializing in {course.category} with years of teaching experience.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Course Curriculum</h2>
            
            {course.modules && course.modules.length > 0 ? (
              <div className="space-y-4">
                {course.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="border rounded-md overflow-hidden">
                    <div 
                      className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer"
                      onClick={() => setActiveModule(activeModule === module ? null : module)}
                    >
                      <h3 className="font-semibold">
                        Module {moduleIndex + 1}: {module.title}
                      </h3>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">
                          {module.lessons?.length || 0} lessons
                        </span>
                        <svg
                          className={`w-5 h-5 transition-transform ${activeModule === module ? 'transform rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {activeModule === module && (
                      <div className="divide-y">
                        {module.lessons?.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="px-4 py-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="mr-3">
                                {lesson.type === 'video' && (
                                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                  </svg>
                                )}
                                {lesson.type === 'pdf' && (
                                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                  </svg>
                                )}
                                {lesson.type === 'quiz' && (
                                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                  </svg>
                                )}
                                {lesson.type === 'assignment' && (
                                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                  </svg>
                                )}
                              </div>
                              <span>{lessonIndex + 1}. {lesson.title}</span>
                            </div>
                            {!isEnrolled && (
                              <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {lesson.type === 'video' && lesson.duration ? `${lesson.duration} min` : 'Locked'}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">No curriculum information available yet.</p>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Student Reviews</h2>
            
            {course.ratings && course.ratings.length > 0 ? (
              <div className="space-y-6">
                {course.ratings.map((rating, index) => (
                  <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-center mb-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        {rating.student?.name ? rating.student.name.charAt(0).toUpperCase() : 'S'}
                      </div>
                      <div>
                        <h4 className="font-semibold">{rating.student?.name || 'Student'}</h4>
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < rating.rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 text-sm text-gray-600">
                            {new Date(rating.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    {rating.review && <p className="text-gray-700">{rating.review}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">No reviews yet. Be the first to review this course!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;