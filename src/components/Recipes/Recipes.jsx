import React, { useEffect, useCallback, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import css from './Recipes.module.css';

import {
  selectSelectedIngredient,
  selectSelectedArea,
  clearFilters
} from '@redux/filters/filtersSlice';
import {
  fetchRecipes,
  selectCurrentPage,
  selectRecipes,
  selectTotalPages,
  selectTotalCount,
  selectIsLoading,
  selectError
} from '@redux/recipes/recipesSlice';

import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import Icon from '@components/Icon/Icon';
import MainTitle from '@components/MainTitle/MainTitle';
import RecipeFilters from '@components/RecipeFilters/RecipeFilters';
import RecipeList from '@components/RecipeList/RecipeList';
import RecipePagination from '@components/RecipePagination/RecipePagination';
import Subtitle from '@components/Subtitle/Subtitle';

import { useViewport } from '@hooks/useViewport.js';

const MOBILE_ITEMS_PER_PAGE = 8;
const DESKTOP_ITEMS_PER_PAGE = 12;

const Recipes = ({ category, onBackToCategories }) => {
  const dispatch = useDispatch();
  const { width } = useViewport();
  const isMobile = width < 768;

  const recipes = useSelector(selectRecipes);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const totalRecipes = useSelector(selectTotalCount);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const selectedIngredient = useSelector(selectSelectedIngredient);
  const selectedArea = useSelector(selectSelectedArea);

  const isAllCategories = category?.name === 'All Categories';
  const categoryId = category?.id || 'all';
  const title = isAllCategories ? 'All categories' : category?.name || 'Recipes';
  const subtitle = 'Go on a taste journey, where every sip is a sophisticated creative chord, and\n every dessert is an expression of the most refined gastronomic desires.';

  const itemsPerPage = useMemo(() => {
    return isMobile
      ? MOBILE_ITEMS_PER_PAGE
      : DESKTOP_ITEMS_PER_PAGE;
  }, [isMobile]);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchRecipes({
        categoryId,
        page: 1,
        limit: itemsPerPage,
        ingredient: null,
        area: null
      }));
    }
  }, [dispatch, categoryId, itemsPerPage]);

  useEffect(() => {
    return () => {
      dispatch(clearFilters());
    };
  }, [dispatch]);

  const handleFiltersChange = useCallback(({ ingredient, area }) => {
    dispatch(fetchRecipes({
      categoryId,
      page: 1,
      limit: itemsPerPage,
      ingredient,
      area
    }));
  }, [dispatch, categoryId, itemsPerPage]);

  const handlePageChange = useCallback((page) => {
    dispatch(fetchRecipes({
      categoryId,
      page,
      limit: itemsPerPage,
      ingredient: selectedIngredient?.id || null,
      area: selectedArea?.id || null
    }));
  }, [dispatch, categoryId, selectedIngredient?.id, selectedArea?.id, itemsPerPage]);


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
          <Icon name="arrow-back" size={18} className={css.backIcon} />
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
              isLoading={isLoading}
              error={error}
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
