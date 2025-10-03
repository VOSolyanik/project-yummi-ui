import { useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import css from './SignInForm.module.css';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';

// Validation schema
const signInSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

const SignInForm = ({ onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={signInSchema}
      validateOnMount={true}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isValid }) => (
        <Form className={css.form}>
          <div className={css.fieldGroup}>
            <Field
              type="email"
              id="email"
              name="email"
              className={`${css.input} ${errors.email && touched.email ? css.inputError : ''}`}
              placeholder="Email*"
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </div>

          <div className={css.fieldGroup}>
            <div className={css.passwordField}>
              <Field
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={`${css.input} ${errors.password && touched.password ? css.inputError : ''}`}
                placeholder="Password"
              />
              <button
                type="button"
                className={css.passwordToggle}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon name={showPassword ? 'eye-off' : 'eye'} />
              </button>
            </div>
            <ErrorMessage name="password" component="div" className={css.error} />
          </div>

          <Button
            type="submit"
            size="large"
            className={css.submitButton}
            disabled={isLoading || !isValid}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
