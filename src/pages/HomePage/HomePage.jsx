import { Helmet } from 'react-helmet-async';

import css from './HomePage.module.css';

import { BASE_TITLE } from '@constants/pages';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>{BASE_TITLE} - Recipes</title>
      </Helmet>
      <section className={css.hero}>
        Home page
      </section>
    </>
  );
};

export default HomePage;
