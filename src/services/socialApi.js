import api from './api.js';

export const socialAPI = {
  getFollowers: async (id, page = 1, limit = 12) => {
    const params = { page, limit };
    try {
      const response = await api.get('/users/' + id + '/followers', { params });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Error getting user data';
      throw new Error(message);
    }
  },

  getFollowing: async (id, page = 1, limit = 12) => {
    const params = { page, limit };
    try {
      const response = await api.get('/users/' + id + '/following', { params });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Error getting user data';
      throw new Error(message);
    }
  },

  followUser: async (id, page = 1, limit = 12) => {
    const params = { page, limit };
    try {
      const response = await api.post('/users/' + id + '/follow', { params });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Error getting user data';
      throw new Error(message);
    }
  },

  unfollowUser: async (id, page = 1, limit = 12) => {
    const params = { page, limit };
    try {
      const response = await api.delete('/users/' + id + '/unfollow', { params });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Error getting user data';
      throw new Error(message);
    }
  }
};
