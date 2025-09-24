import { Helmet } from 'react-helmet-async';

import css from './HomePage.module.css';

import { BASE_TITLE } from '@constants/pages';
import Categories from '@components/Categories/Categories';

const HomePage = () => {
  const handleCategorySelect = (category) => {
    console.log('Category selected:', category);
    // TODO: Тут буде логіка перемикання на Recipes компонент
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
