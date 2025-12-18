import { AccountType, PixKeyType } from '@transaction-types/transaction';

export const PIX_KEY_TYPE_OPTIONS = [
  { value: PixKeyType.EMAIL, label: 'E-mail' },
  { value: PixKeyType.CPF, label: 'CPF' },
  { value: PixKeyType.CNPJ, label: 'CNPJ' },
  { value: PixKeyType.PHONE, label: 'Telefone' },
  { value: PixKeyType.RANDOM, label: 'Chave aleatória' },
];

export const ACCOUNT_TYPE_OPTIONS = [
  { value: AccountType.CORRENTE, label: 'Corrente' },
  { value: AccountType.POUPANCA, label: 'Poupança' },
];
