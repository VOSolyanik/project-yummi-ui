import React from 'react';

import { useDispatch } from 'react-redux'; 
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import css from './Logo.module.css';

import { clearSelectedCategory } from '@redux/categories/categoriesSlice'; 

const Logo = ({ className, inverse = false }) => {
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    dispatch(clearSelectedCategory());
  };


  return (
    <Link to="/" className={clsx(css.logo, className, inverse && css.inverse)} onClick={handleHomeClick}>
      <span className={css.logoText}>Foodies</span>
    </Link>
  );
};

export default Logo;
