import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { recipesAPI } from '@/services/recipesApi';

export const fetchRecipeById = createAsyncThunk(
  'recipeDetail/fetchRecipeById',
  async (recipeId, { rejectWithValue }) => {
    try {
      const data = await recipesAPI.getRecipeById(recipeId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  recipe: null,
  isLoading: false,
  error: null
};

const recipeDetailSlice = createSlice({
  name: 'recipeDetail',
  initialState,
  reducers: {
    clearRecipe: state => {
      state.recipe = null;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRecipeById.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.recipe = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearRecipe } = recipeDetailSlice.actions;

// Selectors
export const selectRecipeData = state => state.recipeDetail.recipe;
export const selectRecipeIsLoading = state => state.recipeDetail.isLoading;
export const selectRecipeError = state => state.recipeDetail.error;

export default recipeDetailSlice.reducer;
