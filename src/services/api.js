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

const NAME_MAPPING = {
  'Dessert': 'Desserts',
};

const VEGETARIAN_CATEGORIES = [
  'Vegetarian', 'Breakfast', 'Desserts', 'Vegan', 'Soup', 
  'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter'
];

const CATEGORY_MAPPINGS = {
  'Beef': 'Vegetarian',
  'Lamb': 'Vegan', 
  'Goat': 'Soup'
};

const transformCategories = (categories) => {
  return categories.map(category => ({
    _id: category.id,
    name: NAME_MAPPING[category.name] || category.name
  }));
};

const applyVegetarianMapping = (categories, originalData) => {
  return categories.map(category => {
    const mappedName = CATEGORY_MAPPINGS[category.name];
    if (mappedName) {
      const targetCategory = originalData.find(cat => cat.name === mappedName);
      return { 
        _id: targetCategory?.id || category._id, 
        name: mappedName 
      };
    }
    return category;
  });
};

const filterAndSortCategories = (categories, requiredCategories) => {
  const filtered = categories.filter(category =>
    requiredCategories.includes(category.name)
  );
  
  return requiredCategories
    .map(name => filtered.find(cat => cat.name === name))
    .filter(Boolean);
};

export const categoriesAPI = {
  getCategories: async () => {
    const isVeg = isVegetarianVariant();

    try {
      const response = await new ApiService(API_BASE_URL).get('/categories');
      
      let transformedCategories = transformCategories(response.data);
      
      if (isVeg) {
        transformedCategories = applyVegetarianMapping(transformedCategories, response.data);
      }

      const currentRequiredCategories = isVeg ? VEGETARIAN_CATEGORIES : requiredCategories;
      const sortedCategories = filterAndSortCategories(transformedCategories, currentRequiredCategories);

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
