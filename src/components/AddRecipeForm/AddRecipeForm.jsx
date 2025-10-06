import { useEffect, useMemo, useRef, useCallback } from 'react';

import toast from 'react-hot-toast';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import css from './AddRecipeForm.module.css';

import Button from '@components/Button/Button';
import CustomDropdown from '@components/CustomDropdown/CustomDropdown.jsx';
import Icon from '@components/Icon/Icon';
import PhotoUpload from '@components/PhotoUpload/PhotoUpload.jsx';

import { validationSchema } from '@/schemas/addRecipeFormValidation.js';

const AddRecipeForm = ({
  categoryOptions = [],
  areaOptions = [],
  ingredientOptions = [],
  ingredientItems = [], // raw items: [{id,name,imgUrl}]
  initialValues,
  onSubmit
}) => {
  const fileUrlRef = useRef(null);

  useEffect(
    () => () => {
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
    },
    []
  );

  const ingredientMap = useMemo(() => Object.fromEntries(ingredientItems.map(i => [i.id, i])), [ingredientItems]);

  const handleAddIngredient = useCallback(
    (values, setFieldValue, validateField, setFieldTouched, setFieldError) => () => {
      if (!values.ingredientId || !values.ingredientAmount) {
        if (!values.ingredientAmount) {
          setFieldTouched('ingredientAmount', true, false);
          setFieldError('ingredientAmount', 'Amount is required');
          document.getElementById('ingredientAmount')?.focus();
        }
        toast.error('Select ingredient and amount');
        return;
      }
      const ing = ingredientMap[values.ingredientId];
      const newItem = {
        id: ing.id,
        name: ing.name,
        amount: values.ingredientAmount,
        imgUrl: ing.imgUrl
      };
      setFieldValue('ingredients', [...values.ingredients.filter(i => i.id !== newItem.id), newItem], true);
      validateField('ingredients');
      setFieldValue('ingredientId', '');
      setFieldValue('ingredientAmount', '');
      setFieldTouched('ingredientAmount', false, false);
      setFieldError('ingredientAmount', undefined);
    },
    [ingredientMap]
  );

  const handleRemoveIngredient = useCallback(
    (id, values, setFieldValue) => () => {
      setFieldValue(
        'ingredients',
        values.ingredients.filter(i => i.id !== id)
      );
    },
    []
  );

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ values, setFieldValue, isSubmitting,
        resetForm, errors,
        touched, validateField,
        setFieldTouched, setFieldError }) => (
        <Form className={css.form}>
          <PhotoUpload name="photo" />

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
                <span className={css.counterCurrent + (!values.description.length ? ' ' + css.inactiveText : '')}>
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
                  <CustomDropdown
                    options={categoryOptions}
                    value={values.categoryId}
                    onChange={val => setFieldValue('categoryId', val)}
                    placeholder="Select a category"
                    className={css.formDropdown}
                  />
                  <ErrorMessage name="categoryId" component="div" className={css.error} />
                </div>

                <div>
                  <div className={css.label}>Cooking time</div>
                  <div className={css.timeControl}>
                    <Button
                      variant="outline"
                      size="large"
                      onClick={() => setFieldValue('time', Math.max(1, Number(values.time) - 5))}
                    >
                      <Icon name="minus" />
                    </Button>

                    <span className={css.timeValue + (values.time === 1 ? ' ' + css.inactiveText : '')}>
                      {values.time} min
                    </span>

                    <Button
                      variant="outline"
                      size="large"
                      onClick={() => setFieldValue('time', values.time === 1 ? 5 : Number(values.time) + 5)}
                    >
                      <Icon name="plus" />
                    </Button>
                  </div>
                  <ErrorMessage name="time" component="div" className={css.error} />
                </div>
              </div>

              <div className={css.areaBlock}>
                <div className={css.label}>Area</div>
                <CustomDropdown
                  options={areaOptions}
                  value={values.areaId}
                  onChange={val => setFieldValue('areaId', val)}
                  placeholder="Area"
                  className={css.formDropdown}
                />
                <ErrorMessage name="areaId" component="div" className={css.error} />
              </div>

              <div className={css.catTimeBlock}>
                <div className={css.catBlock}>
                  <div className={css.label}>Ingredients</div>
                  <CustomDropdown
                    options={ingredientOptions}
                    value={values.ingredientId}
                    onChange={val => setFieldValue('ingredientId', val)}
                    placeholder="Add the ingredient"
                    className={css.formDropdown}
                  />
                </div>

                <div className={css.descriptionWrap}>
                  <Field name="ingredientAmount">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="ingredientAmount"
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
                  variant="outline"
                  size="large"
                  onClick={handleAddIngredient(values, setFieldValue,
                    validateField, setFieldTouched, setFieldError)}
                >
                  Add Ingredient
                  <Icon name="plus" />
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
                      onClick={handleRemoveIngredient(item.id, values, setFieldValue)}
                    >
                      <Icon name="close" />
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
                <span className={css.counterCurrent + (!values.instructions.length ? ' ' + css.inactiveText : '')}>
                  {values.instructions.length}
                </span>
                <span className={css.counterMax}>/1000</span>
              </div>
            </div>

            <div className={css.actions}>
              <Button
                variant="outline"
                size="large"
                onClick={() => {
                  resetForm({ values: initialValues });
                }}
              >
                <Icon name="trash" />
              </Button>
              <Button type="submit" variant="primary" size="large" disabled={isSubmitting}>
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
