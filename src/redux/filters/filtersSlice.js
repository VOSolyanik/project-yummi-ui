import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { filtersAPI } from '../../services/api';

export const fetchIngredients = createAsyncThunk(
  'filters/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await filtersAPI.getIngredients();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAreas = createAsyncThunk(
  'filters/fetchAreas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await filtersAPI.getAreas();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  ingredients: [],
  areas: [],
  selectedIngredient: null,
  selectedArea: null,
  isLoadingIngredients: false,
  isLoadingAreas: false,
  ingredientsError: null,
  areasError: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSelectedIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    },
    setSelectedArea: (state, action) => {
      state.selectedArea = action.payload;
    },
    clearFilters: (state) => {
      state.selectedIngredient = null;
      state.selectedArea = null;
    },
    clearErrors: (state) => {
      state.ingredientsError = null;
      state.areasError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoadingIngredients = true;
        state.ingredientsError = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoadingIngredients = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoadingIngredients = false;
        state.ingredientsError = action.payload;
      })
      .addCase(fetchAreas.pending, (state) => {
        state.isLoadingAreas = true;
        state.areasError = null;
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.isLoadingAreas = false;
        state.areas = action.payload;
      })
      .addCase(fetchAreas.rejected, (state, action) => {
        state.isLoadingAreas = false;
        state.areasError = action.payload;
      });
  },
});

export const { setSelectedIngredient, setSelectedArea, clearFilters, clearErrors } = filtersSlice.actions;

export const selectIngredients = (state) => state.filters.ingredients;
export const selectAreas = (state) => state.filters.areas;
export const selectSelectedIngredient = (state) => state.filters.selectedIngredient;
export const selectSelectedArea = (state) => state.filters.selectedArea;
export const selectIsLoadingIngredients = (state) => state.filters.isLoadingIngredients;
export const selectIsLoadingAreas = (state) => state.filters.isLoadingAreas;
export const selectIngredientsError = (state) => state.filters.ingredientsError;
export const selectAreasError = (state) => state.filters.areasError;

export default filtersSlice.reducer;
