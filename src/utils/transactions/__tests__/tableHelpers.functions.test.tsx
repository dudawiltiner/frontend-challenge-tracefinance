import {
  Currency,
  Transaction,
  TransactionStatus,
  TransactionType,
} from '@transaction-types/transaction';

import {
  formatAmountCell,
  getStatusBadgeVariant,
} from '../tableHelpers.functions';

const createMockTransaction = (
  overrides?: Partial<Transaction>
): Transaction => ({
  id: '1',
  type: TransactionType.PIX,
  amount: 100000,
  currency: Currency.BRL,
  status: TransactionStatus.COMPLETED,
  createdAt: '2024-01-15T10:30:00Z',
  cpfCnpj: '12345678900',
  ...overrides,
});

describe('tableHelpers.functions', () => {
  describe('getStatusBadgeVariant', () => {
    it('should return success for COMPLETED status', () => {
      expect(getStatusBadgeVariant(TransactionStatus.COMPLETED)).toBe(
        'success'
      );
    });

    it('should return warning for PENDING status', () => {
      expect(getStatusBadgeVariant(TransactionStatus.PENDING)).toBe('warning');
    });

    it('should return danger for FAILED status', () => {
      expect(getStatusBadgeVariant(TransactionStatus.FAILED)).toBe('danger');
    });
  });

  describe('formatAmountCell', () => {
    it('should format positive amount correctly for BRL', () => {
      const transaction = createMockTransaction({
        amount: 150000,
        currency: Currency.BRL,
      });

      const result = formatAmountCell(transaction, 'pt-BR');

      expect(result.formatted).toContain('R$');
      expect(result.formatted).toContain('1.500');
      expect(result.isNegative).toBe(false);
    });

    it('should format negative amount correctly', () => {
      const transaction = createMockTransaction({
        amount: -150000,
        currency: Currency.BRL,
      });

      const result = formatAmountCell(transaction, 'pt-BR');

      expect(result.formatted).toContain('R$');
      expect(result.formatted).toContain('1.500');
      expect(result.isNegative).toBe(true);
    });

    it('should format USD currency correctly', () => {
      const transaction = createMockTransaction({
        amount: 150000,
        currency: Currency.USD,
      });

      const result = formatAmountCell(transaction, 'en-US');

      expect(result.formatted).toContain('$');
      expect(result.isNegative).toBe(false);
    });

    it('should format EUR currency correctly', () => {
      const transaction = createMockTransaction({
        amount: 150000,
        currency: Currency.EUR,
      });

      const result = formatAmountCell(transaction, 'en-US');

      expect(result.formatted).toContain('€');
      expect(result.isNegative).toBe(false);
    });

    it('should handle zero amount', () => {
      const transaction = createMockTransaction({
        amount: 0,
        currency: Currency.BRL,
      });

      const result = formatAmountCell(transaction, 'pt-BR');

      expect(result.formatted).toContain('0');
      expect(result.isNegative).toBe(false);
    });

    it('should handle large amounts', () => {
      const transaction = createMockTransaction({
        amount: 99999999900,
        currency: Currency.BRL,
      });

      const result = formatAmountCell(transaction, 'pt-BR');

      expect(result.formatted).toContain('999');
      expect(result.isNegative).toBe(false);
    });

    it('should handle small amounts', () => {
      const transaction = createMockTransaction({
        amount: 1,
        currency: Currency.BRL,
      });

      const result = formatAmountCell(transaction, 'pt-BR');

      expect(result.formatted).toContain('0,01');
      expect(result.isNegative).toBe(false);
    });

    it('should default to pt-BR locale', () => {
      const transaction = createMockTransaction({
        amount: 150000,
        currency: Currency.BRL,
      });

      const result = formatAmountCell(transaction);

      expect(result.formatted).toContain('R$');
    });
  });
});
