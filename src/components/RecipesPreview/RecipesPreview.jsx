import React from 'react';

import css from './RecipesPreview.module.css';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';

const RecipesPreview = ({ title, description, image, onOpen, onDelete }) => {
  return (
    <div className={css.card}>
      <img src={image} alt={title} className={css.image} />

      <div className={css.section}>
        <div className={css.text}>
          <h3 className={css.title}>{title}</h3>
          <p className={css.description}>{description}</p>
        </div>

        <div className={css.buttons} role="group" aria-label="Recipe actions">
          <Button
            variant="outline"
            size="medium"
            onClick={onOpen}
            aria-label="Open recipe"
          >
            <Icon name="arrow-up-right" size={18} />
          </Button>
          <Button
            variant="outline"
            onClick={onDelete}
            size="medium"
            aria-label="Delete recipe">
            <Icon name="trash" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipesPreview;
