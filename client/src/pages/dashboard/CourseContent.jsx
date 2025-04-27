

// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { api } from '../../../services/api';
// import { useAuth } from '../../../contexts/AuthContext';
// import toast from 'react-hot-toast';

// const CourseContent = () => {
//   const { courseId } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [course, setCourse] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeModuleIndex, setActiveModuleIndex] = useState(0);
//   const [activeLessonIndex, setActiveLessonIndex] = useState(0);
//   const [completedLessons, setCompletedLessons] = useState([]);
//   const [progress, setProgress] = useState(0);
//   const [notes, setNotes] = useState('');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const videoContainerRef = useRef(null);

//   // Sample videos - replace with your actual video content
//   const sampleVideos = [
//     "https://www.youtube.com/embed/rfscVS0vtbw?si=qAq-PH1Mhw1WLUIP", // Python tutorial
//     "https://www.youtube.com/embed/8JJ101D3knE?si=Ek9Fct-mGZ2XGmKO", // JavaScript tutorial
//     "https://www.youtube.com/embed/pQN-pnXPaVg?si=1uYhz3YaYhR4hR7s", // HTML CSS
//     "https://www.youtube.com/embed/G3e-cpL7ofc?si=jkL7ZmBhJd10S9En", // HTML CSS course
//     "https://www.youtube.com/embed/7S_tz1z_5bA?si=D9OKBvC4WvwVCOsq", // MySQL
//     "https://www.youtube.com/embed/ok-plXXHlWw?si=Fn1GF1XKnEcxMlm_", // Python project
//     "https://www.youtube.com/embed/OXGznpKZ_sA?si=TQW6CuoqQd11BJ1K", // Node.js
//   ];

//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         setIsLoading(true);
        
//         // Fetch course details
//         const courseResponse = await api.get(`/courses/${courseId}`);
        
//         if (!courseResponse.data.success) {
//           throw new Error('Failed to fetch course data');
//         }
        
//         const courseData = courseResponse.data.data;
        
//         // If the course doesn't have modules, create some sample modules
//         if (!courseData.modules || courseData.modules.length === 0) {
//           courseData.modules = generateSampleModules();
//         }
        
//         setCourse(courseData);
        
//         // Fetch progress data
//         try {
//           const progressResponse = await api.get(`/progress/${courseId}`);
//           if (progressResponse.data.success) {
//             const progressData = progressResponse.data.data;
//             setCompletedLessons(progressData.completedLessons || []);
//             setProgress(progressData.percentage || 0);
            
//             // If there are notes for the current lesson, load them
//             if (progressData.notes && progressData.notes.length > 0) {
//               // We'll load the appropriate notes when the lesson changes
//             }
            
//             // Set active module and lesson based on progress
//             if (progressData.lastAccessedModule !== undefined && 
//                 progressData.lastAccessedLesson !== undefined) {
//               setActiveModuleIndex(progressData.lastAccessedModule);
//               setActiveLessonIndex(progressData.lastAccessedLesson);
//             }
//           }
//         } catch (progressError) {
//           console.error('Error fetching progress:', progressError);
//           // Not critical, continue showing the course
//         }
        
//       } catch (err) {
//         console.error('Error fetching course content:', err);
//         setError('Failed to load course content. Please try again.');
//         toast.error('Failed to load course content');
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchCourseData();
//   }, [courseId]);

//   // Load notes when lesson changes
//   useEffect(() => {
//     const loadNotes = async () => {
//       if (!course) return;
      
//       try {
//         const currentModule = course.modules[activeModuleIndex];
//         const currentLesson = currentModule.lessons[activeLessonIndex];
        
//         const notesResponse = await api.get(`/progress/${courseId}/notes/${currentLesson._id}`);
//         if (notesResponse.data.success && notesResponse.data.data) {
//           setNotes(notesResponse.data.data.content || '');
//         } else {
//           setNotes(''); // Reset notes for new lesson
//         }
//       } catch (err) {
//         console.error('Error loading notes:', err);
//         setNotes(''); // Reset notes on error
//       }
//     };
    
//     if (course && course.modules && course.modules.length > 0) {
//       loadNotes();
//     }
//   }, [course, activeModuleIndex, activeLessonIndex, courseId]);
  
