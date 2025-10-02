import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { recipesAPI } from '../../services/recipesApi.js';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async ({ categoryId, page = 1, limit = 12, ingredient, area }, { rejectWithValue }) => {
    try {
      const response = await recipesAPI.getRecipesByCategory(categoryId, page, limit, ingredient, area);
      return {
        recipes: response.data.recipes,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        totalRecipes: response.data.totalRecipes
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  recipes: [],
  totalPages: 0,
  currentPage: 1,
  totalRecipes: 0,
  isLoading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRecipes: (state) => {
      state.recipes = [];
      state.totalPages = 0;
      state.currentPage = 1;
      state.totalRecipes = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = action.payload.recipes;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalRecipes = action.payload.totalRecipes;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearRecipes } = recipesSlice.actions;

export const selectRecipes = (state) => state.recipes.recipes;
export const selectTotalPages = (state) => state.recipes.totalPages;
export const selectCurrentPage = (state) => state.recipes.currentPage;
export const selectTotalRecipes = (state) => state.recipes.totalRecipes;
export const selectIsLoadingRecipes = (state) => state.recipes.isLoading;
export const selectRecipesError = (state) => state.recipes.error;

export default recipesSlice.reducer;
