import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import css from './Categories.module.css';

import MainTitle from '@components/MainTitle/MainTitle';
import Subtitle from '@components/Subtitle/Subtitle';
import CategoryList from '@components/CategoryList/CategoryList';

import {
  fetchCategories,
  selectCategories,
  selectIsLoading,
  selectError,
} from '@redux/categories/categoriesSlice';

const Categories = ({ onCategorySelect }) => {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    // Завантажуємо категорії при першому рендері
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  useEffect(() => {
    // Показуємо помилку якщо вона є
    if (error) {
      toast.error(`Error loading categories: ${error}`);
    }
  }, [error]);

  const handleCategoryClick = (category) => {
    // TODO: Тут буде логіка відправки запиту за рецептами
    // Поки що просто логуємо
    console.log('Category selected:', category);

    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  return (
    <section className={css.categories} aria-labelledby="categories-heading">
      <div className={css.container}>
        <MainTitle level={2} id="categories-heading" className={css.title}>
          CATEGORIES
        </MainTitle>

        <Subtitle className={css.subtitle}>
          Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.
        </Subtitle>

        <CategoryList
          categories={categories}
          onCategoryClick={handleCategoryClick}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </section>
  );
};

export default Categories;
