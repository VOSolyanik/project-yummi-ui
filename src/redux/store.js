import { persistStore, persistReducer } from 'redux-persist';

import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/authSlice';
import categoriesReducer from './categories/categoriesSlice';
import filtersReducer from './filters/filtersSlice';
import recipeDetailReducer from './recipeDetail/recipeDetailSlice';
import recipesReducer from './recipes/recipesSlice';
import routerReducer from './router/routerSlice';
import { initializeStoreUtils } from './storeUtils.js';

// Persist config for auth - only persist token
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'] // Only persist token, not user data or loading states
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    categories: categoriesReducer,
    recipes: recipesReducer,
    filters: filtersReducer,
    router: routerReducer,
    recipeDetail: recipeDetailReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
          'persist/FLUSH',
          'persist/PAUSE',
          'persist/PURGE'
        ]
      }
    })
});

export const persistor = persistStore(store);

// Initialize store utilities after store creation
initializeStoreUtils(store);
