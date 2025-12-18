import { formatMonthYear } from '@utils/functions/formatDate';

import { Currency, TransactionType } from '@transaction-types/transaction';

export interface ActiveFilter {
  label: string;
  onRemove: () => void;
}

export const createActiveFilters = (
  typeFilter: TransactionType[],
  currencyFilter: Currency[],
  startDate: Date | undefined,
  endDate: Date | undefined,
  onRemoveTypeFilter: () => void,
  onRemoveCurrencyFilter: () => void,
  onRemoveDateFilter: () => void,
  t: (key: string) => string,
  locale: string = 'pt-BR'
): ActiveFilter[] => {
  const filters: ActiveFilter[] = [];

  if (typeFilter.length > 0) {
    filters.push({
      label: `${t('filters.method')}: ${typeFilter.join(', ')}`,
      onRemove: onRemoveTypeFilter,
    });
  }

  if (currencyFilter.length > 0) {
    const currencyLabels = currencyFilter.map((c) =>
      t(`currencies.${c.toLowerCase()}`)
    );
    filters.push({
      label: `${t('filters.currency')}: ${currencyLabels.join(', ')}`,
      onRemove: onRemoveCurrencyFilter,
    });
  }

  if (startDate || endDate) {
    const startLabel = startDate ? formatMonthYear(startDate, locale) : '...';
    const endLabel = endDate ? formatMonthYear(endDate, locale) : '...';
    filters.push({
      label: `${t('filters.dateRange')}: ${startLabel} - ${endLabel}`,
      onRemove: onRemoveDateFilter,
    });
  }

  return filters;
};
