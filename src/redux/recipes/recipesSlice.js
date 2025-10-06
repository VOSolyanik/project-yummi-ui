import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { recipesAPI } from '@/services/index.js';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async ({ categoryId, page = 1, limit = 12, ingredient, area }, { rejectWithValue }) => {
    try {
      const response = await recipesAPI.getRecipesByCategory(categoryId, page, limit, ingredient, area);
      return {
        items: response.items,
        totalCount: response.totalCount,
        currentPage: page,
        totalPages: response.totalCount ? Math.ceil(response.totalCount / limit) : 0
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  'recipes/deleteRecipe',
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await recipesAPI.deleteRecipe(recipeId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  currentPage: 1,
  totalCount: 0,
  totalPages: 0,
  isLoading: false,
  error: null
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRecipes: (state) => {
      state.items = [];
      state.totalPages = 0;
      state.currentPage = 1;
      state.totalCount = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearRecipes } = recipesSlice.actions;

export const selectRecipes = (state) => state.recipes.items;
export const selectTotalPages = (state) => state.recipes.totalPages;
export const selectCurrentPage = (state) => state.recipes.currentPage;
export const selectTotalCount = (state) => state.recipes.totalCount;
export const selectIsLoading = (state) => state.recipes.isLoading;
export const selectError = (state) => state.recipes.error;

export default recipesSlice.reducer;
