import React, { useEffect, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import css from './RecipeIngredients.module.css';

import noImagePlaceholder from '../../assets/images/no-image.png';

import { fetchIngredients, selectIngredients } from '@/redux/filters/filtersSlice';

const RecipeIngredients = ({ ingredients = [] }) => {
  const dispatch = useDispatch();
  const allIngredients = useSelector(selectIngredients);

  useEffect(() => {
    // Fetch all ingredients to get their images if not already in store
    if (!allIngredients || allIngredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, allIngredients]);

  // Create a map for quick lookup of images by ID
  const ingredientImageMap = useMemo(() => {
    if (!allIngredients) return new Map();
    return new Map(allIngredients.map(item => [item.id, item.img]));
  }, [allIngredients]);

  const handleImageError = (e) => {
    e.target.src = noImagePlaceholder;
  };

  return (
    <div className={css.ingredientsSection}>
      <h2 className={css.title}>Ingredients</h2>
      <div className={css.list}>
        {ingredients.map((ingredient, index) => {
          const imageUrl = ingredientImageMap.get(ingredient.id);

          return (
            <div key={`${ingredient.id}-${index}`} className={css.item}>
              <div className={css.imageWrapper}>
                <img
                  src={imageUrl || noImagePlaceholder}
                  alt={ingredient.name}
                  className={css.image}
                  onError={handleImageError}
                />
              </div>
              <div className={css.itemDetails}>
                <span className={css.itemName}>{ingredient.name}</span>
                <span className={css.itemMeasure}>{ingredient.measure}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeIngredients;