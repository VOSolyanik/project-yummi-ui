import api from './api.js';

export const authAPI = {
  // Register new user
  register: async userData => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration error';
      throw new Error(message);
    }
  },

  // User login
  login: async credentials => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login error';
      throw new Error(message);
    }
  },

  // User logout
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Logout error');
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Error getting user data';
      throw new Error(message);
    }
  },

  uploadUserAvatar: async (formData, headers) => {
    try {
      const response = await api.patch('users/avatar', formData, headers);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Error getting user data';
      throw new Error(message);
    }
  }
};
