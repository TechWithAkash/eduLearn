// import React, { useState, useEffect } from 'react';

// import { useAuth } from '../../../contexts/AuthContext';
// import { api } from '../../../services/api';
// import toast from 'react-hot-toast';

// const Profile = () => {
//   const { user, updateProfile } = useAuth();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     bio: '',
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//     phone: '',
//     address: '',
//     profilePicture: null
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [activeTab, setActiveTab] = useState('profile');

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || '',
//         email: user.email || '',
//         bio: user.bio || '',
//         phone: user.phone || '',
//         address: user.address || '',
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: '',
//         profilePicture: null
//       });
//       setPreviewImage(user.profilePicture || null);
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         profilePicture: file
//       }));
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       // Create form data for file upload
//       const data = new FormData();
//       data.append('name', formData.name);
//       data.append('bio', formData.bio);
//       data.append('phone', formData.phone);
//       data.append('address', formData.address);
      
//       if (formData.profilePicture) {
//         data.append('profilePicture', formData.profilePicture);
//       }
      
//       await updateProfile(data);
//       toast.success('Profile updated successfully');
//     } catch (error) {
//       console.error('Failed to update profile:', error);
//       toast.error('Failed to update profile');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
    
//     if (formData.newPassword !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }
    
//     setIsLoading(true);
    
//     try {
//       await api.put(`/auth/change-password`, {
//         currentPassword: formData.currentPassword,
//         newPassword: formData.newPassword
//       });
      
//       setFormData(prev => ({
//         ...prev,
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       }));
      
//       toast.success('Password changed successfully');
//     } catch (error) {
//       console.error('Failed to change password:', error);
//       toast.error(error.response?.data?.message || 'Failed to change password');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="md:flex">
//           {/* Sidebar */}
//           <div className="md:w-1/3 bg-gray-50 p-4">
//             <div className="flex flex-col items-center text-center p-4">
//                 {/* <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-200"> */}
//                   {previewImage ? (
//                     <img 
//                       src={previewImage} 
//                       alt={user?.name} 
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="h-full w-full flex items-center justify-center text-gray-500 text-4xl font-bold">
//                       {user?.name?.charAt(0).toUpperCase()}
//                     </div>
//                   )}
                
              

// <div className="relative">
//   <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-200">
//     {previewImage ? (
//       <img 
//         src={previewImage}
//         alt={user?.name || "Profile"} 
//         className="h-full w-full object-cover"
//         onError={(e) => {
//           e.target.onerror = null; // Prevent infinite error loop
//           e.target.src = '/default-user.png'; // Use default image from public folder
//         }}
//       />
//     ) : user?.profilePicture ? (
//       <img 
//         src={user.profilePicture}
//         alt={user?.name || "Profile"} 
//         className="h-full w-full object-cover"
//         onError={(e) => {
//           e.target.onerror = null; // Prevent infinite error loop
//           e.target.src = '/default-user.png'; // Use default image from public folder
//         }}
//       />
//     ) : user?.name ? (
//       <div className="h-full w-full flex items-center justify-center text-gray-500 text-4xl font-bold">
//         {user.name.charAt(0).toUpperCase()}
//       </div>
//     ) : (
//       <img 
//         src="/default-user.png"
//         alt="Default User" 
//         className="h-full w-full object-cover"
//       />
//     )}
//   </div>
//   <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//       <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//     </svg>
//     <input 
//       id="profile-upload" 
//       type="file" 
//       className="hidden" 
//       accept="image/*"
//       onChange={handleImageChange}
//     />
//   </label>
// </div>
//                 </div>
//                 <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                   </svg>
//                   <input 
//                     id="profile-upload" 
//                     type="file" 
//                     className="hidden" 
//                     accept="image/*"
//                     onChange={handleImageChange}
//                   />
//                 </label>
//               </div>
//               <h2 className="mt-4 text-xl font-semibold">{user?.name}</h2>
//               <p className="text-gray-600">{user?.email}</p>
//               <p className="mt-2 text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm capitalize">
//                 {user?.role}
//               </p>
//             </div>