//   const generateSampleModules = () => {
//     return [
//       {
//         _id: 'module1',
//         title: 'Introduction to the Course',
//         description: 'Get started with the fundamentals',
//         lessons: [
//           {
//             _id: 'lesson1',
//             title: 'Course Overview',
//             type: 'video',
//             content: 'This lesson introduces you to the course structure and what you will learn.',
//             videoUrl: sampleVideos[0],
//             duration: 10,
//             resources: [
//               { title: 'Course Syllabus', url: '#', type: 'pdf' },
//               { title: 'Recommended Resources', url: '#', type: 'link' }
//             ]
//           },
//           {
//             _id: 'lesson2',
//             title: 'Getting Set Up',
//             type: 'video',
//             content: 'Learn how to set up your environment for this course.',
//             videoUrl: sampleVideos[1],
//             duration: 15,
//             resources: [
//               { title: 'Setup Guide', url: '#', type: 'pdf' }
//             ]
//           }
//         ]
//       },
//       {
//         _id: 'module2',
//         title: 'Core Concepts',
//         description: 'Learn the essential concepts',
//         lessons: [
//           {
//             _id: 'lesson3',
//             title: 'Understanding the Basics',
//             type: 'video',
//             content: 'This lesson covers the fundamental concepts that will be used throughout the course.',
//             videoUrl: sampleVideos[2],
//             duration: 20,
//             resources: [
//               { title: 'Basic Concepts PDF', url: '#', type: 'pdf' },
//               { title: 'Practice Exercise', url: '#', type: 'exercise' }
//             ]
//           },
//           {
//             _id: 'lesson4',
//             title: 'Advanced Techniques',
//             type: 'video',
//             content: 'Build upon the basics with more advanced techniques and strategies.',
//             videoUrl: sampleVideos[3],
//             duration: 25,
//             resources: [
//               { title: 'Advanced Techniques Guide', url: '#', type: 'pdf' },
//               { title: 'Reference Material', url: '#', type: 'link' }
//             ]
//           }
//         ]
//       },
//       {
//         _id: 'module3',
//         title: 'Practical Applications',
//         description: 'Apply what you have learned to real-world scenarios',
//         lessons: [
//           {
//             _id: 'lesson5',
//             title: 'Case Study 1',
//             type: 'video',
//             content: 'Examine a real-world case study and apply the concepts from the course.',
//             videoUrl: sampleVideos[4],
//             duration: 30,
//             resources: [
//               { title: 'Case Study Materials', url: '#', type: 'pdf' },
//               { title: 'Additional Resources', url: '#', type: 'link' }
//             ]
//           },
//           {
//             _id: 'lesson6',
//             title: 'Project Work',
//             type: 'assignment',
//             content: 'Complete a project to demonstrate your understanding of the course material.',
//             duration: 120,
//             resources: [
//               { title: 'Project Brief', url: '#', type: 'pdf' },
//               { title: 'Submission Guidelines', url: '#', type: 'pdf' }
//             ]
//           },
//           {
//             _id: 'lesson7',
//             title: 'Final Assessment',
//             type: 'quiz',
//             content: 'Take the final assessment to test your knowledge of the course content.',
//             duration: 45,
//             resources: [
//               { title: 'Study Guide', url: '#', type: 'pdf' }
//             ]
//           }
//         ]
//       }
//     ];
//   };

//   const markLessonComplete = async () => {
//     if (!course) return;
    
//     const currentModule = course.modules[activeModuleIndex];
//     const currentLesson = currentModule.lessons[activeLessonIndex];
    
//     // If lesson is already completed, do nothing
//     if (completedLessons.includes(currentLesson._id)) {
//       return;
//     }
    
//     try {
//       const response = await api.post(`/progress/${courseId}/complete-lesson`, {
//         lessonId: currentLesson._id,
//         moduleId: currentModule._id,
//         moduleIndex: activeModuleIndex,
//         lessonIndex: activeLessonIndex
//       });
      
//       if (response.data.success) {
//         // Update completed lessons array
//         setCompletedLessons([...completedLessons, currentLesson._id]);
        
//         // Update overall progress
//         const totalLessons = course.modules.reduce((total, module) => 
//           total + module.lessons.length, 0);
//         const newProgress = Math.round(((completedLessons.length + 1) / totalLessons) * 100);
//         setProgress(newProgress);
        
//         toast.success('Progress saved');
//       } else {
//         throw new Error(response.data.message || 'Failed to update progress');
//       }
//     } catch (err) {
//       console.error('Error updating progress:', err);
//       toast.error('Failed to update progress');
//     }
//   };
  
//   const saveNotes = async () => {
//     if (!course) return;
    
//     try {
//       const currentModule = course.modules[activeModuleIndex];
//       const currentLesson = currentModule.lessons[activeLessonIndex];
      
//       const response = await api.post(`/progress/${courseId}/notes`, {
//         lessonId: currentLesson._id,
//         notes
//       });
      
//       if (response.data.success) {
//         toast.success('Notes saved successfully');
//       } else {
//         throw new Error(response.data.message || 'Failed to save notes');
//       }
//     } catch (err) {
//       console.error('Error saving notes:', err);
//       toast.error('Failed to save notes');
//     }
//   };
  
//   const navigateToNextLesson = () => {
//     if (!course) return;
    
//     const currentModule = course.modules[activeModuleIndex];
    
//     // If this is not the last lesson in the module
//     if (activeLessonIndex < currentModule.lessons.length - 1) {
//       setActiveLessonIndex(activeLessonIndex + 1);
//     } 
//     // If this is the last lesson in the module but not the last module
//     else if (activeModuleIndex < course.modules.length - 1) {
//       setActiveModuleIndex(activeModuleIndex + 1);
//       setActiveLessonIndex(0);
//     }
//     // Otherwise, we're at the end of the course
//     else {
//       toast.success('You have completed the course!');
//     }
//   };
  
//   const handleLessonClick = (moduleIndex, lessonIndex) => {
//     setActiveModuleIndex(moduleIndex);
//     setActiveLessonIndex(lessonIndex);
//   };

//   const toggleFullscreen = () => {
//     if (!videoContainerRef.current) return;
    
//     if (!document.fullscreenElement) {
//       videoContainerRef.current.requestFullscreen().catch(err => {
//         console.error(`Error attempting to enable fullscreen: ${err.message}`);
//       });
//     } else {
//       document.exitFullscreen();
//     }
//   };

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };
    
//     document.addEventListener('fullscreenchange', handleFullscreenChange);
    
