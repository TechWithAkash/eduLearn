import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  // Load user on initial render or token change
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await api.get('/auth/me');
          setUser(response.data.user);
        } catch (error) {
          console.error('Failed to load user:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, [token]);

  // Register user
  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data.user;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      
      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  // // Login user
  // const login = async (credentials) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await api.post('/auth/login', credentials);
  //     const { token, ...user } = response.data.user;
      
  //     localStorage.setItem('token', token);
  //     setToken(token);
  //     setUser(user);
      
  //     toast.success('Login successful!');
  //     return { success: true };
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     toast.error(error.response?.data?.message || 'Invalid credentials');
  //     return { success: false, error };
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Update the login function

const login = async (credentials) => {
  try {
    setIsLoading(true);
    console.log('Attempting login with:', credentials.email);
    
    const response = await api.post('/auth/login', credentials);
    
    console.log('Login response:', response.data);
    
    // Check if the response has the expected structure
    if (!response.data.success || !response.data.user || !response.data.user.token) {
      throw new Error('Invalid response format');
    }
    
    const { token, ...user } = response.data.user;
    
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
    
    toast.success('Login successful!');
    return { success: true, user };
  } catch (error) {
    console.error('Login error:', error);
    
    // More specific error message based on response
    let errorMessage = 'Login failed';
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    }
    
    toast.error(errorMessage);
    return { success: false, error };
  } finally {
    setIsLoading(false);
  }
};

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  // Update user profile
  // const updateProfile = async (userData) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await api.put(`/users/${user._id}`, userData);
  //     setUser(response.data.data);
  //     toast.success('Profile updated successfully');
  //     return { success: true };
  //   } catch (error) {
  //     console.error('Update profile error:', error);
  //     toast.error(error.response?.data?.message || 'Failed to update profile');
  //     return { success: false, error };
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
// Update the updateProfile function

const updateProfile = async (userData) => {
  try {
    setIsLoading(true);
    console.log('Updating profile for user:', user._id);
    
    // Check if userData is FormData or regular object
    const isFormData = userData instanceof FormData;
    
    // Configure proper headers for the request
    const config = {
      headers: {
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
      }
    };
    
    const response = await api.put(`/users/${user._id}`, userData, config);
    
    if (response.data.success) {
      // Update the user state with new information
      setUser({
        ...user,
        ...response.data.data
      });
      
      toast.success('Profile updated successfully');
      return { success: true, data: response.data.data };
    } else {
      throw new Error(response.data.message || 'Failed to update profile');
    }
  } catch (error) {
    console.error('Update profile error:', error);
    toast.error(error.response?.data?.message || 'Failed to update profile');
    return { success: false, error };
  } finally {
    setIsLoading(false);
  }
};
  const value = {
    user,
    token,
    isLoading,
    register,
    login,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};