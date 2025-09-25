import React, { useEffect } from 'react';
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
  selectIsLoadingAreas,
} from '@redux/filters/filtersSlice';

const RecipeFilters = ({ onFiltersChange }) => {
  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredients);
  const areas = useSelector(selectAreas);
  const selectedIngredient = useSelector(selectSelectedIngredient);
  const selectedArea = useSelector(selectSelectedArea);
  const isLoadingIngredients = useSelector(selectIsLoadingIngredients);
  const isLoadingAreas = useSelector(selectIsLoadingAreas);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
    if (areas.length === 0) {
      dispatch(fetchAreas());
    }
  }, [dispatch, ingredients.length, areas.length]);

  const handleIngredientChange = (event) => {
    const value = event.target.value;
    const ingredient = value ? ingredients.find(ing => ing.id === value) : null;
    dispatch(setSelectedIngredient(ingredient));
    onFiltersChange({ ingredient: value, area: selectedArea?.id || null });
  };

  const handleAreaChange = (event) => {
    const value = event.target.value;
    const area = value ? areas.find(area => area.id === value) : null;
    dispatch(setSelectedArea(area));
    onFiltersChange({ ingredient: selectedIngredient?.id || null, area: value });
  };

  return (
    <div className={css.filters}>
      <div className={css.filterGroup}>
        <select
          className={css.select}
          value={selectedIngredient?.id || ''}
          onChange={handleIngredientChange}
          disabled={isLoadingIngredients}
        >
          <option value="">Ingredients</option>
          {ingredients.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </option>
          ))}
        </select>
        
        <select
          className={css.select}
          value={selectedArea?.id || ''}
          onChange={handleAreaChange}
          disabled={isLoadingAreas}
        >
          <option value="">Area</option>
          {areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RecipeFilters;
