// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { api } from '../../../services/api';
// import LoadingSpinner from '../../common/LoadingSpinner';

// const UsersList = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [roleFilter, setRoleFilter] = useState('all');
//   const [statusFilter, setStatusFilter] = useState('all');

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setIsLoading(true);
        
//         // In a real app, you would fetch this data from your API
//         // For this demo, we'll use mock data
        
//         // Simulating API call
//         setTimeout(() => {
//           const mockUsers = [
//             { _id: '1', name: 'John Smith', email: 'john@example.com', role: 'student', isActive: true, createdAt: '2023-01-15T10:30:00Z', lastLogin: '2023-04-20T15:45:00Z' },
//             { _id: '2', name: 'Sarah Williams', email: 'sarah@example.com', role: 'tutor', isActive: true, createdAt: '2023-02-10T14:15:00Z', lastLogin: '2023-04-19T09:20:00Z' },
//             { _id: '3', name: 'Michael Johnson', email: 'michael@example.com', role: 'student', isActive: true, createdAt: '2023-03-05T09:45:00Z', lastLogin: '2023-04-18T11:10:00Z' },
//             { _id: '4', name: 'Emily Brown', email: 'emily@example.com', role: 'student', isActive: false, createdAt: '2023-03-12T16:20:00Z', lastLogin: '2023-04-10T08:30:00Z' },
//             { _id: '5', name: 'Robert Davis', email: 'robert@example.com', role: 'tutor', isActive: true, createdAt: '2023-03-18T11:30:00Z', lastLogin: '2023-04-17T14:25:00Z' },
//             { _id: '6', name: 'Jennifer Lee', email: 'jennifer@example.com', role: 'tutor', isActive: true, createdAt: '2023-03-20T13:45:00Z', lastLogin: '2023-04-16T10:15:00Z' },
//             { _id: '7', name: 'David Wilson', email: 'david@example.com', role: 'student', isActive: true, createdAt: '2023-03-25T10:10:00Z', lastLogin: '2023-04-15T16:40:00Z' },
//             { _id: '8', name: 'Alex Turner', email: 'alex@example.com', role: 'admin', isActive: true, createdAt: '2023-01-05T09:00:00Z', lastLogin: '2023-04-20T09:05:00Z' },
//             { _id: '9', name: 'Jessica Martin', email: 'jessica@example.com', role: 'student', isActive: false, createdAt: '2023-02-15T15:30:00Z', lastLogin: '2023-03-25T11:20:00Z' },
//             { _id: '10', name: 'Daniel Clark', email: 'daniel@example.com', role: 'student', isActive: true, createdAt: '2023-04-01T08:45:00Z', lastLogin: '2023-04-19T15:30:00Z' },
//           ];
          
//           setUsers(mockUsers);
//           setIsLoading(false);
//         }, 1000);
        
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         setIsLoading(false);
//       }
//     };
    
//     fetchUsers();
//   }, []);

//   // Filter users based on search query and filters
//   const filteredUsers = users.filter(user => {
//     const matchesSearch = 
//       user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
//     const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
//     const matchesStatus = statusFilter === 'all' || 
//       (statusFilter === 'active' && user.isActive) ||
//       (statusFilter === 'inactive' && !user.isActive);
    
//     return matchesSearch && matchesRole && matchesStatus;
//   });

//   const handleDeleteUser = (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       // In a real app, you would make an API call to delete the user
//       setUsers(users.filter(user => user._id !== userId));
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">Users Management13</h2>
//         <div className="mt-3 md:mt-0">
//           <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm">
//             Add New User
//           </button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg shadow p-6 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Search users..."
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
          
//           <div className="flex items-center">
//             <label htmlFor="roleFilter" className="block text-sm font-medium text-gray-700 mr-2">Role:</label>
//             <select
//               id="roleFilter"
//               className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//               value={roleFilter}
//               onChange={(e) => setRoleFilter(e.target.value)}
//             >
//               <option value="all">All Roles</option>
//               <option value="student">Students</option>
//               <option value="tutor">Tutors</option>
//               <option value="admin">Admins</option>
//             </select>
//           </div>
          
