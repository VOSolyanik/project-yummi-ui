import React from 'react';

import css from './RecipesPreview.module.css';

import Icon from '@components/Icon/Icon.jsx';

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
            <Icon name="arrow-up-right" className={css.icon} size={16} />
          </button>
          <button type="button" className={css.iconButton} onClick={onDelete} aria-label="Delete recipe">
            <Icon name="trash" className={css.icon} size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipesPreview;
