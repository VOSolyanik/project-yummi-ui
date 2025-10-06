import React from 'react';

import { Link } from 'react-router-dom';

import css from './RecipesPreview.module.css';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';

const RecipesPreview = ({ recipe, isOwner, onDelete }) => {
  const { id, title, description, thumbUrl } = recipe;

  return (
    <div className={css.card}>
      <img src={thumbUrl} alt={title} className={css.image} />

      <div className={css.section}>
        <h3 className={css.title}>{title}</h3>
        <p className={css.description}>{description}</p>
      </div>

      <div className={css.buttons} role="group" aria-label="Recipe actions">
        <Button
          as={Link}
          to={`/recipe/${id}`}
          variant="outline"
          size="medium"
          aria-label="Open recipe"
        >
          <Icon name="arrow-up-right" size={18} />
        </Button>
        {isOwner && <Button
          variant="outline"
          onClick={() => onDelete(id)}
          size="medium"
          aria-label="Delete recipe">
          <Icon name="trash" size={18} />
        </Button>}
      </div>
    </div>
  );
};

export default RecipesPreview;
