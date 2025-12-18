import { unmaskCurrency } from '@utils/functions/maskCurrency';

import {
  AccountType,
  CreatePixTransactionRequest,
  CreateTedTransactionRequest,
  PixKeyType,
  TransactionType,
} from '@transaction-types/transaction';

export interface TransactionFormData {
  amount: string;
  cpfCnpj: string;
  legalName: string;
}

export interface PixFormData {
  pixKey: string;
  keyType: PixKeyType | '';
  description?: string;
}

export interface TedFormData {
  bank: string;
  account: string;
  agency: string;
  accountType: AccountType | '';
  description?: string;
}

const isValidPixKeyType = (keyType: PixKeyType | ''): keyType is PixKeyType => {
  return (
    keyType !== '' && Object.values(PixKeyType).includes(keyType as PixKeyType)
  );
};

const isValidAccountType = (
  accountType: AccountType | ''
): accountType is AccountType => {
  return (
    accountType !== '' &&
    Object.values(AccountType).includes(accountType as AccountType)
  );
};

export const createPixPayload = (
  formData: TransactionFormData,
  pixData: PixFormData
): CreatePixTransactionRequest => {
  if (!isValidPixKeyType(pixData.keyType)) {
    throw new Error('keyType is required');
  }

  const amount = unmaskCurrency(formData.amount);

  const cpfCnpj = formData.cpfCnpj.replace(/\D/g, '');

  const description = pixData.description?.trim();
  const payload: CreatePixTransactionRequest = {
    type: TransactionType.PIX,
    amount,
    cpfCnpj,
    pixKey: pixData.pixKey.trim(),
    keyType: pixData.keyType,
  };
  if (description && description.length > 0) {
    payload.description = description;
  }

  return payload;
};

export const createTedPayload = (
  formData: TransactionFormData,
  tedData: TedFormData
): CreateTedTransactionRequest => {
  if (!isValidAccountType(tedData.accountType)) {
    throw new Error('accountType is required');
  }

  const amount = unmaskCurrency(formData.amount);

  const cpfCnpj = formData.cpfCnpj.replace(/\D/g, '');

  const description = tedData.description?.trim();
  const payload: CreateTedTransactionRequest = {
    type: TransactionType.TED,
    amount,
    cpfCnpj,
    bank: tedData.bank.trim(),
    account: tedData.account.trim(),
    agency: tedData.agency.trim(),
    accountType: tedData.accountType,
  };
  if (description && description.length > 0) {
    payload.description = description;
  }

  return payload;
};

export const isPixFormValid = (
  formData: TransactionFormData,
  pixData: PixFormData
): boolean => {
  return (
    !!formData.amount &&
    formData.amount.trim() !== '' &&
    !!formData.cpfCnpj &&
    formData.cpfCnpj.trim() !== '' &&
    !!formData.legalName &&
    formData.legalName.trim() !== '' &&
    !!pixData.pixKey &&
    pixData.pixKey.trim() !== '' &&
    isValidPixKeyType(pixData.keyType)
  );
};

export const isTedFormValid = (
  formData: TransactionFormData,
  tedData: TedFormData
): boolean => {
  return (
    !!formData.amount &&
    formData.amount.trim() !== '' &&
    !!formData.cpfCnpj &&
    formData.cpfCnpj.trim() !== '' &&
    !!formData.legalName &&
    formData.legalName.trim() !== '' &&
    !!tedData.bank &&
    tedData.bank.trim() !== '' &&
    !!tedData.account &&
    tedData.account.trim() !== '' &&
    !!tedData.agency &&
    tedData.agency.trim() !== '' &&
    isValidAccountType(tedData.accountType)
  );
};
