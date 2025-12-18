import { validateCpfCnpj } from '../validateCpfCnpj';

describe('validateCpfCnpj', () => {
  it('should validate CPF correctly', () => {
    expect(validateCpfCnpj('12345678901')).toBe(true);
    expect(validateCpfCnpj('123.456.789-01')).toBe(true);
    expect(validateCpfCnpj('000.000.000-00')).toBe(true);
    expect(validateCpfCnpj('111.111.111-11')).toBe(true);
  });

  it('should validate CNPJ correctly', () => {
    expect(validateCpfCnpj('12345678000190')).toBe(true);
    expect(validateCpfCnpj('12.345.678/0001-90')).toBe(true);
    expect(validateCpfCnpj('00.000.000/0000-00')).toBe(true);
  });

  it('should return false for invalid lengths', () => {
    expect(validateCpfCnpj('123456789')).toBe(false);
    expect(validateCpfCnpj('123456789012345')).toBe(false);
    expect(validateCpfCnpj('123')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(validateCpfCnpj('')).toBe(false);
  });

  it('should handle strings with only special characters', () => {
    expect(validateCpfCnpj('...---')).toBe(false);
    expect(validateCpfCnpj('.../---')).toBe(false);
  });

  it('should handle mixed formatting', () => {
    expect(validateCpfCnpj('12345678901')).toBe(true);
    expect(validateCpfCnpj('12345678901234')).toBe(true);
    expect(validateCpfCnpj('123456789012')).toBe(false);
  });
});