//     return () => {
//       document.removeEventListener('fullscreenchange', handleFullscreenChange);
//     };
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="flex flex-col items-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
//           <p className="mt-4 text-lg text-gray-700">Loading course content...</p>
//         </div>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md" role="alert">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <h3 className="text-lg font-medium">Error Loading Course</h3>
//               <p className="mt-1">{error}</p>
//               <button
//                 className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 onClick={() => navigate('/dashboard/my-courses')}
//               >
//                 Return to My Courses
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   if (!course) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-lg shadow-md" role="alert">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <h3 className="text-lg font-medium">Course Not Found</h3>
//               <p className="mt-1">The course you're looking for couldn't be found.</p>
//               <button
//                 className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 onClick={() => navigate('/dashboard/my-courses')}
//               >
//                 Return to My Courses
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   const currentModule = course.modules[activeModuleIndex];
//   const currentLesson = currentModule.lessons[activeLessonIndex];
//   const isLessonCompleted = completedLessons.includes(currentLesson._id);
//   const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0);
//   const completedPercentage = Math.round((completedLessons.length / totalLessons) * 100);

//   // Count how many lessons are in each module for the UI
//   const moduleLessonCounts = course.modules.map(module => module.lessons.length);
  
//   // Calculate how many lessons are completed in each module
//   const moduleCompletedCounts = course.modules.map(module => 
//     module.lessons.filter(lesson => completedLessons.includes(lesson._id)).length
//   );

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       {/* Course header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="mr-4 p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
//               </svg>
//             </button>
//             <div>
//               <h1 className="text-xl font-bold text-gray-800 truncate max-w-xs md:max-w-lg">{course.title}</h1>
//               <div className="flex items-center mt-1">
//                 <div className="w-48 bg-gray-200 rounded-full h-2.5 mr-2">
//                   <div 
//                     className="bg-blue-600 h-2.5 rounded-full" 
//                     style={{ width: `${completedPercentage}%` }}
//                   ></div>
//                 </div>
//                 <span className="text-xs font-medium text-gray-600">{completedPercentage}% complete</span>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button 
//               onClick={() => navigate('/dashboard/my-courses')}
//               className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
//             >
//               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//               </svg>
//               Back to Courses
//             </button>
//           </div>
//         </div>
//       </div>
      
//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <div 
//           className={`bg-white border-r border-gray-200 w-80 flex-shrink-0 transition-all duration-300 transform ${
//             isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//           } fixed md:relative h-full z-10 md:translate-x-0 md:w-72 lg:w-80 xl:w-96 overflow-y-auto`}
//         >
//           <div className="p-4">
//             <div className="mb-4">
//               <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Course Content</h2>
//               <p className="text-sm text-gray-600 mt-1">
//                 {totalLessons} lessons • {completedLessons.length} completed ({completedPercentage}%)
//               </p>
//             </div>
            
//             <div className="space-y-3">
//               {course.modules.map((module, moduleIndex) => {
//                 const moduleCompleted = module.lessons.every(lesson => 
//                   completedLessons.includes(lesson._id)
//                 );
                
//                 return (
//                   <div key={module._id} className="border rounded-lg overflow-hidden shadow-sm bg-white">
//                     <div
//                       className={`p-3 cursor-pointer flex justify-between items-center border-l-4 ${
//                         moduleCompleted 
//                           ? 'border-green-500 bg-green-50' 
//                           : moduleIndex === activeModuleIndex 
//                             ? 'border-blue-500 bg-blue-50' 
//                             : 'border-transparent'
//                       }`}
//                       onClick={() => setActiveModuleIndex(moduleIndex)}
//                     >
//                       <div className="flex-1">
//                         <div className="flex items-center">
//                           <h3 className="font-medium text-gray-800">
//                             Module {moduleIndex + 1}: {module.title}
//                           </h3>
//                           {moduleCompleted && (
//                             <svg className="w-4 h-4 ml-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                           )}
//                         </div>
//                         <div className="flex items-center mt-1 text-xs text-gray-600">
//                           <span>{moduleCompletedCounts[moduleIndex]}/{moduleLessonCounts[moduleIndex]} lessons</span>
//                           <span className="mx-2">•</span>
//                           <span>{module.lessons.reduce((acc, lesson) => acc + (lesson.duration || 0), 0)} min</span>
//                         </div>
//                       </div>
//                       <svg
//                         className={`w-5 h-5 text-gray-500 transition-transform ${
//                           moduleIndex === activeModuleIndex ? 'transform rotate-180' : ''
//                         }`}
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M19 9l-7 7-7-7"
//                         />
//                       </svg>
//                     </div>
                    
//                     {moduleIndex === activeModuleIndex && (
//                       <div className="border-t border-gray-200">
//                         {module.lessons.map((lesson, lessonIndex) => {
//                           const isCompleted = completedLessons.includes(lesson._id);
//                           const isActive = lessonIndex === activeLessonIndex && moduleIndex === activeModuleIndex;
                          
//                           return (
//                             <div
//                               key={lesson._id}
//                               className={`p-3 cursor-pointer flex border-l-4 ${
//                                 isActive
//                                   ? 'bg-blue-100 border-blue-500'
//                                   : isCompleted
//                                     ? 'border-green-500 hover:bg-gray-50'
//                                     : 'border-transparent hover:bg-gray-50'
//                               }`}
//                               onClick={() => handleLessonClick(moduleIndex, lessonIndex)}
//                             >
//                               <div className="mr-3 mt-0.5">
//                                 {isCompleted ? (
//                                   <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                                   </svg>
//                                 ) : isActive ? (
//                                   <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
//                                   </svg>
//                                 ) : (
//                                   <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
//                                   </svg>
//                                 )}
//                               </div>
//                               <div className="flex-1">
//                                 <p className={`text-sm ${isActive ? 'font-medium text-blue-800' : isCompleted ? 'text-gray-600' : 'text-gray-800'}`}>
//                                   {lesson.title}
//                                 </p>
//                                 <div className="flex items-center mt-1 text-xs text-gray-500">
//                                   <span>
//                                     {lesson.type === 'video' && (
//                                       <div className="flex items-center">
//                                         <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
//                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                         Video
//                                       </div>
//                                     )}
//                                     {lesson.type === 'quiz' && (
//                                       <div className="flex items-center">
//                                         <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                         Quiz
//                                       </div>
//                                     )}
//                                     {lesson.type === 'assignment' && (
//                                       <div className="flex items-center">
//                                         <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                                         </svg>
//                                         Assignment
//                                       </div>
//                                     )}
//                                   </span>
//                                   {lesson.duration && (
//                                     <>
//                                       <span className="mx-1">•</span>
//                                       <span>{lesson.duration} min</span>
//                                     </>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
        
//         {/* Main Content */}
//         <div className="flex-1 overflow-auto">
//           <div className="bg-white rounded-lg shadow-sm">
//             {/* Video Player */}
//             {currentLesson.type === 'video' && (
//               <div className="relative bg-black" ref={videoContainerRef}>
//                 <div className={`${isFullscreen ? 'h-screen' : 'aspect-w-16 aspect-h-9'}`}>
//                   <iframe
//                     src={currentLesson.videoUrl || sampleVideos[activeModuleIndex % sampleVideos.length]}
//                     title={currentLesson.title}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                     className="w-full h-full"
//                   ></iframe>
//                 </div>
                
