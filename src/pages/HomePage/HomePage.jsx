import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

import css from './HomePage.module.css';

import { BASE_TITLE } from '@constants/pages';
import Categories from '@components/Categories/Categories';

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
        <title>{BASE_TITLE} - Recipes</title>
      </Helmet>
      <section className={css.hero}>
        Home page
      </section>

      <Categories onCategorySelect={handleCategorySelect} />
    </>
  );
};

export default HomePage;
