import { toast } from 'react-hot-toast';

import axios from 'axios';

import { getAuthToken, dispatchLogout } from '../redux/storeUtils.js';

// Base URL configuration
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest' // CSRF protection header
  },
  timeout: 10000
});

// Request interceptor - add token to every request
api.interceptors.request.use(
  config => {
    // Get token from Redux store only
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle authentication errors
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { status, data } = error.response || {};

    if (status === 401) {
      // Token invalid or missing - dispatch logout action
      dispatchLogout();
      toast.error('Session expired. Please sign in again.');
      window.location.href = '/';
    } else if (status === 403) {
      toast.error('Access denied');
    } else if (status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (data?.message) {
      toast.error(data.message);
    }

    return Promise.reject(error);
  }
);

export default api;

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

export const filtersAPI = {
  getIngredients: async () => {
    try {
      const response = await new ApiService(API_BASE_URL).get('/ingredients');
      return { data: response.data };
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      throw error;
    }
  },

  getAreas: async () => {
    try {
      const response = await new ApiService(API_BASE_URL).get('/areas');
      return { data: response.data };
    } catch (error) {
      console.error('Error fetching areas:', error);
      throw error;
    }
  },
};
