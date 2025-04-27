// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { api } from '../../../services/api';
// import { useAuth } from '../../../contexts/AuthContext';
// import toast from 'react-hot-toast';
// import LoadingSpinner from '../../../components/common/LoadingSpinner';

// const CourseManager = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [course, setCourse] = useState(null);
//   const [modules, setModules] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [activeTab, setActiveTab] = useState('content');
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAddingModule, setIsAddingModule] = useState(false);
//   const [newModuleTitle, setNewModuleTitle] = useState('');
//   const [newModuleDescription, setNewModuleDescription] = useState('');
//   const [isAddingLesson, setIsAddingLesson] = useState(false);
//   const [activeModuleId, setActiveModuleId] = useState(null);
//   const [newLesson, setNewLesson] = useState({
//     title: '',
//     type: 'video',
//     content: '',
//     videoUrl: '',
//     duration: 0
//   });

//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await api.get(`/courses/${courseId}`);
        
//         if (!response.data.success) {
//           throw new Error('Failed to fetch course data');
//         }
        
//         const courseData = response.data.data;
//         setCourse(courseData);
//         setModules(courseData.modules || []);
        
//         // Fetch enrolled students
//         const studentsResponse = await api.get(`/courses/${courseId}/students`);
//         if (studentsResponse.data.success) {
//           setStudents(studentsResponse.data.data);
//         }
        
//       } catch (error) {
//         console.error('Error fetching course data:', error);
//         toast.error('Failed to load course data');
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchCourseData();
//   }, [courseId]);

//   const handleAddModule = async (e) => {
//     e.preventDefault();
    
//     if (!newModuleTitle.trim()) {
//       toast.error('Module title is required');
//       return;
//     }
    
//     try {
//       const response = await api.post(`/courses/${courseId}/modules`, {
//         title: newModuleTitle,
//         description: newModuleDescription
//       });
      
//       if (response.data.success) {
//         const newModule = response.data.data;
//         setModules([...modules, newModule]);
//         setNewModuleTitle('');
//         setNewModuleDescription('');
//         setIsAddingModule(false);
//         toast.success('Module added successfully');
//       } else {
//         throw new Error(response.data.message || 'Failed to add module');
//       }
//     } catch (error) {
//       console.error('Error adding module:', error);
//       toast.error('Failed to add module');
//     }
//   };

//   const handleAddLesson = async (e) => {
//     e.preventDefault();
    
//     if (!newLesson.title.trim()) {
//       toast.error('Lesson title is required');
//       return;
//     }
    
//     try {
//       const response = await api.post(`/courses/${courseId}/modules/${activeModuleId}/lessons`, newLesson);
      
//       if (response.data.success) {
//         // Update the modules state with the new lesson
//         const updatedModules = modules.map(module => {
//           if (module._id === activeModuleId) {
//             return {
//               ...module,
//               lessons: [...(module.lessons || []), response.data.data]
//             };
//           }
//           return module;
//         });
        
//         setModules(updatedModules);
//         setNewLesson({
//           title: '',
//           type: 'video',
//           content: '',
//           videoUrl: '',
//           duration: 0
//         });
//         setIsAddingLesson(false);
//         toast.success('Lesson added successfully');
//       } else {
//         throw new Error(response.data.message || 'Failed to add lesson');
//       }
//     } catch (error) {
//       console.error('Error adding lesson:', error);
//       toast.error('Failed to add lesson');
//     }
//   };

//   const handleCreateQuiz = (lessonId) => {
//     navigate(`/dashboard/tutor/create-quiz/${courseId}/${lessonId}`);
//   };

//   const handleCreateAssignment = (lessonId) => {
//     navigate(`/dashboard/tutor/create-assignment/${courseId}/${lessonId}`);
//   };

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   if (!course) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
//           <p className="font-bold">Course Not Found</p>
//           <p>The course you're looking for doesn't exist or you don't have permission to access it.</p>
//         </div>
//         <button 
//           onClick={() => navigate('/dashboard/my-courses')}
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Back to My Courses
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
//           <p className="text-gray-600 mt-1">{course.subtitle}</p>
//         </div>
//         <div className="mt-4 md:mt-0 flex space-x-3">
//           <button 
//             onClick={() => navigate(`/dashboard/courses/${courseId}/preview`)}
//             className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
//           >
//             Preview Course
//           </button>
//           <button 
//             onClick={() => navigate(`/dashboard/courses/${courseId}/edit`)}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Edit Course Details
//           </button>
//         </div>
//       </div>

