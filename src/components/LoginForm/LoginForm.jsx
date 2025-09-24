import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthActions } from '../../hooks/useAuthActions';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import classes from './LoginForm.module.css';

// Схема валідації
const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginForm = ({ onClose, onSwitchToRegister }) => {
  const { login } = useAuthActions();
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
      await login(values);
      if (onClose) onClose();
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
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
        
        <h2 className={classes.title}>SIGN IN</h2>
        
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
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
                SIGN IN
              </Button>
            </Form>
          )}
        </Formik>

        <p className={classes.switchText}>
          Don't have an account? 
          <button 
            type="button"
            onClick={() => {
              if (onSwitchToRegister) {
                onSwitchToRegister();
              }
            }}
            className={classes.switchLink}
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
