import api from './api.js';

export const usersAPI = {
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'User not found';
      throw new Error(message);
    }
  },

  getRecipies: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/recipes`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Error getting recipes';
      throw new Error(message);
    }
  },

  getFavorites: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/favorites`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Error getting favorites';
      throw new Error(message);
    }
  },

  getFollowers: async (userId, page = 1, limit = 12) => {
    const params = { page, limit };
    try {
      const response = await api.get(`/users/${userId}/followers`, { params });
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Error getting followers';
      throw new Error(message);
    }
  },

  getFollowing: async (userId, page = 1, limit = 12) => {
    const params = { page, limit };
    try {
      const response = await api.get(`/users/${userId}/following`, { params });
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Error getting following';
      throw new Error(message);
    }
  }
};