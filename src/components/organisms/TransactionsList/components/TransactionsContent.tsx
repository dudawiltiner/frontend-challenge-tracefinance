'use client';

import { Skeleton } from '@molecules/Skeleton';
import { Table } from '@molecules/Table';
import { TableColumn } from '@molecules/Table/Table.types';
import { TransactionCard } from '@molecules/TransactionCard';

import { Transaction } from '@transaction-types/transaction';

type TransactionRecord = Transaction & Record<string, unknown>;

interface TransactionsContentProps {
  isLoading: boolean;
  transactions: Transaction[];
  columns: TableColumn<TransactionRecord>[];
  observerTarget: React.RefObject<HTMLDivElement>;
  isFetchingNextPage: boolean;
}

export const TransactionsContent = ({
  isLoading,
  transactions,
  columns,
  observerTarget,
  isFetchingNextPage,
}: TransactionsContentProps) => {
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {/* Mobile skeleton */}
          <div className="md:hidden space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={120} />
            ))}
          </div>
          {/* Desktop skeleton */}
          <div className="hidden md:block space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={40} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (transactions && transactions.length > 0) {
    return (
      <>
        {/* Mobile: Cards */}
        <div className="md:hidden space-y-4 p-4">
          {transactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>

        {/* Desktop: Table */}
        <div className="hidden md:block overflow-hidden">
          <Table<TransactionRecord>
            columns={columns}
            data={transactions as TransactionRecord[]}
          />
        </div>

        {/* Infinite scroll observer */}
        <div
          ref={observerTarget}
          className={`flex items-center justify-center ${
            isFetchingNextPage ? 'h-10' : 'h-0'
          }`}
        >
          {isFetchingNextPage && (
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              Carregando...
            </div>
          )}
        </div>
      </>
    );
  }

  return null;
};
