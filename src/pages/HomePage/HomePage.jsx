import { useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { selectSelectedCategory, setSelectedCategory, clearSelectedCategory } from '@redux/categories/categoriesSlice';

import Categories from '@components/Categories/Categories';
import HeroBanner from '@components/HeroBanner/HeroBanner';
import Recipes from '@components/Recipes/Recipes';
import Testimonials from '@components/Testimonials/Testimonials';

import { BASE_TITLE } from '@constants/pages';

const HomePage = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectSelectedCategory);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCategorySelect = category => {
    dispatch(setSelectedCategory(category));
  };

  const handleBackToCategories = () => {
    dispatch(clearSelectedCategory());
  };

  useEffect(() => {
    if (location.state && location.state === 'global') {
      navigate('.', { replace: true, state: null });
      dispatch(clearSelectedCategory());
    }
  }, [dispatch, navigate, location]);

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

      <Testimonials />
    </>
  );
};

export default HomePage;