//       {/* Course Status Badge */}
//       <div className="mb-6">
//         <span className={`px-3 py-1 text-sm font-medium rounded-full ${
//           course.isPublished 
//             ? 'bg-green-100 text-green-800' 
//             : 'bg-yellow-100 text-yellow-800'
//         }`}>
//           {course.isPublished ? 'Published' : 'Draft'}
//         </span>
//         {course.isPublished ? (
//           <button 
//             onClick={async () => {
//               try {
//                 await api.put(`/courses/${courseId}/unpublish`);
//                 setCourse({...course, isPublished: false});
//                 toast.success('Course unpublished');
//               } catch (error) {
//                 toast.error('Failed to unpublish course');
//               }
//             }}
//             className="ml-4 text-sm text-red-600 hover:text-red-800"
//           >
//             Unpublish
//           </button>
//         ) : (
//           <button 
//             onClick={async () => {
//               try {
//                 await api.put(`/courses/${courseId}/publish`);
//                 setCourse({...course, isPublished: true});
//                 toast.success('Course published');
//               } catch (error) {
//                 toast.error('Failed to publish course');
//               }
//             }}
//             className="ml-4 text-sm text-green-600 hover:text-green-800"
//           >
//             Publish
//           </button>
//         )}
//       </div>

//       {/* Tab Navigation */}
//       <div className="border-b border-gray-200 mb-6">
//         <nav className="-mb-px flex space-x-8">
//           <button
//             onClick={() => setActiveTab('content')}
//             className={`py-4 px-1 border-b-2 font-medium text-sm ${
//               activeTab === 'content'
//                 ? 'border-blue-500 text-blue-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             Course Content
//           </button>
//           <button
//             onClick={() => setActiveTab('students')}
//             className={`py-4 px-1 border-b-2 font-medium text-sm ${
//               activeTab === 'students'
//                 ? 'border-blue-500 text-blue-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             Students ({students.length})
//           </button>
//           <button
//             onClick={() => setActiveTab('quizzes')}
//             className={`py-4 px-1 border-b-2 font-medium text-sm ${
//               activeTab === 'quizzes'
//                 ? 'border-blue-500 text-blue-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             Quizzes & Assignments
//           </button>
//         </nav>
//       </div>

//       {/* Content Tab */}
//       {activeTab === 'content' && (
//         <div>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">Course Modules</h2>
//             <button
//               onClick={() => setIsAddingModule(true)}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//               Add Module
//             </button>
//           </div>

//           {isAddingModule && (
//             <div className="bg-gray-50 p-4 rounded-lg mb-6">
//               <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Module</h3>
//               <form onSubmit={handleAddModule}>
//                 <div className="mb-4">
//                   <label htmlFor="moduleTitle" className="block text-sm font-medium text-gray-700 mb-1">
//                     Module Title *
//                   </label>
//                   <input
//                     type="text"
//                     id="moduleTitle"
//                     value={newModuleTitle}
//                     onChange={(e) => setNewModuleTitle(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter module title"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="moduleDescription" className="block text-sm font-medium text-gray-700 mb-1">
//                     Module Description
//                   </label>
//                   <textarea
//                     id="moduleDescription"
//                     value={newModuleDescription}
//                     onChange={(e) => setNewModuleDescription(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter module description"
//                     rows="3"
//                   ></textarea>
//                 </div>
//                 <div className="flex justify-end space-x-2">
//                   <button
//                     type="button"
//                     onClick={() => setIsAddingModule(false)}
//                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                   >
//                     Add Module
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

//           {modules.length === 0 ? (
//             <div className="bg-white p-6 text-center rounded-lg border border-gray-200">
//               <p className="text-gray-500">No modules yet. Add your first module to get started.</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {modules.map((module) => (
//                 <div key={module._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                   <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
//                     <h3 className="text-lg font-medium text-gray-800">{module.title}</h3>
//                     <div className="flex items-center space-x-2">
//                       <button 
//                         onClick={() => {
//                           setActiveModuleId(module._id);
//                           setIsAddingLesson(true);
//                         }}
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         Add Lesson
//                       </button>
//                       <button className="text-gray-500 hover:text-gray-700">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
                  
