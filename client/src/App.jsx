// import React from 'react';

// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { useAuth } from '../contexts/AuthContext';

// // Layouts
// import MainLayout from './components/layouts/MainLayout';
// import DashboardLayout from './components/layouts/DashboardLayout';

// // Public Pages
// import Home from './pages/Home';
// import About from './pages/About';
// import CoursesList from './pages/CoursesList';
// import CourseDetail from './pages/CoursesDetail';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';

// // Protected Pages
// import StudentDashboard from './pages/dashboard/StudentDashboard.jsx';
// import TutorDashboard from './pages/dashboard/TutorDashboard.jsx';
// import AdminDashboard from './pages/

// client/src/App.jsx
// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// // Layouts
// import MainLayout from './components/layouts/MainLayout';
// import DashboardLayout from './components/layouts/DashboardLayout';

// // Public Pages
// import Home from './pages/Home';
// import About from './pages/About';
// import CoursesList from './pages/CoursesList';
// import CourseDetail from './pages/CoursesDetail';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';

// // Protected Pages
// import StudentDashboard from './pages/dashboard/StudentDashboard';
// import TutorDashboard from './pages/dashboard/TutorDashboard';
// import AdminDashboard from './pages/dashboard/AdminDashboard';
// import Profile from './pages/dashboard/profile';
// import MyCourses from './pages/dashboard/MyCourses';
// import NotFound from './pages/NotFound';
// import CourseContent from './pages/dashboard/CourseContent';
// import AssignmentPage from './pages/dashboard/AssignmentPage';
// import Quiz from './components/Quiz';
// import QuizResults from './components/QuizResult';

// const App = () => {
//   const { user, isLoading } = useAuth();

//   const ProtectedRoute = ({ children, allowedRoles }) => {
//     if (isLoading) return <div>Loading...</div>;

//     if (!user) {
//       return <Navigate to="/login" replace />;
//     }

//     if (allowedRoles && !allowedRoles.includes(user.role)) {
//       return <Navigate to="/unauthorized" replace />;
//     }

//     return children;
//   };

//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route path="/" element={<MainLayout />}>
//         <Route index element={<Home />} />
//         <Route path="about" element={<About />} />
       
        
//         <Route path="courses" element={<CoursesList />} />
//         <Route path="courses/:courseId" element={<CourseDetail />} />
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//       </Route>

//       {/* Protected routes */}
//       <Route path="/dashboard" element={
//         <ProtectedRoute allowedRoles={['student', 'tutor', 'admin']}>
//           <DashboardLayout />
//         </ProtectedRoute>
//       }>
//         <Route index element={
//           user?.role === 'student' ? <StudentDashboard /> :
//           user?.role === 'tutor' ? <TutorDashboard /> :
//           user?.role === 'admin' ? <AdminDashboard /> :
//           <Navigate to="/" replace />
//         } />
//         <Route path="profile" element={<Profile />} />
//     <Route path="/dashboard/courses/:courseId" element={<CourseContent />} />
//     <Route path="/dashboard/courses/:courseId/quiz/:quizId" element={<Quiz />} />
//     <Route path="/dashboard/courses/quiz/:quizId/results" element={<QuizResults />} />
// <Route path= "/dashboard/courses/:courseId/assignment/:assignmentId" element={<AssignmentPage />} />


//         <Route path="my-courses" element={<MyCourses />} />
//       </Route>

//       {/* 404 */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default App;



// client/src/App.jsx
// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// // Layouts
// import MainLayout from './components/layouts/MainLayout';
// import DashboardLayout from './components/layouts/DashboardLayout';

// // Public Pages
// import Home from './pages/Home';
// import About from './pages/About';
// import CoursesList from './pages/CoursesList';
// import CourseDetail from './pages/CoursesDetail';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';

// // Protected Pages
// import StudentDashboard from './pages/dashboard/StudentDashboard';
// import TutorDashboard from './pages/dashboard/TutorDashboard';
// import AdminDashboard from './pages/dashboard/AdminDashboard';
// import Profile from './pages/dashboard/profile';
// import MyCourses from './pages/dashboard/MyCourses';
// import NotFound from './pages/NotFound';
// import CourseContent from './pages/dashboard/CourseContent';
// import AssignmentPage from './pages/dashboard/AssignmentPage';
// import Quiz from './components/Quiz';
// import QuizResults from './components/QuizResult';
// import CourseAnalytics from '../src/pages/dashboard/CourseAnalytics'

// const App = () => {
//   const { user, isLoading } = useAuth();

//   const ProtectedRoute = ({ children, allowedRoles }) => {
//     if (isLoading) return <div>Loading...</div>;

//     if (!user) {
//       return <Navigate to="/login" replace />;
//     }

//     if (allowedRoles && !allowedRoles.includes(user.role)) {
//       return <Navigate to="/unauthorized" replace />;
//     }

//     return children;
//   };

//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route path="/" element={<MainLayout />}>
//         <Route index element={<Home />} />
//         <Route path="about" element={<About />} />
       
        
//         <Route path="courses" element={<CoursesList />} />
//         <Route path="courses/:courseId" element={<CourseDetail />} />
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//       </Route>

