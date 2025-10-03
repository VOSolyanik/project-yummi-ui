import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import css from './AddRecipePage.module.css';

import AddRecipeForm from '@components/AddRecipeForm/AddRecipeForm';
import MainTitle from '@components/MainTitle/MainTitle.jsx';
import Subtitle from '@components/Subtitle/Subtitle.jsx';

import { BASE_TITLE } from '@constants/pages';

import { recipesAPI } from '@/services/index.js';
const { createRecipe, getCategories, getCountries, getIngredients } = recipesAPI;

const initialValues = {
  photo: null,
  title: '',
  description: '',
  categoryId: '',
  areaId: '',
  time: 10,
  ingredientId: '',
  ingredientAmount: '',
  ingredients: [],
  instructions: ''
};

const AddRecipePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState({ categories: [], countries: [], ingredients: [] });

  useEffect(() => {
    (async () => {
      try {
        const [cats, cnts, ings] = await Promise.all([
          getCategories(),
          getCountries(),
          getIngredients()
        ]);
        setLists({ categories: cats, countries: cnts, ingredients: ings });
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        toast.error('Failed to load form data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('image', values.photo);
      formData.append('title', values.title.trim());
      formData.append('description', values.description.trim());
      formData.append('categoryId', values.categoryId);
      formData.append('areaId', values.areaId);
      formData.append('time', String(values.time));
      formData.append('instructions', values.instructions.trim());
      formData.append(
        'ingredients',
        JSON.stringify(values.ingredients.map(i => ({ id: i.id, measure: i.amount })))
      );

      const created = await createRecipe(formData);

      const recipeId = created?.id ?? created?.recipe?.id;
      toast.success('Recipe successfully added');
      navigate(`/recipe/${recipeId}`);
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message || 'Recipe was not added');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading…</div>;

  return (
    <>
      <Helmet>
        <title>{BASE_TITLE} - Add Recipe</title>
      </Helmet>

      <section className={css.container}>
        <MainTitle level={2} id='add-recipe-heading' className={css.title}>Add Recipe</MainTitle>
        <Subtitle className={css.text}>
          Reveal your culinary art, share your favorite recipe
          and create gastronomic masterpieces with us.
        </Subtitle>

        {loading ? (
          <div className={css.loading}>Loading…</div>
        ) : (
          <AddRecipeForm
            categories={lists.categories}
            countries={lists.countries}
            ingredients={lists.ingredients}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          />
        )}
      </section>
    </>
  );
};

export default AddRecipePage;
