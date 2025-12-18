import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionType } from '@transaction-types/transaction';
import { z } from 'zod';

const methodSchema = z.object({
  type: z.enum([TransactionType.PIX, TransactionType.TED]),
});

type MethodFormData = z.infer<typeof methodSchema>;

export const useTransactionMethodSelection = () => {
  const form = useForm<MethodFormData>({
    resolver: zodResolver(methodSchema),
    defaultValues: {
      type: TransactionType.TED,
    },
  });

  return {
    form,
  };
};
