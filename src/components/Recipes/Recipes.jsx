import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import css from './Recipes.module.css';
import arrowBackIcon from '../../assets/icons/arrow-back.svg';

import MainTitle from '@components/MainTitle/MainTitle';
import Subtitle from '@components/Subtitle/Subtitle';
import RecipeFilters from '@components/RecipeFilters/RecipeFilters';
import RecipeList from '@components/RecipeList/RecipeList';
import RecipePagination from '@components/RecipePagination/RecipePagination';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';

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

import { useAuth } from '../../hooks/useAuth';
import { checkRecipesFavorites } from '../../services/favoritesApi';

const MOBILE_BREAKPOINT = 767;
const MOBILE_ITEMS_PER_PAGE = 8;
const DESKTOP_ITEMS_PER_PAGE = 12;

const Recipes = ({ categoryData, onBackToCategories }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState(new Set());

  const recipes = useSelector(selectRecipes);
  const totalPages = useSelector(selectTotalPages);
  const totalRecipes = useSelector(selectTotalRecipes);
  const isLoading = useSelector(selectIsLoadingRecipes);
  const error = useSelector(selectRecipesError);
  const selectedIngredient = useSelector(selectSelectedIngredient);
  const selectedArea = useSelector(selectSelectedArea);
  
  const { user, isAuthenticated } = useAuth();

  const isAllCategories = categoryData?.category?.name === 'All Categories';
  const categoryId = categoryData?.category?._id || 'all';
  const title = isAllCategories ? 'All categories' : categoryData?.category?.name || 'Recipes';
  const subtitle = 'Go on a taste journey, where every sip is a sophisticated creative chord, and\n every dessert is an expression of the most refined gastronomic desires.';

  const getItemsPerPage = useCallback(() => {
    return typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT
      ? MOBILE_ITEMS_PER_PAGE
      : DESKTOP_ITEMS_PER_PAGE;
  }, []);

  useEffect(() => {
    if (categoryId) {
      setCurrentPage(1);
      dispatch(fetchRecipes({
        categoryId,
        page: 1,
        limit: getItemsPerPage(),
        ingredient: null,
        area: null
      }));
    }
  }, [dispatch, categoryId, getItemsPerPage]);

  // Check favorites for current recipes when user is authenticated and recipes are loaded
  useEffect(() => {
    const checkCurrentRecipesFavorites = async () => {
      if (isAuthenticated && user?.id && recipes && recipes.length > 0) {
        try {
          // Get IDs of currently displayed recipes
          const currentRecipeIds = recipes.map(recipe => recipe.id);
          
          // Check which of these recipes are favorites
          const favoritesStatus = await checkRecipesFavorites(user.id, currentRecipeIds);
          
          // Create Set of favorite recipe IDs from current page
          const favoriteIds = new Set();
          Object.entries(favoritesStatus).forEach(([recipeId, isFavorite]) => {
            if (isFavorite) {
              favoriteIds.add(recipeId);
            }
          });
          
          
          setFavoriteRecipeIds(favoriteIds);
        } catch (error) {
          console.error('Error checking current recipes favorites:', error);
          setFavoriteRecipeIds(new Set());
        }
      } else {
        setFavoriteRecipeIds(new Set());
      }
    };

    checkCurrentRecipesFavorites();
  }, [isAuthenticated, user?.id, recipes]);

  const handleFiltersChange = useCallback(({ ingredient, area }) => {
    setCurrentPage(1);
    const limit = getItemsPerPage();
    dispatch(fetchRecipes({
      categoryId,
      page: 1,
      limit,
      ingredient,
      area
    }));
  }, [dispatch, categoryId, getItemsPerPage]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    const limit = getItemsPerPage();
    dispatch(fetchRecipes({
      categoryId,
      page,
      limit,
      ingredient: selectedIngredient?.id || null,
      area: selectedArea?.id || null
    }));
  }, [dispatch, categoryId, selectedIngredient?.id, selectedArea?.id, getItemsPerPage]);

  const handleFavoriteToggle = useCallback(async (recipeId) => {
    try {
      toast.success('Recipe added to favorites!');
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  }, []);

  // Handle favorite changes from RecipeCard
  const handleFavoriteChange = useCallback((recipeId, isFavorite) => {
    setFavoriteRecipeIds(prev => {
      const newSet = new Set(prev);
      if (isFavorite) {
        newSet.add(recipeId);
      } else {
        newSet.delete(recipeId);
      }
      return newSet;
    });
  }, []);

  const handleBackClick = useCallback(() => {
    dispatch(clearFilters());
    onBackToCategories();
  }, [dispatch, onBackToCategories]);

  return (
    <section className={css.recipes} aria-labelledby="recipes-heading">
      <div className={css.header}>
        <button
          type="button"
          className={css.backButton}
          onClick={handleBackClick}
          aria-label="Back to categories"
        >
          <img
            src={arrowBackIcon}
            alt="Back arrow"
            className={css.backIcon}
          />
          Back
        </button>

        <MainTitle level={2} id="recipes-heading" className={css.title}>
          {title}
        </MainTitle>

        <Subtitle className={css.subtitle}>
          {subtitle}
        </Subtitle>
      </div>

      <div className={css.section}>
        <ErrorBoundary>
          <RecipeFilters onFiltersChange={handleFiltersChange} />
        </ErrorBoundary>

        <div className={css.content}>
          <ErrorBoundary>
            <RecipeList
              recipes={recipes}
              onFavoriteToggle={handleFavoriteToggle}
              isLoading={isLoading}
              error={error}
              favoriteRecipeIds={favoriteRecipeIds}
              onFavoriteChange={handleFavoriteChange}
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <RecipePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isLoading}
              totalRecipes={totalRecipes}
            />
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
};

export default Recipes;
