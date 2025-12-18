'use client';

import { useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { MobileHeader } from '@molecules/MobileHeader';
import { Sidebar } from '@molecules/Sidebar';
import { StepperMobile } from '@molecules/StepperMobile';

import { NavigationSidebar } from '@organisms/NavigationSidebar';
import { TransactionInformationForm } from '@organisms/TransactionInformationForm';

import { useNavigation } from '@hooks/navigation';
import { useTransactionForm } from '@hooks/transactions';
import { useCreateTransaction } from '@hooks/transactions/useCreateTransaction';

import {
  PixFormData,
  TedFormData,
  TransactionFormData,
  createPixPayload,
  createTedPayload,
} from '@utils/transactions';

import { TransactionType } from '@transaction-types/transaction';

export const NewTransactionInformationScreen = () => {
  const t = useTranslations('transactions.createTransaction');
  const router = useRouter();
  const locale = useLocale();
  const { navigateToTransactions } = useNavigation();
  const {
    createTransaction,
    isLoading,
    error,
    errorMessage,
    validationErrors,
  } = useCreateTransaction();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    transactionType,
    step1Form,
    pixStep2Form,
    tedStep2Form,
    isFormValid,
  } = useTransactionForm();

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

  const handleSubmit = async () => {
    const step1Data = step1Form.getValues();
    const formData: TransactionFormData = {
      amount: step1Data.amount,
      cpfCnpj: step1Data.cpfCnpj,
      legalName: step1Data.legalName,
    };

    if (transactionType === TransactionType.PIX) {
      const step2Data = pixStep2Form.getValues();
      const isValid = await pixStep2Form.trigger();
      if (!isValid) return;

      const pixData: PixFormData = {
        pixKey: step2Data.pixKey,
        keyType: step2Data.keyType || '',
        description: step2Data.description,
      };

      const payload = createPixPayload(formData, pixData);
      createTransaction(payload);
    } else {
      const step2Data = tedStep2Form.getValues();
      const isValid = await tedStep2Form.trigger();
      if (!isValid) return;

      const tedData: TedFormData = {
        bank: step2Data.bank,
        account: step2Data.account,
        agency: step2Data.agency,
        accountType: step2Data.accountType || '',
        description: step2Data.description,
      };

      const payload = createTedPayload(formData, tedData);
      createTransaction(payload);
    }
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
        <Sidebar steps={steps} currentStep={1} className="h-screen" />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <StepperMobile steps={steps} currentStep={1} />
        <TransactionInformationForm
          transactionType={transactionType}
          step1Form={step1Form}
          pixStep2Form={pixStep2Form}
          tedStep2Form={tedStep2Form}
          isFormValid={isFormValid}
          isLoading={isLoading}
          error={error}
          errorMessage={errorMessage}
          validationErrors={validationErrors}
          onSubmit={handleSubmit}
          onBack={() => router.push(`/${locale}/transactions/new`)}
          onClose={navigateToTransactions}
        />
      </div>
    </div>
  );
};
