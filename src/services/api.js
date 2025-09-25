import { mockCategories, requiredCategories } from './mockData.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || false; // За замовчуванням використовуємо реальний API

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
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { data: mockCategories };
    }
    
    try {
      const response = await new ApiService(API_BASE_URL).get('/categories');
      
      // Мапінг назв з бекенду на назви для відображення
      const nameMapping = {
        'Dessert': 'Desserts',  // Бекенд: "Dessert" → Фронтенд: "Desserts"
        // Додайте інші мапінги за потреби
      };
      
      // Бекенд повертає { id, name }, але наш фронтенд очікує { _id, name }
      const transformedCategories = response.data.map(category => ({
        _id: category.id,
        name: nameMapping[category.name] || category.name  // Використовуємо мапінг або оригінальну назву
      }));
      
      // Фільтруємо тільки ті категорії, які є на макеті
      const filteredCategories = transformedCategories.filter(category => 
        requiredCategories.includes(category.name)
      );
      
      // Сортуємо за порядком з макету
      const sortedCategories = requiredCategories.map(name => 
        filteredCategories.find(cat => cat.name === name)
      ).filter(Boolean); // Прибираємо undefined
      
      return { data: sortedCategories };
    } catch (error) {
      console.error('Error fetching categories:', error);
      await new Promise(resolve => setTimeout(resolve, 300));
      return { data: mockCategories };
    }
  },
};

// Recipes API - використовуємо реальний API (ендпоінт /recipes реалізований на бекенді)
export const recipesAPI = {
  getRecipesByCategory: async (categoryId, page = 1, limit = 12) => {
    const params = { page, limit };
    if (categoryId !== 'all') {
      params.category = categoryId;
    }
    
    try {
      const response = await new ApiService(API_BASE_URL).get('/recipes', params);
      
      // Бекенд повертає { items: [...], totalCount: 285 }
      // Але наш фронтенд очікує { recipes: [...], totalPages: 1, currentPage: 1, totalRecipes: 285 }
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