//                   {isAddingLesson && activeModuleId === module._id && (
//                     <div className="p-4 bg-blue-50 border-b border-gray-200">
//                       <h4 className="text-md font-medium text-gray-800 mb-3">Add New Lesson</h4>
//                       <form onSubmit={handleAddLesson}>
//                         <div className="mb-3">
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Lesson Title *
//                           </label>
//                           <input
//                             type="text"
//                             value={newLesson.title}
//                             onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Enter lesson title"
//                             required
//                           />
//                         </div>
//                         <div className="mb-3">
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Lesson Type
//                           </label>
//                           <select
//                             value={newLesson.type}
//                             onChange={(e) => setNewLesson({...newLesson, type: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                           >
//                             <option value="video">Video</option>
//                             <option value="text">Text</option>
//                             <option value="quiz">Quiz</option>
//                             <option value="assignment">Assignment</option>
//                           </select>
//                         </div>
                        
//                         {newLesson.type === 'video' && (
//                           <div className="mb-3">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Video URL
//                             </label>
//                             <input
//                               type="text"
//                               value={newLesson.videoUrl}
//                               onChange={(e) => setNewLesson({...newLesson, videoUrl: e.target.value})}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                               placeholder="Enter YouTube embed URL"
//                             />
//                           </div>
//                         )}
                        
//                         <div className="mb-3">
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Content
//                           </label>
//                           <textarea
//                             value={newLesson.content}
//                             onChange={(e) => setNewLesson({...newLesson, content: e.target.value})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Enter lesson content"
//                             rows="3"
//                           ></textarea>
//                         </div>
                        
//                         <div className="mb-3">
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Duration (minutes)
//                           </label>
//                           <input
//                             type="number"
//                             value={newLesson.duration}
//                             onChange={(e) => setNewLesson({...newLesson, duration: parseInt(e.target.value, 10) || 0})}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                             min="0"
//                           />
//                         </div>
                        
//                         <div className="flex justify-end space-x-2">
//                           <button
//                             type="button"
//                             onClick={() => setIsAddingLesson(false)}
//                             className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm"
//                           >
//                             Cancel
//                           </button>
//                           <button
//                             type="submit"
//                             className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
//                           >
//                             Add Lesson
//                           </button>
//                         </div>
//                       </form>
//                     </div>
//                   )}
                  
//                   <div className="p-4">
//                     {module.description && (
//                       <p className="text-gray-600 text-sm mb-4">{module.description}</p>
//                     )}
                    
//                     {(!module.lessons || module.lessons.length === 0) ? (
//                       <p className="text-gray-500 text-sm italic">No lessons in this module yet.</p>
//                     ) : (
//                       <div className="space-y-2">
//                         {module.lessons.map((lesson, index) => (
//                           <div key={lesson._id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md">
//                             <div className="flex items-center">
//                               <span className="text-gray-500 text-sm mr-3">{index + 1}.</span>
//                               <div>
//                                 <h4 className="text-gray-800 font-medium">{lesson.title}</h4>
//                                 <div className="flex items-center text-xs text-gray-500 mt-1">
//                                   <span className="capitalize">{lesson.type}</span>
//                                   {lesson.duration > 0 && (
//                                     <>
//                                       <span className="mx-2">•</span>
//                                       <span>{lesson.duration} min</span>
//                                     </>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="flex space-x-2">
//                               {lesson.type === 'quiz' ? (
//                                 <button
//                                   onClick={() => handleCreateQuiz(lesson._id)}
//                                   className="text-blue-600 hover:text-blue-800 text-sm"
//                                 >
//                                   Manage Quiz
//                                 </button>
//                               ) : lesson.type === 'assignment' ? (
//                                 <button
//                                   onClick={() => handleCreateAssignment(lesson._id)}
//                                   className="text-blue-600 hover:text-blue-800 text-sm"
//                                 >
//                                   Manage Assignment
//                                 </button>
//                               ) : (
//                                 <button
//                                   onClick={() => {
//                                     // Open edit lesson modal/page
//                                   }}
//                                   className="text-gray-500 hover:text-gray-700"
//                                 >
//                                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                                   </svg>
//                                 </button>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Students Tab */}
//       {activeTab === 'students' && (
//         <div>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">Enrolled Students</h2>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search students..."
//                 className="px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//               <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>

