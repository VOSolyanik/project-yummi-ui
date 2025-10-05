import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { categoriesAPI } from '@/services/index.js';

// Async thunk to get categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await categoriesAPI.getCategories();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  selectedCategory: null,
  items: [],
  isLoading: false,
  error: null
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedCategory: state => {
      state.selectedCategory = null;
    },
    clearError: state => {
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { setSelectedCategory, clearSelectedCategory } = categoriesSlice.actions;

// Selectors
export const selectCategories = state => state.categories.items;
export const selectSelectedCategory = state => state.categories.selectedCategory;
export const selectIsLoading = state => state.categories.isLoading;
export const selectError = state => state.categories.error;

export default categoriesSlice.reducer;
