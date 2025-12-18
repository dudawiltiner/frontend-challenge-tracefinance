import { validators } from '../formValidators';

describe('validators', () => {
  describe('required', () => {
    it('should return true for non-empty string', () => {
      expect(validators.required('test')).toBe(true);
      expect(validators.required('  test  ')).toBe(true);
    });

    it('should return false for empty string', () => {
      expect(validators.required('')).toBe(false);
      expect(validators.required('   ')).toBe(false);
    });

    it('should return true for non-null values', () => {
      expect(validators.required(0)).toBe(true);
      expect(validators.required(false)).toBe(true);
      expect(validators.required([])).toBe(true);
    });

    it('should return false for null or undefined', () => {
      expect(validators.required(null)).toBe(false);
      expect(validators.required(undefined)).toBe(false);
    });
  });

  describe('minLength', () => {
    const MIN_LENGTH_5 = 5;
    const HELLO_STRING = 'hello';
    const HELLO_WORLD_STRING = 'hello world';
    it('should return true when string length meets minimum', () => {
      const validator = validators.minLength(MIN_LENGTH_5);
      expect(validator(HELLO_STRING)).toBe(true);
      expect(validator(HELLO_WORLD_STRING)).toBe(true);
    });

    it('should return false when string length is below minimum', () => {
      const validator = validators.minLength(MIN_LENGTH_5);
      expect(validator('hi')).toBe(false);
      expect(validator('test')).toBe(false);
    });

    it('should handle whitespace correctly', () => {
      const validator = validators.minLength(MIN_LENGTH_5);
      expect(validator(`  ${HELLO_STRING}  `)).toBe(true);
      expect(validator('  hi  ')).toBe(false);
    });
  });

  describe('maxLength', () => {
    const MAX_LENGTH_5 = 5;
    const HELLO_STRING = 'hello';
    const HELLO_WORLD_STRING = 'hello world';
    it('should return true when string length is within maximum', () => {
      const validator = validators.maxLength(MAX_LENGTH_5);
      expect(validator(HELLO_STRING)).toBe(true);
      expect(validator('hi')).toBe(true);
    });

    it('should return false when string length exceeds maximum', () => {
      const validator = validators.maxLength(MAX_LENGTH_5);
      expect(validator(HELLO_WORLD_STRING)).toBe(false);
    });

    it('should handle whitespace correctly', () => {
      const validator = validators.maxLength(MAX_LENGTH_5);
      expect(validator('  hi  ')).toBe(true);
      expect(validator(`  ${HELLO_WORLD_STRING}  `)).toBe(false);
    });
  });

  describe('email', () => {
    it('should return true for valid email addresses', () => {
      expect(validators.email('test@example.com')).toBe(true);
      expect(validators.email('user.name@domain.co.uk')).toBe(true);
      expect(validators.email('user+tag@example.com')).toBe(true);
    });

    it('should return false for invalid email addresses', () => {
      expect(validators.email('invalid')).toBe(false);
      expect(validators.email('invalid@')).toBe(false);
      expect(validators.email('@example.com')).toBe(false);
      expect(validators.email('test@')).toBe(false);
      expect(validators.email('test.example.com')).toBe(false);
    });
  });

  describe('cpf', () => {
    it('should return true for valid CPF length', () => {
      expect(validators.cpf('12345678901')).toBe(true);
      expect(validators.cpf('123.456.789-01')).toBe(true);
    });

    it('should return false for invalid CPF length', () => {
      expect(validators.cpf('123456789')).toBe(false);
      expect(validators.cpf('123456789012')).toBe(false);
    });
  });

  describe('cnpj', () => {
    it('should return true for valid CNPJ length', () => {
      expect(validators.cnpj('12345678000190')).toBe(true);
      expect(validators.cnpj('12.345.678/0001-90')).toBe(true);
    });

    it('should return false for invalid CNPJ length', () => {
      expect(validators.cnpj('1234567890123')).toBe(false);
      expect(validators.cnpj('123456789012345')).toBe(false);
    });
  });

  describe('cpfOrCnpj', () => {
    it('should return true for valid CPF', () => {
      expect(validators.cpfOrCnpj('12345678901')).toBe(true);
      expect(validators.cpfOrCnpj('123.456.789-01')).toBe(true);
    });

    it('should return true for valid CNPJ', () => {
      expect(validators.cpfOrCnpj('12345678000190')).toBe(true);
      expect(validators.cpfOrCnpj('12.345.678/0001-90')).toBe(true);
    });

    it('should return false for invalid lengths', () => {
      expect(validators.cpfOrCnpj('123456789')).toBe(false);
      expect(validators.cpfOrCnpj('123456789012345')).toBe(false);
    });
  });

  describe('minValue', () => {
    it('should return true when value meets minimum', () => {
      const validator = validators.minValue(10);
      expect(validator(10)).toBe(true);
      expect(validator(15)).toBe(true);
      expect(validator('10')).toBe(true);
      expect(validator('15')).toBe(true);
    });

    it('should return false when value is below minimum', () => {
      const validator = validators.minValue(10);
      expect(validator(5)).toBe(false);
      expect(validator('5')).toBe(false);
    });

    it('should handle edge cases', () => {
      const validator = validators.minValue(0);
      expect(validator(0)).toBe(true);
      expect(validator(-1)).toBe(false);
    });
  });
});
