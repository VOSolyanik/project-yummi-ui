import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI, authUtils } from '../services/api';

export const useAuthActions = () => {
  const { authStart, authSuccess, authFailure, logout: logoutContext } = useAuth();
  const navigate = useNavigate();

  // Реєстрація користувача
  const register = async (userData) => {
    authStart();
    try {
      const response = await authAPI.register(userData);
      authSuccess(response.user, response.token);
      return response;
    } catch (error) {
      authFailure(error.message);
      throw error;
    }
  };

  // Логін користувача
  const login = async (credentials) => {
    authStart();
    try {
      const response = await authAPI.login(credentials);
      authSuccess(response.user, response.token);
      return response;
    } catch (error) {
      authFailure(error.message);
      throw error;
    }
  };

  // Логаут користувача
  const logout = async () => {
    authStart();
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Незалежно від результату API запиту, очищуємо локальні дані
      authUtils.clearAuthData();
      logoutContext();
      // Редірект на головну сторінку
      navigate('/');
    }
  };

  // Отримання поточного користувача (для перевірки токену)
  const getCurrentUser = async () => {
    authStart();
    try {
      const response = await authAPI.getCurrentUser();
      authSuccess(response.user, response.token);
      return response;
    } catch (error) {
      authFailure(error.message);
      // Якщо токен недійсний, очищуємо дані
      authUtils.clearAuthData();
      throw error;
    }
  };

  return {
    register,
    login,
    logout,
    getCurrentUser,
  };
};
