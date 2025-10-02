import React, { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import css from './Categories.module.css';

import { fetchCategories, selectCategories, selectIsLoading, selectError } from '@redux/categories/categoriesSlice';

import CategoryList from '@components/CategoryList/CategoryList';
import MainTitle from '@components/MainTitle/MainTitle';
import Subtitle from '@components/Subtitle/Subtitle';

import { recipesAPI } from '../../services/recipesApi.js';

const Categories = ({ onCategorySelect }) => {
  const dispatch = useDispatch();
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);

  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (categories.length === 0 && !isLoading) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length, isLoading]);

  const handleCategoryClick = async category => {
    setIsLoadingRecipes(true);
    try {
      const response = await recipesAPI.getRecipesByCategory(category._id);

      if (response.data.recipes.length > 0) {
        if (onCategorySelect) {
          const categoryData = {
            category,
            recipes: response.data.recipes,
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage,
            totalRecipes: response.data.totalRecipes
          };
          onCategorySelect(categoryData);
        }
      } else {
        toast.info(`No recipes found for category: ${category.name}`);
      }
    } catch (error) {
      toast.error(`Error loading recipes for ${category.name}: ${error.message}`);
    } finally {
      setIsLoadingRecipes(false);

  const handleCategoryClick = async (category) => {
    // Just pass the category data to parent - Recipes component will fetch the recipes
    if (onCategorySelect) {
      const categoryData = {
        category,
        recipes: [], // Empty array - Recipes component will fetch
        totalPages: 0,
        currentPage: 1,
        totalRecipes: 0
      };
      onCategorySelect(categoryData);
    }
  };

  return (
    <section className={css.categories} aria-labelledby="categories-heading">
      <div className={css.container}>
        <MainTitle level={2} id="categories-heading" className={css.title}>
          CATEGORIES
        </MainTitle>

        <Subtitle className={css.subtitle}>
          {
            'Discover a limitless world of culinary possibilities and enjoy exquisite \nrecipes that combine taste, style and the warm atmosphere of the kitchen.'
          }
        </Subtitle>

        <CategoryList
          categories={categories}
          onCategoryClick={handleCategoryClick}
          isLoading={isLoading || isLoadingRecipes}
          error={error}
        />
      </div>
    </section>
  );
};

export default Categories;
