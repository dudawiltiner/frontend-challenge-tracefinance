'use client';

import { useTranslations } from 'next-intl';

import { X } from 'lucide-react';

import { TransactionInformationFormProps } from './TransactionInformationForm.types';
import { ACCOUNT_TYPE_OPTIONS, PIX_KEY_TYPE_OPTIONS } from './constants';
import { BankDetailsSection } from './sections/BankDetailsSection';
import { DescriptionSection } from './sections/DescriptionSection';
import { FormActions } from './sections/FormActions';
import { TransactionInfoSection } from './sections/TransactionInfoSection';

export const TransactionInformationForm = ({
  transactionType,
  step1Form,
  pixStep2Form,
  tedStep2Form,
  isFormValid,
  isLoading,
  error,
  errorMessage,
  validationErrors = [],
  onSubmit,
  onBack,
  onClose,
}: TransactionInformationFormProps) => {
  const t = useTranslations('transactions.createTransaction');

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-10 text-neutral-400 hover:text-neutral-600 transition-colors"
      >
        <X className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <div className="flex-1 flex flex-col overflow-y-auto mt-8 md:mt-16">
        <div className="flex flex-col items-center pt-8 md:pt-16 p-4 md:p-8">
          <div className="w-full max-w-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="flex flex-col"
            >
              <div className="text-left mb-6 md:mb-8">
                <h2 className="font-sans font-bold text-2xl md:text-3xl leading-normal align-bottom text-text-primary">
                  {t('step2.title')}
                </h2>
              </div>

              <div className="space-y-8">
                <TransactionInfoSection step1Form={step1Form} t={t} />

                <BankDetailsSection
                  transactionType={transactionType}
                  pixStep2Form={pixStep2Form}
                  tedStep2Form={tedStep2Form}
                  pixKeyTypeOptions={PIX_KEY_TYPE_OPTIONS}
                  accountTypeOptions={ACCOUNT_TYPE_OPTIONS}
                  t={t}
                />

                <DescriptionSection
                  transactionType={transactionType}
                  pixStep2Form={pixStep2Form}
                  tedStep2Form={tedStep2Form}
                  t={t}
                />
              </div>

              {(error || errorMessage || validationErrors.length > 0) && (
                <div className="mt-4 p-4 bg-[var(--color-status-error-bg)] dark:bg-[var(--color-status-error-bg)] border border-[var(--color-status-error-text)] dark:border-[var(--color-status-error-text)] rounded-lg">
                  {validationErrors.length > 0 ? (
                    <>
                      <p className="font-sans font-semibold text-sm leading-normal text-[var(--color-status-error-text)] dark:text-[var(--color-status-error-text)] mb-2">
                        {errorMessage || t('error.title')}
                      </p>
                      <ul className="list-disc list-inside space-y-1.5">
                        {validationErrors.map((err, index) => (
                          <li
                            key={index}
                            className="font-sans font-normal text-sm leading-normal text-[var(--color-status-error-text)] dark:text-[var(--color-status-error-text)]"
                          >
                            <span className="font-semibold capitalize">
                              {err.field}:
                            </span>{' '}
                            {err.message}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="font-sans font-normal text-sm leading-normal text-[var(--color-status-error-text)] dark:text-[var(--color-status-error-text)]">
                      {errorMessage || t('error.message')}
                    </p>
                  )}
                </div>
              )}

              <FormActions
                isFormValid={isFormValid}
                isLoading={isLoading}
                onBack={onBack}
                t={t}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
