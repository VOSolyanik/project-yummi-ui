import React, { useEffect, useRef, useCallback, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import css from './RecipeFilters.module.css';

import {
  fetchIngredients,
  fetchAreas,
  setSelectedIngredient,
  setSelectedArea,
  selectIngredients,
  selectAreas,
  selectSelectedIngredient,
  selectSelectedArea,
  selectIsLoadingIngredients,
  selectIsLoadingAreas
} from '@redux/filters/filtersSlice';

import CustomDropdown from '@components/CustomDropdown/CustomDropdown';


const RecipeFilters = ({ onFiltersChange }) => {
  const dispatch = useDispatch();
  const initialFetchDone = useRef(false);

  const ingredients = useSelector(selectIngredients);
  const areas = useSelector(selectAreas);
  const selectedIngredient = useSelector(selectSelectedIngredient);
  const selectedArea = useSelector(selectSelectedArea);
  const isLoadingIngredients = useSelector(selectIsLoadingIngredients);
  const isLoadingAreas = useSelector(selectIsLoadingAreas);

  useEffect(() => {
    if (!initialFetchDone.current) {
      if (!ingredients || ingredients.length === 0) {
        dispatch(fetchIngredients());
      }
      if (!areas || areas.length === 0) {
        dispatch(fetchAreas());
      }
      initialFetchDone.current = true;
    }
  }, [dispatch, ingredients, areas]);

  const handleIngredientChange = useCallback((value) => {
    const ingredient = value && ingredients ? ingredients.find(ing => ing.id === value) : null;
    dispatch(setSelectedIngredient(ingredient));
    onFiltersChange({ ingredient: value, area: selectedArea?.id || null });
  }, [dispatch, ingredients, selectedArea?.id, onFiltersChange]);

  const handleAreaChange = useCallback((value) => {
    const area = value && areas ? areas.find(area => area.id === value) : null;
    dispatch(setSelectedArea(area));
    onFiltersChange({ ingredient: selectedIngredient?.id || null, area: value });
  }, [dispatch, areas, selectedIngredient?.id, onFiltersChange]);

  const ingredientOptions = useMemo(() => [
    { value: '', label: 'All Ingredients' },
    ...(ingredients || []).map(ingredient => ({
      value: ingredient.id,
      label: ingredient.name
    }))
  ], [ingredients]);

  const areaOptions = useMemo(() => [
    { value: '', label: 'All Areas' },
    ...(areas || []).map(area => ({
      value: area.id,
      label: area.name
    }))
  ], [areas]);

  if (!ingredients && !areas) {
    return null;
  }

  return (
    <div className={css.filters}>
      <div className={css.filterGroup}>
        <CustomDropdown
          options={ingredientOptions}
          value={selectedIngredient?.id || ''}
          onChange={handleIngredientChange}
          placeholder="Ingredients"
          disabled={isLoadingIngredients}
        />

        <CustomDropdown
          options={areaOptions}
          value={selectedArea?.id || ''}
          onChange={handleAreaChange}
          placeholder="Area"
          disabled={isLoadingAreas}
        />
      </div>
    </div>
  );
};

export default RecipeFilters;
