import api from './api.js';
import { requiredCategories } from './mockData.js';

const NAME_MAPPING = {
  Dessert: 'Desserts'
};

const transformCategories = categories => {
  return categories.map(category => ({
    _id: category.id,
    name: NAME_MAPPING[category.name] || category.name
  }));
};

const filterAndSortCategories = (categories, requiredCategories) => {
  const filtered = categories.filter(category => requiredCategories.includes(category.name));

  return requiredCategories.map(name => filtered.find(cat => cat.name === name)).filter(Boolean);
};

export const categoriesAPI = {
  getCategories: async () => {
    try {
      const response = await api.get('/categories');

      const transformedCategories = transformCategories(response.data);
      const sortedCategories = filterAndSortCategories(transformedCategories, requiredCategories);

      return { data: sortedCategories };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};
