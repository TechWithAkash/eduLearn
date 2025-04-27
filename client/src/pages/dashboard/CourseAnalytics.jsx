import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import toast from 'react-hot-toast';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CourseAnalytics = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [dateRange, setDateRange] = useState('week'); // 'week', 'month', 'year'
  const [viewType, setViewType] = useState('overview'); // 'overview', 'engagement', 'performance'
  const [activeStudents, setActiveStudents] = useState([]);
  const [topModules, setTopModules] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [assignmentResults, setAssignmentResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch course details
        const courseResponse = await api.get(`/courses/${courseId}`);
        setCourse(courseResponse.data.data);
        
        // Fetch course analytics
        const analyticsResponse = await api.get(`/analytics/courses/${courseId}?range=${dateRange}`);
        setAnalytics(analyticsResponse.data.data);
        
        // Fetch active students
        const studentsResponse = await api.get(`/courses/${courseId}/students?active=true&limit=5`);
        setActiveStudents(studentsResponse.data.data);
        
        // Fetch top modules by completion
        const modulesResponse = await api.get(`/courses/${courseId}/modules/popular`);
        setTopModules(modulesResponse.data.data);
        
        // Fetch quiz results
        const quizResponse = await api.get(`/analytics/courses/${courseId}/quizzes`);
        setQuizResults(quizResponse.data.data);
        
        // Fetch assignment results
        const assignmentResponse = await api.get(`/analytics/courses/${courseId}/assignments`);
        setAssignmentResults(assignmentResponse.data.data);
        
      } catch (error) {
        console.error('Error fetching course analytics:', error);
        toast.error('Failed to load course analytics');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [courseId, dateRange]);

  // Dummy data for charts when real data isn't available
  const getDummyEngagementData = () => {
    if (dateRange === 'week') {
      return {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            label: 'Active Students',
            data: [12, 19, 15, 22, 18, 8, 10],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };
    } else if (dateRange === 'month') {
      return {
        labels: Array.from({ length: 4 }, (_, i) => `Week ${i + 1}`),
        datasets: [
          {
            label: 'Active Students',
            data: [45, 62, 58, 67],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };
    } else {
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Active Students',
            data: [120, 150, 180, 210, 190, 170, 160, 180, 220, 250, 230, 240],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };
    }
  };

  const getDummyCompletionRateData = () => {
    return {
      labels: ['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5'],
      datasets: [
        {
          label: 'Completion Rate (%)',
          data: [95, 82, 68, 45, 30],
          backgroundColor: [
            'rgba(75, 192, 192, 0.7)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(75, 192, 192, 0.4)',
            'rgba(75, 192, 192, 0.3)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const getDummyQuizPerformanceData = () => {
    return {
      labels: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4'],
      datasets: [
        {
          label: 'Average Score (%)',
          data: [85, 72, 78, 68],
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const getDummyAssignmentPerformanceData = () => {
    return {
      labels: ['Assignment 1', 'Assignment 2', 'Assignment 3'],
      datasets: [
        {
          label: 'Average Score (%)',
          data: [88, 75, 82],
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const getDummyStudentProgressData = () => {
    return {
      labels: ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'],
      datasets: [
        {
          label: 'Students',
          data: [5, 12, 18, 24, 16],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(54, 162, 235, 0.5)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Course not found. Please select a valid course.
              </p>
            </div>
          </div>
        </div>
        <Link to="/dashboard/courses" className="text-blue-600 hover:text-blue-800">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{course.title} - Analytics</h1>
          <p className="text-gray-600">Gain insights into student engagement and performance</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            to={`/dashboard/courses/${courseId}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Back to Course
          </Link>
        </div>
      </div>

      {/* Date range selector */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                viewType === 'overview' 
                  ? 'bg-white shadow text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`} 
              onClick={() => setViewType('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                viewType === 'engagement' 
                  ? 'bg-white shadow text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`} 
              onClick={() => setViewType('engagement')}
            >
              Engagement
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                viewType === 'performance' 
                  ? 'bg-white shadow text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`} 
              onClick={() => setViewType('performance')}
            >
              Performance
            </button>
          </div>
          
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-600">Time Period:</span>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 bg-white"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overview View */}
      {viewType === 'overview' && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Total Students</h2>
                  <p className="text-3xl font-bold text-gray-800">{analytics?.totalStudents || 75}</p>
                  <p className="text-green-600 text-sm">
                    <span className="font-medium">↑ 12%</span> vs previous {dateRange}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Completion Rate</h2>
                  <p className="text-3xl font-bold text-gray-800">{analytics?.completionRate || '68%'}</p>
                  <p className="text-green-600 text-sm">
                    <span className="font-medium">↑ 5%</span> vs previous {dateRange}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Avg. Quiz Score</h2>
                  <p className="text-3xl font-bold text-gray-800">{analytics?.avgQuizScore || '76%'}</p>
                  <p className="text-red-600 text-sm">
                    <span className="font-medium">↓ 2%</span> vs previous {dateRange}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Avg. Time Spent</h2>
                  <p className="text-3xl font-bold text-gray-800">{analytics?.avgTimeSpent || '3.2h'}</p>
                  <p className="text-green-600 text-sm">
                    <span className="font-medium">↑ 8%</span> vs previous {dateRange}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Overview Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Student Progress Distribution</h2>
              <div className="h-64">
                <Doughnut 
                  data={getDummyStudentProgressData()}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    },
                  }}
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Module Completion Rates</h2>
              <div className="h-64">
                <Bar 
                  data={getDummyCompletionRateData()}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Recent Activity and Top Students */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Most Active Students</h2>
                <Link to={`/dashboard/courses/${courseId}/students`} className="text-blue-600 text-sm hover:text-blue-800">
                  View All
                </Link>
              </div>
              <div className="p-6">
                {activeStudents.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {activeStudents.map((student, index) => (
                      <li key={student._id || index} className="py-3">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-medium">
                                {student.name ? student.name.charAt(0) : 'S'}
                              </span>
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{student.name || `Student ${index + 1}`}</p>
                            <p className="text-sm text-gray-500">Progress: {student.progress || `${85 - index * 10}%`}</p>
                          </div>
                          <div className="ml-auto">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              index === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {index === 0 ? 'Top Performer' : 'Active'}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No active students yet</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
                <Link to="#" className="text-blue-600 text-sm hover:text-blue-800">
                  View Activity Log
                </Link>
              </div>
              <div className="p-6">
                <ul className="divide-y divide-gray-200">
                  <li className="py-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">Quiz Submission</p>
                        <p className="text-sm text-gray-500">John Doe completed "Module 2 Quiz" with a score of 85%</p>
                        <p className="mt-1 text-xs text-gray-400">Today at 2:34 PM</p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">Assignment Submission</p>
                        <p className="text-sm text-gray-500">Sarah Johnson submitted "Final Project" for grading</p>
                        <p className="mt-1 text-xs text-gray-400">Yesterday at 4:12 PM</p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">New Enrollment</p>
                        <p className="text-sm text-gray-500">3 new students enrolled in the course</p>
                        <p className="mt-1 text-xs text-gray-400">2 days ago</p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                          <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">Module Completion</p>
                        <p className="text-sm text-gray-500">Michael Brown completed "Advanced Techniques" module</p>
                        <p className="mt-1 text-xs text-gray-400">3 days ago</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Engagement View */}
      {viewType === 'engagement' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Active Students</h2>
                  <p className="text-3xl font-bold text-gray-800">{analytics?.activeStudents || 48}</p>
                  <p className="text-sm text-gray-500">of {analytics?.totalStudents || 75} enrolled</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Content Views</h2>
                  <p className="text-3xl font-bold text-gray-800">{analytics?.contentViews || '1,254'}</p>
                  <p className="text-green-600 text-sm">
                    <span className="font-medium">↑ 18%</span> vs previous {dateRange}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Avg. Session Duration</h2>
                  <p className="text-3xl font-bold text-gray-800">{analytics?.avgSessionDuration || '28m'}</p>
                  <p className="text-green-600 text-sm">
                    <span className="font-medium">↑ 5%</span> vs previous {dateRange}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Student Engagement Over Time</h2>
            <div className="h-80">
              <Line 
                data={getDummyEngagementData()} 
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Number of Active Students'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: dateRange === 'week' ? 'Day of Week' : dateRange === 'month' ? 'Week of Month' : 'Month'
                      }
                    }
                  },
                }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">Most Viewed Content</h2>
              </div>
              <div className="p-6">
                <ul className="divide-y divide-gray-200">
                  <li className="py-3 flex items-center justify-between">
                    <div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded uppercase">Lesson</span>
                      <p className="mt-1 text-sm font-medium text-gray-900">Introduction to Course Concepts</p>
                      <p className="text-sm text-gray-500">Module 1</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">185</p>
                      <p className="text-xs text-gray-500">views</p>
                    </div>
                  </li>
                  <li className="py-3 flex items-center justify-between">
                    <div>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded uppercase">Video</span>
                      <p className="mt-1 text-sm font-medium text-gray-900">Advanced Techniques Demo</p>
                      <p className="text-sm text-gray-500">Module 2</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">142</p>
                      <p className="text-xs text-gray-500">views</p>
                    </div>
                  </li>
                  <li className="py-3 flex items-center justify-between">
                    <div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded uppercase">Quiz</span>
                      <p className="mt-1 text-sm font-medium text-gray-900">Module 1 Assessment</p>
                      <p className="text-sm text-gray-500">Module 1</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">124</p>
                      <p className="text-xs text-gray-500">views</p>
                    </div>
                  </li>
                  <li className="py-3 flex items-center justify-between">
                    <div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded uppercase">Assignment</span>
                      <p className="mt-1 text-sm font-medium text-gray-900">Final Project Guidelines</p>
                      <p className="text-sm text-gray-500">Module 3</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">98</p>
                      <p className="text-xs text-gray-500">views</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">Engagement by Content Type</h2>
              </div>
              <div className="p-6 h-96 flex items-center justify-center">
                <Doughnut 
                  data={{
                    labels: ['Videos', 'Quizzes', 'Assignments', 'Documents', 'Discussions'],
                    datasets: [
                      {
                        data: [45, 20, 15, 12, 8],
                        backgroundColor: [
                          'rgba(54, 162, 235, 0.7)',
                          'rgba(153, 102, 255, 0.7)',
                          'rgba(255, 159, 64, 0.7)',
                          'rgba(75, 192, 192, 0.7)',
                          'rgba(255, 99, 132, 0.7)',
                        ],
                        borderColor: [
                          'rgba(54, 162, 235, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${percentage}% (${value} views)`;
                          }
                        }
                      }
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Performance View */}
      {viewType === 'performance' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Average Quiz Score</h2>
                  <p className="text-3xl font-bold text-gray-800">{analytics?.avgQuizScore || '76%'}</p>
                  <p className="text-red-600 text-sm">
                    <span className="font-medium">↓ 2%</span> vs previous {dateRange}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Average Assignment Score</h2>
                  <p className="text-3xl font-bold text-gray-800">{analytics?.avgAssignmentScore || '82%'}</p>
                  <p className="text-green-600 text-sm">
                    <span className="font-medium">↑ 3%</span> vs previous {dateRange}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-gray-600 text-sm">Pass Rate</h2>
                  <p className="text-3xl font-bold text-gray-800">{analytics?.passRate || '88%'}</p>
                  <p className="text-green-600 text-sm">
                    <span className="font-medium">↑ 4%</span> vs previous {dateRange}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quiz Performance</h2>
              <div className="h-80">
                <Bar 
                  data={getDummyQuizPerformanceData()}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                          display: true,
                          text: 'Average Score (%)'
                        }
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Quiz'
                        }
                      }
                    },
                  }}
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Assignment Performance</h2>
              <div className="h-80">
                <Bar 
                  data={getDummyAssignmentPerformanceData()}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                          display: true,
                          text: 'Average Score (%)'
                        }
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Assignment'
                        }
                      }
                    },
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">Question Analysis</h2>
              </div>
              <div className="p-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quiz
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Question
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Difficulty
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Success Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Module 1 Quiz</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">What is the primary purpose of X?</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Medium
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                          </div>
                          <span className="text-sm text-gray-900">65%</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Module 2 Quiz</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">Explain the relationship between Y and Z.</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Hard
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "42%" }}></div>
                          </div>
                          <span className="text-sm text-gray-900">42%</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Module 1 Quiz</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">Identify the basic components of A.</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Easy
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                          </div>
                          <span className="text-sm text-gray-900">92%</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Module 3 Quiz</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">What are the advanced features of B?</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Medium
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "74%" }}></div>
                          </div>
                          <span className="text-sm text-gray-900">74%</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">Students Needing Attention</h2>
              </div>
              <div className="p-6">
                <ul className="divide-y divide-gray-200">
                  <li className="py-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                          <span className="text-red-600 font-medium">JD</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">James Doe</p>
                        <p className="text-sm text-gray-500">Failed 2 quizzes</p>
                      </div>
                      <div className="ml-auto">
                        <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                          Message
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                          <span className="text-red-600 font-medium">RJ</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Rachel Johnson</p>
                        <p className="text-sm text-gray-500">Low activity (2 weeks)</p>
                      </div>
                      <div className="ml-auto">
                        <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                          Message
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                          <span className="text-red-600 font-medium">MS</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Michael Scott</p>
                        <p className="text-sm text-gray-500">Assignment overdue (5 days)</p>
                      </div>
                      <div className="ml-auto">
                        <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                          Message
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseAnalytics;