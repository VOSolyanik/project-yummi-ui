import React from 'react';

import { Link } from 'react-router-dom';

import clsx from 'clsx';

import css from './PathInfo.module.css';

const PathInfo = ({ currentPage, className }) => {
  return (
    <div className={clsx(css.pathInfo, className)}>
      <Link to="/" className={css.link}>Home</Link>
      <span className={css.separator}>/</span>
      <span className={css.currentPage}>{currentPage}</span>
    </div>
  );
};

export default PathInfo;
