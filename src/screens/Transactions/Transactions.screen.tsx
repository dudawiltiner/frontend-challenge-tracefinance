'use client';

import { useMemo, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@atoms/Button';

import { EmptyState } from '@molecules/EmptyState';
import { MobileHeader } from '@molecules/MobileHeader';

import { NavigationSidebar } from '@organisms/NavigationSidebar';
import { TransactionsList } from '@organisms/TransactionsList';

import {
  useTransactionsFilters,
  useTransactionsInfiniteScroll,
} from '@hooks/transactions';
import { useGetTransactionsInfinite } from '@hooks/transactions/useGetTransactionsInfinite';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export const TransactionsScreen = () => {
  const t = useTranslations('transactions');
  const filters = useTransactionsFilters();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    data: allTransactions,
    total: apiTotal,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetTransactionsInfinite(filters.apiFilters);

  const { observerTarget } = useTransactionsInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const transactions = useMemo(() => {
    if (filters.typeFilter.length === 0) {
      return allTransactions;
    }
    return allTransactions.filter((tx) => filters.typeFilter.includes(tx.type));
  }, [allTransactions, filters.typeFilter]);

  const total = useMemo(() => {
    if (filters.typeFilter.length === 0) {
      return apiTotal;
    }
    return hasNextPage ? apiTotal : transactions.length;
  }, [filters.typeFilter, apiTotal, transactions.length, hasNextPage]);

  if (error) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <NavigationSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 p-8">
          <EmptyState
            title={t('errorState.title')}
            description={t('errorState.description')}
            action={
              <Button onClick={() => window.location.reload()}>
                {t('errorState.retry')}
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-neutral-50 overflow-hidden">
      <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
      <NavigationSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="hidden md:flex bg-header-bg px-8 h-[74px] items-center flex-shrink-0">
          <h1 className="text-header-text font-medium text-base leading-normal font-sans">
            {t('banking')}
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-8 py-4">
            <h2 className="font-medium text-xl leading-normal font-sans text-neutral-700">
              {t('transaction')}
            </h2>
          </div>

          <TransactionsList
            transactions={transactions}
            total={total}
            isLoading={isLoading}
            error={error}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onFetchNextPage={fetchNextPage}
            observerTarget={observerTarget}
            search={filters.search}
            onSearchChange={filters.setSearch}
            typeFilter={filters.typeFilter}
            onTypeFilterChange={filters.setTypeFilter}
            statusFilter={filters.statusFilter}
            onStatusFilterChange={filters.setStatusFilter}
            currencyFilter={filters.currencyFilter}
            onCurrencyFilterChange={filters.setCurrencyFilter}
            showFilterPanel={filters.showFilterPanel}
            onShowFilterPanelChange={filters.setShowFilterPanel}
            activeFilter={filters.activeFilter}
            onActiveFilterChange={filters.setActiveFilter}
            startDate={filters.startDate}
            onStartDateChange={filters.setStartDate}
            endDate={filters.endDate}
            onEndDateChange={filters.setEndDate}
            localTypeFilter={filters.localTypeFilter}
            onLocalTypeFilterChange={filters.setLocalTypeFilter}
            localCurrencyFilter={filters.localCurrencyFilter}
            onLocalCurrencyFilterChange={filters.setLocalCurrencyFilter}
            filterPanelRef={filters.filterPanelRef}
          />

          {transactions.length > 0 && (
            <div className="px-8 pb-4 flex items-center justify-end gap-4">
              <span className="text-sm text-neutral-600">
                1-{Math.min(transactions.length, total)} {t('pagination.of')}{' '}
                {total}
              </span>
              <div className="flex items-center gap-2">
                <button
                  className="p-1 hover:bg-neutral-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={true}
                >
                  <ChevronLeft className="w-5 h-5 text-neutral-600" />
                </button>
                <button
                  className="p-1 hover:bg-neutral-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  <ChevronRight className="w-5 h-5 text-neutral-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
