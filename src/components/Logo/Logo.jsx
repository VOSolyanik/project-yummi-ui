import React from 'react';

import { Link } from 'react-router-dom';

import clsx from 'clsx';

import css from './Logo.module.css';

const Logo = ({ className, inverse = false }) => {
  return (
    <Link to="/" className={clsx(css.logo, className, inverse && css.inverse)}>
      <span className={css.logoText}>Foodies</span>
    </Link>
  );
};

export default Logo;
