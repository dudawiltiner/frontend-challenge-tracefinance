'use client';

import React from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { Badge } from '@atoms/Badge';

import { formatCurrency } from '@utils/functions/formatCurrency';
import { formatTransactionDate } from '@utils/functions/formatDate';
import { getStatusBadgeVariant } from '@utils/transactions';

import { Transaction } from '@transaction-types/transaction';

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
}) => {
  const t = useTranslations('transactions');
  const locale = useLocale();

  const formattedAmount = formatCurrency(
    Math.abs(transaction.amount),
    transaction.currency,
    locale
  );
  const formattedDate = formatTransactionDate(transaction.createdAt, locale);
  const isNegative = transaction.amount < 0;

  return (
    <div className="bg-background-light dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-sans font-medium text-sm leading-normal text-text-primary">
              {transaction.id}
            </span>
            <Badge variant={getStatusBadgeVariant(transaction.status)}>
              {t(`status.${transaction.status.toLowerCase()}`)}
            </Badge>
          </div>
          {transaction.description && (
            <p className="font-sans font-light text-sm leading-normal text-text-secondary mb-2">
              {transaction.description}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-sans font-light text-xs leading-normal text-text-tertiary">
            {t('table.method')}
          </span>
          <span className="font-sans font-light text-sm leading-normal text-text-primary">
            {transaction.type}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-sans font-light text-xs leading-normal text-text-tertiary">
            {t('table.amount')}
          </span>
          <span
            className={`font-sans font-light text-sm leading-normal ${
              isNegative ? 'text-status-error-text' : 'text-text-primary'
            }`}
          >
            {isNegative ? '-' : ''}
            {formattedAmount}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-sans font-light text-xs leading-normal text-text-tertiary">
            {t('table.date')}
          </span>
          <span className="font-sans font-light text-sm leading-normal text-text-primary">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
};
