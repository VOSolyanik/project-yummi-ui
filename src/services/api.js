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
  timeout: 30000
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
