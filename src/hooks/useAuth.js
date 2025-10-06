import { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  loginUser,
  registerUser,
  logoutUser,
  selectAuth,
  selectIsAuthenticated,
  selectUser,
  selectAuthLoading,
  selectAuthError
} from '../redux/auth/authSlice.js';

// Redux-based useAuth hook
export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  // Async methods
  const login = useCallback(
    async credentials => {
      const result = await dispatch(loginUser(credentials));
      return result;
    },
    [dispatch]
  );

  const register = useCallback(
    async userData => {
      const result = await dispatch(registerUser(userData));
      return result;
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    await dispatch(logoutUser());
    navigate('/', { state: 'global' });
  }, [dispatch, navigate]);

  return {
    // Auth state
    user,
    token: auth.token,
    isAuthenticated,
    isLoading,
    error,

    // Methods
    login,
    register,
    logout
  };
};
