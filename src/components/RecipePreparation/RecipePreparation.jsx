import React from 'react';

import css from './RecipePreparation.module.css';

const RecipePreparation = ({ instructions }) => {
  
  // Split instructions by common newline characters and filter out empty lines
  const steps = instructions.split(/\r\n|\n/).filter(step => step.trim() !== '');

  return (
    <div className={css.preparationSection}>
      <h2 className={css.title}>Recipe Preparation</h2>
      <div className={css.steps}>
        {steps.map((step, index) => (
          <p key={index} className={css.step}>{step}</p>
        ))}
      </div>
    </div>
  );
};

export default RecipePreparation;