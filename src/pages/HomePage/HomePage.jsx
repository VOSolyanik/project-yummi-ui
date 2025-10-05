import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { selectSelectedCategory, setSelectedCategory, clearSelectedCategory } from '@redux/categories/categoriesSlice';

import Categories from '@components/Categories/Categories';
import HeroBanner from '@components/HeroBanner/HeroBanner';
import Recipes from '@components/Recipes/Recipes';

import { BASE_TITLE } from '@constants/pages';

const HomePage = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectSelectedCategory);

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));
  };

  const handleBackToCategories = () => {
    dispatch(clearSelectedCategory());
  };

  return (
    <>
      <Helmet>
        <title>
          {BASE_TITLE} - {!selectedCategory ? 'Recipes' : 'Categories'}
        </title>
      </Helmet>

      <HeroBanner />

      {selectedCategory ? (
        <Recipes category={selectedCategory} onBackToCategories={handleBackToCategories} />
      ) : (
        <Categories onCategorySelect={handleCategorySelect} />
      )}
    </>
  );
};

export default HomePage;
