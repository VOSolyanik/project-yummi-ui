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
  async ({ userId, page = 1, limit = 9 }, { rejectWithValue }) => {
    try {
      const res = await usersAPI.getRecipes(userId, page, limit);
      return { ...res.data, currentPage: page, limit };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch recipes');
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  'users/fetchFavorites',
  async ({ userId, page = 1, limit = 9 }, { rejectWithValue }) => {
    try {
      const res = await usersAPI.getFavorites(userId, page, limit);
      return { ...res.data, currentPage: page, limit };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch favorites');
    }
  }
);

export const fetchFollowers = createAsyncThunk(
  'users/fetchFollowers',
  async ({ userId, page = 1, limit = 9 }, { rejectWithValue }) => {
    try {
      const res = await usersAPI.getFollowers(userId, page, limit);
      return { ...res.data, currentPage: page, limit };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch followers');
    }
  }
);

export const fetchFollowing = createAsyncThunk(
  'users/fetchFollowing',
  async ({ userId, page = 1, limit = 9 }, { rejectWithValue }) => {
    try {
      const res = await usersAPI.getFollowing(userId, page, limit);
      return { ...res.data, currentPage: page, limit };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch following');
    }
  }
);

const initialState = {
  selectedUser: { user: null, loading: false, error: null },
  recipes: { items: null, currentPage: 1, totalPages: 0, totalCount: 0, loading: false, error: null },
  favorites: { items: null, currentPage: 1, totalPages: 0, totalCount: 0, loading: false, error: null },
  followers: { items: null, currentPage: 1, totalPages: 0, totalCount: 0, loading: false, error: null },
  following: { items: null, currentPage: 1, totalPages: 0, totalCount: 0, loading: false, error: null }
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
        state.recipes.totalCount = action.payload.totalCount;
        state.recipes.totalPages = action.payload.totalCount
          ? Math.ceil(action.payload.totalCount / action.payload.limit)
          : 0;
        state.recipes.currentPage = action.payload.currentPage;
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
        state.favorites.totalCount = action.payload.totalCount;
        state.favorites.totalPages = action.payload.totalCount
          ? Math.ceil(action.payload.totalCount / action.payload.limit)
          : 0;
        state.favorites.currentPage = action.payload.currentPage;
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
        state.followers.totalCount = action.payload.totalCount;
        state.followers.totalPages = action.payload.totalCount
          ? Math.ceil(action.payload.totalCount / action.payload.limit)
          : 0;
        state.followers.currentPage = action.payload.currentPage;
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
        state.following.totalCount = action.payload.totalCount;
        state.following.totalPages = action.payload.totalCount
          ? Math.ceil(action.payload.totalCount / action.payload.limit)
          : 0;
        state.following.currentPage = action.payload.currentPage;
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

export default usersSlice.reducer;
