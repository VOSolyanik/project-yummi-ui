import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import css from './RecipeFilters.module.css';
import CustomDropdown from '@components/CustomDropdown/CustomDropdown';

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

  const handleIngredientChange = (value) => {
    const ingredient = value ? ingredients.find(ing => ing.id === value) : null;
    dispatch(setSelectedIngredient(ingredient));
    onFiltersChange({ ingredient: value, area: selectedArea?.id || null });
  };

  const handleAreaChange = (value) => {
    const area = value ? areas.find(area => area.id === value) : null;
    dispatch(setSelectedArea(area));
    onFiltersChange({ ingredient: selectedIngredient?.id || null, area: value });
  };

  // Prepare options for dropdowns
  const ingredientOptions = [
    { value: '', label: 'Ingredients' },
    ...ingredients.map(ingredient => ({
      value: ingredient.id,
      label: ingredient.name
    }))
  ];

  const areaOptions = [
    { value: '', label: 'Area' },
    ...areas.map(area => ({
      value: area.id,
      label: area.name
    }))
  ];

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
