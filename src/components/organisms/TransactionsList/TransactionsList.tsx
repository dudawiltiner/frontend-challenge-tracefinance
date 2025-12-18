'use client';

import { useMemo } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { Badge } from '@atoms/Badge';
import { Input } from '@atoms/Input';

import { DateFilterDropdown } from '@molecules/DateFilterDropdown';
import { EmptyState } from '@molecules/EmptyState';

import { createTableColumns, getStatusBadgeVariant } from '@utils/transactions';
import { createActiveFilters } from '@utils/transactions';

import { Transaction } from '@transaction-types/transaction';
import { Search } from 'lucide-react';

import { TransactionsListProps } from './TransactionsList.types';
import { FilterSection } from './components/FilterSection';
import { PaginationControls } from './components/PaginationControls';
import { StatusTabs } from './components/StatusTabs';
import { TransactionsContent } from './components/TransactionsContent';

export const TransactionsList = ({
  transactions,
  total,
  isLoading,
  error,
  hasNextPage,
  isFetchingNextPage,
  onFetchNextPage,
  observerTarget,
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  currencyFilter,
  onCurrencyFilterChange,
  showFilterPanel,
  onShowFilterPanelChange,
  activeFilter,
  onActiveFilterChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  localTypeFilter,
  onLocalTypeFilterChange,
  localCurrencyFilter,
  onLocalCurrencyFilterChange,
  filterPanelRef,
}: TransactionsListProps) => {
  const t = useTranslations('transactions');
  const locale = useLocale();

  type TransactionRecord = Transaction & Record<string, unknown>;

  const columns = useMemo(() => {
    const baseColumns = createTableColumns(t, locale);
    return baseColumns.map((col) => {
      if (col.key === 'status') {
        return {
          ...col,
          render: (_: unknown, row: TransactionRecord) => (
            <Badge variant={getStatusBadgeVariant((row as Transaction).status)}>
              {t(`status.${(row as Transaction).status.toLowerCase()}`)}
            </Badge>
          ),
        };
      }
      return col;
    }) as Array<{
      key: string;
      label: string;
      render: (_: unknown, row: TransactionRecord) => JSX.Element;
    }>;
  }, [t, locale]);

  const activeFilters = useMemo(
    () =>
      createActiveFilters(
        typeFilter,
        currencyFilter,
        startDate,
        endDate,
        () => onTypeFilterChange([]),
        () => onCurrencyFilterChange([]),
        () => {
          onStartDateChange(undefined);
          onEndDateChange(undefined);
        },
        t,
        locale
      ),
    [
      typeFilter,
      currencyFilter,
      startDate,
      endDate,
      onTypeFilterChange,
      onCurrencyFilterChange,
      onStartDateChange,
      onEndDateChange,
      t,
      locale,
    ]
  );

  if (error) {
    return (
      <div className="p-8">
        <EmptyState
          title={t('errorState.title')}
          description={t('errorState.description')}
        />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <FilterSection
          showFilterPanel={showFilterPanel}
          onShowFilterPanelChange={onShowFilterPanelChange}
          activeFilter={activeFilter}
          onActiveFilterChange={onActiveFilterChange}
          activeFilters={activeFilters}
          localTypeFilter={localTypeFilter}
          onLocalTypeFilterChange={onLocalTypeFilterChange}
          onTypeFilterChange={onTypeFilterChange}
          localCurrencyFilter={localCurrencyFilter}
          onLocalCurrencyFilterChange={onLocalCurrencyFilterChange}
          onCurrencyFilterChange={onCurrencyFilterChange}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          filterPanelRef={filterPanelRef}
          DateFilterDropdown={DateFilterDropdown}
          t={t}
        />
        {transactions.length > 0 && (
          <PaginationControls
            transactionsLength={transactions.length}
            total={total}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onFetchNextPage={onFetchNextPage}
            t={t}
          />
        )}
      </div>

      <div className="mb-6">
        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Search className="w-5 h-5 md:w-6 md:h-6 text-text-secondary" />
          </div>
          <Input
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 md:pl-10 placeholder:font-light placeholder:text-sm placeholder:leading-normal placeholder:text-text-placeholder font-sans w-full"
          />
        </div>
      </div>

      <div className="bg-background-light rounded-lg overflow-hidden">
        <div className="px-4 md:px-6 pt-4 md:pt-6 pb-3 md:pb-4">
          <StatusTabs
            statusFilter={statusFilter}
            onStatusFilterChange={onStatusFilterChange}
            t={t}
          />
        </div>

        <TransactionsContent
          isLoading={isLoading}
          transactions={transactions}
          columns={columns}
          observerTarget={observerTarget}
          isFetchingNextPage={isFetchingNextPage}
        />
        {!isLoading && (!transactions || transactions.length === 0) && (
          <div className="p-6">
            <EmptyState
              title={t('emptyState.title')}
              description={t('emptyState.description')}
            />
          </div>
        )}
      </div>
    </div>
  );
};
