import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthActions } from '../../hooks/useAuthActions';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import classes from './RegisterForm.module.css';

// Схема валідації
const registerSchema = Yup.object({
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
    .required('Password is required'),
});

const RegisterForm = ({ onClose, onSwitchToLogin }) => {
  const { register } = useAuthActions();
  const { isLoading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Закриття по Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await register(values);
      if (onClose) onClose();
      navigate('/');
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Закриття по backdrop
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div className={classes.modal} onClick={handleBackdropClick}>
      <div className={classes.modalContent}>
        <button 
          className={classes.closeButton}
          onClick={onClose}
          type="button"
        >
          <Icon name="close" />
        </button>
        
        <h2 className={classes.title}>SIGN UP</h2>
        
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              <div className={classes.fieldGroup}>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name*"
                  className={classes.input}
                />
                <ErrorMessage 
                  name="name" 
                  component="span" 
                  className={classes.error} 
                />
              </div>

              <div className={classes.fieldGroup}>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className={classes.input}
                />
                <ErrorMessage 
                  name="email" 
                  component="span" 
                  className={classes.error} 
                />
              </div>

              <div className={classes.fieldGroup}>
                <div className={classes.passwordContainer}>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className={classes.input}
                  />
                  <button
                    type="button"
                    className={classes.eyeButton}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon name={showPassword ? 'eye-off' : 'eye'} />
                  </button>
                </div>
                <ErrorMessage 
                  name="password" 
                  component="span" 
                  className={classes.error} 
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isLoading}
                className={classes.submitButton}
              >
                CREATE
              </Button>
            </Form>
          )}
        </Formik>

        <p className={classes.switchText}>
          Already have an account? 
          <button 
            type="button"
            onClick={() => {
              if (onSwitchToLogin) {
                onSwitchToLogin();
              }
            }}
            className={classes.switchLink}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
