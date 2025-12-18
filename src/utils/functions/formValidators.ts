export const validators = {
  required: <T>(value: T | null | undefined): boolean => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  },

  minLength:
    (min: number) =>
    (value: string): boolean => {
      return value.trim().length >= min;
    },

  maxLength:
    (max: number) =>
    (value: string): boolean => {
      return value.trim().length <= max;
    },

  email: (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  cpf: (value: string): boolean => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.length === 11;
  },

  cnpj: (value: string): boolean => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.length === 14;
  },

  cpfOrCnpj: (value: string): boolean => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.length === 11 || cleaned.length === 14;
  },

  minValue:
    (min: number) =>
    (value: number | string): boolean => {
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      return numValue >= min;
    },
};
