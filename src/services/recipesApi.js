import api from './api.js';

export const recipesAPI = {

  getRecipesByCategory: async (categoryId, page = 1, limit = 12) => {
    const params = { page, limit };
    if (categoryId !== 'all') params.category = categoryId;

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
  },

  getCategories: async () => {
    try {
      const { data } = await api.get('/categories');
      return (data || []).map(c => ({
        id: c.id,
        name: c.name
      }));
    } catch (error) {
      console.error('Failed to load categories:', error);
      throw error;
    }
  },

  getCountries: async () => {
    try {
      const { data } = await api.get('/areas');
      const list = Array.isArray(data) ? data : (data?.areas || []);
      return list.map(item => {
        const code = String(item.id).slice(0, 2)
          .toUpperCase();
        return { code, name: item.name };
      });
    } catch (error) {
      console.error('Failed to load areas:', error);
      throw error;
    }
  },

  getIngredients: async () => {
    try {
      const { data } = await api.get('/ingredients');
      return (data || []).map(i => ({
        id: i.id,
        name: i.name,
        imgUrl: i.imgUrl
      }));
    } catch (error) {
      console.error('Failed to load ingredients:', error);
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
