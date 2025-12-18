import { formatMonthYear, formatTransactionDate } from '../formatDate';

describe('formatTransactionDate', () => {
  const testDate = '2024-01-15T10:30:00Z';

  it('should format date for pt-BR locale', () => {
    const result = formatTransactionDate(testDate, 'pt-BR');
    expect(result).toContain('15');
    expect(result.toLowerCase()).toContain('jan');
    expect(result).not.toContain('.');
    expect(result).toMatch(/\d{1,2}/);
  });

  it('should format date for en-US locale', () => {
    const result = formatTransactionDate(testDate, 'en-US');
    expect(result).toContain('Jan');
    expect(result).toMatch(/AM|PM/);
  });

  it('should handle invalid date string', () => {
    const result = formatTransactionDate('invalid-date', 'pt-BR');
    expect(result).toBe('invalid-date');
  });

  it('should default to pt-BR locale', () => {
    const result = formatTransactionDate(testDate);
    expect(result).not.toContain('.');
  });

  it('should format different dates correctly', () => {
    const date1 = '2024-12-25T12:00:00Z';
    const result1 = formatTransactionDate(date1, 'pt-BR');
    expect(result1).toContain('25');
    expect(result1.toLowerCase()).toContain('dez');

    const date2 = '2024-06-15T12:00:00Z';
    const result2 = formatTransactionDate(date2, 'pt-BR');
    expect(result2).toContain('15');
    expect(result2.toLowerCase()).toMatch(/jun|mai/);
  });
});

describe('formatMonthYear', () => {
  const testDate = new Date('2024-01-15T10:30:00Z');

  it('should format month and year for pt-BR locale', () => {
    const result = formatMonthYear(testDate, 'pt-BR');
    expect(result.toLowerCase()).toContain('jan');
    expect(result).toContain('2024');
  });

  it('should format month and year for en-US locale', () => {
    const result = formatMonthYear(testDate, 'en-US');
    expect(result).toContain('Jan');
    expect(result).toContain('2024');
  });

  it('should default to pt-BR locale', () => {
    const result = formatMonthYear(testDate);
    expect(result.toLowerCase()).toContain('jan');
    expect(result).toContain('2024');
  });

  it('should format different months correctly', () => {
    const date1 = new Date('2024-12-15');
    const result1 = formatMonthYear(date1, 'pt-BR');
    expect(result1.toLowerCase()).toContain('dez');
    expect(result1).toContain('2024');

    const date2 = new Date('2024-06-15');
    const result2 = formatMonthYear(date2, 'pt-BR');
    expect(result2.toLowerCase()).toMatch(/jun|mai/);
    expect(result2).toContain('2024');
  });
});
