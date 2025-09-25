import { requiredCategories } from './mockData.js';
import { isVegetarianVariant } from '../utils/abTesting';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorText = await response.text();
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.status = response.status;
        error.responseText = errorText;
        throw error;
      }

      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get(endpoint, params = {}) {
    const searchParams = new URLSearchParams(params);
    const queryString = searchParams.toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    return this.request(url, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Categories API - використовуємо реальний API (ендпоінт /categories реалізований на бекенді)
export const categoriesAPI = {
  getCategories: async () => {
    const isVeg = isVegetarianVariant();

    try {
      const response = await new ApiService(API_BASE_URL).get('/categories');

        const nameMapping = {
          'Dessert': 'Desserts',
        };

        const transformedCategories = response.data.map(category => ({
          _id: category.id,
          name: nameMapping[category.name] || category.name
        }));
      let finalCategories = transformedCategories;
      if (isVeg) {
        finalCategories = transformedCategories.map(category => {
            switch (category.name) {
              case 'Beef':
                const vegetarianCategory = response.data.find(cat => cat.name === 'Vegetarian');
                return { _id: vegetarianCategory?.id || category._id, name: 'Vegetarian' };
              case 'Lamb':
                const veganCategory = response.data.find(cat => cat.name === 'Vegan');
                return { _id: veganCategory?.id || category._id, name: 'Vegan' };
              case 'Goat':
                const soupCategory = response.data.find(cat => cat.name === 'Soup');
                return { _id: soupCategory?.id || category._id, name: 'Soup' };
            default:
              return category;
          }
        });
      }

      const currentRequiredCategories = isVeg ?
        ['Vegetarian', 'Breakfast', 'Desserts', 'Vegan', 'Soup', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter'] :
        requiredCategories;

      const filteredCategories = finalCategories.filter(category =>
        currentRequiredCategories.includes(category.name)
      );

      const sortedCategories = currentRequiredCategories.map(name =>
        filteredCategories.find(cat => cat.name === name)
      ).filter(Boolean);

      return { data: sortedCategories };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
};

export const recipesAPI = {
  getRecipesByCategory: async (categoryId, page = 1, limit = 12) => {
    const params = { page, limit };
    if (categoryId !== 'all') {
      params.category = categoryId;
    }

    try {
      const response = await new ApiService(API_BASE_URL).get('/recipes', params);

      const transformedData = {
        recipes: response.data.items || [],
        totalPages: Math.ceil((response.data.totalCount || 0) / limit),
        currentPage: page,
        totalRecipes: response.data.totalCount || 0
      };

      return { data: transformedData, status: response.status };
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  },
};
