import { useMemo } from 'react';

export interface ValidationRule<T> {
  validate: (value: T) => boolean;
  message: string;
}

export interface UseFormValidationOptions<T> {
  rules: Record<keyof T, ValidationRule<T[keyof T]>[]>;
}

export const useFormValidation = <T extends Record<string, unknown>>(
  values: T,
  options: UseFormValidationOptions<T>
) => {
  const errors = useMemo(() => {
    const validationErrors: Partial<Record<keyof T, string>> = {};

    Object.keys(options.rules).forEach((key) => {
      const fieldKey = key as keyof T;
      const fieldRules = options.rules[fieldKey];
      const fieldValue = values[fieldKey];

      for (const rule of fieldRules) {
        if (!rule.validate(fieldValue)) {
          validationErrors[fieldKey] = rule.message;
          break;
        }
      }
    });

    return validationErrors;
  }, [values, options.rules]);

  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  return {
    errors,
    isValid,
  };
};
