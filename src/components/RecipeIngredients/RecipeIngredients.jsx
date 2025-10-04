import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import css from './RecipeIngredients.module.css';

import noImagePlaceholder from '../../assets/images/no-image.png';

import { fetchIngredients, selectIngredients } from '@/redux/filters/filtersSlice';

const RecipeIngredients = ({ ingredients = [] }) => {
  const dispatch = useDispatch();
  const allIngredients = useSelector(selectIngredients);

  useEffect(() => {
    // Fetch all ingredients if they are not already in the store
    if (!allIngredients || allIngredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, allIngredients]);

  // Create a map for quick lookup
  const ingredientsMap = React.useMemo(() => {
    if (!allIngredients) return new Map();
    return new Map(allIngredients.map(item => [item.id, item]));
  }, [allIngredients]);

  const handleImageError = e => {
    e.target.src = noImagePlaceholder;
  };

  return (
    <div className={css.ingredientsSection}>
      <h2 className={css.title}>Ingredients</h2>
      <div className={css.list}>
        {ingredients.map(({ id, measure }, index) => {
          const ingredientInfo = ingredientsMap.get(id);
          if (!ingredientInfo) {
            return null; // Or a loading/placeholder state
          }
          return (
            <div key={index} className={css.item}>
              <div className={css.imageWrapper}>
                <img
                  src={ingredientInfo.img || 'https://placehold.co/55x55?text=Ingredient'}
                  alt={ingredientInfo.name}
                  className={css.image}
                  onError={handleImageError}
                />
              </div>
              <div className={css.itemDetails}>
                <span className={css.itemName}>{ingredientInfo.name}</span>
                <span className={css.itemMeasure}>{measure}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeIngredients;