//                 <div className="absolute top-4 right-4 z-10 flex space-x-2">
//                   <button 
//                     onClick={toggleFullscreen}
//                     className="p-2 bg-black bg-opacity-50 text-white rounded hover:bg-opacity-70"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       {isFullscreen ? (
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                       ) : (
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
//                       )}
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             )}
            
//             {/* Quiz or Assignment */}
//             {currentLesson.type !== 'video' && (
//               <div className="p-8 bg-blue-50 rounded-t-lg">
//                 <div className="flex items-center text-blue-700 mb-4">
//                   <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     {currentLesson.type === 'quiz' ? (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                     ) : (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//                     )}
//                   </svg>
//                   <h3 className="font-bold text-lg">
//                     {currentLesson.type === 'quiz' ? 'Quiz' : 'Assignment'}: {currentLesson.title}
//                   </h3>
//                 </div>
//                 <p className="mb-6 text-gray-700">{currentLesson.content}</p>
//                 <button 
//                   className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
//                   onClick={() => window.open(`/dashboard/courses/${courseId}/${currentLesson.type}/${currentLesson._id}`, '_blank')}
//                 >
//                   Start {currentLesson.type === 'quiz' ? 'Quiz' : 'Assignment'}
//                 </button>
//               </div>
//             )}
            
//             {/* Lesson Details */}
//             <div className="p-8">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-800 mb-2">
//                     {currentLesson.title}
//                   </h1>
//                   <div className="flex items-center text-gray-600">
//                     <span className="mr-4">Module {activeModuleIndex + 1}, Lesson {activeLessonIndex + 1}</span>
//                     {currentLesson.duration && (
//                       <div className="flex items-center">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         {currentLesson.duration} min
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="mt-4 md:mt-0">
//                   {isLessonCompleted ? (
//                     <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-md font-medium">
//                       <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                       </svg>
//                       Completed
//                     </div>
//                   ) : (
//                     <button
//                       onClick={markLessonComplete}
//                       className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium inline-flex items-center"
//                     >
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                       </svg>
//                       Mark as Completed
//                     </button>
//                   )}
//                 </div>
//               </div>
              
//               <div className="prose max-w-none mb-8">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
//                 <p className="text-gray-700">{currentLesson.content}</p>
//               </div>
              
//               {/* Resources */}
//               {currentLesson.resources && currentLesson.resources.length > 0 && (
//                 <div className="mb-8">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-4">Resources</h2>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     {currentLesson.resources.map((resource, i) => (
//                       <div key={i} className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow">
//                         <div className="flex items-center">
//                           <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
//                             {resource.type === 'pdf' ? (
//                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                               </svg>
//                             ) : resource.type === 'exercise' ? (
//                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                               </svg>
//                             ) : (
//                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
//                               </svg>
//                             )}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <a 
//                               href={resource.url} 
//                               target="_blank" 
//                               rel="noopener noreferrer" 
//                               className="font-medium text-blue-600 hover:text-blue-800 truncate"
//                             >
//                               {resource.title}
//                             </a>
//                             <p className="text-sm text-gray-500 mt-1 capitalize">
//                               {resource.type} Resource
//                             </p>
//                           </div>
//                           <div>
//                             <a 
//                               href={resource.url} 
//                               target="_blank" 
//                               rel="noopener noreferrer"
//                               className="text-gray-400 hover:text-gray-600"
//                             >
//                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                               </svg>
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
              
