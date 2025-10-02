import api from './api.js';
import { requiredCategories } from './mockData.js';
import { isVegetarianVariant } from '../utils/abTesting.js';

const NAME_MAPPING = {
  Dessert: 'Desserts'
};

const VEGETARIAN_CATEGORIES = [
  'Vegetarian',
  'Breakfast',
  'Desserts',
  'Vegan',
  'Soup',
  'Miscellaneous',
  'Pasta',
  'Pork',
  'Seafood',
  'Side',
  'Starter'
];

const CATEGORY_MAPPINGS = {
  Beef: 'Vegetarian',
  Lamb: 'Vegan',
  Goat: 'Soup'
};

const transformCategories = categories => {
  return categories.map(category => ({
    _id: category.id,
    name: NAME_MAPPING[category.name] || category.name
  }));
};

const applyVegetarianMapping = (categories, originalData) => {
  return categories.map(category => {
    const mappedName = CATEGORY_MAPPINGS[category.name];
    if (mappedName) {
      const targetCategory = originalData.find(cat => cat.name === mappedName);
      return {
        _id: targetCategory?.id || category._id,
        name: mappedName
      };
    }
    return category;
  });
};

const filterAndSortCategories = (categories, requiredCategories) => {
  const filtered = categories.filter(category => requiredCategories.includes(category.name));

  return requiredCategories.map(name => filtered.find(cat => cat.name === name)).filter(Boolean);
};

export const categoriesAPI = {
  getCategories: async () => {
    const isVeg = isVegetarianVariant();

    try {
      const response = await api.get('/categories');

      let transformedCategories = transformCategories(response.data);

      if (isVeg) {
        transformedCategories = applyVegetarianMapping(transformedCategories, response.data);
      }

      const currentRequiredCategories = isVeg ? VEGETARIAN_CATEGORIES : requiredCategories;

      const sortedCategories = filterAndSortCategories(transformedCategories, currentRequiredCategories);

      return { data: sortedCategories };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};
