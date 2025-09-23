import React from 'react';

import clsx from 'clsx';

import css from './Button.module.css';

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  className,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={clsx(css.button, css[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;