// Store utilities for axios interceptors
// Note: These functions will be initialized after store creation to avoid circular dependencies

let storeInstance = null;

/**
 * Initialize store utilities with the actual store instance
 * This should be called after store creation
 */
export const initializeStoreUtils = store => {
  storeInstance = store;
};

/**
 * Get the current auth token from Redux store
 * @returns {string|null} The current auth token or null if not authenticated
 */
export const getAuthToken = () => {
  if (!storeInstance) {
    console.warn('Store not initialized in storeUtils');
    return null;
  }
  return storeInstance.getState().auth.token;
};

/**
 * Dispatch logout action to Redux store
 * Used by axios interceptors when receiving 401/403 responses
 */
export const dispatchLogout = () => {
  if (!storeInstance) {
    console.warn('Store not initialized in storeUtils');
    return;
  }
  storeInstance.dispatch({ type: 'auth/logout' });
};
