import { transactionsApi } from '@services/transactions/api';

import { useQuery } from '@tanstack/react-query';
import {
  TransactionFilters,
  TransactionResponse,
} from '@transaction-types/transaction';
import { AxiosError } from 'axios';

export function useGetTransactions(filters?: TransactionFilters) {
  const { data, isLoading, error, refetch } = useQuery<
    TransactionResponse,
    AxiosError
  >({
    queryKey: ['transactions', filters],
    queryFn: () => transactionsApi.getTransactions(filters),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
