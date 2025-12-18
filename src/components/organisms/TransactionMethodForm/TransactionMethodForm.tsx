'use client';

import { UseFormReturn } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { useNavigation } from '@hooks/navigation';

import { TransactionType } from '@transaction-types/transaction';
import { X } from 'lucide-react';

interface TransactionMethodFormProps {
  form: UseFormReturn<{ type: TransactionType }>;
  onSubmit: (type: TransactionType) => void;
}

export const TransactionMethodForm = ({
  form,
  onSubmit,
}: TransactionMethodFormProps) => {
  const t = useTranslations('transactions.createTransaction');
  const { navigateToTransactions } = useNavigation();

  const handleSubmit = (data: { type: TransactionType }) => {
    onSubmit(data.type);
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      <button
        onClick={navigateToTransactions}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-10 text-neutral-400 hover:text-neutral-600 transition-colors"
      >
        <X className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <div className="flex-1 flex flex-col overflow-y-auto mt-8 md:mt-16">
        <div className="flex flex-col items-center pt-8 md:pt-16 p-4 md:p-8">
          <div className="w-full max-w-2xl">
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col"
            >
              <div className="text-left mb-6 md:mb-8">
                <h2 className="font-sans font-bold text-2xl md:text-3xl leading-normal align-bottom text-text-primary">
                  {t('step1.title')}
                </h2>
              </div>

              <div className="space-y-4 mb-12">
                <label className="flex items-center p-8 rounded-lg cursor-pointer bg-background-light hover:bg-neutral-100 transition-colors w-full">
                  <input
                    type="radio"
                    {...form.register('type')}
                    value={TransactionType.TED}
                    className="mr-3 w-5 h-5 appearance-none border-2 border-border-input rounded-full cursor-pointer checked:bg-primary-500 checked:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0"
                  />
                  <span className="font-sans font-medium text-lg leading-normal align-middle text-text-primary">
                    TED
                  </span>
                </label>
                <label className="flex items-center p-8 rounded-lg cursor-pointer bg-background-light hover:bg-neutral-100 transition-colors w-full">
                  <input
                    type="radio"
                    {...form.register('type')}
                    value={TransactionType.PIX}
                    className="mr-3 w-5 h-5 appearance-none border-2 border-border-input rounded-full cursor-pointer checked:bg-primary-500 checked:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0"
                  />
                  <span className="font-sans font-medium text-lg leading-normal align-middle text-text-primary">
                    PIX
                  </span>
                </label>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={navigateToTransactions}
                  className="px-4 py-2 border-2 border-primary-500 bg-transparent hover:bg-primary-50 dark:hover:bg-neutral-800 rounded-lg font-sans font-medium text-sm leading-normal text-center align-middle text-text-dark dark:text-white transition-colors"
                >
                  {t('buttons.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-500 rounded-lg hover:bg-primary-600 font-sans font-medium text-sm leading-normal text-center align-middle text-text-dark transition-colors"
                >
                  {t('buttons.next')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
