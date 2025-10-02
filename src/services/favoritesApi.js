import api from './api';

// Add recipe to favorites
export const addToFavorites = async (recipeId) => {
  try {
    const response = await api.post(`/recipes/${recipeId}/favorite`);
    return response.data;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

// Remove recipe from favorites
export const removeFromFavorites = async (recipeId) => {
  try {
    const response = await api.delete(`/recipes/${recipeId}/favorite`);
    return response.data;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

// Cache for favorite recipes to avoid repeated requests
const favoritesCache = new Map();
const CACHE_DURATION = 30000; // 30 seconds

// Get user's favorite recipes (to check if recipe is favorite)
export const getFavoriteRecipes = async (userId, params = {}) => {
  const cacheKey = `${userId}_${params.page || 1}_${params.limit || 50}`;
  const cached = favoritesCache.get(cacheKey);
  
  // Return cached result if it's still valid
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const { page = 1, limit = 50 } = params;
    const queryParams = new URLSearchParams({ page, limit });
    
    const response = await api.get(`/users/${userId}/favorites?${queryParams}`);
    const data = response.data;
    
    // Cache the result
    favoritesCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching favorite recipes:', error);
    // Return empty result if endpoint doesn't exist or user has no favorites
    return { recipes: [] };
  }
};

// Check if specific recipes are favorites (bulk check)
export const checkRecipesFavorites = async (userId, recipeIds) => {
  try {
    const response = await getFavoriteRecipes(userId, { page: 1, limit: 50 });
    const favoriteIds = response.items?.map(recipe => recipe.id) || [];
    
    // Create a Set for faster lookup
    const favoriteSet = new Set(favoriteIds);
    
    // Return object with recipe ID as key and boolean as value
    const result = {};
    recipeIds.forEach(id => {
      result[id] = favoriteSet.has(id);
    });
    return result;
  } catch (error) {
    console.error('Error checking recipes favorites:', error);
    // Return all false if error occurs
    const result = {};
    recipeIds.forEach(id => {
      result[id] = false;
    });
    return result;
  }
};

// Check if recipe is favorite (single recipe)
export const checkIfRecipeIsFavorite = async (userId, recipeId) => {
  try {
    const response = await getFavoriteRecipes(userId, { page: 1, limit: 50 });
    return response.items?.some(recipe => recipe.id === recipeId) || false;
  } catch (error) {
    console.error('Error checking if recipe is favorite:', error);
    return false;
  }
};

// Clear cache when favorites are modified
export const clearFavoritesCache = (userId) => {
  if (userId) {
    // Clear cache for specific user
    for (const key of favoritesCache.keys()) {
      if (key.startsWith(`${userId}_`)) {
        favoritesCache.delete(key);
      }
    }
  } else {
    // Clear all cache
    favoritesCache.clear();
  }
};
