import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import css from './Recipes.module.css';

import MainTitle from '@components/MainTitle/MainTitle';
import Subtitle from '@components/Subtitle/Subtitle';
import RecipeFilters from '@components/RecipeFilters/RecipeFilters';
import RecipeList from '@components/RecipeList/RecipeList';
import RecipePagination from '@components/RecipePagination/RecipePagination';

import {
  fetchRecipes,
  selectRecipes,
  selectTotalPages,
  selectCurrentPage,
  selectTotalRecipes,
  selectIsLoadingRecipes,
  selectRecipesError,
} from '@redux/recipes/recipesSlice';

import {
  selectSelectedIngredient,
  selectSelectedArea,
  clearFilters,
} from '@redux/filters/filtersSlice';

const Recipes = ({ categoryData, onBackToCategories }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const recipes = useSelector(selectRecipes);
  const totalPages = useSelector(selectTotalPages);
  const totalRecipes = useSelector(selectTotalRecipes);
  const isLoading = useSelector(selectIsLoadingRecipes);
  const error = useSelector(selectRecipesError);
  const selectedIngredient = useSelector(selectSelectedIngredient);
  const selectedArea = useSelector(selectSelectedArea);

  const isAllCategories = categoryData?.category?.name === 'All Categories';
  const categoryId = categoryData?.category?._id || 'all';
  
  const title = isAllCategories ? 'All categories' : categoryData?.category?.name || 'Recipes';
  
  const subtitle = isAllCategories 
    ? 'Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.'
    : `Explore delicious ${categoryData?.category?.name?.toLowerCase() || 'recipes'} and discover new flavors that will delight your taste buds.`;

  useEffect(() => {
    if (categoryId) {
      setCurrentPage(1);
      dispatch(fetchRecipes({
        categoryId,
        page: 1,
        limit: 12,
        ingredient: selectedIngredient?.id || null,
        area: selectedArea?.id || null
      }));
    }
  }, [dispatch, categoryId, selectedIngredient?.id, selectedArea?.id]);

  const handleFiltersChange = ({ ingredient, area }) => {
    setCurrentPage(1);
    dispatch(fetchRecipes({
      categoryId,
      page: 1,
      limit: 12,
      ingredient,
      area
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchRecipes({
      categoryId,
      page,
      limit: 12,
      ingredient: selectedIngredient?.id || null,
      area: selectedArea?.id || null
    }));
  };

  const handleFavoriteToggle = async (recipeId) => {
    try {
      toast.success('Recipe added to favorites!');
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };

  const handleBackClick = () => {
    dispatch(clearFilters());
    onBackToCategories();
  };

  return (
    <section className={css.recipes} aria-labelledby="recipes-heading">
      <div className={css.header}>
        <button 
          type="button" 
          className={css.backButton}
          onClick={handleBackClick}
          aria-label="Back to categories"
        >
          ← Back
        </button>

        <MainTitle level={2} id="recipes-heading" className={css.title}>
          {title}
        </MainTitle>

        <Subtitle className={css.subtitle}>
          {subtitle}
        </Subtitle>
      </div>

      <div className={css.section}>
        <RecipeFilters onFiltersChange={handleFiltersChange} />

        <div className={css.content}>
          <RecipeList 
            recipes={recipes}
            onFavoriteToggle={handleFavoriteToggle}
            isLoading={isLoading}
            error={error}
          />

          <RecipePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
};

export default Recipes;
