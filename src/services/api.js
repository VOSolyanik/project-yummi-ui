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

// API методи для автентифікації
export const authAPI = {
  // Реєстрація
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration error';
      throw new Error(message);
    }
  },

  // Логін
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login error';
      throw new Error(message);
    }
  },

  // Логаут
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      // Навіть якщо запит не вдався, видаляємо токен локально
      console.error('Logout error:', error);
      throw new Error('Logout error');
    }
  },

  // Отримання поточного користувача
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Error getting user data';
      throw new Error(message);
    }
  },

  // Оновлення токену
  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Token refresh error';
      throw new Error(message);
    }
  },
};

// Загальні API методи для роботи з захищеними ресурсами
export const protectedAPI = {
  // Приклад отримання профілю користувача
  getUserProfile: async () => {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Error loading profile';
      throw new Error(message);
    }
  },

  // Приклад оновлення профілю
  updateUserProfile: async (profileData) => {
    try {
      const response = await api.put('/user/profile', profileData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Error updating profile';
      throw new Error(message);
    }
  },
};

// Утилітарні функції
export const authUtils = {
  // Перевірка чи токен ще дійсний
  isTokenValid: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  },

  // Отримання даних з токену
  getTokenData: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      return null;
    }
  },

  // Очищення всіх даних автентифікації
  clearAuthData: () => {
    localStorage.removeItem('token');
  },
};

export default api;
