import React from 'react';

import css from './Recipes.module.css';

import MainTitle from '@components/MainTitle/MainTitle';
import Subtitle from '@components/Subtitle/Subtitle';

const Recipes = ({ categoryData, onBackToCategories }) => {
  const isAllCategories = categoryData?.category?.name === 'All Categories';
  
  const title = isAllCategories ? 'All categories' : categoryData?.category?.name || 'Recipes';
  
  const subtitle = isAllCategories 
    ? 'Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.'
    : `Explore delicious ${categoryData?.category?.name?.toLowerCase() || 'recipes'} and discover new flavors that will delight your taste buds.`;

  return (
    <section className={css.recipes} aria-labelledby="recipes-heading">
      <div className={css.container}>
        <button 
          type="button" 
          className={css.backButton}
          onClick={onBackToCategories}
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
