import { useEffect, useMemo, useRef, useState } from 'react';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { createRecipe, getCategories, getCountries, getIngredients } from '@services/apiAddRecipe.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import css from './AddRecipeForm.module.css';

import Button from '@components/Button/Button';
import { Icon } from '@components/Icon/Icon';

const validationSchema = Yup.object({
  photo: Yup.mixed().required('Photo is required'),
  title: Yup.string().trim()
    .required('Title is required'),
  description: Yup.string().trim()
    .max(200, 'Max 200 characters')
    .required('Description is required'),
  category: Yup.string().required('Category is required'),
  country: Yup.string().required('Country is required'),
  time: Yup.number().min(1, 'Min 1 minute')
    .required('Time is required'),
  ingredientId: Yup.string().required('Ingredient is required'),
  ingredientAmount: Yup.string().trim()
    .required('Amount is required'),
  instructions: Yup.string().trim()
    .max(1000, 'Max 1000 characters')
    .required('Instructions are required'),
  ingredients: Yup.array()
    .of(Yup.object({
      id: Yup.string().required(),
      name: Yup.string().required(),
      amount: Yup.string().required(),
    }))
    .min(1, 'Add at least 1 ingredient')
    .required(),
});

const initialValues = {
  photo: null,
  title: '',
  description: '',
  category: '',
  country: '',
  time: 10,
  ingredientId: '',
  ingredientAmount: '',
  ingredients: [],
  instructions: '',
};

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [openSelect, setOpenSelect] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileUrlRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const [categories, countries, ingredients] = await Promise.all([
          getCategories(),
          getCountries(),
          getIngredients(),
        ]);
        setCategories(categories);
        setCountries(countries);
        setIngredients(ingredients);
      } catch {
        toast.error('Failed to load form data');
      }
    })();
  }, []);

  useEffect(
    () => () => {
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
    },
    [],
  );

  const ingredientMap = useMemo(
    () => Object.fromEntries(ingredients.map(i => [i.id, i])),
    [ingredients],
  );

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('photo', values.photo);
      formData.append('title', values.title.trim());
      formData.append('description', values.description.trim());
      formData.append('category', values.category);
      formData.append('country', values.country);
      formData.append('time', String(values.time));
      formData.append('instructions', values.instructions.trim());
      formData.append('ingredients', JSON.stringify(values.ingredients.map(i => ({ id: i.id, amount: i.amount }))));

      const created = await createRecipe(formData);
      toast.success('Recipe created');
      navigate(`/recipe/${created.id}`);
    } catch (e) {
      toast.error(e?.message || 'Failed to publish recipe');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ values,
        setFieldValue,
        isSubmitting,
        resetForm,
        errors,
        touched,
      }) => (
        <Form className={css.form}>
          <div>
            {photoPreview && <img className={css.filePreview} src={photoPreview} alt="Preview" />}
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.currentTarget.files?.[0] || null;
                setFieldValue('photo', file);
                if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
                if (file) {
                  const url = URL.createObjectURL(file);
                  fileUrlRef.current = url;
                  setPhotoPreview(url);
                } else {
                  setPhotoPreview(null);
                }
              }}
              className={css.fileInput}
              title="Upload a photo"
            />
            <ErrorMessage name="photo" component="div" className={css.error} />
          </div>

          {/* Name  */}
          <Field name="title">
            {({ field }) => (
              <input
                {...field}
                type="text"
                maxLength={50}
                className={css.inputBare + (errors.title && touched.title ? ' ' + css.invalid : '')}
                placeholder="THE NAME OF THE RECIPE"
              />
            )}
          </Field>
          <ErrorMessage name="title" component="div" className={css.error} />


          {/* Description  */}
          <div className={css.descriptionWrap}>
            <Field name="description">
              {({ field }) => (
                <textarea
                  {...field}
                  rows={1}
                  maxLength={200}
                  className={
                    css.textareaUnderlined + ' ' + css.descriptionTextarea +
                    (errors.description && touched.description ? ' ' + css.invalid : '')
                  }
                  placeholder="Enter a description of the dish"
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                />
              )}
            </Field>
            <div className={css.descriptionCounter}>
              <span className={css.counterCurrent}>
                {values.description.length}
              </span>
              <span className={css.counterMax}>/200</span>
            </div>
            <ErrorMessage name="description" component="div" className={css.error} />
          </div>


          {/* Category */}
          <div>
            <div className={css.label}>Category</div>
            <div className={css.select}>
              <button
                type="button"
                className={css.selectBtn + (!values.category ? ' ' + css.inactiveText : '')}
                onClick={() => setOpenSelect(openSelect === 'category' ? null : 'category')}
              >
                {values.category ? categories.find(c => c.id === values.category)?.name : 'Select a category'}
                <Icon name="chevron-down" width={18} height={18} />
              </button>
              {openSelect === 'category' && (
                <div className={css.dropdown}>
                  {categories.map(c => (
                    <div
                      key={c.id}
                      className={css.option}
                      onClick={() => {
                        setFieldValue('category', c.id);
                        setOpenSelect(null);
                      }}
                    >
                      {c.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <ErrorMessage name="category" component="div" className={css.error} />
          </div>


          <div className={css.row}>
            <div>
              <div className={css.label}>Cooking time</div>
              <div className={css.timeControl}>
                <button
                  type="button"
                  className={css.iconBtn}
                  onClick={() => setFieldValue('time', Math.max(10, Number(values.time) - 10))}
                >
                  <Icon name="minus" width={16} height={16} />
                </button>
                <span
                  onChange={e => setFieldValue('time',
                    Math.max(10, Number(e.target.value || 0)))}
                  className={css.textarea + (values.time === 10 ? ' ' + css.inactiveText : '')}
                >{values.time} min</span>
                <button
                  type="button"
                  className={css.iconBtn}
                  onClick={() => setFieldValue('time', Number(values.time) + 10)}
                >
                  <Icon name="plus" width={16} height={16}/>

                </button>
              </div>
              <ErrorMessage name="time" component="div" className={css.error} />
            </div>

            <div>
              <div className={css.label}>Area</div>
              <div className={css.select}>
                <button
                  type="button"
                  className={css.selectBtn + (!values.country ? ' ' + css.inactiveText : '')}
                  onClick={() => setOpenSelect(openSelect === 'country' ? null : 'country')}
                >
                  {values.country ? countries.find(c => c.code === values.country)?.name : 'Area'}
                  <Icon name="chevron-down" width={18} height={18} />
                </button>
                {openSelect === 'country' && (
                  <div className={css.dropdown}>
                    {countries.map(c => (
                      <div
                        key={c.code}
                        className={css.option}
                        onClick={() => {
                          setFieldValue('country', c.code);
                          setOpenSelect(null);
                        }}
                      >
                        {c.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <ErrorMessage name="country" component="div" className={css.error} />
            </div>
          </div>

          <div className={css.row}>
            <div>
              <div className={css.label}>Ingredients</div>
              <div className={css.select}>
                <button
                  type="button"
                  className={css.selectBtn + (!values.ingredientId ? ' ' + css.inactiveText : '')}
                  onClick={() => setOpenSelect(openSelect === 'ingredient' ? null : 'ingredient')}
                >
                  {values.ingredientId ? ingredientMap[values.ingredientId]?.name : 'Add the ingredient'}
                  <Icon name="chevron-down" width={18} height={18} />
                </button>
                {openSelect === 'ingredient' && (
                  <div className={css.dropdown}>
                    {ingredients.map(i => (
                      <div
                        key={i.id}
                        className={css.option}
                        onClick={() => {
                          setFieldValue('ingredientId', i.id);
                          setOpenSelect(null);
                        }}
                      >
                        {i.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <ErrorMessage name="ingredientId" component="div" className={css.error} />
            </div>

            <div className={css.descWrap}>
              <Field name="ingredientAmount">
                {({ field }) => (
                  <input
                    {...field}
                    type="text"
                    maxLength={20}
                    className={css.textareaUnderlined  + (errors.ingredientAmount && touched.ingredientAmount ? ' ' + css.invalid : '')}
                    placeholder="Enter quantity"
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                  />
                )}
              </Field>
              <ErrorMessage name="ingredientAmount" component="div" className={css.error} />
            </div>
          </div>

          <div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                if (!values.ingredientId || !values.ingredientAmount) {
                  toast.error('Select ingredient and amount');
                  return;
                }
                const ing = ingredientMap[values.ingredientId];
                const newItem = {
                  id: ing.id,
                  name: ing.name,
                  amount: values.ingredientAmount,
                  image: ing.image };
                setFieldValue('ingredients', [...values.ingredients.filter(i => i.id !== newItem.id), newItem]);
                setFieldValue('ingredientId', '');
                setFieldValue('ingredientAmount', '');
                setOpenSelect(null);
              }}
            >
              ADD INGREDIENT +
            </Button>
            <ErrorMessage name="ingredients" component="div" className={css.error} />
          </div>

          <div className={css.ingredientList}>
            {values.ingredients.map(item => (
              <div key={item.id} className={css.ingredientCard}>
                <img src={item.image} alt={item.name} className={css.thumb} />
                <div>
                  <div>{item.name}</div>
                  <div className={css.counter}>Amount: {item.amount}</div>
                </div>
                <button
                  type="button"
                  className={css.iconBtn}
                  onClick={() => setFieldValue('ingredients', values.ingredients.filter(i => i.id !== item.id))}
                >
                  <Icon name="trash" width={16} height={16} />
                </button>
              </div>
            ))}
          </div>

          <div className={css.descriptionWrap}>
            <Field name="instructions">
              {({ field }) => (
                <textarea
                  {...field}
                  rows={1}
                  maxLength={1000}
                  className={css.textareaUnderlined + ' ' + css.descriptionTextarea  +
                    (errors.instructions && touched.instructions ? ' ' + css.invalid : '')}
                  placeholder="Enter recipe"
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                />
              )}
            </Field>
            <div className={css.descriptionCounter}>
              <span className={css.counterCurrent}>
                {values.instructions.length}
              </span>
              <span className={css.counterMax}>/1000</span>
            </div>
            <ErrorMessage name="ingredientAmount" component="div" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.iconBtn}
              title="Reset"
              onClick={() => {
                if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
                fileUrlRef.current = null;
                setPhotoPreview(null);
                setOpenSelect(null);
                resetForm({ values: initialValues });
              }}
            >
              <Icon name="trash" width={16} height={16} />
            </button>
            <Button type="submit" variant="primary" disabled={isSubmitting} className={css.publishBtn}>
              Publish
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddRecipeForm;
