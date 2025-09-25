import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

import css from './HomePage.module.css';

import { BASE_TITLE } from '@constants/pages';
import Categories from '@components/Categories/Categories';
import Recipes from '@components/Recipes/Recipes';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showRecipes, setShowRecipes] = useState(false);


  const handleCategorySelect = (categoryData) => {
    if (categoryData.category && categoryData.recipes) {
      setSelectedCategory(categoryData);
      setShowRecipes(true);
    }
  };

  const handleBackToCategories = () => {
    setShowRecipes(false);
    setSelectedCategory(null);
  };

  return (
    <>
      <Helmet>
        <title>{BASE_TITLE} - {showRecipes ? 'Recipes' : 'Categories'}</title>
      </Helmet>
      
      {!showRecipes && (
        <section className={css.hero}>
          Home page
        </section>
      )}

      {showRecipes ? (
        <Recipes 
          categoryData={selectedCategory}
          onBackToCategories={handleBackToCategories}
        />
      ) : (
        <Categories onCategorySelect={handleCategorySelect} />
      )}
    </>
  );
};

export default HomePage;
