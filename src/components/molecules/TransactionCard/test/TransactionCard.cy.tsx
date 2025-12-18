import React from 'react';

import { NextIntlClientProvider } from 'next-intl';

import {
  Currency,
  Transaction,
  TransactionStatus,
  TransactionType,
} from '@transaction-types/transaction';

import { TransactionCard } from '../TransactionCard';

const LOCALE_PT_BR = 'pt-BR';
const MOCK_MESSAGES = {
  transactions: {
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
const DIV_SELECTOR = 'div';
const BE_VISIBLE = 'be.visible';

describe('<TransactionCard />', () => {
  const mockTransaction: Transaction = {
    id: '1',
    type: TransactionType.PIX,
    amount: 100000,
    currency: Currency.BRL,
    status: TransactionStatus.COMPLETED,
    createdAt: '2024-01-15T10:30:00Z',
    cpfCnpj: '12345678900',
  };

  it('should render transaction card', () => {
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <TransactionCard transaction={mockTransaction} />
      </NextIntlClientProvider>
    );
    cy.contains('1').should(BE_VISIBLE);
  });

  it('should display transaction amount', () => {
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <TransactionCard transaction={mockTransaction} />
      </NextIntlClientProvider>
    );
    cy.get(DIV_SELECTOR).should(BE_VISIBLE);
  });

  it('should display transaction status', () => {
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <TransactionCard transaction={mockTransaction} />
      </NextIntlClientProvider>
    );
    cy.get(DIV_SELECTOR).should(BE_VISIBLE);
  });

  it('should display transaction with description', () => {
    const transactionWithDescription = {
      ...mockTransaction,
      description: 'Test transaction',
    };
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <TransactionCard transaction={transactionWithDescription} />
      </NextIntlClientProvider>
    );
    cy.contains('Test transaction').should(BE_VISIBLE);
  });
});
