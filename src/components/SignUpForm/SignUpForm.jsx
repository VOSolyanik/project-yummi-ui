import { useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import classes from './SignUpForm.module.css';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';

// Validation schema
const signUpSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter and one number')
    .required('Password is required')
});

const SignUpForm = ({ onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={signUpSchema}
      validateOnMount={true}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isValid }) => (
        <Form className={classes.form}>
          <div className={classes.fieldGroup}>
            <Field
              type="text"
              id="name"
              name="name"
              className={`${classes.input} ${errors.name && touched.name ? classes.inputError : ''}`}
              placeholder="Name*"
            />
            <ErrorMessage name="name" component="div" className={classes.error} />
          </div>

          <div className={classes.fieldGroup}>
            <Field
              type="email"
              id="email"
              name="email"
              className={`${classes.input} ${errors.email && touched.email ? classes.inputError : ''}`}
              placeholder="Email*"
            />
            <ErrorMessage name="email" component="div" className={classes.error} />
          </div>

          <div className={classes.fieldGroup}>
            <div className={classes.passwordField}>
              <Field
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={`${classes.input} ${errors.password && touched.password ? classes.inputError : ''}`}
                placeholder="Password"
              />
              <button
                type="button"
                className={classes.passwordToggle}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon name={showPassword ? 'eye-off' : 'eye'} />
              </button>
            </div>
            <ErrorMessage name="password" component="div" className={classes.error} />
          </div>

          <Button
            type="submit"
            size="large"
            className={classes.submitButton}
            disabled={isLoading || !isValid}
          >
            {isLoading ? 'Creating account...' : 'Create'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