//               {/* Notes */}
//               <div className="mb-8">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4">My Notes</h2>
//                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                   <textarea
//                     value={notes}
//                     onChange={(e) => setNotes(e.target.value)}
//                     className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
//                     placeholder="Take notes for this lesson..."
//                   ></textarea>
//                   <div className="mt-2 flex justify-end">
//                     <button
//                       onClick={saveNotes}
//                       className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium inline-flex items-center"
//                     >
//                       <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
//                       </svg>
//                       Save Notes
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Lesson Navigation */}
//               <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200">
//                 <button
//                   onClick={() => {
//                     if (activeLessonIndex > 0) {
//                       setActiveLessonIndex(activeLessonIndex - 1);
//                     } else if (activeModuleIndex > 0) {
//                       setActiveModuleIndex(activeModuleIndex - 1);
//                       const prevModule = course.modules[activeModuleIndex - 1];
//                       setActiveLessonIndex(prevModule.lessons.length - 1);
//                     }
//                   }}
//                   disabled={activeModuleIndex === 0 && activeLessonIndex === 0}
//                   className={`px-4 py-2 rounded-md mb-4 sm:mb-0 w-full sm:w-auto flex justify-center items-center ${
//                     activeModuleIndex === 0 && activeLessonIndex === 0
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//                   </svg>
//                   Previous Lesson
//                 </button>
                
//                 <button
//                   onClick={navigateToNextLesson}
//                   disabled={activeModuleIndex === course.modules.length - 1 && 
//                            activeLessonIndex === course.modules[course.modules.length - 1].lessons.length - 1}
//                   className={`px-4 py-2 rounded-md w-full sm:w-auto flex justify-center items-center ${
//                     activeModuleIndex === course.modules.length - 1 && 
//                     activeLessonIndex === course.modules[course.modules.length - 1].lessons.length - 1
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                       : 'bg-blue-600 text-white hover:bg-blue-700'
//                   }`}
//                 >
//                   Next Lesson
//                   <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseContent;


import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';

