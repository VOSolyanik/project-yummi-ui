import { toast } from 'react-hot-toast';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from '../../services/authApi.js';
import { authSecurityUtils } from '../../utils/security.js';
import { resetRouter } from '../router/routerSlice';

export const validateToken = createAsyncThunk(
  'auth/validateToken',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const { auth } = getState();
    const token = auth.token;

    if (!token) {
      return rejectWithValue('No token found');
    }

    // Use security utils for token validation
    if (!authSecurityUtils.isTokenValid(token)) {
      return rejectWithValue('Token expired or invalid');
    }

    // If token is valid, get current user
    try {
      const userResponse = await dispatch(getCurrentUser()).unwrap();
      return { user: userResponse.user || userResponse, token };
    } catch (error) {
      // Token exists but server says it's invalid
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authAPI.login(credentials);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await authAPI.register(userData);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const response = await authAPI.getCurrentUser();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const uploadAvatar = createAsyncThunk(
  'auth/uploadAvatar',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await authAPI.uploadUserAvatar(formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Upload failed');
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  try {
    await authAPI.logout();
    // Reset router state when logging out (clears pending routes and resets path)
    dispatch(resetRouter());
    return {};
  } catch {
    // Even if logout fails on server, we should clear local state
    dispatch(resetRouter());
    return {};
  }
});

const initialState = {
  user: null,
  token: null, // Let Redux-persist handle initial token loading
  isAuthenticated: false, // Only authenticated after successful getCurrentUser
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;

      toast.success('Successfully signed in!');
    },
    authFailure: (state, action) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload || 'Authentication error');
    },
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      toast.success('Successfully signed out');
    },
    clearError: state => {
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      // Token validation
      .addCase(validateToken.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(validateToken.rejected, state => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null; // Don't show token validation errors to user
        // Token is already removed in the thunk if invalid
      })

      // Login
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;

        toast.success('Successfully signed in!');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        toast.error(action.payload || 'Login failed');
      }) // Register
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;

        toast.success('Successfully registered!');
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Registration failed');
      })

      // Get current user
      .addCase(getCurrentUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || action.payload;
        state.isAuthenticated = true; // Only authenticated after successful getCurrentUser
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        // Don't clear token here - let validateToken handle token removal
      })

      // Logout
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        toast.success('Successfully signed out');
      });
  }
});

export const { authStart, authSuccess, authFailure, logout, clearError } = authSlice.actions;

// Selectors
export const selectAuth = state => state.auth;
export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectUser = state => state.auth.user;
export const selectAuthToken = state => state.auth.token;
export const selectAuthLoading = state => state.auth.isLoading;
export const selectAuthError = state => state.auth.error;

export default authSlice.reducer;