//           {students.length === 0 ? (
//             <div className="bg-white p-6 text-center rounded-lg border border-gray-200">
//               <p className="text-gray-500">No students enrolled in this course yet.</p>
//             </div>
//           ) : (
//             <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Student
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Enrolled Date
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Progress
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {students.map((student) => (
//                     <tr key={student._id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10">
//                             {student.profilePicture ? (
//                               <img className="h-10 w-10 rounded-full" src={student.profilePicture} alt="" />
//                             ) : (
//                               <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
//                                 {student.firstName?.charAt(0) || student.email.charAt(0).toUpperCase()}
//                               </div>
//                             )}
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">
//                               {student.firstName} {student.lastName}
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               @{student.username || 'user'}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{student.email}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(student.enrolledDate).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="w-48 bg-gray-200 rounded-full h-2">
//                           <div 
//                             className="bg-blue-600 h-2 rounded-full" 
//                             style={{ width: `${student.progress || 0}%` }}
//                           ></div>
//                         </div>
//                         <div className="text-xs text-gray-500 mt-1">
//                           {student.progress || 0}% complete
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <button className="text-blue-600 hover:text-blue-900 mr-3">
//                           View Progress
//                         </button>
//                         <button className="text-red-600 hover:text-red-900">
//                           Remove
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Quizzes & Assignments Tab */}
//       {activeTab === 'quizzes' && (
//         <div>
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Quizzes</h2>
            
//             <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//               <div className="p-4 border-b border-gray-200 bg-gray-50">
//                 <h3 className="font-medium text-gray-800">Course Quizzes</h3>
//               </div>
              
//               <div className="p-6">
//                 {/* Quiz list will be populated here */}
//                 <div className="flex justify-center">
//                   <button
//                     onClick={() => navigate(`/dashboard/tutor/create-quiz/${courseId}`)}
//                     className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 flex items-center"
//                   >
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                     </svg>
//                     Create New Quiz
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Assignments</h2>
            
//             <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//               <div className="p-4 border-b border-gray-200 bg-gray-50">
//                 <h3 className="font-medium text-gray-800">Course Assignments</h3>
//               </div>
              
//               <div className="p-6">
//                 {/* Assignment list will be populated here */}
//                 <div className="flex justify-center">
//                   <button
//                     onClick={() => navigate(`/dashboard/tutor/create-assignment/${courseId}`)}
//                     className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 flex items-center"
//                   >
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                     </svg>
//                     Create New Assignment
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseManager;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';
import toast from 'react-hot-toast';

const CourseManagement = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, published, draft
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, alpha

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/courses/tutor');
        
        if (response.data.success) {
          setCourses(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to load courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handlePublishToggle = async (courseId, currentStatus) => {
    try {
      const response = await api.put(`/courses/${courseId}/publish`, {
        isPublished: !currentStatus
      });
      
      if (response.data.success) {
        setCourses(courses.map(course => 
          course._id === courseId 
            ? { ...course, isPublished: !currentStatus } 
            : course
        ));
        
        toast.success(`Course ${!currentStatus ? 'published' : 'unpublished'} successfully`);
      }
    } catch (error) {
      console.error('Error toggling course publish status:', error);
      toast.error('Failed to update course status');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await api.delete(`/courses/${courseId}`);
      
      if (response.data.success) {
        setCourses(courses.filter(course => course._id !== courseId));
        toast.success('Course deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
    }
  };

  // Filter and sort courses
  const filteredCourses = courses
    .filter(course => {
      if (filter === 'published') return course.isPublished;
      if (filter === 'draft') return !course.isPublished;
      return true;
    })
    .filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'alpha') return a.title.localeCompare(b.title);
      return 0;
    });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Course Management</h1>
        <Link
          to="/dashboard/tutor/courses/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create New Course
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div>
              <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Courses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="alpha">Alphabetical</option>
              </select>
            </div>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Courses List */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">No courses found</p>
          {courses.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search</p>
          )}
          {courses.length === 0 && (
            <Link 
              to="/dashboard/tutor/courses/create" 
              className="mt-4 inline-block text-blue-600 hover:text-blue-800"
            >
              Create your first course
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                          {course.thumbnail ? (
                            <img src={course.thumbnail} alt={course.title} className="h-10 w-10 rounded object-cover" />
                          ) : (
                            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            <Link to={`/dashboard/tutor/courses/${course._id}`} className="hover:text-blue-600">
                              {course.title}
                            </Link>
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {course.description || 'No description'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.enrolledCount || 0}</div>
                      <div className="text-xs text-gray-500">enrolled</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        course.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {course.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handlePublishToggle(course._id, course.isPublished)}
                          className={`px-2 py-1 rounded ${
                            course.isPublished
                              ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50'
                              : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                          }`}
                        >
                          {course.isPublished ? 'Unpublish' : 'Publish'}
                        </button>
                        <Link
                          to={`/dashboard/tutor/courses/${course._id}/edit`}
                          className="px-2 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteCourse(course._id)}
                          className="px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;