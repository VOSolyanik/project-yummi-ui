import React from 'react';

import clsx from 'clsx';

import css from './MainTitle.module.css';

const MainTitle = ({ children, className, level = 1, ...rest }) => {
  const Tag = `h${level}`;
  
  return (
    <Tag 
      className={clsx(css.title, css[`level${level}`], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default MainTitle;
