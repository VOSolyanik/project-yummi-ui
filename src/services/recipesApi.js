import api from './api.js';

export const recipesAPI = {
  getRecipesByCategory: async (categoryId, page = 1, limit = 12, ingredient = null, area = null) => {
    const params = { page, limit };
    if (categoryId !== 'all') {
      params.category = categoryId;
    }
    if (ingredient) {
      params.ingredient = ingredient;
    }
    if (area) {
      params.area = area;
    }

    try {
      const response = await api.get('/recipes', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  },

  // Get rcipe by ID
  getRecipeById: async (recipeId) => {
    try {
      const response = await api.get(`/recipes/${recipeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching recipe with ID ${recipeId}:`, error);
      throw error;
    }
  },

  // Get Popular Recipes
  getPopularRecipes: async (page = 1, limit = 4) => {
    try {
      const params = { page, limit };
      const response = await api.get('/recipes/popular', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular recipes:', error);
      throw error;
    }
  },

  createRecipe: async (formData) => {
    try {
      const { data } = await api.post('/recipes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return data ?? {};
    } catch (error) {
      console.error('Failed to create recipe:', error);
      throw error;
    }
  }
};

export const filtersAPI = {
  getIngredients: async () => {
    try {
      const response = await api.get('/ingredients');
      return { data: response.data };
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      throw error;
    }
  },

  getAreas: async () => {
    try {
      const response = await api.get('/areas');
      return { data: response.data };
    } catch (error) {
      console.error('Error fetching areas:', error);
      throw error;
    }
  }
};
