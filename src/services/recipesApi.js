import api from './api.js';

export const recipesAPI = {
  getRecipesByCategory: async (categoryId, page = 1, limit = 12) => {
    const params = { page, limit };
    if (categoryId !== 'all') {
      params.category = categoryId;
    }

    try {
      const response = await api.get('/recipes', { params });

      const transformedData = {
        recipes: response.data.items || [],
        totalPages: Math.ceil((response.data.totalCount || 0) / limit),
        currentPage: page,
        totalRecipes: response.data.totalCount || 0
      };

      return { data: transformedData };
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  }
};
