import { Helmet } from 'react-helmet-async';

import css from './AddRecipePage.module.css';

import AddRecipeForm from '@components/AddRecipeForm/AddRecipeForm';

import { BASE_TITLE } from '@constants/pages';

const AddRecipePage = () => {
  return (
    <>
      <Helmet>
        <title>{BASE_TITLE} - Add Recipe</title>
      </Helmet>
      <section className={css.container}>
        <h2 className={css.title}>Add Recipe</h2>
        <p className={css.text}>
          Reveal your culinary art, share your favorite recipe
          and create gastronomic masterpieces with us.
        </p>
        <AddRecipeForm />
      </section>
    </>
  );
};

export default AddRecipePage;
