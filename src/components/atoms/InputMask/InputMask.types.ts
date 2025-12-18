import React from 'react';

export interface InputMaskProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'mask'
> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  mask: string | Array<string | RegExp> | 'currency';
  maskChar?: string | null;
}
