import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';

const CreateCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const isEditing = !!courseId;

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [coverImagePreview, setCoverImagePreview] = useState(null);

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    grade: '',
    price: 0,
    isFree: true,
    isPublished: false,
    coverImage: null,
    modules: [
      {
        title: 'Module 1',
        description: '',
        order: 1,
        lessons: [
          {
            title: 'Lesson 1',
            description: '',
            content: 'This is the default content for your lesson.', // Add default content here
            type: 'text',
            order: 1,
            videoUrl: '',
            duration: 0,
          }
        ]
      }
    ]
  });

  // Categories list
  const categories = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'Cloud Computing',
    'Cybersecurity',
    'Blockchain',
    'Game Development',
    'Design',
    'Photography',
    'Marketing',
    'Business',
    'Personal Development',
    'Other'
  ];

  useEffect(() => {
    if (isEditing) {
      fetchCourseData();
    }
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/courses/${courseId}`);
      
      if (response.data.success) {
        const course = response.data.data;
        setCourseData({
          title: course.title,
          description: course.description,
          category: course.category,
          level: course.level,
          price: course.price,
          isFree: course.isFree,
          isPublished: course.isPublished,
          coverImage: null,
          modules: course.modules || []
        });
        
        if (course.coverImage) {
          setCoverImagePreview(course.coverImage);
        }
      } else {
        toast.error('Failed to fetch course data');
        navigate('/dashboard/course-manager');
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      toast.error('Something went wrong. Please try again.');
      navigate('/dashboard/course-manager');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCourseDataChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setCourseData(prev => ({
        ...prev,
        [name]: checked
      }));
      
      // If isFree is checked, set price to 0
      if (name === 'isFree' && checked) {
        setCourseData(prev => ({
          ...prev,
          price: 0
        }));
      }
    } else if (name === 'price') {
      const price = parseFloat(value) || 0;
      setCourseData(prev => ({
        ...prev,
        price: price
      }));
    } else {
      setCourseData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast.error('Image size should not exceed 5MB');
      return;
    }
    
    setCourseData(prev => ({
      ...prev,
      coverImage: file
    }));
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...courseData.modules];
    updatedModules[index][field] = value;
    
    setCourseData(prev => ({
      ...prev,
      modules: updatedModules
    }));
  };

  const handleLessonChange = (moduleIndex, lessonIndex, field, value) => {
    const updatedModules = [...courseData.modules];
    updatedModules[moduleIndex].lessons[lessonIndex][field] = value;
    
    setCourseData(prev => ({
      ...prev,
      modules: updatedModules
    }));
  };

  const addModule = () => {
    const newModule = {
      title: `Module ${courseData.modules.length + 1}`,
      description: '',
      order: courseData.modules.length + 1,
      lessons: [
        {
          title: 'Lesson 1',
          description: '',
          content: '',
          type: 'text',
          order: 1,
          videoUrl: '',
          duration: 0,
        }
      ]
    };
    
    setCourseData(prev => ({
      ...prev,
      modules: [...prev.modules, newModule]
    }));
  };

  const removeModule = (index) => {
    if (courseData.modules.length === 1) {
      toast.error('Course must have at least one module');
      return;
    }
    
    const updatedModules = [...courseData.modules];
    updatedModules.splice(index, 1);
    
    // Update order numbers
    updatedModules.forEach((module, idx) => {
      module.order = idx + 1;
    });
    
    setCourseData(prev => ({
      ...prev,
      modules: updatedModules
    }));
  };

  // const addLesson = (moduleIndex) => {
  //   const updatedModules = [...courseData.modules];
  //   const newLesson = {
  //     title: `Lesson ${updatedModules[moduleIndex].lessons.length + 1}`,
  //     description: '',
  //     content: '',
  //     type: 'text',
  //     order: updatedModules[moduleIndex].lessons.length + 1,
  //     videoUrl: '',
  //     duration: 0,
  //   };
    
  //   updatedModules[moduleIndex].lessons.push(newLesson);
    
  //   setCourseData(prev => ({
  //     ...prev,
  //     modules: updatedModules
  //   }));
  // };

  // Update the addLesson function
const addLesson = (moduleIndex) => {
  const updatedModules = [...courseData.modules];
  const newLesson = {
    title: `Lesson ${updatedModules[moduleIndex].lessons.length + 1}`,
    description: '',
    content: 'This is the default content for your new lesson.', // Add default content
    type: 'text',
    order: updatedModules[moduleIndex].lessons.length + 1,
    videoUrl: '',
    duration: 0,
  };
  
  updatedModules[moduleIndex].lessons.push(newLesson);
  
  setCourseData(prev => ({
    ...prev,
    modules: updatedModules
  }));
};
  const removeLesson = (moduleIndex, lessonIndex) => {
    const updatedModules = [...courseData.modules];
    
    if (updatedModules[moduleIndex].lessons.length === 1) {
      toast.error('Module must have at least one lesson');
      return;
    }
    
    updatedModules[moduleIndex].lessons.splice(lessonIndex, 1);
    
    // Update order numbers
    updatedModules[moduleIndex].lessons.forEach((lesson, idx) => {
      lesson.order = idx + 1;
    });
    
    setCourseData(prev => ({
      ...prev,
      modules: updatedModules
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSaving) return;
    
    // Validate form
    if (!courseData.title.trim()) {
      toast.error('Course title is required');
      return;
    }
    
    if (!courseData.description.trim()) {
      toast.error('Course description is required');
      return;
    }
    
    if (!courseData.category) {
      toast.error('Please select a category');
      return;
    }
    if (!courseData.grade) {
      toast.error('Please select a grade level');
      return;
    }
    // Validate modules and lessons
    for (let i = 0; i < courseData.modules.length; i++) {
      const module = courseData.modules[i];
      
      if (!module.title.trim()) {
        toast.error(`Module ${i+1} title is required`);
        return;
      }
      
      for (let j = 0; j < module.lessons.length; j++) {
        const lesson = module.lessons[j];
        
        if (!lesson.title.trim()) {
          toast.error(`Lesson ${j+1} in Module ${i+1} title is required`);
          return;
        }
        
        if (lesson.type === 'video' && !lesson.videoUrl.trim()) {
          toast.error(`Please provide a video URL for lesson ${j+1} in Module ${i+1}`);
          return;
        }
        
        if (lesson.type === 'text' && !lesson.content.trim()) {
          // Set a default content if empty
          const updatedModules = [...courseData.modules];
          updatedModules[i].lessons[j].content = "This lesson content will be added later.";
          setCourseData(prev => ({
            ...prev,
            modules: updatedModules
          }));
        }
      }
    }
    
    try {
      setIsSaving(true);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', courseData.title);
      formData.append('description', courseData.description);
      formData.append('category', courseData.category);
      formData.append('level', courseData.level);
      formData.append('grade', courseData.grade); // Add the grade field

      formData.append('price', courseData.price);
      formData.append('isFree', courseData.isFree);
      formData.append('isPublished', courseData.isPublished);
      formData.append('modules', JSON.stringify(courseData.modules));
      
      if (courseData.coverImage) {
        formData.append('coverImage', courseData.coverImage);
      }
      
      let response;
      
      if (isEditing) {
        response = await api.put(`/courses/${courseId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        response = await api.post('/courses', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      if (response.data.success) {
        toast.success(isEditing ? 'Course updated successfully' : 'Course created successfully');
        navigate('/dashboard/course-manager');
      } else {
        throw new Error(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error saving course:', error);
      toast.error(error.message || 'Failed to save course. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'Edit Course' : 'Create New Course'}
        </h1>
        <button
          onClick={() => navigate('/dashboard/course-manager')}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Courses
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Course Details Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Course Details</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={courseData.title}
                  onChange={handleCourseDataChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Complete Web Development Bootcamp"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Course Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={courseData.description}
                  onChange={handleCourseDataChange}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Provide a detailed description of your course"
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category*
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={courseData.category}
                    onChange={handleCourseDataChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={courseData.level}
                    onChange={handleCourseDataChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="all-levels">All Levels</option>
                  </select>
                </div>
              </div>

              <div>
  <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
    Grade Level*
  </label>
  <select
    id="grade"
    name="grade"
    value={courseData.grade}
    onChange={handleCourseDataChange}
    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
    required
  >
    <option value="">Select a grade</option>
    <option value="1">Grade 1</option>
    <option value="2">Grade 2</option>
    <option value="3">Grade 3</option>
    <option value="4">Grade 4</option>
    <option value="5">Grade 5</option>
    <option value="6">Grade 6</option>
    <option value="7">Grade 7</option>
    <option value="8">Grade 8</option>
    <option value="9">Grade 9</option>
    <option value="10">Grade 10</option>
    <option value="11">Grade 11</option>
    <option value="12">Grade 12</option>
    <option value="college">College</option>
    <option value="professional">Professional</option>
  </select>
</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-2">
                    <input
                      id="isFree"
                      name="isFree"
                      type="checkbox"
                      checked={courseData.isFree}
                      onChange={handleCourseDataChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isFree" className="ml-2 block text-sm font-medium text-gray-700">
                      Free Course
                    </label>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ({courseData.isFree ? 'Free' : '$'})
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={courseData.price}
                    onChange={handleCourseDataChange}
                    min="0"
                    step="0.01"
                    disabled={courseData.isFree}
                    className={`w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      courseData.isFree ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  />
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Cover Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {coverImagePreview ? (
                    <div className="space-y-1 text-center">
                      <img
                        src={coverImagePreview}
                        alt="Cover preview"
                        className="mx-auto h-32 w-auto object-cover rounded"
                      />
                      <div className="flex text-sm text-gray-600">
                        <button
                          type="button"
                          onClick={() => {
                            setCoverImagePreview(null);
                            setCourseData(prev => ({ ...prev, coverImage: null }));
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                          className="mx-auto text-red-600 hover:text-red-700"
                        >
                          Remove image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="cover-image"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="cover-image"
                            ref={fileInputRef}
                            name="coverImage"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <input
                    id="isPublished"
                    name="isPublished"
                    type="checkbox"
                    checked={courseData.isPublished}
                    onChange={handleCourseDataChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublished" className="ml-2 block text-sm font-medium text-gray-700">
                    Publish Course
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  {courseData.isPublished 
                    ? 'Your course will be visible to students immediately after saving.' 
                    : 'Your course will be saved as a draft and won\'t be visible to students.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Modules Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">Course Modules & Lessons</h2>
            <button
              type="button"
              onClick={addModule}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Module
            </button>
          </div>
          
          <div className="p-6 space-y-8">
            {courseData.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-md font-medium text-gray-800">
                    Module {moduleIndex + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeModule(moduleIndex)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`module-${moduleIndex}-title`} className="block text-sm font-medium text-gray-700 mb-1">
                        Module Title*
                      </label>
                      <input
                        type="text"
                        id={`module-${moduleIndex}-title`}
                        value={module.title}
                        onChange={(e) => handleModuleChange(moduleIndex, 'title', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. Introduction to HTML"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`module-${moduleIndex}-description`} className="block text-sm font-medium text-gray-700 mb-1">
                        Module Description
                      </label>
                      <input
                        type="text"
                        id={`module-${moduleIndex}-description`}
                        value={module.description}
                        onChange={(e) => handleModuleChange(moduleIndex, 'description', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Brief description of this module"
                      />
                    </div>
                  </div>
                  
                  {/* Lessons */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-gray-700">Lessons</h4>
                      <button
                        type="button"
                        onClick={() => addLesson(moduleIndex)}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Lesson
                      </button>
                    </div>
                    
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div 
                        key={lessonIndex} 
                        className="border border-gray-200 rounded-md p-3 mb-3 bg-gray-50"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="text-sm font-medium text-gray-700">
                            Lesson {lessonIndex + 1}
                          </h5>
                          <button
                            type="button"
                            onClick={() => removeLesson(moduleIndex, lessonIndex)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div>
                            <label htmlFor={`lesson-${moduleIndex}-${lessonIndex}-title`} className="block text-xs font-medium text-gray-700 mb-1">
                              Lesson Title*
                            </label>
                            <input
                              type="text"
                              id={`lesson-${moduleIndex}-${lessonIndex}-title`}
                              value={lesson.title}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'title', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g. HTML Basics"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor={`lesson-${moduleIndex}-${lessonIndex}-type`} className="block text-xs font-medium text-gray-700 mb-1">
                              Lesson Type
                            </label>
                            <select
                              id={`lesson-${moduleIndex}-${lessonIndex}-type`}
                              value={lesson.type}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'type', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="text">Text</option>
                              <option value="video">Video</option>
                              <option value="quiz">Quiz</option>
                              <option value="assignment">Assignment</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor={`lesson-${moduleIndex}-${lessonIndex}-description`} className="block text-xs font-medium text-gray-700 mb-1">
                            Lesson Description
                          </label>
                          <input
                            type="text"
                            id={`lesson-${moduleIndex}-${lessonIndex}-description`}
                            value={lesson.description}
                            onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'description', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Brief description of this lesson"
                          />
                        </div>
                        
                        {lesson.type === 'text' && (
                          <div className="mt-3">
                            <label htmlFor={`lesson-${moduleIndex}-${lessonIndex}-content`} className="block text-xs font-medium text-gray-700 mb-1">
                              Lesson Content*
                            </label>
                            <textarea
                              id={`lesson-${moduleIndex}-${lessonIndex}-content`}
                              value={lesson.content}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'content', e.target.value)}
                              rows="4"
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Your lesson content here..."
                              required={lesson.type === 'text'}
                            ></textarea>
                          </div>
                        )}
                        
                        {lesson.type === 'video' && (
                          <div className="mt-3">
                            <label htmlFor={`lesson-${moduleIndex}-${lessonIndex}-video`} className="block text-xs font-medium text-gray-700 mb-1">
                              Video URL*
                            </label>
                            <input
                              type="url"
                              id={`lesson-${moduleIndex}-${lessonIndex}-video`}
                              value={lesson.videoUrl}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'videoUrl', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g. https://www.youtube.com/watch?v=..."
                              required={lesson.type === 'video'}
                            />
                            <div className="flex items-center mt-2">
                              <label htmlFor={`lesson-${moduleIndex}-${lessonIndex}-duration`} className="block text-xs font-medium text-gray-700 mr-2">
                                Duration (minutes):
                              </label>
                              <input
                                type="number"
                                id={`lesson-${moduleIndex}-${lessonIndex}-duration`}
                                value={lesson.duration}
                                onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'duration', parseInt(e.target.value) || 0)}
                                min="0"
                                className="w-20 p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                        )}
                        
                        {lesson.type === 'quiz' && (
                          <div className="mt-3 p-2 bg-blue-50 rounded-md">
                            <p className="text-xs text-blue-700">
                              After creating the course, you will be able to create quizzes for this lesson from the Quiz Manager.
                            </p>
                          </div>
                        )}
                        
                        {lesson.type === 'assignment' && (
                          <div className="mt-3 p-2 bg-blue-50 rounded-md">
                            <p className="text-xs text-blue-700">
                              After creating the course, you will be able to create assignments for this lesson from the Assignment Manager.
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/course-manager')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className={`px-4 py-2 rounded-md text-white ${
              isSaving 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSaving ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                {isEditing ? 'Updating...' : 'Creating...'}
              </div>
            ) : (
              isEditing ? 'Update Course' : 'Create Course'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;