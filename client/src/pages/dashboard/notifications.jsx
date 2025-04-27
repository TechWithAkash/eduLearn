import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import toast from 'react-hot-toast';
import { format, formatDistanceToNow } from 'date-fns';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/notifications');
      setNotifications(response.data.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}`);
      
      // Update local state
      setNotifications(notifications.map(notif => 
        notif._id === id ? { ...notif, isRead: true } : notif
      ));
      
      toast.success('Notification marked as read');
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to update notification');
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put('/notifications/read-all');
      
      // Update local state
      setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
      
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast.error('Failed to update notifications');
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      
      // Update local state
      setNotifications(notifications.filter(notif => notif._id !== id));
      
      toast.success('Notification deleted');
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast.error('Failed to delete notification');
    }
  };

  const clearAllNotifications = async () => {
    try {
      await api.delete('/notifications');
      
      // Update local state
      setNotifications([]);
      
      toast.success('All notifications cleared');
    } catch (error) {
      console.error('Error clearing notifications:', error);
      toast.error('Failed to clear notifications');
    }
  };

  const getFilteredNotifications = () => {
    if (activeFilter === 'all') {
      return notifications;
    } else if (activeFilter === 'unread') {
      return notifications.filter(notif => !notif.isRead);
    } else {
      return notifications.filter(notif => notif.type === activeFilter);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'announcement':
        return (
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-500">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
        );
      case 'grade':
        return (
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-500">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'enrollment':
        return (
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 text-purple-500">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-500">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
          
          <div className="flex space-x-2">
            {notifications.some(notif => !notif.isRead) && (
              <button
                onClick={markAllAsRead}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors duration-200"
              >
                Mark all as read
              </button>
            )}
            
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-md hover:bg-red-200 transition-colors duration-200"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeFilter === 'all' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('unread')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeFilter === 'unread' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setActiveFilter('announcement')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeFilter === 'announcement' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Announcements
            </button>
            <button
              onClick={() => setActiveFilter('grade')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeFilter === 'grade' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Grades
            </button>
            <button
              onClick={() => setActiveFilter('enrollment')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeFilter === 'enrollment' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Enrollments
            </button>
            <button
              onClick={() => setActiveFilter('system')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeFilter === 'system' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              System
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-12 px-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No notifications</h3>
              <p className="mt-1 text-sm text-gray-500">
                You don't have any {activeFilter !== 'all' ? `${activeFilter} ` : ''}notifications at the moment.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <li 
                  key={notification._id} 
                  className={`p-4 sm:px-6 ${!notification.isRead ? 'bg-blue-50' : ''} hover:bg-gray-50 transition-colors duration-200`}
                >
                  <div className="flex items-start space-x-4">
                    {getNotificationIcon(notification.type)}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notification.title}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500" title={format(new Date(notification.createdAt), 'PPpp')}>
                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                          </span>
                          
                          {notification.course && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {notification.course.title}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">{notification.message}</p>
                      
                      <div className="mt-2 flex justify-end space-x-2">
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification._id)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Mark as read
                          </button>
                        )}
                        
                        <button
                          onClick={() => deleteNotification(notification._id)}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;