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

export const TransactionsScreen = () => {
  const t = useTranslations('transactions');
  const filters = useTransactionsFilters();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

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
        <MobileHeader onMenuClick={handleMenuClick} />
        <NavigationSidebar
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
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
      <MobileHeader onMenuClick={handleMenuClick} />
      <NavigationSidebar
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
        }}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="hidden md:flex bg-header-bg px-8 h-[74px] items-center flex-shrink-0">
          <h1 className="text-header-text font-medium text-base leading-normal font-sans">
            {t('banking')}
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 md:px-8 py-3 md:py-4">
            <h2 className="font-medium text-lg md:text-xl leading-normal font-sans text-text-primary">
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
        </div>
      </div>
    </div>
  );
};
