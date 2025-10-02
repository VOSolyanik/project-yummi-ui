import { Helmet } from 'react-helmet-async';

// import css from './AddRecipePage.module.css';

import { BASE_TITLE } from '@constants/pages';

const AddRecipePage = () => {
  return (
    <>
      <Helmet>
        <title>{BASE_TITLE} - Add Recipe</title>
      </Helmet>
      <h1>Add Recipe</h1>
    </>
  );
};

export default AddRecipePage;
