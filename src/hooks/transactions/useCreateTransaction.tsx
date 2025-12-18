import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { transactionsApi } from '@services/transactions/api';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateTransactionRequest,
  Transaction,
} from '@transaction-types/transaction';
import { AxiosError } from 'axios';

export interface ApiValidationError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  errors?: ApiValidationError[];
}

export function useCreateTransaction() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    ApiValidationError[]
  >([]);

  const mutation = useMutation<
    Transaction,
    AxiosError,
    CreateTransactionRequest
  >({
    mutationFn: (data) => transactionsApi.createTransaction(data),
    onSuccess: () => {
      setErrorMessage(null);
      setValidationErrors([]);
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      router.push('/');
    },
    onError: (error: AxiosError) => {
      const errorData = error.response?.data;

      if (errorData && typeof errorData === 'object') {
        const apiError = errorData as ApiErrorResponse;

        if (apiError.message) {
          setErrorMessage(apiError.message);
        } else {
          setErrorMessage(null);
        }

        if (Array.isArray(apiError.errors) && apiError.errors.length > 0) {
          setValidationErrors(apiError.errors);
        } else {
          setValidationErrors([]);
        }
      } else {
        setErrorMessage(null);
        setValidationErrors([]);
      }
    },
  });

  useEffect(() => {
    if (!mutation.isPending && !mutation.error) {
      setErrorMessage(null);
      setValidationErrors([]);
    }
  }, [mutation.isPending, mutation.error]);

  return {
    createTransaction: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    errorMessage,
    validationErrors,
    isSuccess: mutation.isSuccess,
  };
}
