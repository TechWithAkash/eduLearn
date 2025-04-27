// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { api } from '../../../services/api';
// import { useAuth } from '../../../contexts/AuthContext';
// import toast from 'react-hot-toast';
// import LoadingSpinner from '../../../components/common/LoadingSpinner';

// const CreateAssignment = () => {
//   const { courseId, lessonId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [course, setCourse] = useState(null);
//   const [lesson, setLesson] = useState(null);
  
//   const [assignmentData, setAssignmentData] = useState({
//     title: '',
//     description: '',
//     instructions: '',
//     dueDate: '',
//     totalPoints: 100,
//     submissionType: 'text',
//     allowedFileTypes: ['pdf', 'doc', 'docx'],
//     isPublished: false
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
        
//         // Fetch course details
//         const courseResponse = await api.get(`/courses/${courseId}`);
//         if (!courseResponse.data.success) {
//           throw new Error('Failed to fetch course data');
//         }
//         setCourse(courseResponse.data.data);
        
//         // If we have a lessonId, try to find the specific lesson
//         if (lessonId) {
//           // Find the module containing this lesson
//           let foundLesson = null;
//           for (const module of courseResponse.data.data.modules) {
//             const lesson = module.lessons.find(l => l._id === lessonId);
//             if (lesson) {
//               foundLesson = lesson;
//               break;
//             }
//           }
          
//           if (foundLesson) {
//             setLesson(foundLesson);
//             // If this lesson already has an assignment, fetch it
//             try {
//               const assignmentResponse = await api.get(`/assignments/lesson/${lessonId}`);
//               if (assignmentResponse.data.success && assignmentResponse.data.data) {
//                 // Format the date for the input field
//                 const assignmentWithFormattedDate = {
//                   ...assignmentResponse.data.data,
//                   dueDate: assignmentResponse.data.data.dueDate 
//                     ? new Date(assignmentResponse.data.data.dueDate).toISOString().split('T')[0]
//                     : ''
//                 };
//                 setAssignmentData(assignmentWithFormattedDate);
//               }
//             } catch (error) {
//               // If no assignment exists for this lesson, that's ok - we'll create a new one
//               console.log('No existing assignment found for this lesson');
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Failed to load course data');
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchData();
//   }, [courseId, lessonId]);

//   const handleFileTypeChange = (fileType) => {
//     const updatedFileTypes = [...assignmentData.allowedFileTypes];
    
//     if (updatedFileTypes.includes(fileType)) {
//       // Remove the file type
//       const index = updatedFileTypes.indexOf(fileType);
//       updatedFileTypes.splice(index, 1);
//     } else {
//       // Add the file type
//       updatedFileTypes.push(fileType);
//     }
    
//     setAssignmentData({
//       ...assignmentData,
//       allowedFileTypes: updatedFileTypes
//     });
//   };

//   const validateAssignment = () => {
//     if (!assignmentData.title.trim()) {
//       toast.error('Assignment title is required');
//       return false;
//     }
    
//     if (!assignmentData.description.trim()) {
//       toast.error('Assignment description is required');
//       return false;
//     }
    
//     if (!assignmentData.instructions.trim()) {
//       toast.error('Assignment instructions are required');
//       return false;
//     }
    
