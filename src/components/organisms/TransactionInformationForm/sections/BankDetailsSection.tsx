'use client';

import { Controller, UseFormReturn } from 'react-hook-form';

import {
  PixStep2FormData,
  TedStep2FormData,
} from '@hooks/transactions/useTransactionForm.hook';

import { TransactionType } from '@transaction-types/transaction';

const BASE_INPUT_CLASSES =
  'w-full px-3 py-3 border border-border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-sans font-normal text-sm leading-normal align-middle text-text-secondary bg-background-light';
const BASE_INPUT_WITH_PLACEHOLDER_CLASSES = `${BASE_INPUT_CLASSES} placeholder:text-text-placeholder placeholder:font-normal`;
const ERROR_INPUT_CLASSES =
  'border-status-error-text focus:ring-status-error-text';
const ERROR_MESSAGE_CLASSES = 'mt-1 text-sm text-status-error-text';

interface BankDetailsSectionProps {
  transactionType: TransactionType;
  pixStep2Form: UseFormReturn<PixStep2FormData>;
  tedStep2Form: UseFormReturn<TedStep2FormData>;
  pixKeyTypeOptions: Array<{ value: string; label: string }>;
  accountTypeOptions: Array<{ value: string; label: string }>;
  t: (key: string) => string;
}

export const BankDetailsSection = ({
  transactionType,
  pixStep2Form,
  tedStep2Form,
  pixKeyTypeOptions,
  accountTypeOptions,
  t,
}: BankDetailsSectionProps) => {
  return (
    <div>
      <h3 className="font-sans font-medium text-sm leading-normal text-text-primary mb-4">
        {t('step2.bankDetails')}
      </h3>
      <div className="space-y-4">
        {transactionType === TransactionType.PIX ? (
          <>
            <Controller
              name="keyType"
              control={pixStep2Form.control}
              render={({ field, fieldState }) => (
                <div className="w-full">
                  <select
                    {...field}
                    className={`${BASE_INPUT_CLASSES} ${
                      fieldState.error ? ERROR_INPUT_CLASSES : ''
                    }`}
                  >
                    <option value="" disabled>
                      {t('fields.pixKeyType')}*
                    </option>
                    {pixKeyTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {fieldState.error && (
                    <p className={ERROR_MESSAGE_CLASSES}>
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="pixKey"
              control={pixStep2Form.control}
              render={({ field, fieldState }) => (
                <div className="w-full">
                  <input
                    {...field}
                    type="text"
                    placeholder={`${t('fields.pixKey')} *`}
                    className={`${BASE_INPUT_WITH_PLACEHOLDER_CLASSES} ${
                      fieldState.error ? ERROR_INPUT_CLASSES : ''
                    }`}
                  />
                  {fieldState.error && (
                    <p className={ERROR_MESSAGE_CLASSES}>
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </>
        ) : (
          <>
            <Controller
              name="accountType"
              control={tedStep2Form.control}
              render={({ field, fieldState }) => (
                <div className="w-full">
                  <select
                    {...field}
                    className={`${BASE_INPUT_CLASSES} ${
                      fieldState.error ? ERROR_INPUT_CLASSES : ''
                    }`}
                  >
                    <option value="" disabled>
                      {t('fields.accountType')}*
                    </option>
                    {accountTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {fieldState.error && (
                    <p className={ERROR_MESSAGE_CLASSES}>
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="bank"
              control={tedStep2Form.control}
              render={({ field, fieldState }) => (
                <div className="w-full">
                  <input
                    {...field}
                    type="text"
                    placeholder={`${t('fields.bankCode')} *`}
                    className={`${BASE_INPUT_WITH_PLACEHOLDER_CLASSES} ${
                      fieldState.error ? ERROR_INPUT_CLASSES : ''
                    }`}
                  />
                  {fieldState.error && (
                    <p className={ERROR_MESSAGE_CLASSES}>
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="account"
              control={tedStep2Form.control}
              render={({ field, fieldState }) => (
                <div className="w-full">
                  <input
                    {...field}
                    type="text"
                    placeholder={`${t('fields.accountNumber')} *`}
                    className={`${BASE_INPUT_WITH_PLACEHOLDER_CLASSES} ${
                      fieldState.error ? ERROR_INPUT_CLASSES : ''
                    }`}
                  />
                  {fieldState.error && (
                    <p className={ERROR_MESSAGE_CLASSES}>
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="agency"
              control={tedStep2Form.control}
              render={({ field, fieldState }) => (
                <div className="w-full">
                  <input
                    {...field}
                    type="text"
                    placeholder={`${t('fields.branch')} *`}
                    className={`${BASE_INPUT_WITH_PLACEHOLDER_CLASSES} ${
                      fieldState.error ? ERROR_INPUT_CLASSES : ''
                    }`}
                  />
                  {fieldState.error && (
                    <p className={ERROR_MESSAGE_CLASSES}>
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};
