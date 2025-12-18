import { formatCurrency } from '../formatCurrency';

describe('formatCurrency', () => {
  it('should format BRL currency correctly', () => {
    const result1 = formatCurrency(150000, 'BRL');
    expect(result1.replace(/\u00A0/g, ' ')).toBe('R$ 1.500,00');

    const result2 = formatCurrency(23000000, 'BRL');
    expect(result2.replace(/\u00A0/g, ' ')).toBe('R$ 230.000,00');

    const result3 = formatCurrency(100, 'BRL');
    expect(result3.replace(/\u00A0/g, ' ')).toBe('R$ 1,00');
  });

  it('should format USD currency correctly', () => {
    const result = formatCurrency(150000, 'USD', 'en-US');
    expect(result).toContain('$');
    expect(result).toContain('1,500');
  });

  it('should default to BRL when currency is not provided', () => {
    const result = formatCurrency(150000);
    expect(result.replace(/\u00A0/g, ' ')).toBe('R$ 1.500,00');
  });

  it('should use locale currency mapping when currency not provided', () => {
    const resultUS = formatCurrency(150000, '', 'en-US');
    expect(resultUS).toContain('$');

    const resultBR = formatCurrency(150000, '', 'pt-BR');
    expect(resultBR).toContain('R$');
  });

  it('should handle zero value', () => {
    const result = formatCurrency(0, 'BRL');
    expect(result.replace(/\u00A0/g, ' ')).toBe('R$ 0,00');
  });

  it('should handle negative values', () => {
    const result = formatCurrency(-150000, 'BRL');
    expect(result.replace(/\u00A0/g, ' ')).toBe('-R$ 1.500,00');
  });

  it('should handle large values', () => {
    const result = formatCurrency(99999999900, 'BRL');
    expect(result).toContain('999.999.999');
  });

  it('should handle small values', () => {
    const result = formatCurrency(1, 'BRL');
    expect(result.replace(/\u00A0/g, ' ')).toBe('R$ 0,01');
  });
});
