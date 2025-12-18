import {
  CreateTransactionRequest,
  Transaction,
  TransactionFilters,
  TransactionResponse,
} from '@transaction-types/transaction';

import { api } from '../axiosConfig';

export const transactionsApi = {
  getTransactions: async (
    filters?: TransactionFilters
  ): Promise<TransactionResponse> => {
    const params = new URLSearchParams();

    if (filters?.page) {
      params.append('page', filters.page.toString());
    }
    if (filters?.limit) {
      params.append('limit', filters.limit.toString());
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }
    if (filters?.status) {
      params.append('status', filters.status);
    }
    if (filters?.currency) {
      params.append('currency', filters.currency);
    }
    if (filters?.startDate) {
      params.append('startDate', filters.startDate);
    }
    if (filters?.endDate) {
      params.append('endDate', filters.endDate);
    }
    if (filters?.type) {
      params.append('type', filters.type);
    }

    const response = await api.get<TransactionResponse>(
      `/api/transactions?${params.toString()}`
    );
    return response.data;
  },

  createTransaction: async (
    data: CreateTransactionRequest
  ): Promise<Transaction> => {
    const response = await api.post<Transaction>('/api/transactions', data);
    return response.data;
  },
};
