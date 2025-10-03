import { persistStore, persistReducer } from 'redux-persist';

import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/authSlice';
import categoriesReducer from './categories/categoriesSlice';
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
    router: routerReducer
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
