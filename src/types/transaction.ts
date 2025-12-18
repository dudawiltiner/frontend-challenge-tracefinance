export enum TransactionType {
  PIX = 'PIX',
  TED = 'TED',
}

export enum TransactionStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}

export enum Currency {
  BRL = 'BRL',
  USD = 'USD',
  EUR = 'EUR',
}

export enum PixKeyType {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  CPF = 'CPF',
  CNPJ = 'CNPJ',
  RANDOM = 'RANDOM',
}

export enum AccountType {
  CORRENTE = 'CORRENTE',
  POUPANCA = 'POUPANCA',
}

export interface Transaction {
  id: string;
  description?: string;
  type: TransactionType;
  amount: number;
  currency: Currency;
  status: TransactionStatus;
  createdAt: string;
  cpfCnpj: string;
  pixKey?: string;
  keyType?: PixKeyType;
  bank?: string;
  account?: string;
  agency?: string;
  accountType?: AccountType;
}

export interface TransactionResponse {
  data: Transaction[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    previousCursor: number | null;
    nextCursor: number | null;
  };
}

export interface CreatePixTransactionRequest {
  type: TransactionType.PIX;
  amount: number;
  cpfCnpj: string;
  pixKey: string;
  keyType: PixKeyType;
  description?: string;
}

export interface CreateTedTransactionRequest {
  type: TransactionType.TED;
  amount: number;
  cpfCnpj: string;
  bank: string;
  account: string;
  agency: string;
  accountType: AccountType;
  description?: string;
}

export type CreateTransactionRequest =
  | CreatePixTransactionRequest
  | CreateTedTransactionRequest;

export interface TransactionFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: TransactionStatus;
  currency?: Currency;
  startDate?: string;
  endDate?: string;
  type?: TransactionType;
}
