import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { usersAPI } from '@/services/usersApi';

export const fetchRecipes = createAsyncThunk(
  'users/fetchRecipes',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await usersAPI.getRecipies(userId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch recipes');
    }
  },
  {
    // condition callback prevents re-fetching if already loaded
    condition: (_, { getState }) => {
      const { recipes } = getState().lists;
      if (recipes.items.length > 0 || recipes.loading) {
        return false; // cancel thunk
      }
      return true;
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
  },
  {
    // condition callback prevents re-fetching if already loaded
    condition: (_, { getState }) => {
      const { favorites } = getState().lists;
      if (favorites.items.length > 0 || favorites.loading) {
        return false; // cancel thunk
      }
      return true;
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
  },
  {
    // condition callback prevents re-fetching if already loaded
    condition: (_, { getState }) => {
      const { followers } = getState().lists;
      if (followers.items.length > 0 || followers.loading) {
        return false; // cancel thunk
      }
      return true;
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
  },
  {
    // condition callback prevents re-fetching if already loaded
    condition: (_, { getState }) => {
      const { following } = getState().lists;
      if (following.items.length > 0 || following.loading) {
        return false; // cancel thunk
      }
      return true;
    }
  }
);

const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    recipes: { items: [], loading: false, error: null },
    favorites: { items: [], loading: false, error: null },
    followers: { items: [], loading: false, error: null },
    following: { items: [], loading: false, error: null }
  },
  reducers: {},
  extraReducers: (builder) => {
    // Recipes
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.recipes.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes.loading = false;
        state.recipes.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.recipes.loading = false;
        state.recipes.error = action.payload;
      });

    // Favorites
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.favorites.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites.loading = false;
        state.favorites.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.favorites.loading = false;
        state.favorites.error = action.payload;
      });

    // Followers
    builder
      .addCase(fetchFollowers.pending, (state) => {
        state.followers.loading = true;
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.followers.loading = false;
        state.followers.items = action.payload;
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.followers.loading = false;
        state.followers.error = action.payload;
      });

    // Following
    builder
      .addCase(fetchFollowing.pending, (state) => {
        state.following.loading = true;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.following.loading = false;
        state.following.items = action.payload;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.following.loading = false;
        state.following.error = action.payload;
      });
  }
});

export default listsSlice.reducer;



