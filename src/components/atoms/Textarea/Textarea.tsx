import React from 'react';

import { TextareaProps } from './Textarea.types';

export const Textarea: React.FC<TextareaProps> = ({
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
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`w-full font-sans font-normal text-sm leading-normal px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500/50 resize-none placeholder:font-normal text-text-secondary placeholder:text-text-placeholder bg-background-light ${
          error
            ? 'border-status-error-text focus:ring-status-error-text'
            : 'border-border-input focus:border-primary-500/50'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-status-error-text">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-text-secondary">{helperText}</p>
      )}
    </div>
  );
};