const CourseContent = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const videoContainerRef = useRef(null);

  // Sample videos - replace with your actual video content
  const sampleVideos = [
    "https://www.youtube.com/embed/rfscVS0vtbw?si=qAq-PH1Mhw1WLUIP", // Python tutorial
    "https://www.youtube.com/embed/8JJ101D3knE?si=Ek9Fct-mGZ2XGmKO", // JavaScript tutorial
    "https://www.youtube.com/embed/pQN-pnXPaVg?si=1uYhz3YaYhR4hR7s", // HTML CSS
    "https://www.youtube.com/embed/G3e-cpL7ofc?si=jkL7ZmBhJd10S9En", // HTML CSS course
    "https://www.youtube.com/embed/7S_tz1z_5bA?si=D9OKBvC4WvwVCOsq", // MySQL
    "https://www.youtube.com/embed/ok-plXXHlWw?si=Fn1GF1XKnEcxMlm_", // Python project
    "https://www.youtube.com/embed/OXGznpKZ_sA?si=TQW6CuoqQd11BJ1K", // Node.js
  ];

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch course details
        const courseResponse = await api.get(`/courses/${courseId}`);
        
        if (!courseResponse.data.success) {
          throw new Error('Failed to fetch course data');
        }
        
        const courseData = courseResponse.data.data;
        
        // If the course doesn't have modules, create some sample modules
        if (!courseData.modules || courseData.modules.length === 0) {
          courseData.modules = generateSampleModules();
        }
        
        setCourse(courseData);
        
        // Fetch progress data
        try {
          const progressResponse = await api.get(`/progress/${courseId}`);
          if (progressResponse.data.success) {
            const progressData = progressResponse.data.data;
            setCompletedLessons(progressData.completedLessons || []);
            setProgress(progressData.percentage || 0);
            
            // Set active module and lesson based on progress
            if (progressData.lastAccessedModule !== undefined && 
                progressData.lastAccessedLesson !== undefined) {
              setActiveModuleIndex(progressData.lastAccessedModule);
              setActiveLessonIndex(progressData.lastAccessedLesson);
            }
          }
        } catch (progressError) {
          console.error('Error fetching progress:', progressError);
          // Not critical, continue showing the course
        }
        
      } catch (err) {
        console.error('Error fetching course content:', err);
        setError('Failed to load course content. Please try again.');
        toast.error('Failed to load course content');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourseData();
  }, [courseId]);

  // Load notes when lesson changes
  useEffect(() => {
    const loadNotes = async () => {
      if (!course || !course.modules || !course.modules[activeModuleIndex]) return;
      
      try {
        const currentModule = course.modules[activeModuleIndex];
        if (!currentModule.lessons || !currentModule.lessons[activeLessonIndex]) return;
        
        const currentLesson = currentModule.lessons[activeLessonIndex];
        
        try {
          const response = await api.get(`/progress/${courseId}/notes/${currentLesson._id}`);
          if (response.data.success && response.data.data) {
            setNotes(response.data.data.content || '');
          } else {
            setNotes(''); // Reset notes for new lesson
          }
        } catch (err) {
          console.error('Error loading notes:', err);
          // If it's a 404, that's fine - it just means no notes yet
          if (err.response && err.response.status !== 404) {
            toast.error('Failed to load notes');
          }
          setNotes(''); // Reset notes on error
        }
      } catch (err) {
        console.error('Error in loadNotes function:', err);
        setNotes('');
      }
    };
    
    if (course && course.modules && course.modules.length > 0) {
      loadNotes();
    }
  }, [course, activeModuleIndex, activeLessonIndex, courseId]);
  
  const generateSampleModules = () => {
    return [
      {
        _id: 'module1',
        title: 'Introduction to the Course',
        description: 'Get started with the fundamentals',
        lessons: [
          {
            _id: 'lesson1',
            title: 'Course Overview',
            type: 'video',
            content: 'This lesson introduces you to the course structure and what you will learn.',
            videoUrl: sampleVideos[0],
            duration: 10,
            resources: [
              { title: 'Course Syllabus', url: '#', type: 'pdf' },
              { title: 'Recommended Resources', url: '#', type: 'link' }
            ]
          },
          {
            _id: 'lesson2',
            title: 'Getting Set Up',
            type: 'video',
            content: 'Learn how to set up your environment for this course.',
            videoUrl: sampleVideos[1],
            duration: 15,
            resources: [
              { title: 'Setup Guide', url: '#', type: 'pdf' }
            ]
          }
        ]
      },
      {
        _id: 'module2',
        title: 'Core Concepts',
        description: 'Learn the essential concepts',
        lessons: [
          {
            _id: 'lesson3',
            title: 'Understanding the Basics',
            type: 'video',
            content: 'This lesson covers the fundamental concepts that will be used throughout the course.',
            videoUrl: sampleVideos[2],
            duration: 20,
            resources: [
              { title: 'Basic Concepts PDF', url: '#', type: 'pdf' },
              { title: 'Practice Exercise', url: '#', type: 'exercise' }
            ]
          },
          {
            _id: 'lesson4',
            title: 'Advanced Techniques',
            type: 'video',
            content: 'Build upon the basics with more advanced techniques and strategies.',
            videoUrl: sampleVideos[3],
            duration: 25,
            resources: [
              { title: 'Advanced Techniques Guide', url: '#', type: 'pdf' },
              { title: 'Reference Material', url: '#', type: 'link' }
            ]
          }
        ]
      },
      {
        _id: 'module3',
        title: 'Practical Applications',
        description: 'Apply what you have learned to real-world scenarios',
        lessons: [
          {
            _id: 'lesson5',
            title: 'Case Study 1',
            type: 'video',
            content: 'Examine a real-world case study and apply the concepts from the course.',
            videoUrl: sampleVideos[4],
            duration: 30,
            resources: [
              { title: 'Case Study Materials', url: '#', type: 'pdf' },
              { title: 'Additional Resources', url: '#', type: 'link' }
            ]
          },
          {
            _id: 'lesson6',
            title: 'Project Work',
            type: 'assignment',
            content: 'Complete a project to demonstrate your understanding of the course material.',
            duration: 120,
            resources: [
              { title: 'Project Brief', url: '#', type: 'pdf' },
              { title: 'Submission Guidelines', url: '#', type: 'pdf' }
            ]
          },
          {
            _id: 'lesson7',
            title: 'Final Assessment',
            type: 'quiz',
            content: 'Take the final assessment to test your knowledge of the course content.',
            duration: 45,
            resources: [
              { title: 'Study Guide', url: '#', type: 'pdf' }
            ]
          }
        ]
      }
    ];
  };

  const markLessonComplete = async () => {
    if (!course) return;
    
    const currentModule = course.modules[activeModuleIndex];
    const currentLesson = currentModule.lessons[activeLessonIndex];
    
    // If lesson is already completed, do nothing
    if (completedLessons.includes(currentLesson._id)) {
      return;
    }
    
    try {
      const response = await api.post(`/progress/${courseId}/complete-lesson`, {
        lessonId: currentLesson._id,
        moduleId: currentModule._id,
        moduleIndex: activeModuleIndex,
        lessonIndex: activeLessonIndex
      });
      
      if (response.data.success) {
        // Update completed lessons array
        setCompletedLessons([...completedLessons, currentLesson._id]);
        
        // Update overall progress
        const totalLessons = course.modules.reduce((total, module) => 
          total + module.lessons.length, 0);
        const newProgress = Math.round(((completedLessons.length + 1) / totalLessons) * 100);
        setProgress(newProgress);
        
        toast.success('Progress saved');
      } else {
        throw new Error(response.data.message || 'Failed to update progress');
      }
    } catch (err) {
      console.error('Error updating progress:', err);
      toast.error('Failed to update progress');
    }
  };
  
  const saveNotes = async () => {
    if (!course || !notes.trim()) return;
    
    try {
      setIsSavingNotes(true);
      const currentModule = course.modules[activeModuleIndex];
      const currentLesson = currentModule.lessons[activeLessonIndex];
      
      const response = await api.post(`/progress/${courseId}/notes`, {
        lessonId: currentLesson._id,
        notes
      });
      
      if (response.data.success) {
        toast.success('Notes saved successfully');
      } else {
        throw new Error(response.data.message || 'Failed to save notes');
      }
    } catch (err) {
      console.error('Error saving notes:', err);
      toast.error('Failed to save notes');
    } finally {
      setIsSavingNotes(false);
    }
  };
  
  const navigateToNextLesson = () => {
    if (!course) return;
    
    const currentModule = course.modules[activeModuleIndex];
    
    // If this is not the last lesson in the module
    if (activeLessonIndex < currentModule.lessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    } 
    // If this is the last lesson in the module but not the last module
    else if (activeModuleIndex < course.modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
      setActiveLessonIndex(0);
    }
    // Otherwise, we're at the end of the course
    else {
      toast.success('You have completed the course!');
    }
  };
  
  const handleLessonClick = (moduleIndex, lessonIndex) => {
    setActiveModuleIndex(moduleIndex);
    setActiveLessonIndex(lessonIndex);
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-lg text-gray-700">Loading course content...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md" role="alert">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium">Error Loading Course</h3>
              <p className="mt-1">{error}</p>
              <button
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => navigate('/dashboard/my-courses')}
              >
                Return to My Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-lg shadow-md" role="alert">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium">Course Not Found</h3>
              <p className="mt-1">The course you're looking for couldn't be found.</p>
              <button
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => navigate('/dashboard/my-courses')}
              >
                Return to My Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const currentModule = course.modules[activeModuleIndex];
  const currentLesson = currentModule.lessons[activeLessonIndex];
  const isLessonCompleted = completedLessons.includes(currentLesson._id);
  const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0);
  const completedPercentage = Math.round((completedLessons.length / totalLessons) * 100);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Course header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4 p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800 truncate max-w-xs md:max-w-lg">{course.title}</h1>
              <div className="flex items-center mt-1">
                <div className="w-48 bg-gray-200 rounded-full h-2.5 mr-2">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${completedPercentage}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-600">{completedPercentage}% complete</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigate('/dashboard/my-courses')}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Courses
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 transform ${
            isSidebarOpen ? 'translate-x-0 w-full md:w-80' : '-translate-x-full w-0'
          } fixed md:relative h-[calc(100vh-65px)] z-10 md:translate-x-0 overflow-y-auto`}
          style={{ maxWidth: isSidebarOpen ? '300px' : '0px' }}
        >
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Course Content</h2>
              <p className="text-sm text-gray-600 mt-1">
                {totalLessons} lessons • {completedLessons.length} completed ({completedPercentage}%)
              </p>
            </div>
            
            <div className="space-y-3">
              {course.modules.map((module, moduleIndex) => {
                const moduleCompleted = module.lessons.every(lesson => 
                  completedLessons.includes(lesson._id)
                );
                
                return (
                  <div key={module._id} className="border rounded-lg overflow-hidden shadow-sm bg-white">
                    <div
                      className={`p-3 cursor-pointer flex justify-between items-center border-l-4 ${
                        moduleCompleted 
                          ? 'border-green-500 bg-green-50' 
                          : moduleIndex === activeModuleIndex 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-transparent'
                      }`}
                      onClick={() => setActiveModuleIndex(moduleIndex)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-800">
                            Module {moduleIndex + 1}: {module.title}
                          </h3>
                          {moduleCompleted && (
                            <svg className="w-4 h-4 ml-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex items-center mt-1 text-xs text-gray-600">
                          <span>
                            {module.lessons.filter(lesson => completedLessons.includes(lesson._id)).length}/
                            {module.lessons.length} lessons
                          </span>
                          <span className="mx-2">•</span>
                          <span>{module.lessons.reduce((acc, lesson) => acc + (lesson.duration || 0), 0)} min</span>
                        </div>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          moduleIndex === activeModuleIndex ? 'transform rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    
                    {moduleIndex === activeModuleIndex && (
                      <div className="border-t border-gray-200">
                        {module.lessons.map((lesson, lessonIndex) => {
                          const isCompleted = completedLessons.includes(lesson._id);
                          const isActive = lessonIndex === activeLessonIndex && moduleIndex === activeModuleIndex;
                          
                          return (
                            <div
                              key={lesson._id}
                              className={`p-3 cursor-pointer flex items-center hover:bg-gray-50 ${
                                isActive ? 'bg-blue-50' : ''
                              }`}
                              onClick={() => handleLessonClick(moduleIndex, lessonIndex)}
                            >
                              <div className="mr-3">
                                {isCompleted ? (
                                  <svg
                                    className="w-5 h-5 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                ) : (
                                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm ${isCompleted ? 'text-gray-600' : 'text-gray-800'}`}>
                                  {lesson.title}
                                </p>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <span className="mr-2">
                                    {lesson.type === 'video' && (
                                      <svg className="w-4 h-4 inline mr-1 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                    )}
                                    {lesson.type === 'quiz' && (
                                      <svg className="w-4 h-4 inline mr-1 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                    )}
                                    {lesson.type === 'assignment' && (
                                      <svg className="w-4 h-4 inline mr-1 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                      </svg>
                                    )}
                                    {lesson.type}
                                  </span>
                                  {lesson.duration && (
                                    <span>{lesson.duration} min</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto ml-0 md:ml-0 w-full">
  <div className="bg-white rounded-lg shadow-sm">
    {/* Video Player */}
    {currentLesson.type === 'video' && (
      <div className="relative bg-black" ref={videoContainerRef}>
        <div className={isFullscreen ? "h-screen w-full" : "relative w-full pt-[56.25%]"}>
          <iframe
            src={currentLesson.videoUrl || sampleVideos[activeModuleIndex % sampleVideos.length]}
            title={currentLesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={isFullscreen ? "absolute inset-0 w-full h-full" : "absolute inset-0 w-full h-full"}
          ></iframe>
        </div>
        
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <button 
            onClick={toggleFullscreen}
            className="p-2 bg-black bg-opacity-50 text-white rounded hover:bg-opacity-70 transition-colors"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isFullscreen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              )}
            </svg>
          </button>
        </div>
      </div>
    )}
    
    {/* Quiz */}
    {currentLesson.type === 'quiz' && (
      <div className="p-8 bg-blue-50 rounded-t-lg">
        <div className="flex items-center text-blue-700 mb-4">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h3 className="font-bold text-lg">Quiz: {currentLesson.title}</h3>
        </div>
        <p className="mb-6 text-gray-700">{currentLesson.content}</p>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h4 className="font-medium text-gray-700 mb-2">Quiz Details</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Duration: {currentLesson.duration || 15} minutes</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Questions: {currentLesson.questionCount || 10}</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Passing Score: {currentLesson.passingScore || 70}%</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Attempts: {currentLesson.maxAttempts || 'Unlimited'}</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200 flex flex-col justify-between">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Instructions</h4>
              <p className="text-sm text-gray-600">
                Complete the quiz to test your knowledge on this topic. 
                Read each question carefully and select the best answer.
              </p>
            </div>
            <button
              onClick={() => navigate(`/dashboard/courses/${courseId}/quiz/${currentLesson._id}`)}
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    )}
    
    {/* Assignment */}
    {currentLesson.type === 'assignment' && (
      <div className="p-8 bg-green-50 rounded-t-lg">
        <div className="flex items-center text-green-700 mb-4">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="font-bold text-lg">Assignment: {currentLesson.title}</h3>
        </div>
        <p className="mb-6 text-gray-700">{currentLesson.content}</p>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h4 className="font-medium text-gray-700 mb-2">Assignment Details</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Due Date: {currentLesson.dueDate ? new Date(currentLesson.dueDate).toLocaleDateString() : 'No deadline'}</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Estimated Time: {currentLesson.duration || 60} minutes</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Points: {currentLesson.points || 100}</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Submission Type: {currentLesson.submissionType || 'Text & File Upload'}</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200 flex flex-col justify-between">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Instructions</h4>
              <p className="text-sm text-gray-600">
                Complete this assignment to demonstrate your understanding. 
                Follow the instructions carefully and submit your work before the deadline.
              </p>
            </div>
            <button
              onClick={() => navigate(`/dashboard/courses/${courseId}/assignment/${currentLesson._id}`)}
              className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
            >
              View Assignment
            </button>
          </div>
        </div>
      </div>
    )}
            
            {/* Lesson Details */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {currentLesson.title}
                  </h1>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-4">Module {activeModuleIndex + 1}, Lesson {activeLessonIndex + 1}</span>
                    {currentLesson.duration && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {currentLesson.duration} min
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  {isLessonCompleted ? (
                    <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-md font-medium">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Completed
                    </div>
                  ) : (
                    <button
                      onClick={markLessonComplete}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium inline-flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Mark as Completed
                    </button>
                  )}
                </div>
              </div>
              
              <div className="prose max-w-none mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
                <p className="text-gray-700">{currentLesson.content}</p>
              </div>
              
              {/* Resources */}
              {currentLesson.resources && currentLesson.resources.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Resources</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentLesson.resources.map((resource, i) => (
                      <div key={i} className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                            {resource.type === 'pdf' ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            ) : resource.type === 'exercise' ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="font-medium text-blue-600 hover:text-blue-800 truncate"
                            >
                              {resource.title}
                            </a>
                            <p className="text-sm text-gray-500 mt-1 capitalize">
                              {resource.type} Resource
                            </p>
                          </div>
                          <div>
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Notes */}
              <div className="mb-8 bg-blue-50 p-5 rounded-lg border border-blue-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  My Notes
                </h2>
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 min-h-[150px] transition-all duration-200"
                    placeholder="Take notes for this lesson..."
                  ></textarea>
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={saveNotes}
                      disabled={isSavingNotes}
                      className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium inline-flex items-center ${
                        isSavingNotes 
                          ? 'bg-gray-400 text-white cursor-not-allowed' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isSavingNotes ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                          </svg>
                          Save Notes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Lesson Navigation */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200 gap-4">
                <button
                  onClick={() => {
                    if (activeLessonIndex > 0) {
                      setActiveLessonIndex(activeLessonIndex - 1);
                    } else if (activeModuleIndex > 0) {
                      setActiveModuleIndex(activeModuleIndex - 1);
                      const prevModule = course.modules[activeModuleIndex - 1];
                      setActiveLessonIndex(prevModule.lessons.length - 1);
                    }
                  }}
                  disabled={activeModuleIndex === 0 && activeLessonIndex === 0}
                  className={`px-4 py-2 rounded-md w-full sm:w-auto flex justify-center items-center ${
                    activeModuleIndex === 0 && activeLessonIndex === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors'
                  }`}
                  aria-label="Previous lesson"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous Lesson
                </button>
                
                <button
                  onClick={navigateToNextLesson}
                  disabled={activeModuleIndex === course.modules.length - 1 && 
                           activeLessonIndex === course.modules[course.modules.length - 1].lessons.length - 1}
                  className={`px-4 py-2 rounded-md w-full sm:w-auto flex justify-center items-center ${
                    activeModuleIndex === course.modules.length - 1 && 
                    activeLessonIndex === course.modules[course.modules.length - 1].lessons.length - 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
                  }`}
                  aria-label="Next lesson"
                >
                  Next Lesson
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;