import api from './api.js';

export const usersAPI = {
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

  getFollowers: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/followers`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Error getting followers';
      throw new Error(message);
    }
  },

  getFollowing: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/following`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Error getting following';
      throw new Error(message);
    }
  }
};