import React from 'react';

import css from './RecipesPreview.module.css';

import arrowUpRightIcon from '../../assets/icons/arrow-up-right.svg';

const RecipesPreview = ({ title, description, image, onOpen, onDelete }) => {
  return (
    <div className={css.card}>
      <img src={image} alt={title} className={css.image} />

      <div className={css.section}>
        <div className={css.text}>
          <h3 className={css.title}>{title}</h3>
          <p className={css.description}>{description}</p>
        </div>

        <div className={css.buttons}>
          <button type="button" className={css.iconButton} onClick={onOpen} aria-label="Open recipe">
            <img src={arrowUpRightIcon} alt="arrow" className={css.arrowIcon} />
          </button>
          <button type="button" className={css.iconButton} onClick={onDelete} aria-label="Delete recipe">
            🗑
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipesPreview;
