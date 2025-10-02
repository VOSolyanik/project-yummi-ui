import React from 'react';

import clsx from 'clsx';

import css from './CheckBox.module.css';

const CheckBox = ({ id, name, checked, onChange, label, className, disabled, error, ...rest }) => {
  return (
    <div className={clsx(css.checkboxContainer, className)}>
      <label className={clsx(css.label, disabled && css.disabled)} htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={css.input}
          {...rest}
        />
        <span className={clsx(css.checkbox, error && css.error)}></span>
        {label && <span className={css.labelText}>{label}</span>}
      </label>
    </div>
  );
};

export default CheckBox;
