import React from 'react';

import clsx from 'clsx';

import css from './AuthBar.module.css';

import Button from '../Button/Button';

const AuthBar = ({ onSignInClick, onSignUpClick, inverse = false }) => {
  return (
    <div className={clsx(css.authBar, inverse && css.inverse)}>
      <Button
        onClick={onSignInClick}
        className={clsx(css.signButton, css.signInButton)}
      >
        Sign in
      </Button>
      <Button
        onClick={onSignUpClick}
        className={clsx(css.signButton, css.signUpButton)}
      >
        Sign up
      </Button>
    </div>
  );
};

export default AuthBar;
