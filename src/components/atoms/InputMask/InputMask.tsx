import React, { useEffect, useRef } from 'react';
import { IMaskInput } from 'react-imask';

import { InputMaskProps } from './InputMask.types';

export const InputMaskComponent = React.forwardRef<
  HTMLInputElement,
  InputMaskProps
>(
  (
    {
      label,
      error,
      helperText,
      required,
      mask,
      maskChar,
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

    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(inputRef.current);
        } else {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current =
            inputRef.current;
        }
      }
    }, [ref]);

    const handleAccept = (value: string) => {
      if (onChange) {
        const event = {
          target: { value },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const convertMaskToIMask = (maskStr: string) => {
      const pattern: Array<string | RegExp> = [];
      for (let i = 0; i < maskStr.length; i++) {
        const char = maskStr[i];
        if (char === '9') {
          pattern.push(/\d/);
        } else if (char === 'a') {
          pattern.push(/[A-Za-z]/);
        } else {
          pattern.push(char);
        }
      }
      return pattern;
    };

    const maskPattern =
      typeof mask === 'string' ? convertMaskToIMask(mask) : mask;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <IMaskInput
          mask={maskPattern}
          value={typeof value === 'string' ? value : ''}
          onAccept={handleAccept}
          onBlur={onBlur}
          inputRef={inputRef}
          placeholder={placeholder}
          unmask={false}
          {...(maskChar !== undefined && { maskChar })}
          {...props}
          className={`w-full px-3 py-3 border border-border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500/50 font-sans font-normal text-sm leading-normal align-middle text-text-secondary placeholder:text-text-placeholder placeholder:font-normal bg-background-light ${
            error ? 'border-status-error-text focus:ring-status-error-text' : ''
          } ${className}`}
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

InputMaskComponent.displayName = 'InputMask';
