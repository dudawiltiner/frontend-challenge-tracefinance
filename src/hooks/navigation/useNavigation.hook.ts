import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

export const useNavigation = () => {
  const router = useRouter();

  const navigateTo = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  const navigateBack = useCallback(() => {
    router.back();
  }, [router]);

  const navigateToTransactions = useCallback(() => {
    router.push('/pt-BR/transactions');
  }, [router]);

  const navigateToNewTransaction = useCallback(() => {
    router.push('/pt-BR/transactions/new');
  }, [router]);

  return {
    navigateTo,
    navigateBack,
    navigateToTransactions,
    navigateToNewTransaction,
  };
};