//             <div className="mt-6 border-t pt-4">
//               <nav className="flex flex-col">
//                 <button 
//                   onClick={() => setActiveTab('profile')}
//                   className={`px-4 py-2 text-left rounded-md ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
//                 >
//                   Personal Information
//                 </button>
//                 <button 
//                   onClick={() => setActiveTab('security')}
//                   className={`px-4 py-2 text-left rounded-md ${activeTab === 'security' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
//                 >
//                   Password & Security
//                 </button>
//                 {user?.role === 'student' && (
//                   <button 
//                     onClick={() => setActiveTab('academics')}
//                     className={`px-4 py-2 text-left rounded-md ${activeTab === 'academics' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
//                   >
//                     Academic Information
//                   </button>
//                 )}
//                 {user?.role === 'tutor' && (
//                   <button 
//                     onClick={() => setActiveTab('teaching')}
//                     className={`px-4 py-2 text-left rounded-md ${activeTab === 'teaching' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
//                   >
//                     Teaching Profile
//                   </button>
//                 )}
//                 <button 
//                   onClick={() => setActiveTab('preferences')}
//                   className={`px-4 py-2 text-left rounded-md ${activeTab === 'preferences' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
//                 >
//                   Preferences
//                 </button>
//               </nav>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="md:w-2/3 p-6">
//             {activeTab === 'profile' && (
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
//                 <form onSubmit={handleProfileUpdate}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         readOnly
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
//                       />
//                       <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Phone Number
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Address
//                       </label>
//                       <input
//                         type="text"
//                         name="address"
//                         value={formData.address}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                     <div className="col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Bio
//                       </label>
//                       <textarea
//                         name="bio"
//                         value={formData.bio}
//                         onChange={handleChange}
//                         rows={4}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Tell us a little about yourself..."
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-6">
//                     <button
//                       type="submit"
//                       className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//                       disabled={isLoading}
//                     >
//                       {isLoading ? 'Saving...' : 'Save Changes'}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}

//             {activeTab === 'security' && (
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Password & Security</h3>
//                 <form onSubmit={handlePasswordChange}>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Current Password
//                       </label>
//                       <input
//                         type="password"
//                         name="currentPassword"
//                         value={formData.currentPassword}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         New Password
//                       </label>
//                       <input
//                         type="password"
//                         name="newPassword"
//                         value={formData.newPassword}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Confirm New Password
//                       </label>
//                       <input
//                         type="password"
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-6">
//                     <button
//                       type="submit"
//                       className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//                       disabled={isLoading}
//                     >
//                       {isLoading ? 'Changing...' : 'Change Password'}
//                     </button>
//                   </div>
//                 </form>

//                 <div className="mt-8">
//                   <h4 className="text-lg font-medium text-gray-800 mb-3">Two-Factor Authentication</h4>
//                   <p className="text-gray-600 mb-3">
//                     Add an extra layer of security to your account by enabling two-factor authentication.
//                   </p>
//                   <button
//                     className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//                   >
//                     Enable 2FA
//                   </button>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'academics' && user?.role === 'student' && (
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Academic Information</h3>
                
//                 <div className="mb-6">
//                   <h4 className="text-lg font-medium text-gray-700 mb-2">Enrolled Courses</h4>
//                   {user?.enrolledCourses?.length > 0 ? (
//                     <div className="space-y-3">
//                       {user.enrolledCourses.map(course => (
//                         <div key={course._id} className="flex items-center p-3 bg-gray-50 rounded-lg">
//                           <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 mr-4">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                             </svg>
//                           </div>
//                           <div>
//                             <h5 className="font-medium">{course.title}</h5>
//                             <p className="text-sm text-gray-500">Enrolled on: {new Date(course.enrolledAt).toLocaleDateString()}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-gray-500">You are not enrolled in any courses yet.</p>
//                   )}
//                 </div>
                
