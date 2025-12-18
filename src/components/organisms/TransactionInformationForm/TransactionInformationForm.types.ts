import { UseFormReturn } from 'react-hook-form';

import { ApiValidationError } from '@hooks/transactions/useCreateTransaction';
import {
  PixStep2FormData,
  Step1FormData,
  TedStep2FormData,
} from '@hooks/transactions/useTransactionForm.hook';

import { TransactionType } from '@transaction-types/transaction';

export interface TransactionInformationFormProps {
  transactionType: TransactionType;
  step1Form: UseFormReturn<Step1FormData>;
  pixStep2Form: UseFormReturn<PixStep2FormData>;
  tedStep2Form: UseFormReturn<TedStep2FormData>;
  isFormValid: boolean;
  isLoading: boolean;
  error: Error | null;
  errorMessage?: string | null;
  validationErrors?: ApiValidationError[];
  onSubmit: () => void;
  onBack: () => void;
  onClose: () => void;
}
