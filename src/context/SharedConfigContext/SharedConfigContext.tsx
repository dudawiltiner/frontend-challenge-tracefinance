'use client';

import { useState } from 'react';

import { ThemeProvider } from '@providers/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface SharedConfigProviderProps {
  children: React.ReactNode;
}

export const SharedConfigProvider: React.FC<SharedConfigProviderProps> = ({
  children,
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};
