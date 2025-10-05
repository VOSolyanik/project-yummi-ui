import { toast } from 'react-hot-toast';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from '../../services/authApi.js';
import { favoritesApi } from '../../services/favoritesApi.js';
import { socialAPI } from '../../services/socialApi.js';
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

    // If token is valid, get current user (using token from state)
    try {
      const userResponse = await dispatch(getCurrentUser()).unwrap();
      return { user: userResponse.user || userResponse, token };
    } catch (error) {
      // Token exists but server says it's invalid
      return rejectWithValue(error.message);
    }
  }
);

// Base login action - just handles the API call
const loginUserBase = createAsyncThunk('auth/loginBase', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authAPI.login(credentials);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Base register action - just handles the API call
const registerUserBase = createAsyncThunk('auth/registerBase', async (userData, { rejectWithValue }) => {
  try {
    const response = await authAPI.register(userData);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Combined login action that handles the full flow
export const loginUser = createAsyncThunk('auth/login', async (credentials, { dispatch, rejectWithValue }) => {
  try {
    // First, login and get token
    const loginResponse = await dispatch(loginUserBase(credentials)).unwrap();

    // Then, get current user (token is now in store)
    const userResponse = await dispatch(getCurrentUser()).unwrap();

    return { ...loginResponse, user: userResponse.user || userResponse };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Combined register action that handles the full flow
export const registerUser = createAsyncThunk('auth/register', async (userData, { dispatch, rejectWithValue }) => {
  try {
    // First, register and get token
    const registerResponse = await dispatch(registerUserBase(userData)).unwrap();

    // Then, get current user (token is now in store)
    const userResponse = await dispatch(getCurrentUser()).unwrap();

    return { ...registerResponse, user: userResponse.user || userResponse };
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
      return response;
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

export const followUser = createAsyncThunk(
  'auth/followUser',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await socialAPI.followUser(userId);
      return { userId, message: res.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to follow');
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'auth/unfollowUser',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await socialAPI.unfollowUser(userId);
      return { userId, message: res.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to unfollow');
    }
  }
);

export const addRecipeToFavorites = createAsyncThunk(
  'auth/addRecipeToFavorites',
  async (recipeId, { rejectWithValue }) => {
    try {
      const res = await favoritesApi.addToFavorites(recipeId);
      return { recipeId, message: res.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add recipe to favorites');
    }
  }
);

export const removeRecipeFromFavorites = createAsyncThunk(
  'auth/removeRecipeFromFavorites',
  async (recipeId, { rejectWithValue }) => {
    try {
      const res = await favoritesApi.removeFromFavorites(recipeId);
      return { recipeId, message: res.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to remove recipe from favorites');
    }
  }
);

const initialState = {
  user: null,
  token: null, // Let Redux-persist handle initial token loading
  isAuthenticated: false, // Only authenticated after successful getCurrentUser
  isLoading: false,
  isActionInProgress: false, // For tracking ongoing actions like follow/unfollow
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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

      // Base login - just save token
      .addCase(loginUserBase.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUserBase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        toast.error(action.payload || 'Login failed');
      })

      // Base register - just save token
      .addCase(registerUserBase.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUserBase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Registration failed');
      })

      // Combined login
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
      })

      // Combined register
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
      // Upload avatar
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        if (state.user) {
          state.user.avatarUrl = action.payload.avatarUrl;
        }
        state.error = null;
        toast.success('Avatar updated successfully');
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload || 'Failed to upload avatar');
      })
      // Follow user
      .addCase(followUser.pending, (state) => {
        state.isActionInProgress = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.isActionInProgress = false;
        state.error = null;

        if (state.user && state.user.id !== action.payload.userId) {
          state.user.followingIds = [...(state.user.followingIds || []), action.payload.userId];
        }
        toast.success(action.payload.message || 'User followed');
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isActionInProgress = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to follow user');
      })
      // Unfollow user
      .addCase(unfollowUser.pending, (state) => {
        state.isActionInProgress = true;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.isActionInProgress = false;
        state.error = null;

        if (state.user && state.user.id !== action.payload.userId) {
          state.user.followingIds = state.user.followingIds.filter(id => id !== action.payload.userId);
        }
        toast.success(action.payload.message || 'User unfollowed');
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.isActionInProgress = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to unfollow user');
      })
      // Add recipe to favorites
      .addCase(addRecipeToFavorites.pending, (state) => {
        state.isActionInProgress = true;
      })
      .addCase(addRecipeToFavorites.fulfilled, (state, action) => {
        state.isActionInProgress = false;
        state.error = null;
        if (state.user) {
          state.user.favoriteIds = [...(state.user.favoriteIds || []), action.payload.recipeId];
        }
        toast.success(action.payload.message || 'Recipe added to favorites');
      })
      .addCase(addRecipeToFavorites.rejected, (state, action) => {
        state.isActionInProgress = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to add recipe to favorites');
      })
      // Remove recipe from favorites
      .addCase(removeRecipeFromFavorites.pending, (state) => {
        state.isActionInProgress = true;
      })
      .addCase(removeRecipeFromFavorites.fulfilled, (state, action) => {
        state.isActionInProgress = false;
        state.error = null;
        if (state.user) {
          state.user.favoriteIds = state.user.favoriteIds.filter(id => id !== action.payload.recipeId);
        }
        toast.success(action.payload.message || 'Recipe removed from favorites');
      })
      .addCase(removeRecipeFromFavorites.rejected, (state, action) => {
        state.isActionInProgress = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to remove recipe from favorites');
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
export const selectActionInProgress = state => state.auth.isActionInProgress;
export const selectAuthError = state => state.auth.error;

export default authSlice.reducer;
