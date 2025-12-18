import { Currency, TransactionType } from '@transaction-types/transaction';

import { createActiveFilters } from '../filterHelpers.functions';

const mockT = (key: string) => {
  const translations: Record<string, string> = {
    'filters.dateRange': 'Período',
    'filters.method': 'Método',
    'filters.currency': 'Moeda',
    'currencies.brl': 'Real',
    'currencies.usd': 'Dólar',
    'currencies.eur': 'Euro',
  };
  return translations[key] || key;
};

describe('filterHelpers.functions', () => {
  describe('createActiveFilters', () => {
    it('should create empty filters array when no filters are active', () => {
      const filters = createActiveFilters(
        [],
        [],
        undefined,
        undefined,
        () => {},
        () => {},
        () => {},
        mockT,
        'pt-BR'
      );

      expect(filters).toEqual([]);
    });

    it('should create date filter when dates are provided', () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31');
      const onClearDate = jest.fn();

      const filters = createActiveFilters(
        [],
        [],
        startDate,
        endDate,
        () => {},
        () => {},
        onClearDate,
        mockT,
        'pt-BR'
      );

      expect(filters).toHaveLength(1);
      expect(filters[0].label).toContain('Período');
      expect(filters[0].onRemove).toBeDefined();

      filters[0].onRemove();
      expect(onClearDate).toHaveBeenCalled();
    });

    it('should create method filter when typeFilter is provided', () => {
      const onClearMethod = jest.fn();

      const filters = createActiveFilters(
        [TransactionType.PIX],
        [],
        undefined,
        undefined,
        onClearMethod,
        () => {},
        () => {},
        mockT,
        'pt-BR'
      );

      expect(filters).toHaveLength(1);
      expect(filters[0].label).toContain('Método');
      expect(filters[0].label).toContain('PIX');

      filters[0].onRemove();
      expect(onClearMethod).toHaveBeenCalled();
    });

    it('should create currency filter when currencyFilter is provided', () => {
      const onClearCurrency = jest.fn();

      const filters = createActiveFilters(
        [],
        [Currency.BRL, Currency.USD],
        undefined,
        undefined,
        () => {},
        onClearCurrency,
        () => {},
        mockT,
        'pt-BR'
      );

      expect(filters).toHaveLength(1);
      expect(filters[0].label).toContain('Moeda');
      expect(filters[0].label).toContain('Real');
      expect(filters[0].label).toContain('Dólar');

      filters[0].onRemove();
      expect(onClearCurrency).toHaveBeenCalled();
    });

    it('should create multiple filters when multiple filters are active', () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31');

      const filters = createActiveFilters(
        [TransactionType.PIX],
        [Currency.BRL],
        startDate,
        endDate,
        () => {},
        () => {},
        () => {},
        mockT,
        'pt-BR'
      );

      expect(filters.length).toBeGreaterThanOrEqual(2);
    });

    it('should format date range correctly', () => {
      const startDate = new Date('2024-01-15');
      const endDate = new Date('2024-01-20');

      const filters = createActiveFilters(
        [],
        [],
        startDate,
        endDate,
        () => {},
        () => {},
        () => {},
        mockT,
        'pt-BR'
      );

      expect(filters[0].label).toContain('Período');
    });

    it('should handle multiple transaction types', () => {
      const filters = createActiveFilters(
        [TransactionType.PIX, TransactionType.TED],
        [],
        undefined,
        undefined,
        () => {},
        () => {},
        () => {},
        mockT,
        'pt-BR'
      );

      expect(filters[0].label).toContain('PIX');
      expect(filters[0].label).toContain('TED');
    });

    it('should handle multiple currencies', () => {
      const filters = createActiveFilters(
        [],
        [Currency.BRL, Currency.USD, Currency.EUR],
        undefined,
        undefined,
        () => {},
        () => {},
        () => {},
        mockT,
        'pt-BR'
      );

      expect(filters[0].label).toContain('Real');
      expect(filters[0].label).toContain('Dólar');
      expect(filters[0].label).toContain('Euro');
    });
  });
});
