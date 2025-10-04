import React from 'react';

import { Link } from 'react-router-dom';

import css from './PathInfo.module.css';

const PathInfo = ({ currentPage }) => {
  return (
    <div className={css.pathInfo}>
      <Link to="/" className={css.link}>Home</Link>
      <span className={css.separator}>/</span>
      <span className={css.currentPage}>{currentPage}</span>
    </div>
  );
};

export default PathInfo;
