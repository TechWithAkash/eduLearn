// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { api } from '../../../services/api';
// import { useAuth } from '../../../contexts/AuthContext';
// import toast from 'react-hot-toast';
// import LoadingSpinner from '../../../components/common/LoadingSpinner';

// const CreateQuiz = () => {
//   const { courseId, lessonId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [course, setCourse] = useState(null);
//   const [lesson, setLesson] = useState(null);
  
//   const [quizData, setQuizData] = useState({
//     title: '',
//     description: '',
//     timeLimit: 30,
//     passingScore: 70,
//     questions: [
//       {
//         question: '',
//         options: ['', '', '', ''],
//         correctAnswer: 0
//       }
//     ],
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
//             // If this lesson already has a quiz, fetch it
//             try {
//               const quizResponse = await api.get(`/quizzes/lesson/${lessonId}`);
//               if (quizResponse.data.success && quizResponse.data.data) {
//                 setQuizData(quizResponse.data.data);
//               }
//             } catch (error) {
//               // If no quiz exists for this lesson, that's ok - we'll create a new one
//               console.log('No existing quiz found for this lesson');
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

//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = [...quizData.questions];
//     updatedQuestions[index] = {
//       ...updatedQuestions[index],
//       [field]: value
//     };
//     setQuizData({
//       ...quizData,
//       questions: updatedQuestions
//     });
//   };

//   const handleOptionChange = (questionIndex, optionIndex, value) => {
//     const updatedQuestions = [...quizData.questions];
//     updatedQuestions[questionIndex].options[optionIndex] = value;
//     setQuizData({
//       ...quizData,
//       questions: updatedQuestions
//     });
//   };

//   const handleCorrectAnswerChange = (questionIndex, value) => {
//     const updatedQuestions = [...quizData.questions];
//     updatedQuestions[questionIndex].correctAnswer = parseInt(value, 10);
//     setQuizData({
//       ...quizData,
//       questions: updatedQuestions
//     });
//   };

//   const addQuestion = () => {
//     setQuizData({
//       ...quizData,
//       questions: [
//         ...quizData.questions,
//         {
//           question: '',
//           options: ['', '', '', ''],
//           correctAnswer: 0
//         }
//       ]
//     });
//   };

//   const removeQuestion = (index) => {
//     if (quizData.questions.length === 1) {
//       toast.error('Quiz must have at least one question');
//       return;
//     }
    
//     const updatedQuestions = [...quizData.questions];
//     updatedQuestions.splice(index, 1);
//     setQuizData({
//       ...quizData,
//       questions: updatedQuestions
//     });
//   };

//   const validateQuiz = () => {
//     if (!quizData.title.trim()) {
//       toast.error('Quiz title is required');
//       return false;
//     }
    
//     if (!quizData.description.trim()) {
//       toast.error('Quiz description is required');
//       return false;
//     }
    
//     for (let i = 0; i < quizData.questions.length; i++) {
//       const question = quizData.questions[i];
      
//       if (!question.question.trim()) {
//         toast.error(`Question ${i + 1} text is required`);
//         return false;
//       }
      