//           <div className="flex items-center">
//             <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mr-2">Status:</label>
//             <select
//               id="statusFilter"
//               className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   User
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Role
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Joined Date
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Last Login
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredUsers.map((user) => (
//                 <tr key={user._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
//                         <span className="text-gray-700 font-medium">{user.name.charAt(0)}</span>
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{user.name}</div>
//                         <div className="text-sm text-gray-500">{user.email}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       user.role === 'admin' 
//                         ? 'bg-purple-100 text-purple-800' 
//                         : user.role === 'tutor'
//                         ? 'bg-blue-100 text-blue-800'
//                         : 'bg-green-100 text-green-800'
//                     }`}>
//                       {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                     }`}>
//                       {user.isActive ? 'Active' : 'Inactive'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(user.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(user.lastLogin).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex space-x-3">
//                       <Link to={`/dashboard/users/${user._id}`} className="text-indigo-600 hover:text-indigo-900">
//                         Edit
//                       </Link>
//                       <button 
//                         onClick={() => handleDeleteUser(user._id)} 
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsersList;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../services/api';
import LoadingSpinner from '../../common/LoadingSpinner';
import defaultAvatar from '../../../src/assets/default-user.png'; // Create this file or use any placeholder image


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    students: 0,
    tutors: 0,
    admins: 0,
    active: 0
  });
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite error loop
    e.target.src = defaultAvatar; // Fall back to default avatar
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/users');
        
        if (response.data && response.data.data) {
          const userData = response.data.data;
          setUsers(userData);
          
          // Calculate stats
          const students = userData.filter(user => user.role === 'student').length;
          const tutors = userData.filter(user => user.role === 'tutor').length;
          const admins = userData.filter(user => user.role === 'admin').length;
          const active = userData.filter(user => user.isActive).length;
          
          setStats({
            total: userData.length,
            students,
            tutors,
            admins,
            active
          });
        } else {
          toast.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await api.delete(`/users/${userId}`);
        
        if (response.data && response.data.success) {
          // Update state after successful deletion
          setUsers(users.filter(user => user._id !== userId));
          toast.success('User deleted successfully');
          
          // Update stats
          const updatedUsers = users.filter(user => user._id !== userId);
          const deletedUser = users.find(user => user._id === userId);
          
          if (deletedUser) {
            setStats(prevStats => ({
              ...prevStats,
              total: prevStats.total - 1,
              [deletedUser.role + 's']: prevStats[deletedUser.role + 's'] - 1,
              active: deletedUser.isActive ? prevStats.active - 1 : prevStats.active
            }));
          }
        } else {
          toast.error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error(error.response?.data?.message || 'Error deleting user');
      }
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      const response = await api.put(`/users/${userId}/status`, {
        isActive: !currentStatus
      });
      
      if (response.data && response.data.success) {
        // Update user status in state
        setUsers(users.map(user => 
          user._id === userId ? { ...user, isActive: !currentStatus } : user
        ));
        
        // Update active count in stats
        setStats(prevStats => ({
          ...prevStats,
          active: currentStatus 
            ? prevStats.active - 1 
            : prevStats.active + 1
        }));
        
        toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      } else {
        toast.error('Failed to update user status');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Error updating user status');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
        {/* <Link 
          to="/dashboard/users/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center"
        >
          Add New User
        </Link> */}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="text-xs text-gray-500 uppercase">Total Users</div>
          <div className="text-xl font-bold text-gray-800">{stats.total}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="text-xs text-gray-500 uppercase">Students</div>
          <div className="text-xl font-bold text-gray-800">{stats.students}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <div className="text-xs text-gray-500 uppercase">Tutors</div>
          <div className="text-xl font-bold text-gray-800">{stats.tutors}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <div className="text-xs text-gray-500 uppercase">Admins</div>
          <div className="text-xl font-bold text-gray-800">{stats.admins}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="text-xs text-gray-500 uppercase">Active Users</div>
          <div className="text-xl font-bold text-gray-800">{stats.active}</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search users..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="tutor">Tutors</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500">
            {searchTerm || roleFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'There are no users in the system yet'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map(user => (
                  <tr key={user._id} className={!user.isActive ? 'bg-gray-50' : undefined}>
                    <td className="px-6 py-4 whitespace-nowrap">
  <div className="flex items-center">
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
      <img 
        src={user.profilePicture || '/default-user.png'}
        alt={user.name || 'User'}
        className="h-10 w-10 rounded-full object-cover"
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite error loop
          e.target.src = '/default-user.png'; // Use default image from public folder
        }}
      />
    </div>
    <div className="ml-4">
      <div className="text-sm font-medium text-gray-900">{user.name || 'Unnamed User'}</div>
      {user.lastLogin && (
        <div className="text-xs text-gray-500">
          Last login: {new Date(user.lastLogin).toLocaleDateString()}
        </div>
      )}
    </div>
  </div>
</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                        user.role === 'tutor' ? 'bg-green-100 text-green-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                        {user.role || 'student'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => handleStatusToggle(user._id, user.isActive)}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer
                          ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-3">
                        <Link 
                          to={`/dashboard/users/${user._id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-900"
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
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-gray-500 text-sm">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;