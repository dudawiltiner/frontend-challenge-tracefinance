import React from 'react';

import { formatCurrency } from '@utils/functions/formatCurrency';
import { formatTransactionDate } from '@utils/functions/formatDate';

import { Transaction, TransactionStatus } from '@transaction-types/transaction';

export const getStatusBadgeVariant = (
  status: TransactionStatus
): 'success' | 'warning' | 'danger' | 'default' => {
  switch (status) {
    case TransactionStatus.COMPLETED:
      return 'success';
    case TransactionStatus.PENDING:
      return 'warning';
    case TransactionStatus.FAILED:
      return 'danger';
    default:
      return 'default';
  }
};

export const formatAmountCell = (
  transaction: Transaction,
  locale: string = 'pt-BR'
): {
  formatted: string;
  isNegative: boolean;
} => {
  const isNegative = transaction.amount < 0;
  const formatted = formatCurrency(
    Math.abs(transaction.amount),
    transaction.currency,
    locale
  );
  return { formatted, isNegative };
};

export const createTableColumns = (
  t: (key: string) => string,
  locale: string = 'pt-BR'
): Array<{
  key: string;
  label: string;
  render: (_: unknown, row: Transaction) => JSX.Element;
}> => {
  return [
    {
      key: 'id',
      label: t('table.id'),
      render: (_: unknown, row: Transaction) => (
        <span className="font-sans font-light text-sm leading-normal text-text-primary">
          {row.id}
        </span>
      ),
    },
    {
      key: 'description',
      label: t('table.description'),
      render: (_: unknown, row: Transaction) => (
        <span className="font-sans font-light text-sm leading-normal text-text-primary">
          {row.description || '-'}
        </span>
      ),
    },
    {
      key: 'type',
      label: t('table.method'),
      render: (_: unknown, row: Transaction) => (
        <span className="font-sans font-light text-sm leading-normal text-text-primary">
          {row.type}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: t('table.date'),
      render: (_: unknown, row: Transaction) => (
        <span className="font-sans font-light text-sm leading-normal text-text-primary">
          {formatTransactionDate(row.createdAt, locale)}
        </span>
      ),
    },
    {
      key: 'status',
      label: t('table.status'),
      render: (_: unknown, row: Transaction) => {
        return <span>{getStatusBadgeVariant(row.status)}</span>;
      },
    },
    {
      key: 'amount',
      label: t('table.amount'),
      render: (_: unknown, row: Transaction) => {
        const { formatted, isNegative } = formatAmountCell(row, locale);
        return (
          <span
            className={`font-sans font-light text-sm leading-normal ${
              isNegative ? 'text-status-error-text' : 'text-text-primary'
            }`}
          >
            {isNegative ? '-' : ''}
            {formatted}
          </span>
        );
      },
    },
  ];
};
