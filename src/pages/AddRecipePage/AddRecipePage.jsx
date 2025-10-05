import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import css from './AddRecipePage.module.css';

import AddRecipeForm from '@components/AddRecipeForm/AddRecipeForm';
import MainTitle from '@components/MainTitle/MainTitle.jsx';
import PathInfo from '@components/PathInfo/PathInfo.jsx';
import Subtitle from '@components/Subtitle/Subtitle.jsx';

import { BASE_TITLE } from '@constants/pages';

import { categoriesAPI } from '@/services/categoriesApi.js';
import { recipesAPI } from '@/services/index.js';
import { filtersAPI } from '@/services/recipesApi.js';
const { createRecipe } = recipesAPI;

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
  const [lists, setLists] = useState({ ingredients: [] });
  const [options, setOptions] = useState({
    categoryOptions: [],
    areaOptions: [],
    ingredientOptions: []
  });
  useEffect(() => {
    (async () => {
      try {
        const [{ data: cats }, { data: areas }, { data: ings }] = await Promise.all([
          categoriesAPI.getCategories(),
          filtersAPI.getAreas(),
          filtersAPI.getIngredients()
        ]);
        const categoryOptions = cats.map(c => ({ value: c.id, label: c.name }));
        const areaOptions      = areas.map(a => ({ value: a.id, label: a.name }));
        const ingredientOptions = ings.map(i => ({ value: i.id, label: i.name }));
        setOptions({ categoryOptions, areaOptions, ingredientOptions });
        setLists({ ingredients: ings });
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
        <PathInfo currentPage='Add recipe'/>
        <MainTitle level={2} id='add-recipe-heading' className={css.title}>Add Recipe</MainTitle>
        <Subtitle className={css.text}>
          Reveal your culinary art, share your favorite recipe
          and create gastronomic masterpieces with us.
        </Subtitle>

        {loading ? (
          <div className={css.loading}>Loading…</div>
        ) : (
          <AddRecipeForm
            ingredientItems={lists.ingredients}
            categoryOptions={options.categoryOptions}
            areaOptions={options.areaOptions}
            ingredientOptions={options.ingredientOptions}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          />
        )}
      </section>
    </>
  );
};

export default AddRecipePage;
