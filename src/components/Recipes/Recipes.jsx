import React from 'react';

import css from './Recipes.module.css';

import MainTitle from '@components/MainTitle/MainTitle';
import Subtitle from '@components/Subtitle/Subtitle';

const Recipes = ({ categoryData, onBackToCategories }) => {
  const getTitle = () => {
    if (categoryData?.category?.name === 'All Categories') {
      return 'All categories';
    }
    return categoryData?.category?.name || 'Recipes';
  };

  const getSubtitle = () => {
    if (categoryData?.category?.name === 'All Categories') {
      return 'Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.';
    }
    return `Explore delicious ${categoryData?.category?.name?.toLowerCase() || 'recipes'} and discover new flavors that will delight your taste buds.`;
  };

  return (
    <section className={css.recipes} aria-labelledby="recipes-heading">
      <div className={css.container}>
        {/* Кнопка Back */}
        <button 
          type="button" 
          className={css.backButton}
          onClick={onBackToCategories}
          aria-label="Back to categories"
        >
          ← Back
        </button>

        {/* Заголовок */}
        <MainTitle level={2} id="recipes-heading" className={css.title}>
          {getTitle()}
        </MainTitle>

        {/* Підзаголовок */}
        <Subtitle className={css.subtitle}>
          {getSubtitle()}
        </Subtitle>

        {/* Тимчасовий контент */}
        <div className={css.tempContent}>
          <p>Recipes component is under development...</p>
          <p>Category: {categoryData?.category?.name}</p>
          <p>Recipes count: {categoryData?.recipes?.length || 0}</p>
          <p>Total recipes: {categoryData?.totalRecipes || 0}</p>
        </div>
      </div>
    </section>
  );
};

export default Recipes;
