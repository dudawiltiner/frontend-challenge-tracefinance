import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { useParams } from 'next/navigation';

import { validateCpfCnpj } from '@utils/functions/validateCpfCnpj';
import {
  PixFormData,
  TedFormData,
  TransactionFormData,
  isPixFormValid,
  isTedFormValid,
} from '@utils/transactions';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  AccountType,
  PixKeyType,
  TransactionType,
} from '@transaction-types/transaction';
import { z } from 'zod';

const step1Schema = z.object({
  type: z.enum([TransactionType.PIX, TransactionType.TED]),
  amount: z
    .string()
    .min(1, 'Valor é obrigatório')
    .refine(
      (val) => {
        const cleaned = val.replace(/\D/g, '');
        const amount = parseInt(cleaned, 10) || 0;
        return amount > 0;
      },
      { message: 'Valor deve ser maior que zero' }
    ),
  cpfCnpj: z
    .string()
    .min(1, 'CPF/CNPJ é obrigatório')
    .refine((val) => validateCpfCnpj(val), {
      message: 'CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos',
    }),
  legalName: z.string().min(1, 'Nome/Razão Social é obrigatório'),
});

const pixStep2Schema = z.object({
  pixKey: z.string().min(1, 'Chave PIX é obrigatória'),
  keyType: z.union([z.nativeEnum(PixKeyType), z.literal('')]),
  description: z.string().optional(),
});

const tedStep2Schema = z.object({
  bank: z.string().min(1, 'Código do banco é obrigatório'),
  account: z.string().min(1, 'Número da conta é obrigatório'),
  agency: z.string().min(1, 'Agência é obrigatória'),
  accountType: z.union([z.nativeEnum(AccountType), z.literal('')]),
  description: z.string().optional(),
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type PixStep2FormData = z.infer<typeof pixStep2Schema>;
export type TedStep2FormData = z.infer<typeof tedStep2Schema>;

export const useTransactionForm = () => {
  const params = useParams();
  const typeParam = params?.type as string;
  const transactionType =
    typeParam?.toUpperCase() === 'PIX'
      ? TransactionType.PIX
      : TransactionType.TED;

  const step1Form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      type: transactionType,
      amount: '',
      cpfCnpj: '',
      legalName: '',
    },
  });

  const pixStep2Form = useForm<PixStep2FormData>({
    resolver: zodResolver(pixStep2Schema),
    defaultValues: {
      pixKey: '',
      keyType: '',
      description: '',
    },
  });

  const tedStep2Form = useForm<TedStep2FormData>({
    resolver: zodResolver(tedStep2Schema),
    defaultValues: {
      bank: '',
      account: '',
      agency: '',
      accountType: '',
      description: '',
    },
  });

  const step1Values = step1Form.watch();
  const pixStep2Values = pixStep2Form.watch();
  const tedStep2Values = tedStep2Form.watch();

  const isFormValid = useMemo(() => {
    const formData: TransactionFormData = {
      amount: step1Values.amount || '',
      cpfCnpj: step1Values.cpfCnpj || '',
      legalName: step1Values.legalName || '',
    };

    if (transactionType === TransactionType.PIX) {
      const pixData: PixFormData = {
        pixKey: pixStep2Values.pixKey || '',
        keyType: pixStep2Values.keyType || '',
        description: pixStep2Values.description,
      };
      return isPixFormValid(formData, pixData);
    }

    const tedData: TedFormData = {
      bank: tedStep2Values.bank || '',
      account: tedStep2Values.account || '',
      agency: tedStep2Values.agency || '',
      accountType: tedStep2Values.accountType || '',
      description: tedStep2Values.description,
    };
    return isTedFormValid(formData, tedData);
  }, [step1Values, pixStep2Values, tedStep2Values, transactionType]);

  return {
    transactionType,
    step1Form,
    pixStep2Form,
    tedStep2Form,
    isFormValid,
  };
};
