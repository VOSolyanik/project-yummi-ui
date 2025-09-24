import React from 'react';

import clsx from 'clsx';

import css from './Subtitle.module.css';

const Subtitle = ({ children, className, ...rest }) => {
  return (
    <p 
      className={clsx(css.subtitle, className)}
      {...rest}
    >
      {children}
    </p>
  );
};

export default Subtitle;
