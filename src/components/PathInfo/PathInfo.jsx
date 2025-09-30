import React from 'react';

import { Link } from 'react-router-dom';

import styles from './PathInfo.module.css';

const PathInfo = ({ recipeTitle }) => (
  <div className={styles.pathInfo}>
    <Link to="/" className={styles.homeLink}>
      Home
    </Link>
    <span className={styles.homeLink}> / </span>
    <span className={styles.recipeTitle}>{recipeTitle}</span>
  </div>
);

export default PathInfo;