//                 <div>
//                   <h4 className="text-lg font-medium text-gray-700 mb-2">Certificates</h4>
//                   {user?.certificates?.length > 0 ? (
//                     <div className="space-y-3">
//                       {user.certificates.map(cert => (
//                         <div key={cert._id} className="flex items-center p-3 bg-gray-50 rounded-lg">
//                           <div className="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center text-green-600 mr-4">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                           </div>
//                           <div>
//                             <h5 className="font-medium">{cert.title}</h5>
//                             <p className="text-sm text-gray-500">Issued on: {new Date(cert.issuedAt).toLocaleDateString()}</p>
//                           </div>
//                           <button className="ml-auto px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
//                             Download
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-gray-500">You have not earned any certificates yet.</p>
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'teaching' && user?.role === 'tutor' && (
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Teaching Profile</h3>
                
//                 <form>
//                   <div className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Professional Title
//                       </label>
//                       <input
//                         type="text"
//                         name="title"
//                         placeholder="e.g. Mathematics Teacher, Physics Specialist"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Specializations
//                       </label>
//                       <input
//                         type="text"
//                         name="specializations"
//                         placeholder="e.g. Algebra, Calculus, Mechanics"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                       <p className="mt-1 text-xs text-gray-500">Separate multiple specializations with commas</p>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Education and Qualifications
//                       </label>
//                       <textarea
//                         name="qualifications"
//                         rows={3}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="List your degrees, certifications and qualifications"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Teaching Experience
//                       </label>
//                       <textarea
//                         name="experience"
//                         rows={3}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Describe your teaching experience"
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-6">
//                     <button
//                       type="submit"
//                       className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//                     >
//                       Save Teaching Profile
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}

//             {activeTab === 'preferences' && (
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Preferences</h3>
                
//                 <div className="space-y-6">
//                   <div>
//                     <h4 className="text-lg font-medium text-gray-700 mb-2">Notification Settings</h4>
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium">Email Notifications</p>
//                           <p className="text-sm text-gray-500">Receive updates about your courses via email</p>
//                         </div>
//                         <label className="flex items-center cursor-pointer">
//                           <div className="relative">
//                             <input type="checkbox" className="sr-only" defaultChecked />
//                             <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
//                             <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
//                           </div>
//                         </label>
//                       </div>
                      
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium">Assignment Reminders</p>
//                           <p className="text-sm text-gray-500">Get notified about upcoming assignment deadlines</p>
//                         </div>
//                         <label className="flex items-center cursor-pointer">
//                           <div className="relative">
//                             <input type="checkbox" className="sr-only" defaultChecked />
//                             <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
//                             <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
//                           </div>
//                         </label>
//                       </div>
                      
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium">Course Updates</p>
//                           <p className="text-sm text-gray-500">Get notified when your courses are updated</p>
//                         </div>
//                         <label className="flex items-center cursor-pointer">
//                           <div className="relative">
//                             <input type="checkbox" className="sr-only" defaultChecked />
//                             <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
//                             <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
//                           </div>
//                         </label>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <h4 className="text-lg font-medium text-gray-700 mb-2">App Settings</h4>
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium">Dark Mode</p>
//                           <p className="text-sm text-gray-500">Switch between light and dark theme</p>
//                         </div>
//                         <label className="flex items-center cursor-pointer">
//                           <div className="relative">
//                             <input type="checkbox" className="sr-only" />
//                             <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
//                             <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
//                           </div>
//                         </label>
//                       </div>
                      
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium">Accessibility</p>
//                           <p className="text-sm text-gray-500">Enable screen reader support and high contrast</p>
//                         </div>
//                         <label className="flex items-center cursor-pointer">
//                           <div className="relative">
//                             <input type="checkbox" className="sr-only" />
//                             <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
//                             <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
//                           </div>
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mt-6">
//                   <button
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                   >
//                     Save Preferences
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
      
    
//   );
// };

// export default Profile;



