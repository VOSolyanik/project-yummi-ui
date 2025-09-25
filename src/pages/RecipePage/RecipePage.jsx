import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { BASE_TITLE } from '@constants/pages';

const RecipePage = () => {
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title>{BASE_TITLE} - Recipe {id}</title>
      </Helmet>
      <section style={{ maxWidth: 800, margin: '24px auto', padding: 16 }}>
        <h1>Recipe created</h1>
        <p>Your recipe was created successfully.</p>
        <p>ID: <strong>{id}</strong></p>
        <p>
          <Link to="/">Go to Home</Link>
        </p>
      </section>
    </>
  );
};

export default RecipePage;
