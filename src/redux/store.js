import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './categories/categoriesSlice';
import recipesReducer from './recipes/recipesSlice';
import filtersReducer from './filters/filtersSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    recipes: recipesReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});
