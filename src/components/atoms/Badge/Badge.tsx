import React from 'react';

import { BadgeProps } from './Badge.types';

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseClasses = 'px-2 py-1 rounded text-xs font-normal';

  const variantClasses = {
    default: 'bg-neutral-100 text-neutral-800',
    success: 'bg-status-success-bg text-status-success-text',
    warning: 'bg-status-warning-bg text-status-warning-text',
    danger: 'bg-status-error-bg text-status-error-text',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
