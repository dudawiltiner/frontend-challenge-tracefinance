'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { MobileHeader } from '@molecules/MobileHeader';
import { Sidebar } from '@molecules/Sidebar';
import { StepperMobile } from '@molecules/StepperMobile';

import { NavigationSidebar } from '@organisms/NavigationSidebar';
import { TransactionMethodForm } from '@organisms/TransactionMethodForm';

import { useTransactionMethodSelection } from '@hooks/transactions';

export const NewTransactionMethodScreen = () => {
  const t = useTranslations('transactions.createTransaction');
  const router = useRouter();
  const { form } = useTransactionMethodSelection();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const handleMenuClick = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSubmit = (type: string) => {
    router.push(`/pt-BR/transactions/new/${type.toLowerCase()}`);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-neutral-50 overflow-hidden">
      <MobileHeader onMenuClick={handleMenuClick} />
      <div className="md:hidden">
        <NavigationSidebar
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
        />
      </div>
      <div className="hidden md:block">
        <Sidebar steps={steps} currentStep={0} className="h-screen" />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <StepperMobile steps={steps} currentStep={0} />
        <TransactionMethodForm form={form} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
