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
    .of(
      Yup.object({
        id: Yup.string().required(),
        name: Yup.string().required(),
        amount: Yup.string().required(),
      }),
    )
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
        const [cats, cnts, ings] = await Promise.all([getCategories(), getCountries(), getIngredients()]);
        setCategories(cats);
        setCountries(cnts);
        setIngredients(ings);
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

  const ingredientMap = useMemo(() => Object.fromEntries(ingredients.map(i => [i.id, i])), [ingredients]);

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
      formData.append(
        'ingredients',
        JSON.stringify(values.ingredients.map(i => ({ id: i.id, amount: i.amount }))),
      );

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
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, setFieldValue, isSubmitting, resetForm, errors, touched }) => (
        <Form className={css.form}>
          {/* Photo upload */}
          <div className={css.photoPreviewBlock}>
            {/* hidden input */}
            <input
              id="photo"
              type="file"
              accept="image/*"
              className={css.fileInputHidden}
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
            />

            {/* If preview exists: show same-sized box with image */}
            {photoPreview ? (
              <>
                <div className={`${css.uploadBox} ${css.hasPreview}`} aria-label="Selected photo preview">
                  <img className={css.uploadImg} src={photoPreview} alt="Preview" />
                </div>
                <label htmlFor="photo" className={css.uploadLink}>
                  Upload another photo
                </label>
                <ErrorMessage name="photo" component="div" className={css.error} />
              </>
            ) : (
              /* Otherwise: show empty dropzone-style box */
              <>
                <label
                  htmlFor="photo"
                  className={`${css.uploadBox} ${errors.photo && touched.photo ? css.invalid : ''}`}
                  role="button"
                >
                  <span className={css.uploadInner}>
                    <Icon className={css.icon} name="camera" src="/src/assets/icons/camera.svg" width={40} height={40} />
                    <span className={css.uploadText}>Upload a photo</span>
                  </span>
                </label>
                <ErrorMessage name="photo" component="div" className={css.error} />
              </>
            )}
          </div>


          {/* Name */}
          <div className={css.mainBlock}>
            <div className={css.titleBlock}>
              <Field name="title">
                {({ field }) => (
                  <input
                    {...field}
                    type="text"
                    maxLength={50}
                    className={css.inputBare + (errors.title && touched.title ? ' ' + css.invalid : '')}
                    placeholder="The name of the recipe"
                  />
                )}
              </Field>
              <ErrorMessage name="title" component="div" className={css.error} />
            </div>

            {/* Description */}
            <div className={css.descriptionWrap}>
              <Field name="description">
                {({ field }) => (
                  <textarea
                    {...field}
                    rows={1}
                    maxLength={200}
                    className={
                      css.textareaUnderlined +
                      ' ' +
                      css.descriptionTextarea +
                      (errors.description && touched.description ? ' ' + css.invalid : '')
                    }
                    placeholder="Enter a description of the dish"
                    onInput={e => {
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                  />
                )}
              </Field>
              <div className={css.descriptionCounter}>
                <span
                  className={
                    css.counterCurrent + (!values.description.length ? ' ' + css.inactiveText : '')
                  }
                >
                  {values.description.length}
                </span>
                <span className={css.counterMax}>/200</span>
              </div>
            </div>

            {/* Category / Time / Area / Ingredient */}
            <div className={css.catIngBlock}>
              <div className={css.catTimeBlock}>
                <div className={css.catBlock}>
                  <div className={css.label}>Category</div>
                  <div className={css.select}>
                    <button
                      type="button"
                      className={css.selectBtn + (!values.category ? ' ' + css.inactiveText : '')}
                      onClick={() => setOpenSelect(openSelect === 'category' ? null : 'category')}
                    >
                      {values.category ? categories.find(c => c.id === values.category)?.name : 'Select a category'}
                      <Icon name="chevron-down" src="/src/assets/icons/chevron-down.svg" width={18} height={18} />
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

                <div>
                  <div className={css.label}>Cooking time</div>
                  <div className={css.timeControl}>
                    <button
                      type="button"
                      className={css.iconBtn}
                      onClick={() => setFieldValue('time', Math.max(10, Number(values.time) - 10))}
                    >
                      <Icon className={css.icon} name="minus" src="/src/assets/icons/minus.svg"/>
                    </button>

                    <span
                      className={
                        css.timeValue +
                        (values.time === 10 ? ' ' + css.inactiveText : '')
                      }
                    >
                      {values.time} min
                    </span>

                    <button
                      type="button"
                      className={css.iconBtn}
                      onClick={() => setFieldValue('time', Number(values.time) + 10)}
                    >
                      <Icon className={css.icon} name="plus" src="/src/assets/icons/plus.svg"  />
                    </button>
                  </div>
                  <ErrorMessage name="time" component="div" className={css.error} />
                </div>
              </div>

              <div className={css.areaBlock}>
                <div className={css.label}>Area</div>
                <div className={css.select}>
                  <button
                    type="button"
                    className={css.selectBtn + (!values.country ? ' ' + css.inactiveText : '')}
                    onClick={() => setOpenSelect(openSelect === 'country' ? null : 'country')}
                  >
                    {values.country ? countries.find(c => c.code === values.country)?.name : 'Area'}
                    <Icon name="chevron-down" src="/src/assets/icons/chevron-down.svg" width={18} height={18} />
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

              <div className={css.catTimeBlock}>
                <div className={css.catBlock}>
                  <div className={css.label}>Ingredients</div>
                  <div className={css.select}>
                    <button
                      type="button"
                      className={css.selectBtn + (!values.ingredientId ? ' ' + css.inactiveText : '')}
                      onClick={() => setOpenSelect(openSelect === 'ingredient' ? null : 'ingredient')}
                    >
                      {values.ingredientId ? ingredientMap[values.ingredientId]?.name : 'Add the ingredient'}
                      <Icon name="chevron-down" src="/src/assets/icons/chevron-down.svg" width={18} height={18} />
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

                <div className={css.descriptionWrap}>
                  <Field name="ingredientAmount">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        maxLength={20}
                        className={
                          css.textareaUnderlined +
                          (errors.ingredientAmount && touched.ingredientAmount ? ' ' + css.invalid : '')
                        }
                        placeholder="Enter quantity"
                      />
                    )}
                  </Field>
                </div>
              </div>
            </div>

            <div className={css.addIngBlock}>
              <div>
                <Button
                  type="button"
                  variant="secondary"
                  className={css.addIngBtn}
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
                      imgUrl: ing.imgUrl,
                    };
                    setFieldValue('ingredients', [
                      ...values.ingredients.filter(i => i.id !== newItem.id),
                      newItem,
                    ]);
                    setFieldValue('ingredientId', '');
                    setFieldValue('ingredientAmount', '');
                    setOpenSelect(null);
                  }}
                >
                  Add Ingredient
                  <Icon className={css.addIngBtnIcon} name="plus" src="/src/assets/icons/plus.svg"/>
                </Button>
                <ErrorMessage name="ingredients" component="div" className={css.error} />
              </div>

              <div className={css.ingredientList + (values.ingredients.length !== 0 ? '' : ' ' + css.hidden)}>
                {values.ingredients.map(item => (
                  <div key={item.id} className={css.ingredientCard}>
                    <div className={css.thumbBox}>
                      <img src={item.imgUrl} alt={item.name} className={css.thumb} />
                    </div>

                    <div className={css.ingInfo}>
                      <div className={css.ingName}>{item.name}</div>
                      <div className={css.ingAmount}>{item.amount}</div>
                    </div>

                    <button
                      type="button"
                      className={css.ingClose}
                      title="Remove"
                      onClick={() =>
                        setFieldValue('ingredients', values.ingredients.filter(i => i.id !== item.id))
                      }
                    >
                      <Icon name="close" src="/src/assets/icons/close.svg" width={16} height={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className={css.label + ' ' + css.preparation}>Recipe Preparation</div>
            <div className={css.descriptionWrap + ' ' + css.instructionWrap}>
              <Field name="instructions">
                {({ field }) => (
                  <textarea
                    {...field}
                    rows={1}
                    maxLength={1000}
                    className={
                      css.textareaUnderlined +
                      ' ' +
                      css.descriptionTextarea +
                      (errors.instructions && touched.instructions ? ' ' + css.invalid : '')
                    }
                    placeholder="Enter recipe"
                    onInput={e => {
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                  />
                )}
              </Field>
              <div className={css.descriptionCounter}>
                <span
                  className={
                    css.counterCurrent + (!values.instructions.length ? ' ' + css.inactiveText : '')
                  }
                >
                  {values.instructions.length}
                </span>
                <span className={css.counterMax}>/1000</span>
              </div>
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
                <Icon name="trash" src="/src/assets/icons/trash.svg" width={20} height={20} className={css.icon} />
              </button>
              <Button type="submit" variant="primary" disabled={isSubmitting} className={css.publishBtn}>
                Publish
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddRecipeForm;
