import { maskCurrency, unmaskCurrency } from '../maskCurrency';

describe('maskCurrency', () => {
  it('should format currency value correctly', () => {
    expect(maskCurrency('100000')).toBe('1.000,00');
    expect(maskCurrency('150000')).toBe('1.500,00');
    expect(maskCurrency('100')).toBe('1,00');
  });

  it('should handle values with formatting', () => {
    expect(maskCurrency('1.000,00')).toBe('1.000,00');
    expect(maskCurrency('R$ 1.500,00')).toBe('1.500,00');
  });

  it('should handle empty string', () => {
    expect(maskCurrency('')).toBe('0,00');
  });

  it('should handle non-numeric strings', () => {
    expect(maskCurrency('abc')).toBe('0,00');
  });

  it('should handle zero', () => {
    expect(maskCurrency('0')).toBe('0,00');
  });

  it('should handle large values', () => {
    expect(maskCurrency('999999999')).toBe('9.999.999,99');
  });
});

describe('unmaskCurrency', () => {
  it('should remove formatting and return number', () => {
    expect(unmaskCurrency('1.000,00')).toBe(100000);
    expect(unmaskCurrency('1.500,00')).toBe(150000);
    expect(unmaskCurrency('100,00')).toBe(10000);
  });

  it('should handle values without formatting', () => {
    expect(unmaskCurrency('100000')).toBe(100000);
    expect(unmaskCurrency('150000')).toBe(150000);
  });

  it('should handle values with currency symbols', () => {
    expect(unmaskCurrency('R$ 1.500,00')).toBe(150000);
    expect(unmaskCurrency('$1,500.00')).toBe(150000);
  });

  it('should handle empty string', () => {
    expect(unmaskCurrency('')).toBe(0);
  });

  it('should handle non-numeric strings', () => {
    expect(unmaskCurrency('abc')).toBe(0);
  });

  it('should handle zero', () => {
    expect(unmaskCurrency('0')).toBe(0);
    expect(unmaskCurrency('0,00')).toBe(0);
  });

  it('should handle large values', () => {
    expect(unmaskCurrency('9.999.999,99')).toBe(999999999);
  });
});
