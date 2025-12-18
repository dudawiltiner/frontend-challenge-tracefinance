import React, { useRef } from 'react';

import { useInputMask, useInputRef } from './InputMask.hooks';
import { InputMaskProps } from './InputMask.types';

export const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      mask,
      className = '',
      value,
      onChange,
      onBlur,
      placeholder,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useInputRef(ref, inputRef);

    const normalizedValue: string | number | null | undefined =
      value === undefined || value === null
        ? null
        : Array.isArray(value)
          ? null
          : (value as string | number);

    const {
      displayValue,
      handleChange,
      handleCompositionStart,
      handleCompositionEnd,
    } = useInputMask({
      mask,
      value: normalizedValue,
      onChange,
      inputRef,
    });

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={inputRef}
          value={displayValue}
          onChange={handleChange}
          onBlur={onBlur}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder={placeholder}
          className={`w-full px-3 py-3 border border-border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500/50 font-sans font-normal text-sm leading-normal align-middle text-text-secondary placeholder:text-text-placeholder placeholder:font-normal bg-background-light ${
            error ? 'border-status-error-text focus:ring-status-error-text' : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-status-error-text">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-text-secondary">{helperText}</p>
        )}
      </div>
    );
  }
);

InputMask.displayName = 'InputMask';