//       for (let j = 0; j < question.options.length; j++) {
//         if (!question.options[j].trim()) {
//           toast.error(`Option ${j + 1} for Question ${i + 1} is required`);
//           return false;
//         }
//       }
//     }
    
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateQuiz()) {
//       return;
//     }
    
//     try {
//       setIsSaving(true);
      
//       const submitData = {
//         ...quizData,
//         courseId,
//         lessonId,
//         createdBy: user._id
//       };
      
//       let response;
//       if (quizData._id) {
//         // Update existing quiz
//         response = await api.put(`/quizzes/${quizData._id}`, submitData);
//       } else {
//         // Create new quiz
//         response = await api.post('/quizzes', submitData);
//       }
      
//       if (response.data.success) {
//         toast.success(quizData._id ? 'Quiz updated successfully' : 'Quiz created successfully');
//         navigate(`/dashboard/tutor/courses/${courseId}`);
//       } else {
//         throw new Error(response.data.message || 'Failed to save quiz');
//       }
//     } catch (error) {
//       console.error('Error saving quiz:', error);
//       toast.error('Failed to save quiz');
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
//         <h1 className="text-3xl font-bold text-gray-800">{quizData._id ? 'Edit Quiz' : 'Create Quiz'}</h1>
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
//                 Quiz Title *
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 value={quizData.title}
//                 onChange={(e) => setQuizData({...quizData, title: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter quiz title"
//                 required
//               />
//             </div>
            
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                 Description *
//               </label>
//               <textarea
//                 id="description"
//                 value={quizData.description}
//                 onChange={(e) => setQuizData({...quizData, description: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter quiz description"
//                 rows="3"
//                 required
//               ></textarea>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 mb-1">
//                   Time Limit (minutes)
//                 </label>
//                 <input
//                   type="number"
//                   id="timeLimit"
//                   value={quizData.timeLimit}
//                   onChange={(e) => setQuizData({...quizData, timeLimit: parseInt(e.target.value, 10) || 0})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   min="0"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="passingScore" className="block text-sm font-medium text-gray-700 mb-1">
//                   Passing Score (%)
//                 </label>
//                 <input
//                   type="number"
//                   id="passingScore"
//                   value={quizData.passingScore}
//                   onChange={(e) => setQuizData({...quizData, passingScore: parseInt(e.target.value, 10) || 0})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   min="0"
//                   max="100"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="p-6 border-b border-gray-200 bg-gray-50">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">Questions</h2>
//             <button
//               type="button"
//               onClick={addQuestion}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//               Add Question
//             </button>
//           </div>
          
//           <div className="space-y-6">
//             {quizData.questions.map((question, questionIndex) => (
//               <div key={questionIndex} className="bg-white p-4 rounded-lg border border-gray-200">
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="text-lg font-medium text-gray-800">Question {questionIndex + 1}</h3>
//                   <button
//                     type="button"
//                     onClick={() => removeQuestion(questionIndex)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                   </button>
//                 </div>
                
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Question Text *
//                   </label>
//                   <input
//                     type="text"
//                     value={question.question}
//                     onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter question"
//                     required
//                   />
//                 </div>
                
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Options *
//                   </label>
//                   {question.options.map((option, optionIndex) => (
//                     <div key={optionIndex} className="flex items-center mb-2">
//                       <div className="flex-shrink-0 mr-2">
//                         <input
//                           type="radio"
//                           name={`correctAnswer${questionIndex}`}
//                           value={optionIndex}
//                           checked={question.correctAnswer === optionIndex}
//                           onChange={(e) => handleCorrectAnswerChange(questionIndex, e.target.value)}
//                           className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
//                         />
//                       </div>
//                       <input
//                         type="text"
//                         value={option}
//                         onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         placeholder={`Option ${optionIndex + 1}`}
//                         required
//                       />
//                     </div>
//                   ))}
//                   <p className="text-sm text-gray-500 mt-1">
//                     Select the radio button next to the correct answer.
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="p-6 flex justify-between">
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="isPublished"
//               checked={quizData.isPublished}
//               onChange={(e) => setQuizData({...quizData, isPublished: e.target.checked})}
//               className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
//             />
//             <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
//               Publish quiz (make it available to students)
//             </label>
//           </div>
          
//           <div className="flex space-x-3">
//             <button
//               type="button"
//               onClick={() => navigate(`/dashboard/tutor/courses/${courseId}`)}
//               className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSaving}
//               className={`px-4 py-2 rounded-md text-white ${
//                 isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//               }`}
//             >
//               {isSaving ? (
//                 <span className="flex items-center">
//                   <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Saving...
//                 </span>
//               ) : (
//                 'Save Quiz'
//               )}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateQuiz;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { api } from '../../../services/api';
// import { useAuth } from '../../../contexts/AuthContext';
// import toast from 'react-hot-toast';
// import LoadingSpinner from '../../../components/common/LoadingSpinner';

// const CreateQuiz = () => {
//   const { courseId, lessonId, quizId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [course, setCourse] = useState(null);
//   const [lesson, setLesson] = useState(null);
  
//   const [quizData, setQuizData] = useState({
//     title: '',
//     description: '',
//     questions: [
//       {
//         question: '',
//         options: ['', '', '', ''],
//         correctAnswer: 0
//       }
//     ],
//     timeLimit: 30,
//     passingScore: 70,
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
//           }
//         }
        
//         // If we're editing an existing quiz
//         if (quizId) {
//           try {
//             const quizResponse = await api.get(`/quizzes/${quizId}`);
//             if (quizResponse.data.success) {
//               setQuizData(quizResponse.data.data);
//             }
//           } catch (error) {
//             console.error('Error fetching quiz:', error);
//             toast.error('Failed to load quiz data');
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
//   }, [courseId, lessonId, quizId]);

//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = [...quizData.questions];
//     updatedQuestions[index] = {
//       ...updatedQuestions[index],
//       [field]: value
//     };
    
//     setQuizData({
//       ...quizData,
//       questions: updatedQuestions
//     });
//   };

//   const handleOptionChange = (questionIndex, optionIndex, value) => {
//     const updatedQuestions = [...quizData.questions];
//     const updatedOptions = [...updatedQuestions[questionIndex].options];
//     updatedOptions[optionIndex] = value;
    
//     updatedQuestions[questionIndex] = {
//       ...updatedQuestions[questionIndex],
//       options: updatedOptions
//     };
    
//     setQuizData({
//       ...quizData,
//       questions: updatedQuestions
//     });
//   };

//   const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
//     const updatedQuestions = [...quizData.questions];
//     updatedQuestions[questionIndex] = {
//       ...updatedQuestions[questionIndex],
//       correctAnswer: optionIndex
//     };
    
//     setQuizData({
//       ...quizData,
//       questions: updatedQuestions
//     });
//   };

//   const addQuestion = () => {
//     setQuizData({
//       ...quizData,
//       questions: [
//         ...quizData.questions,
//         {
//           question: '',
//           options: ['', '', '', ''],
//           correctAnswer: 0
//         }
//       ]
//     });
//   };

//   const removeQuestion = (index) => {
//     if (quizData.questions.length === 1) {
//       toast.error('Quiz must have at least one question');
//       return;
//     }
    
//     const updatedQuestions = [...quizData.questions];
//     updatedQuestions.splice(index, 1);
    
//     setQuizData({
//       ...quizData,
//       questions: updatedQuestions
//     });
//   };

//   const validateQuiz = () => {
//     if (!quizData.title.trim()) {
//       toast.error('Quiz title is required');
//       return false;
//     }
    
//     if (!quizData.description.trim()) {
//       toast.error('Quiz description is required');
//       return false;
//     }
    
//     for (let i = 0; i < quizData.questions.length; i++) {
//       const question = quizData.questions[i];
      
//       if (!question.question.trim()) {
//         toast.error(`Question ${i + 1} text is required`);
//         return false;
//       }
      
//       for (let j = 0; j < question.options.length; j++) {
//         if (!question.options[j].trim()) {
//           toast.error(`Option ${j + 1} for Question ${i + 1} is required`);
//           return false;
//         }
//       }
//     }
    
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateQuiz()) {
//       return;
//     }
    
//     try {
//       setIsSaving(true);
      
//       const submitData = {
//         ...quizData,
//         courseId,
//         lessonId,
//         createdBy: user._id
//       };
      
//       let response;
//       if (quizId) {
//         // Update existing quiz
//         response = await api.put(`/quizzes/${quizId}`, submitData);
//       } else {
//         // Create new quiz
//         response = await api.post('/quizzes', submitData);
//       }
      
//       if (response.data.success) {
//         toast.success(quizId ? 'Quiz updated successfully' : 'Quiz created successfully');
//         navigate(`/dashboard/tutor/courses/${courseId}`);
//       } else {
//         throw new Error(response.data.message || 'Failed to save quiz');
//       }
//     } catch (error) {
//       console.error('Error saving quiz:', error);
//       toast.error('Failed to save quiz');
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
//         <h1 className="text-3xl font-bold text-gray-800">{quizId ? 'Edit Quiz' : 'Create Quiz'}</h1>
//         {course && (
//           <p className="text-gray-600 mt-1">
//             For course: {course.title}
//             {lesson && ` > ${lesson.title}`}
//           </p>
//         )}
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
//           <div className="p-6 border-b border-gray-200">
//             <div className="grid grid-cols-1 gap-6">
//               <div>
//                 <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                   Quiz Title *
//                 </label>
//                 <input
//                   type="text"
//                   id="title"
//                   value={quizData.title}
//                   onChange={(e) => setQuizData({...quizData, title: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter quiz title"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                   Description *
//                 </label>
//                 <textarea
//                   id="description"
//                   value={quizData.description}
//                   onChange={(e) => setQuizData({...quizData, description: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter a brief description of the quiz"
//                   rows="3"
//                   required
//                 ></textarea>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 mb-1">
//                     Time Limit (minutes)
//                   </label>
//                   <input
//                     type="number"
//                     id="timeLimit"
//                     value={quizData.timeLimit}
//                     onChange={(e) => setQuizData({...quizData, timeLimit: parseInt(e.target.value, 10) || 0})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     min="0"
//                   />
//                   <p className="mt-1 text-xs text-gray-500">Set to 0 for no time limit</p>
//                 </div>
                
//                 <div>
//                   <label htmlFor="passingScore" className="block text-sm font-medium text-gray-700 mb-1">
//                     Passing Score (%)
//                   </label>
//                   <input
//                     type="number"
//                     id="passingScore"
//                     value={quizData.passingScore}
//                     onChange={(e) => setQuizData({...quizData, passingScore: parseInt(e.target.value, 10) || 0})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     min="0"
//                     max="100"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-gray-800">Questions</h2>
//               <button
//                 type="button"
//                 onClick={addQuestion}
//                 className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//                 Add Question
//               </button>
//             </div>
            
//             <div className="space-y-8">
//               {quizData.questions.map((question, questionIndex) => (
//                 <div 
//                   key={questionIndex} 
//                   className="border border-gray-200 rounded-lg p-4 relative"
//                 >
//                   <div className="absolute top-2 right-2 flex space-x-1">
//                     <button
//                       type="button"
//                       onClick={() => removeQuestion(questionIndex)}
//                       className="text-red-500 hover:text-red-700 p-1"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                     </button>
//                   </div>
                  
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Question {questionIndex + 1} *
//                     </label>
//                     <input
//                       type="text"
//                       value={question.question}
//                       onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter question"
//                       required
//                     />
//                   </div>
                  
//                   <div className="space-y-4">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Options *
//                     </label>
                    
//                     {question.options.map((option, optionIndex) => (
//                       <div key={optionIndex} className="flex items-center space-x-3">
//                         <div className="flex-shrink-0">
//                           <input
//                             type="radio"
//                             name={`correct-answer-${questionIndex}`}
//                             checked={question.correctAnswer === optionIndex}
//                             onChange={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
//                             className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
//                           />
//                         </div>
//                         <div className="flex-grow">
//                           <input
//                             type="text"
//                             value={option}
//                             onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
//                             className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                               question.correctAnswer === optionIndex 
//                                 ? 'border-green-300 focus:ring-green-500 focus:border-green-500' 
//                                 : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                             }`}
//                             placeholder={`Option ${optionIndex + 1}`}
//                             required
//                           />
//                         </div>
//                       </div>
//                     ))}
                    
//                     <div className="text-xs text-gray-500 mt-2">
//                       Select the radio button next to the correct answer
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <div className="p-4 bg-gray-50 flex items-center">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="isPublished"
//                 checked={quizData.isPublished}
//                 onChange={(e) => setQuizData({...quizData, isPublished: e.target.checked})}
//                 className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
//               />
//               <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
//                 Publish this quiz (make it available to students)
//               </label>
//             </div>
//           </div>
//         </div>
        
//         <div className="flex justify-between">
//           <button
//             type="button"
//             onClick={() => navigate(`/dashboard/tutor/courses/${courseId}`)}
//             className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Cancel
//           </button>
          
//           <button
//             type="submit"
//             disabled={isSaving}
//             className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//               isSaving ? 'opacity-70 cursor-not-allowed' : ''
//             }`}
//           >
//             {isSaving ? (
//               <span className="flex items-center">
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Saving...
//               </span>
//             ) : (
//               'Save Quiz'
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateQuiz;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';
import toast from 'react-hot-toast';

const CreateQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    courseId: '',
    lessonId: '',
    timeLimit: 30,
    passingScore: 70,
    isPublished: false,
    questions: []
  });

  // Empty question template
  const emptyQuestion = {
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  };

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

    // If quizId is present, we're editing an existing quiz
    if (quizId) {
      setIsEditing(true);
      fetchQuizData();
    }
  }, [quizId]);

  // Fetch quiz data when editing
  const fetchQuizData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/quizzes/${quizId}`);
      const quiz = response.data.data;
      
      setQuizData({
        title: quiz.title,
        description: quiz.description,
        courseId: quiz.courseId,
        lessonId: quiz.lessonId,
        timeLimit: quiz.timeLimit || 30,
        passingScore: quiz.passingScore || 70,
        isPublished: quiz.isPublished || false,
        questions: quiz.questions || []
      });
      
      // Load lessons for the selected course
      if (quiz.courseId) {
        fetchLessons(quiz.courseId);
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      toast.error('Failed to load quiz data');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch lessons when course is selected
  const fetchLessons = async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}/lessons`);
      setLessons(response.data.data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      toast.error('Failed to load lessons');
    }
  };

  // Handle course selection change
  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setQuizData({
      ...quizData,
      courseId,
      lessonId: '' // Reset lesson when course changes
    });
    
    if (courseId) {
      fetchLessons(courseId);
    } else {
      setLessons([]);
    }
  };

  // Handle adding a new question
  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, {...emptyQuestion}]
    });
  };

  // Handle removing a question
  const removeQuestion = (index) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions.splice(index, 1);
    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };

  // Handle question text change
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index].question = value;
    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };

  // Handle option text change
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };

  // Handle correct answer change
  const handleCorrectAnswerChange = (questionIndex, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].correctAnswer = parseInt(value);
    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!quizData.title.trim()) {
      toast.error('Please enter a quiz title');
      return;
    }
    
    if (!quizData.courseId) {
      toast.error('Please select a course');
      return;
    }
    
    if (!quizData.lessonId) {
      toast.error('Please select a lesson');
      return;
    }
    
    if (quizData.questions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }
    
    // Validate questions
    for (let i = 0; i < quizData.questions.length; i++) {
      const question = quizData.questions[i];
      
      if (!question.question.trim()) {
        toast.error(`Question ${i + 1} is empty`);
        return;
      }
      
      for (let j = 0; j < question.options.length; j++) {
        if (!question.options[j].trim()) {
          toast.error(`Option ${j + 1} in Question ${i + 1} is empty`);
          return;
        }
      }
    }
    
    try {
      setIsSaving(true);
      
      if (isEditing) {
        // Update existing quiz
        await api.put(`/quizzes/${quizId}`, quizData);
        toast.success('Quiz updated successfully');
      } else {
        // Create new quiz
        await api.post('/quizzes', quizData);
        toast.success('Quiz created successfully');
      }
      
      navigate('/dashboard/quizzes');
    } catch (error) {
      console.error('Error saving quiz:', error);
      toast.error(error.response?.data?.message || 'Failed to save quiz');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard/quizzes')}
          className="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Quizzes
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">
          {isEditing ? 'Edit Quiz' : 'Create New Quiz'}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Quiz Details</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Quiz Title*
              </label>
              <input
                type="text"
                id="title"
                value={quizData.title}
                onChange={(e) => setQuizData({...quizData, title: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter quiz title"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                id="description"
                rows="3"
                value={quizData.description}
                onChange={(e) => setQuizData({...quizData, description: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter quiz description"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                  Course*
                </label>
                <select
                  id="course"
                  value={quizData.courseId}
                  onChange={handleCourseChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  disabled={isEditing}
                >
                  <option value="">Select a course</option>
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="lesson" className="block text-sm font-medium text-gray-700 mb-1">
                  Lesson*
                </label>
                <select
                  id="lesson"
                  value={quizData.lessonId}
                  onChange={(e) => setQuizData({...quizData, lessonId: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  disabled={!quizData.courseId || isEditing}
                >
                  <option value="">Select a lesson</option>
                  {lessons.map(lesson => (
                    <option key={lesson._id} value={lesson._id}>
                      {lesson.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 mb-1">
                  Time Limit (minutes)
                </label>
                <input
                  type="number"
                  id="timeLimit"
                  min="1"
                  max="180"
                  value={quizData.timeLimit}
                  onChange={(e) => setQuizData({...quizData, timeLimit: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="passingScore" className="block text-sm font-medium text-gray-700 mb-1">
                  Passing Score (%)
                </label>
                <input
                  type="number"
                  id="passingScore"
                  min="1"
                  max="100"
                  value={quizData.passingScore}
                  onChange={(e) => setQuizData({...quizData, passingScore: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Questions Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">Questions ({quizData.questions.length})</h2>
            <button
              type="button"
              onClick={addQuestion}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Question
            </button>
          </div>
          
          <div className="p-6">
            {quizData.questions.length === 0 ? (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No questions added</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by adding your first question.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Question
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {quizData.questions.map((question, questionIndex) => (
                  <div 
                    key={questionIndex} 
                    className="border border-gray-200 rounded-lg p-6 bg-gray-50 relative"
                  >
                    <button
                      type="button"
                      onClick={() => removeQuestion(questionIndex)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                      aria-label="Remove question"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    
                    <div className="mb-4">
                      <label 
                        htmlFor={`question${questionIndex}`} 
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Question {questionIndex + 1}*
                      </label>
                      <input
                        type="text"
                        id={`question${questionIndex}`}
                        value={question.question}
                        onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your question"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <p className="block text-sm font-medium text-gray-700 mb-1">Options*</p>
                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center">
                            <input
                              type="radio"
                              id={`correct-${questionIndex}-${optionIndex}`}
                              name={`correct-${questionIndex}`}
                              value={optionIndex}
                              checked={question.correctAnswer === optionIndex}
                              onChange={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
                              className="mr-3 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Select the radio button next to the correct answer.
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Another Question
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-6 flex justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                checked={quizData.isPublished}
                onChange={(e) => setQuizData({...quizData, isPublished: e.target.checked})}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                Publish quiz (make it available to students)
              </label>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard/quizzes')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSaving}
                className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }`}
              >
                {isSaving ? (
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {isEditing ? 'Update Quiz' : 'Create Quiz'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;