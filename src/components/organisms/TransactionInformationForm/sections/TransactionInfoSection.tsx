'use client';

import { Controller, UseFormReturn } from 'react-hook-form';

import { InputMask } from '@atoms/InputMask';
import { maskCurrency } from '@utils/functions/maskCurrency';

import { Step1FormData } from '@hooks/transactions/useTransactionForm.hook';

interface TransactionInfoSectionProps {
  step1Form: UseFormReturn<Step1FormData>;
  t: (key: string) => string;
}

export const TransactionInfoSection = ({
  step1Form,
  t,
}: TransactionInfoSectionProps) => {
  return (
    <div>
      <h3 className="font-sans font-medium text-sm leading-normal text-text-primary mb-4">
        {t('step2.transactionInfo')}
      </h3>
      <div className="space-y-4">
        <Controller
          name="amount"
          control={step1Form.control}
          render={({ field, fieldState }) => {
            // Formata o valor para exibição usando a função maskCurrency
            // O valor no form é armazenado como string de números (ex: "100000" para R$ 1.000,00)
            const displayValue = field.value ? maskCurrency(String(field.value)) : '';
            
            return (
              <div className="w-full">
                <InputMask
                  mask="999.999.999,99"
                  maskChar={null}
                  placeholder={`${t('fields.amount')} *`}
                  required
                  error={fieldState.error?.message}
                  value={displayValue}
                  onChange={(e) => {
                    // Extrai apenas números do valor formatado
                    const cleaned = e.target.value.replace(/\D/g, '');
                    field.onChange(cleaned);
                  }}
                  onBlur={field.onBlur}
                />
              </div>
            );
          }}
        />

        <Controller
          name="cpfCnpj"
          control={step1Form.control}
          render={({ field, fieldState }) => {
            const fieldValue = field.value ?? '';
            const cleaned = fieldValue.replace(/\D/g, '');
            const mask =
              cleaned.length <= 11 ? '999.999.999-99' : '99.999.999/9999-99';
            return (
              <div className="w-full">
                <InputMask
                  mask={mask}
                  maskChar={null}
                  placeholder={`${t('fields.taxId')} *`}
                  required
                  error={fieldState.error?.message}
                  value={fieldValue}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  onBlur={field.onBlur}
                />
              </div>
            );
          }}
        />

        <Controller
          name="legalName"
          control={step1Form.control}
          render={({ field, fieldState }) => (
            <div className="w-full">
              <input
                {...field}
                type="text"
                placeholder={`${t('fields.legalName')} *`}
                className={`w-full px-3 py-3 border border-border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-sans font-normal text-sm leading-normal align-middle text-text-secondary placeholder:text-text-placeholder placeholder:font-normal bg-background-light ${
                  fieldState.error
                    ? 'border-status-error-text focus:ring-status-error-text'
                    : ''
                }`}
              />
              {fieldState.error && (
                <p className="mt-1 text-sm text-status-error-text">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};
