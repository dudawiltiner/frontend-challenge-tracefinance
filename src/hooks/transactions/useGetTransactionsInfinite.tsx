import { transactionsApi } from '@services/transactions/api';

import { useInfiniteQuery } from '@tanstack/react-query';
import {
  TransactionFilters,
  TransactionResponse,
} from '@transaction-types/transaction';
import { AxiosError } from 'axios';

export function useGetTransactionsInfinite(
  filters?: Omit<TransactionFilters, 'page'>
) {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<TransactionResponse, AxiosError>({
    queryKey: ['transactions-infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      transactionsApi.getTransactions({
        ...filters,
        page: pageParam as number,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.nextCursor) {
        return lastPage.meta.nextCursor;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const transactions = data?.pages.flatMap((page) => page.data) ?? [];
  const total = data?.pages[0]?.meta.total ?? 0;

  return {
    data: transactions,
    total,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
