import React from 'react';

import clsx from 'clsx';

import css from './Button.module.css';

import { Icon } from '../Icon/Icon';

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  className,
  size = 'medium',
  as: Component = 'button',
  ...rest
}) => {
  let iconOnly = false;

  try {
    // Throws if more than one child
    const child = React.Children.only(children);

    // Check if the child is Icon (including memo/forwardRef versions)
    const type = child.type;
    if (type === Icon || type?.type === Icon) {
      iconOnly = true;
    }
  } catch {
    // multiple children → leave iconOnly = false
  }

  return (
    <Component
      type={Component === 'button' ? type : undefined}
      className={clsx(
        css.btn,
        css[`btn-${variant}`],
        css[`btn-${size}`],
        iconOnly && css['btn-icon'],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Button;