//       {/* Protected routes */}
//       <Route path="/dashboard" element={
//         <ProtectedRoute allowedRoles={['student', 'tutor', 'admin']}>
//           <DashboardLayout />
//         </ProtectedRoute>
//       }>
//         <Route path="/dashboard/courses/:courseId/analytics" element={
//   <ProtectedRoute allowedRoles={['tutor', 'admin']}>
//     <CourseAnalytics />
//   </ProtectedRoute>
// } />
//         <Route index element={
//           user?.role === 'student' ? <StudentDashboard /> :
//           user?.role === 'tutor' ? <TutorDashboard /> :
//           user?.role === 'admin' ? <AdminDashboard /> :
//           <Navigate to="/" replace />
//         } />
//         <Route path="profile" element={<Profile />} />
//     <Route path="/dashboard/courses/:courseId" element={<CourseContent />} />
//     <Route path="/dashboard/courses/:courseId/quiz/:quizId" element={<Quiz />} />
//     <Route path="/dashboard/courses/quiz/:quizId/results" element={<QuizResults />} />
// <Route path= "/dashboard/courses/:courseId/assignment/:assignmentId" element={<AssignmentPage />} />


//         <Route path="my-courses" element={<MyCourses />} />
//       </Route>

//       {/* 404 */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default App;




import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Layouts
import MainLayout from './components/layouts/MainLayout';
import DashboardLayout from './components/layouts/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import CoursesList from './pages/CoursesList';
import CourseDetail from './pages/CoursesDetail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';

// Dashboard Components - Common
import Profile from './pages/dashboard/Profile';
import MyCourses from './pages/dashboard/MyCourses';
import CourseContent from './pages/dashboard/CourseContent';

// Dashboard Components - Student
import StudentDashboard from './pages/dashboard/StudentDashboard';
import Quiz from './components/Quiz';
import QuizResults from './components/QuizResult';
import AssignmentPage from './pages/dashboard/AssignmentPage';

// Dashboard Components - Tutor
import TutorDashboard from './pages/dashboard/TutorDashboard';
import CourseManager from './pages/dashboard/CourseManager';
import CreateCourse from './pages/dashboard/CreateCourse';
import AssignmentManager from './pages/dashboard/AssignmentManager';
import CreateAssignment from './pages/dashboard/CreateAssignment';
import QuizManager from './pages/dashboard/QuizManager';
import CreateQuiz from './pages/dashboard/CreateQuiz';
import StudentRoster from './pages/dashboard/StudentRoster';
import GradeAssignment from './pages/dashboard/GradeAssignment';
import CourseAnalytics from './pages/dashboard/CourseAnalytics';

// Dashboard Components - Admin
import AdminDashboard from './pages/dashboard/AdminDashboard';

const App = () => {
  const { user, isLoading } = useAuth();

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (isLoading) return <div>Loading...</div>;

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="courses" element={<CoursesList />} />
        <Route path="courses/:courseId" element={<CourseDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Protected dashboard routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['student', 'tutor', 'admin']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        {/* Dashboard home - role-specific */}
        <Route index element={
          user?.role === 'student' ? <StudentDashboard /> :
          user?.role === 'tutor' ? <TutorDashboard /> :
          user?.role === 'admin' ? <AdminDashboard /> :
          <Navigate to="/" replace />
        } />

        {/* Common dashboard routes */}
        <Route path="profile" element={<Profile />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="courses/:courseId" element={<CourseContent />} />
        
        {/* Course content access */}
        <Route path="courses/:courseId/quiz/:quizId" element={<Quiz />} />
        <Route path="courses/quiz/:quizId/results" element={<QuizResults />} />
        {/* <Route path="courses/:courseId/assignment/:assignmentId" element={<AssignmentPage />} />
         */}
         <Route path="assignment/:assignmentId" element={<AssignmentPage />} />
        {/* Tutor-specific routes */}
        <Route path="course-manager" element={
          <ProtectedRoute allowedRoles={['tutor', 'admin']}>
            <CourseManager />
          </ProtectedRoute>
        } />
        <Route path="create-course" element={
          <ProtectedRoute allowedRoles={['tutor', 'admin']}>
            <CreateCourse />
          </ProtectedRoute>
        } />
        <Route path="edit-course/:courseId" element={
          <ProtectedRoute allowedRoles={['tutor', 'admin']}>
            <CreateCourse />
          </ProtectedRoute>
        } />
        <Route path="assignment-manager" element={
          <ProtectedRoute allowedRoles={['tutor', 'admin']}>
            <AssignmentManager />
          </ProtectedRoute>
        } />
        <Route path="create-assignment" element={
          <ProtectedRoute allowedRoles={['tutor', 'admin']}>
            <CreateAssignment />
          </ProtectedRoute>
        } />
        <Route path="edit-assignment/:assignmentId" element={
          <ProtectedRoute allowedRoles={['tutor', 'admin']}>
            <CreateAssignment />
          </ProtectedRoute>
        } />
        <Route path="quiz-manager" element={
          <ProtectedRoute allowedRoles={['tutor', 'admin']}>
            <QuizManager />
          </ProtectedRoute>
        } />
        <Route path="create-quiz" element={
          <ProtectedRoute allowedRoles={['tutor', 'admin']}>
            <CreateQuiz />
          </ProtectedRoute>
        } />
        <Route path="edit-quiz/:quizId" element={
          <ProtectedRoute allowedRoles={['tutor', 'admin']}>
            <CreateQuiz />
          </ProtectedRoute>
        } />
        <Route path="students" element={
          <ProtectedRoute allowedRoles={['tutor', 'admin']}>
            <StudentRoster />
          </ProtectedRoute>
        } />
        <Route path="grade-assignment/:assignmentId/:submissionId" element={
          <ProtectedRoute allowedRoles={['tutor', 'admin']}>
            <GradeAssignment />
          </ProtectedRoute>
        } />
        <Route path="courses/analytics" element={
          <ProtectedRoute allowedRoles={['tutor', 'admin']}>
            <CourseAnalytics />
          </ProtectedRoute>
        } />
        <Route path="courses/:courseId/analytics" element={
          <ProtectedRoute allowedRoles={['tutor', 'admin']}>
            <CourseAnalytics />
          </ProtectedRoute>
        } />
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
