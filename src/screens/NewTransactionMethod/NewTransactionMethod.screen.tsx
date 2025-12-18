'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Sidebar } from '@molecules/Sidebar';

import { TransactionMethodForm } from '@organisms/TransactionMethodForm';

import { useTransactionMethodSelection } from '@hooks/transactions';

export const NewTransactionMethodScreen = () => {
  const t = useTranslations('transactions.createTransaction');
  const router = useRouter();
  const { form } = useTransactionMethodSelection();

  const steps = [
    {
      id: 'method',
      title: t('step1.subtitle'),
      subtitle: t('step1.title'),
    },
    {
      id: 'information',
      title: t('step2.subtitle'),
      subtitle: t('step2.title'),
    },
  ];

  const handleSubmit = (type: string) => {
    router.push(`/pt-BR/transactions/new/${type.toLowerCase()}`);
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar steps={steps} currentStep={0} />
      <TransactionMethodForm form={form} onSubmit={handleSubmit} />
    </div>
  );
};
