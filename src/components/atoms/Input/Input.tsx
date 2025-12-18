import React from 'react';

import { InputProps } from './Input.types';

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  required,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-1">
          {label}
          {required && <span className="text-status-error-text ml-1">*</span>}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 border rounded-lg bg-background-light text-text-primary focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500/50 ${
          error
            ? 'border-status-error-text focus:ring-status-error-text'
            : 'border-border-input focus:border-primary-500/50'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-status-error-text">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
};
