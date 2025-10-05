import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { usersAPI } from '@/services/usersApi';

export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await usersAPI.getUserById(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch user');
    }
  }
);

export const fetchRecipes = createAsyncThunk(
  'users/fetchRecipes',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await usersAPI.getRecipes(userId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch recipes');
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  'users/fetchFavorites',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await usersAPI.getFavorites(userId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch favorites');
    }
  }
);

export const fetchFollowers = createAsyncThunk(
  'users/fetchFollowers',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await usersAPI.getFollowers(userId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch followers');
    }
  }
);

export const fetchFollowing = createAsyncThunk(
  'users/fetchFollowing',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await usersAPI.getFollowing(userId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch following');
    }
  }
);

const initialState = {
  selectedUser: { user: null, loading: false, error: null },
  recipes: { items: null, limit: 12, page: 1, totalCount: 0, loading: false, error: null },
  favorites: { items: null, limit: 12, page: 1, totalCount: 0, loading: false, error: null },
  followers: { items: null, limit: 12, page: 1, totalCount: 0, loading: false, error: null },
  following: { items: null, limit: 12, page: 1, totalCount: 0, loading: false, error: null }
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    clearState: state => {
      state.selectedUser = initialState.selectedUser;
      state.recipes = initialState.recipes;
      state.favorites = initialState.favorites;
      state.followers = initialState.followers;
      state.following = initialState.following;
    }
  },
  extraReducers: builder => {
    // User By Id
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.selectedUser.loading = true;
        state.selectedUser.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser.loading = false;
        state.selectedUser.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.selectedUser.loading = false;
        state.selectedUser.error = action.payload;
      });
    // Recipes
    builder
      .addCase(fetchRecipes.pending, state => {
        state.recipes.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes.loading = false;
        state.recipes.items = action.payload.items;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.recipes.loading = false;
        state.recipes.error = action.payload;
      });

    // Favorites
    builder
      .addCase(fetchFavorites.pending, state => {
        state.favorites.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites.loading = false;
        state.favorites.items = action.payload.items;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.favorites.loading = false;
        state.favorites.error = action.payload;
      });

    // Followers
    builder
      .addCase(fetchFollowers.pending, state => {
        state.followers.loading = true;
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.followers.loading = false;
        state.followers.items = action.payload.items;
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.followers.loading = false;
        state.followers.error = action.payload;
      });

    // Following
    builder
      .addCase(fetchFollowing.pending, state => {
        state.following.loading = true;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.following.loading = false;
        state.following.items = action.payload.items;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.following.loading = false;
        state.following.error = action.payload;
      });
  }
});

export const { clearState } = usersSlice.actions;

export const selectSelectedUser = (state) => state.users.selectedUser.user;
export const selectIsLoadingSelectedUser = (state) => state.users.selectedUser.loading;
export const selectListRecipes = (state) => state.users.recipes.items;
export const selectIsLoadingListRecipes = (state) => state.users.recipes.isLoading;
export const selectListRecipesError = (state) => state.users.recipes.error;

export default usersSlice.reducer;
