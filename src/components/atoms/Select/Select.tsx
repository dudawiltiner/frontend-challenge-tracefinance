import React from 'react';

import { SelectProps } from './Select.types';

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  required,
  options,
  placeholder,
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
      <select
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500/50 appearance-none bg-background-light ${
          error
            ? 'border-status-error-text focus:ring-status-error-text'
            : 'border-border-input focus:border-primary-500/50'
        } ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled className="text-text-placeholder">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-status-error-text">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
};
