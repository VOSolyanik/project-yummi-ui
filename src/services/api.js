import axios from 'axios';
import { toast } from 'react-hot-toast';

// Базовий URL для API (змініть на ваш API URL)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Створюємо інстанс axios з базовими налаштуваннями
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехоплювач запитів - додаємо токен до кожного запиту
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Перехоплювач відповідей - обробляємо помилки авторизації
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status, data } = error.response || {};
    
    if (status === 401) {
      // Токен недійсний або відсутній
      localStorage.removeItem('token');
      toast.error('Session expired. Please sign in again.');
      // Перенаправляємо на сторінку логіну
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

// Frontend API клієнт для взаємодії з backend
export const authAPI = {
  // Реєстрація - викликає backend endpoint
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration error';
      throw new Error(message);
    }
  },

  // Логін - викликає backend endpoint  
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login error';
      throw new Error(message);
    }
  },

  // Логаут - викликає backend endpoint
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Logout error');
    }
  },

  // Отримання поточного користувача - викликає backend endpoint
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Error getting user data';
      throw new Error(message);
    }
  },
};

// Утилітарні функції для frontend
export const authUtils = {
  // Очищення всіх даних автентифікації
  clearAuthData: () => {
    localStorage.removeItem('token');
  },
};

export default api;
