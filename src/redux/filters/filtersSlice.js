import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { filtersAPI } from '@services/recipesApi.js';

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
  isLoadingAreas: false
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoadingIngredients = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoadingIngredients = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoadingIngredients = false;
      })
      .addCase(fetchAreas.pending, (state) => {
        state.isLoadingAreas = true;
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.isLoadingAreas = false;
        state.areas = action.payload;
      })
      .addCase(fetchAreas.rejected, (state) => {
        state.isLoadingAreas = false;
      });
  }
});

export const { setSelectedIngredient, setSelectedArea, clearFilters } = filtersSlice.actions;

export const selectIngredients = (state) => state.filters.ingredients;
export const selectAreas = (state) => state.filters.areas;
export const selectSelectedIngredient = (state) => state.filters.selectedIngredient;
export const selectSelectedArea = (state) => state.filters.selectedArea;
export const selectIsLoadingIngredients = (state) => state.filters.isLoadingIngredients;
export const selectIsLoadingAreas = (state) => state.filters.isLoadingAreas;

export default filtersSlice.reducer;