import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    phone: '',
    address: '',
    profilePicture: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        phone: user.phone || '',
        address: user.address || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        profilePicture: null
      });
      
      // Set preview image from user's profile picture if it exists
      if (user.profilePicture) {
        setPreviewImage(user.profilePicture);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleProfileUpdate = async (e) => {
  //   e.preventDefault();
    
  //   // Check if any data has changed
  //   if (
  //     formData.name === user?.name &&
  //     formData.bio === user?.bio &&
  //     formData.phone === user?.phone &&
  //     formData.address === user?.address &&
  //     !formData.profilePicture
  //   ) {
  //     toast.info('No changes to save');
  //     return;
  //   }
    
  //   setIsLoading(true);
    
  //   try {
  //     // Create form data for file upload
  //     const data = new FormData();
      
  //     // Only append fields that have values
  //     if (formData.name) data.append('name', formData.name);
  //     if (formData.bio || formData.bio === '') data.append('bio', formData.bio);
  //     if (formData.phone || formData.phone === '') data.append('phone', formData.phone);
  //     if (formData.address || formData.address === '') data.append('address', formData.address);
      
  //     if (formData.profilePicture) {
  //       data.append('profilePicture', formData.profilePicture);
  //     }
      
  //     // Make sure FormData is not empty
  //     if ([...data.entries()].length === 0) {
  //       toast.error('No data provided for update');
  //       setIsLoading(false);
  //       return;
  //     }
      
  //     // Log what's being sent (for debugging)
  //     console.log('Sending update with data:', [...data.entries()]);
      
  //     const result = await updateProfile(data);
      
  //     if (result && result.success) {
  //       toast.success('Profile updated successfully');
  //     } else {
  //       throw new Error(result?.error?.message || 'Failed to update profile');
  //     }
  //   } catch (error) {
  //     console.error('Failed to update profile:', error);
  //     toast.error(error.response?.data?.message || 'Failed to update profile');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  // Update the handleProfileUpdate function to properly handle the image update

const handleProfileUpdate = async (e) => {
  e.preventDefault();
  
  setIsLoading(true);
  
  try {
    // Create form data for file upload
    const data = new FormData();
    
    // Only append fields that have values or are explicitly empty strings
    data.append('name', formData.name || '');
    data.append('bio', formData.bio || '');
    data.append('phone', formData.phone || '');
    data.append('address', formData.address || '');
    
    if (formData.profilePicture) {
      data.append('profilePicture', formData.profilePicture);
    }
    
    // Log what's being sent
    console.log('Sending form data with these entries:');
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }
    
    const result = await updateProfile(data);
    
    if (result && result.success) {
      // Update the previewImage with the new profile picture URL from the server response
      if (result.data && result.data.profilePicture) {
        // Force image refresh by adding a timestamp query parameter
        const timestamp = new Date().getTime();
        setPreviewImage(`${result.data.profilePicture}?t=${timestamp}`);
      }
      
      toast.success('Profile updated successfully');
    } else {
      throw new Error(result?.error?.message || 'Failed to update profile');
    }
  } catch (error) {
    console.error('Failed to update profile:', error);
    toast.error(error.message || 'Failed to update profile');
  } finally {
    setIsLoading(false);
  }
};
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await api.put(`/auth/change-password`, {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      toast.success('Password changed successfully');
    } catch (error) {
      console.error('Failed to change password:', error);
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Sidebar */}
          <div className="md:w-1/3 bg-gray-50 p-4">
            <div className="flex flex-col items-center text-center p-4">
              {/* Profile Image - Fixed version */}
              <div className="relative">
                <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-200">
                  {previewImage ? (
                    <img 
                      src={previewImage}
                      alt={user?.name || "Profile"} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite error loop
                        e.target.src = '/default-user.png'; // Use default image from public folder
                      }}
                    />
                  ) : user?.name ? (
                    <div className="h-full w-full flex items-center justify-center text-gray-500 text-4xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <img 
                      src="/default-user.png"
                      alt="Default User" 
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  <input 
                    id="profile-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              
              <h2 className="mt-4 text-xl font-semibold">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="mt-2 text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm capitalize">
                {user?.role}
              </p>
            </div>

            <div className="mt-6 border-t pt-4">
              <nav className="flex flex-col">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-2 text-left rounded-md ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Personal Information
                </button>
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`px-4 py-2 text-left rounded-md ${activeTab === 'security' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Password & Security
                </button>
                {user?.role === 'student' && (
                  <button 
                    onClick={() => setActiveTab('academics')}
                    className={`px-4 py-2 text-left rounded-md ${activeTab === 'academics' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    Academic Information
                  </button>
                )}
                {user?.role === 'tutor' && (
                  <button 
                    onClick={() => setActiveTab('teaching')}
                    className={`px-4 py-2 text-left rounded-md ${activeTab === 'teaching' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    Teaching Profile
                  </button>
                )}
                <button 
                  onClick={() => setActiveTab('preferences')}
                  className={`px-4 py-2 text-left rounded-md ${activeTab === 'preferences' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Preferences
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="md:w-2/3 p-6">
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                      <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell us a little about yourself..."
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Password & Security</h3>
                <form onSubmit={handlePasswordChange}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Changing...' : 'Change Password'}
                    </button>
                  </div>
                </form>

                <div className="mt-8">
                  <h4 className="text-lg font-medium text-gray-800 mb-3">Two-Factor Authentication</h4>
                  <p className="text-gray-600 mb-3">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <button
                    className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Enable 2FA
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'academics' && user?.role === 'student' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Academic Information</h3>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Enrolled Courses</h4>
                  {user?.enrolledCourses?.length > 0 ? (
                    <div className="space-y-3">
                      {user.enrolledCourses.map(course => (
                        <div key={course._id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-medium">{course.title}</h5>
                            <p className="text-sm text-gray-500">Enrolled on: {new Date(course.enrolledAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">You are not enrolled in any courses yet.</p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Certificates</h4>
                  {user?.certificates?.length > 0 ? (
                    <div className="space-y-3">
                      {user.certificates.map(cert => (
                        <div key={cert._id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center text-green-600 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-medium">{cert.title}</h5>
                            <p className="text-sm text-gray-500">Issued on: {new Date(cert.issuedAt).toLocaleDateString()}</p>
                          </div>
                          <button className="ml-auto px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">You have not earned any certificates yet.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'teaching' && user?.role === 'tutor' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Teaching Profile</h3>
                
                <form>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Professional Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        placeholder="e.g. Mathematics Teacher, Physics Specialist"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specializations
                      </label>
                      <input
                        type="text"
                        name="specializations"
                        placeholder="e.g. Algebra, Calculus, Mechanics"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="mt-1 text-xs text-gray-500">Separate multiple specializations with commas</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Education and Qualifications
                      </label>
                      <textarea
                        name="qualifications"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="List your degrees, certifications and qualifications"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teaching Experience
                      </label>
                      <textarea
                        name="experience"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe your teaching experience"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      Save Teaching Profile
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Preferences</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-700 mb-2">Notification Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive updates about your courses via email</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <div className="relative">
                            <input type="checkbox" className="sr-only" defaultChecked />
                            <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Assignment Reminders</p>
                          <p className="text-sm text-gray-500">Get notified about upcoming assignment deadlines</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <div className="relative">
                            <input type="checkbox" className="sr-only" defaultChecked />
                            <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Course Updates</p>
                          <p className="text-sm text-gray-500">Get notified when your courses are updated</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <div className="relative">
                            <input type="checkbox" className="sr-only" defaultChecked />
                            <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-700 mb-2">App Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-gray-500">Switch between light and dark theme</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <div className="relative">
                            <input type="checkbox" className="sr-only" />
                            <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Accessibility</p>
                          <p className="text-sm text-gray-500">Enable screen reader support and high contrast</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <div className="relative">
                            <input type="checkbox" className="sr-only" />
                            <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;