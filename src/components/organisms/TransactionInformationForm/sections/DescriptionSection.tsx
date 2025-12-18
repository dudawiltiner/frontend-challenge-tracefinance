'use client';

import { Controller, UseFormReturn } from 'react-hook-form';

import { Textarea } from '@atoms/Textarea';

import {
  PixStep2FormData,
  TedStep2FormData,
} from '@hooks/transactions/useTransactionForm.hook';

import { TransactionType } from '@transaction-types/transaction';

interface DescriptionSectionProps {
  transactionType: TransactionType;
  pixStep2Form: UseFormReturn<PixStep2FormData>;
  tedStep2Form: UseFormReturn<TedStep2FormData>;
  t: (key: string) => string;
}

export const DescriptionSection = ({
  transactionType,
  pixStep2Form,
  tedStep2Form,
  t,
}: DescriptionSectionProps) => {
  return (
    <div>
      <h3 className="font-sans font-medium text-sm leading-normal text-text-primary mb-2">
        {t('step2.description')}
      </h3>
      <p className="font-sans font-normal text-sm leading-normal text-text-secondary mb-4">
        {t('step2.descriptionHint')}
      </p>
      {transactionType === TransactionType.PIX ? (
        <Controller
          name="description"
          control={pixStep2Form.control}
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder={t('fields.description')}
              rows={4}
            />
          )}
        />
      ) : (
        <Controller
          name="description"
          control={tedStep2Form.control}
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder={t('fields.description')}
              rows={4}
            />
          )}
        />
      )}
    </div>
  );
};
