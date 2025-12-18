import React from 'react';

import { NextIntlClientProvider } from 'next-intl';

const mockMessages = {
  transactions: {
    filters: {
      date: 'Data',
      method: 'Método',
      currency: 'Moeda',
    },
    status: {
      completed: 'Concluída',
      pending: 'Pendente',
      failed: 'Falhou',
    },
    table: {
      method: 'Método',
      amount: 'Valor',
      date: 'Data',
    },
  },
};

export const withIntlProvider = (component: React.ReactElement) => {
  return (
    <NextIntlClientProvider locale="pt-BR" messages={mockMessages}>
      {component}
    </NextIntlClientProvider>
  );
};
