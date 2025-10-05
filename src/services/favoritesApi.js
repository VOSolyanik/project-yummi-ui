import api from './api';


export const favoritesApi = {
  getFavoriteRecipes: async (userId, params = {}) => {
    try {
      const { page = 1, limit = 12 } = params;
      const queryParams = new URLSearchParams({ page, limit });
      const response = await api.get(`/users/${userId}/favorites?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching favorite recipes:', error);
      // Return empty result if endpoint doesn't exist or user has no favorites
      return { recipes: [] };
    }
  },
  addToFavorites: async (recipeId) => {
    try {
      const response = await api.post(`/recipes/${recipeId}/favorite`);
      return response.data;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  },
  removeFromFavorites: async (recipeId) => {
    try {
      const response = await api.delete(`/recipes/${recipeId}/favorite`);
      return response.data;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  }
};