//     if (assignmentData.submissionType === 'file' && assignmentData.allowedFileTypes.length === 0) {
//       toast.error('At least one file type must be allowed');
//       return false;
//     }
    
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateAssignment()) {
//       return;
//     }
    
//     try {
//       setIsSaving(true);
      
//       const submitData = {
//         ...assignmentData,
//         courseId,
//         lessonId,
//         createdBy: user._id
//       };
      
//       let response;
//       if (assignmentData._id) {
//         // Update existing assignment
//         response = await api.put(`/assignments/${assignmentData._id}`, submitData);
//       } else {
//         // Create new assignment
//         response = await api.post('/assignments', submitData);
//       }
      
//       if (response.data.success) {
//         toast.success(assignmentData._id ? 'Assignment updated successfully' : 'Assignment created successfully');
//         navigate(`/dashboard/tutor/courses/${courseId}`);
//       } else {
//         throw new Error(response.data.message || 'Failed to save assignment');
//       }
//     } catch (error) {
//       console.error('Error saving assignment:', error);
//       toast.error('Failed to save assignment');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">{assignmentData._id ? 'Edit Assignment' : 'Create Assignment'}</h1>
//         {course && (
//           <p className="text-gray-600 mt-1">
//             For course: {course.title}
//             {lesson && ` > ${lesson.title}`}
//           </p>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <div className="grid grid-cols-1 gap-6">
//             <div>
//               <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                 Assignment Title *
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 value={assignmentData.title}
//                 onChange={(e) => setAssignmentData({...assignmentData, title: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter assignment title"
//                 required
//               />
//             </div>
            
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                 Description *
//               </label>
//               <textarea
//                 id="description"
//                 value={assignmentData.description}
//                 onChange={(e) => setAssignmentData({...assignmentData, description: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter a brief description"
//                 rows="2"
//                 required
//               ></textarea>
//             </div>
            
//             <div>
//               <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
//                 Instructions *
//               </label>
//               <textarea
//                 id="instructions"
//                 value={assignmentData.instructions}
//                 onChange={(e) => setAssignmentData({...assignmentData, instructions: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter detailed instructions for students"
//                 rows="6"
//                 required
//               ></textarea>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
//                   Due Date
//                 </label>
//                 <input
//                   type="date"
//                   id="dueDate"
//                   value={assignmentData.dueDate}
//                   onChange={(e) => setAssignmentData({...assignmentData, dueDate: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="totalPoints" className="block text-sm font-medium text-gray-700 mb-1">
//                   Total Points
//                 </label>
//                 <input
//                   type="number"
//                   id="totalPoints"
//                   value={assignmentData.totalPoints}
//                   onChange={(e) => setAssignmentData({...assignmentData, totalPoints: parseInt(e.target.value, 10) || 0})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   min="0"
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Submission Type
//               </label>
//               <div className="mt-2 space-y-2">
//                 <div className="flex items-center">
//                   <input
//                     id="submissionTypeText"
//                     name="submissionType"
//                     type="radio"
//                     value="text"
//                     checked={assignmentData.submissionType === 'text'}
//                     onChange={() => setAssignmentData({...assignmentData, submissionType: 'text'})}
//                     className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
//                   />
//                   <label htmlFor="submissionTypeText" className="ml-2 block text-sm text-gray-900">
//                     Text Submission
//                   </label>
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     id="submissionTypeFile"
//                     name="submissionType"
//                     type="radio"
//                     value="file"
//                     checked={assignmentData.submissionType === 'file'}
//                     onChange={() => setAssignmentData({...assignmentData, submissionType: 'file'})}
//                     className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
//                   />
//                   <label htmlFor="submissionTypeFile" className="ml-2 block text-sm text-gray-900">
//                     File Upload
//                   </label>
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     id="submissionTypeBoth"
//                     name="submissionType"
//                     type="radio"
//                     value="both"
//                     checked={assignmentData.submissionType === 'both'}
//                     onChange={() => setAssignmentData({...assignmentData, submissionType: 'both'})}
//                     className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
//                   />
//                   <label htmlFor="submissionTypeBoth" className="ml-2 block text-sm text-gray-900">
//                     Both (Text and File)
//                   </label>
//                 </div>
//               </div>
//             </div>
            
//             {(assignmentData.submissionType === 'file' || assignmentData.submissionType === 'both') && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Allowed File Types
//                 </label>
//                 <div className="mt-2 flex flex-wrap gap-2">
//                   {['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'zip', 'txt'].map((fileType) => (
//                     <div key={fileType} className="flex items-center">
//                       <input
//                         id={`fileType${fileType}`}
//                         type="checkbox"
//                         checked={assignmentData.allowedFileTypes.includes(fileType)}
//                         onChange={() => handleFileTypeChange(fileType)}
//                         className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
//                       />
//                       <label htmlFor={`fileType${fileType}`} className="ml-2 mr-4 text-sm text-gray-900">
//                         .{fileType}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div className="p-6 flex justify-between">
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="isPublished"
//               checked={assignmentData.isPublished}
//               onChange={(e) => setAssignmentData({...assignmentData, isPublished: e.target.checked})}
//               className="focus// filepath: d:\LMS\client\src\pages\dashboard\tutor\CreateAssignment.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { api } from '../../../services/api';
// import { useAuth } from '../../../contexts/AuthContext';
// import toast from 'react-hot-toast';
// import LoadingSpinner from '../../../components/common/LoadingSpinner';

// const CreateAssignment = () => {
//   const { courseId, lessonId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [course, setCourse] = useState(null);
//   const [lesson, setLesson] = useState(null);
  
//   const [assignmentData, setAssignmentData] = useState({
//     title: '',
//     description: '',
//     instructions: '',
//     dueDate: '',
//     totalPoints: 100,
//     submissionType: 'text',
//     allowedFileTypes: ['pdf', 'doc', 'docx'],
//     isPublished: false
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
        
//         // Fetch course details
//         const courseResponse = await api.get(`/courses/${courseId}`);
//         if (!courseResponse.data.success) {
//           throw new Error('Failed to fetch course data');
//         }
//         setCourse(courseResponse.data.data);
        
//         // If we have a lessonId, try to find the specific lesson
//         if (lessonId) {
//           // Find the module containing this lesson
//           let foundLesson = null;
//           for (const module of courseResponse.data.data.modules) {
//             const lesson = module.lessons.find(l => l._id === lessonId);
//             if (lesson) {
//               foundLesson = lesson;
//               break;
//             }
//           }
          
//           if (foundLesson) {
//             setLesson(foundLesson);
//             // If this lesson already has an assignment, fetch it
//             try {
//               const assignmentResponse = await api.get(`/assignments/lesson/${lessonId}`);
//               if (assignmentResponse.data.success && assignmentResponse.data.data) {
//                 // Format the date for the input field
//                 const assignmentWithFormattedDate = {
//                   ...assignmentResponse.data.data,
//                   dueDate: assignmentResponse.data.data.dueDate 
//                     ? new Date(assignmentResponse.data.data.dueDate).toISOString().split('T')[0]
//                     : ''
//                 };
//                 setAssignmentData(assignmentWithFormattedDate);
//               }
//             } catch (error) {
//               // If no assignment exists for this lesson, that's ok - we'll create a new one
//               console.log('No existing assignment found for this lesson');
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Failed to load course data');
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchData();
//   }, [courseId, lessonId]);

//   const handleFileTypeChange = (fileType) => {
//     const updatedFileTypes = [...assignmentData.allowedFileTypes];
    
//     if (updatedFileTypes.includes(fileType)) {
//       // Remove the file type
//       const index = updatedFileTypes.indexOf(fileType);
//       updatedFileTypes.splice(index, 1);
//     } else {
//       // Add the file type
//       updatedFileTypes.push(fileType);
//     }
    
//     setAssignmentData({
//       ...assignmentData,
//       allowedFileTypes: updatedFileTypes
//     });
//   };

//   const validateAssignment = () => {
//     if (!assignmentData.title.trim()) {
//       toast.error('Assignment title is required');
//       return false;
//     }
    
//     if (!assignmentData.description.trim()) {
//       toast.error('Assignment description is required');
//       return false;
//     }
    
//     if (!assignmentData.instructions.trim()) {
//       toast.error('Assignment instructions are required');
//       return false;
//     }
    
//     if (assignmentData.submissionType === 'file' && assignmentData.allowedFileTypes.length === 0) {
//       toast.error('At least one file type must be allowed');
//       return false;
//     }
    
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateAssignment()) {
//       return;
//     }
    
//     try {
//       setIsSaving(true);
      
//       const submitData = {
//         ...assignmentData,
//         courseId,
//         lessonId,
//         createdBy: user._id
//       };
      
//       let response;
//       if (assignmentData._id) {
//         // Update existing assignment
//         response = await api.put(`/assignments/${assignmentData._id}`, submitData);
//       } else {
//         // Create new assignment
//         response = await api.post('/assignments', submitData);
//       }
      
//       if (response.data.success) {
//         toast.success(assignmentData._id ? 'Assignment updated successfully' : 'Assignment created successfully');
//         navigate(`/dashboard/tutor/courses/${courseId}`);
//       } else {
//         throw new Error(response.data.message || 'Failed to save assignment');
//       }
//     } catch (error) {
//       console.error('Error saving assignment:', error);
//       toast.error('Failed to save assignment');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">{assignmentData._id ? 'Edit Assignment' : 'Create Assignment'}</h1>
//         {course && (
//           <p className="text-gray-600 mt-1">
//             For course: {course.title}
//             {lesson && ` > ${lesson.title}`}
//           </p>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <div className="grid grid-cols-1 gap-6">
//             <div>
//               <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                 Assignment Title *
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 value={assignmentData.title}
//                 onChange={(e) => setAssignmentData({...assignmentData, title: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter assignment title"
//                 required
//               />
//             </div>
            
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                 Description *
//               </label>
//               <textarea
//                 id="description"
//                 value={assignmentData.description}
//                 onChange={(e) => setAssignmentData({...assignmentData, description: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter a brief description"
//                 rows="2"
//                 required
//               ></textarea>
//             </div>
            
//             <div>
//               <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
//                 Instructions *
//               </label>
//               <textarea
//                 id="instructions"
//                 value={assignmentData.instructions}
//                 onChange={(e) => setAssignmentData({...assignmentData, instructions: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter detailed instructions for students"
//                 rows="6"
//                 required
//               ></textarea>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
//                   Due Date
//                 </label>
//                 <input
//                   type="date"
//                   id="dueDate"
//                   value={assignmentData.dueDate}
//                   onChange={(e) => setAssignmentData({...assignmentData, dueDate: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="totalPoints" className="block text-sm font-medium text-gray-700 mb-1">
//                   Total Points
//                 </label>
//                 <input
//                   type="number"
//                   id="totalPoints"
//                   value={assignmentData.totalPoints}
//                   onChange={(e) => setAssignmentData({...assignmentData, totalPoints: parseInt(e.target.value, 10) || 0})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   min="0"
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Submission Type
//               </label>
//               <div className="mt-2 space-y-2">
//                 <div className="flex items-center">
//                   <input
//                     id="submissionTypeText"
//                     name="submissionType"
//                     type="radio"
//                     value="text"
//                     checked={assignmentData.submissionType === 'text'}
//                     onChange={() => setAssignmentData({...assignmentData, submissionType: 'text'})}
//                     className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
//                   />
//                   <label htmlFor="submissionTypeText" className="ml-2 block text-sm text-gray-900">
//                     Text Submission
//                   </label>
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     id="submissionTypeFile"
//                     name="submissionType"
//                     type="radio"
//                     value="file"
//                     checked={assignmentData.submissionType === 'file'}
//                     onChange={() => setAssignmentData({...assignmentData, submissionType: 'file'})}
//                     className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
//                   />
//                   <label htmlFor="submissionTypeFile" className="ml-2 block text-sm text-gray-900">
//                     File Upload
//                   </label>
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     id="submissionTypeBoth"
//                     name="submissionType"
//                     type="radio"
//                     value="both"
//                     checked={assignmentData.submissionType === 'both'}
//                     onChange={() => setAssignmentData({...assignmentData, submissionType: 'both'})}
//                     className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
//                   />
//                   <label htmlFor="submissionTypeBoth" className="ml-2 block text-sm text-gray-900">
//                     Both (Text and File)
//                   </label>
//                 </div>
//               </div>
//             </div>
            
//             {(assignmentData.submissionType === 'file' || assignmentData.submissionType === 'both') && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Allowed File Types
//                 </label>
//                 <div className="mt-2 flex flex-wrap gap-2">
//                   {['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'zip', 'txt'].map((fileType) => (
//                     <div key={fileType} className="flex items-center">
//                       <input
//                         id={`fileType${fileType}`}
//                         type="checkbox"
//                         checked={assignmentData.allowedFileTypes.includes(fileType)}
//                         onChange={() => handleFileTypeChange(fileType)}
//                         className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
//                       />
//                       <label htmlFor={`fileType${fileType}`} className="ml-2 mr-4 text-sm text-gray-900">
//                         .{fileType}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div className="p-6 flex justify-between">
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="isPublished"
//               checked={assignmentData.isPublished}
//               onChange={(e) => setAssignmentData({...assignmentData, isPublished: e.target.checked})}
//               className="focus


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';
import toast from 'react-hot-toast';

const CreateAssignment = () => {
  const { id } = useParams(); // For edit mode
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(id ? true : false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [editMode, setEditMode] = useState(!!id);
  
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    instructions: '',
    courseId: '',
    moduleId: '',
    lessonId: '',
    dueDate: '',
    totalPoints: 100,
    submissionType: 'text',
    allowedFileTypes: ['pdf', 'doc', 'docx'],
    isPublished: false
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses/tutor');
        setCourses(response.data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to load courses');
      }
    };

    fetchCourses();

    if (id) {
      const fetchAssignment = async () => {
        try {
          setIsLoading(true);
          const response = await api.get(`/assignments/${id}`);
          const assignment = response.data.data;
          
          setAssignmentData(assignment);
          
          // Load course modules
          if (assignment.courseId) {
            await fetchCourseModules(assignment.courseId);
            setSelectedCourse(courses.find(c => c._id === assignment.courseId));
          }
        } catch (error) {
          console.error('Error fetching assignment:', error);
          toast.error('Failed to load assignment details');
          navigate('/dashboard/assignments');
        } finally {
          setIsLoading(false);
        }
      };

      fetchAssignment();
    }
  }, [id, navigate]);

  const fetchCourseModules = async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}`);
      setModules(response.data.data.modules || []);
    } catch (error) {
      console.error('Error fetching course modules:', error);
      toast.error('Failed to load course modules');
    }
  };

  const handleCourseChange = async (e) => {
    const courseId = e.target.value;
    setAssignmentData({
      ...assignmentData,
      courseId,
      moduleId: '',
      lessonId: ''
    });
    
    if (courseId) {
      await fetchCourseModules(courseId);
    } else {
      setModules([]);
    }
  };

  const handleModuleChange = (e) => {
    const moduleId = e.target.value;
    const selectedModule = modules.find(m => m._id === moduleId);
    
    setAssignmentData({
      ...assignmentData,
      moduleId,
      lessonId: '',
      lessons: selectedModule ? selectedModule.lessons : []
    });
  };

  const handleFileTypeChange = (fileType) => {
    let updatedFileTypes;
    
    if (assignmentData.allowedFileTypes.includes(fileType)) {
      updatedFileTypes = assignmentData.allowedFileTypes.filter(type => type !== fileType);
    } else {
      updatedFileTypes = [...assignmentData.allowedFileTypes, fileType];
    }
    
    setAssignmentData({
      ...assignmentData,
      allowedFileTypes: updatedFileTypes
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!assignmentData.title || !assignmentData.courseId) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      if (editMode) {
        await api.put(`/assignments/${id}`, assignmentData);
        toast.success('Assignment updated successfully');
      } else {
        await api.post('/assignments', assignmentData);
        toast.success('Assignment created successfully');
      }
      
      navigate('/dashboard/assignments');
    } catch (error) {
      console.error('Error saving assignment:', error);
      toast.error(error.response?.data?.message || 'Failed to save assignment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {editMode ? 'Edit Assignment' : 'Create New Assignment'}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-blue-600 text-white">
          <h2 className="text-xl font-bold">Assignment Details</h2>
          <p className="text-blue-100 mt-1">
            Create clear instructions and set appropriate expectations for your students.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Assignment Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={assignmentData.title}
                  onChange={(e) => setAssignmentData({...assignmentData, title: e.target.value})}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter assignment title"
                  required
                />
              </div>
              
              <div className="col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  value={assignmentData.description}
                  onChange={(e) => setAssignmentData({...assignmentData, description: e.target.value})}
                  rows="2"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the assignment"
                  required
                ></textarea>
              </div>
              
              <div className="col-span-2">
                <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Instructions <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="instructions"
                  value={assignmentData.instructions}
                  onChange={(e) => setAssignmentData({...assignmentData, instructions: e.target.value})}
                  rows="6"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Provide detailed instructions for completing the assignment"
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                  Course <span className="text-red-500">*</span>
                </label>
                <select
                  id="course"
                  value={assignmentData.courseId}
                  onChange={handleCourseChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>{course.title}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  id="dueDate"
                  value={assignmentData.dueDate ? new Date(assignmentData.dueDate).toISOString().slice(0, 16) : ''}
                  onChange={(e) => setAssignmentData({...assignmentData, dueDate: e.target.value})}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="module" className="block text-sm font-medium text-gray-700 mb-1">
                  Module
                </label>
                <select
                  id="module"
                  value={assignmentData.moduleId}
                  onChange={handleModuleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={!assignmentData.courseId}
                >
                  <option value="">Select a module</option>
                  {modules.map(module => (
                    <option key={module._id} value={module._id}>{module.title}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="lesson" className="block text-sm font-medium text-gray-700 mb-1">
                  Lesson
                </label>
                <select
                  id="lesson"
                  value={assignmentData.lessonId}
                  onChange={(e) => setAssignmentData({...assignmentData, lessonId: e.target.value})}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={!assignmentData.moduleId}
                >
                  <option value="">Select a lesson</option>
                  {assignmentData.moduleId && modules.find(m => m._id === assignmentData.moduleId)?.lessons.map(lesson => (
                    <option key={lesson._id} value={lesson._id}>{lesson.title}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="totalPoints" className="block text-sm font-medium text-gray-700 mb-1">
                  Total Points
                </label>
                <input
                  type="number"
                  id="totalPoints"
                  value={assignmentData.totalPoints}
                  onChange={(e) => setAssignmentData({...assignmentData, totalPoints: parseInt(e.target.value) || 0})}
                  min="0"
                  max="1000"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Submission Settings</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Submission Type
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="submissionTypeText"
                      name="submissionType"
                      type="radio"
                      checked={assignmentData.submissionType === 'text'}
                      onChange={() => setAssignmentData({...assignmentData, submissionType: 'text'})}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="submissionTypeText" className="ml-2 block text-sm text-gray-700">
                      Text submission
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="submissionTypeFile"
                      name="submissionType"
                      type="radio"
                      checked={assignmentData.submissionType === 'file'}
                      onChange={() => setAssignmentData({...assignmentData, submissionType: 'file'})}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="submissionTypeFile" className="ml-2 block text-sm text-gray-700">
                      File upload
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="submissionTypeBoth"
                      name="submissionType"
                      type="radio"
                      checked={assignmentData.submissionType === 'both'}
                      onChange={() => setAssignmentData({...assignmentData, submissionType: 'both'})}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="submissionTypeBoth" className="ml-2 block text-sm text-gray-700">
                      Both text and file
                    </label>
                  </div>
                </div>
              </div>
              
              {(assignmentData.submissionType === 'file' || assignmentData.submissionType === 'both') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allowed File Types
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif', 'zip', 'txt'].map(fileType => (
                      <div key={fileType} className="flex items-center">
                        <input
                          id={`fileType-${fileType}`}
                          type="checkbox"
                          checked={assignmentData.allowedFileTypes.includes(fileType)}
                          onChange={() => handleFileTypeChange(fileType)}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label htmlFor={`fileType-${fileType}`} className="ml-2 block text-sm text-gray-700">
                          .{fileType}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-6 flex justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                checked={assignmentData.isPublished}
                onChange={(e) => setAssignmentData({...assignmentData, isPublished: e.target.checked})}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                Publish assignment immediately
              </label>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => navigate('/dashboard/assignments')}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-white ${
                  isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                } border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  `${editMode ? 'Update' : 'Create'} Assignment`
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;