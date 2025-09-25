import { Helmet } from 'react-helmet-async';

import AddRecipeForm from '@components/AddRecipeForm/AddRecipeForm';

import { BASE_TITLE } from '@constants/pages';

const AddRecipePage = () => {
  return (
    <>
      <Helmet>
        <title>{BASE_TITLE} - Add Recipe</title>
      </Helmet>
      <section>
        <AddRecipeForm />
      </section>
    </>
  );
};

export default AddRecipePage;
