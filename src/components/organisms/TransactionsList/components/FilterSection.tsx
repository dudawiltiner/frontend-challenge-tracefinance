'use client';

import Link from 'next/link';

import { FilterBadge } from '@molecules/FilterBadge';
import { FilterPanel } from '@molecules/FilterPanel';

import { ActiveFilter } from '@utils/transactions';

import { Currency, TransactionType } from '@transaction-types/transaction';
import { Plus } from 'lucide-react';

import { CurrencyFilterPanel } from './CurrencyFilterPanel';
import { MethodFilterPanel } from './MethodFilterPanel';

interface FilterSectionProps {
  showFilterPanel: boolean;
  onShowFilterPanelChange: (value: boolean) => void;
  activeFilter: 'date' | 'method' | 'currency';
  onActiveFilterChange: (value: 'date' | 'method' | 'currency') => void;
  activeFilters: ActiveFilter[];
  localTypeFilter: TransactionType[];
  onLocalTypeFilterChange: (value: TransactionType[]) => void;
  onTypeFilterChange: (value: TransactionType[]) => void;
  localCurrencyFilter: Currency[];
  onLocalCurrencyFilterChange: (value: Currency[]) => void;
  onCurrencyFilterChange: (value: Currency[]) => void;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (value: Date | undefined) => void;
  onEndDateChange: (value: Date | undefined) => void;
  filterPanelRef: React.RefObject<HTMLDivElement>;
  DateFilterDropdown: React.ComponentType<{
    startDate?: Date;
    endDate?: Date;
    onApply: (start: Date, end: Date) => void;
    onClear?: () => void;
  }>;
  t: (key: string) => string;
}

export const FilterSection = ({
  showFilterPanel,
  onShowFilterPanelChange,
  activeFilter,
  onActiveFilterChange,
  activeFilters,
  localTypeFilter,
  onLocalTypeFilterChange,
  onTypeFilterChange,
  localCurrencyFilter,
  onLocalCurrencyFilterChange,
  onCurrencyFilterChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  filterPanelRef,
  DateFilterDropdown,
  t,
}: FilterSectionProps) => {
  return (
    <div
      className="flex flex-wrap items-center gap-2 md:gap-4 relative"
      ref={filterPanelRef}
    >
      <Link href="/pt-BR/transactions/new">
        <button className="flex items-center justify-center gap-2 rounded-lg transition-colors bg-primary-500 text-text-dark hover:bg-primary-600 h-[37px] px-4 font-medium text-xs leading-normal font-sans whitespace-nowrap">
          <Plus className="w-4 h-4" />
          <span>{t('newTransaction')}</span>
        </button>
      </Link>
      <button
        onClick={() => {
          onShowFilterPanelChange(!showFilterPanel);
          onActiveFilterChange('date');
        }}
        className="flex items-center justify-center gap-2 rounded-lg transition-colors bg-neutral-200 text-neutral-900 dark:text-white hover:bg-neutral-100 h-[37px] px-4 font-medium text-xs leading-normal font-sans whitespace-nowrap"
      >
        <Plus className="w-4 h-4" />
        <span>{t('addFilter')}</span>
      </button>
      {activeFilters.length === 0 && (
        <span className="font-light text-sm leading-normal text-text-placeholder font-sans">
          {t('noFilterApplied')}
        </span>
      )}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2">
          {activeFilters.map((filter, index) => (
            <FilterBadge
              key={index}
              label={filter.label}
              onRemove={filter.onRemove}
            />
          ))}
        </div>
      )}

      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => onShowFilterPanelChange(false)}
        activeFilter={activeFilter}
        onFilterSelect={onActiveFilterChange}
      >
        {activeFilter === 'date' ? (
          <DateFilterDropdown
            startDate={startDate}
            endDate={endDate}
            onApply={(start, end) => {
              onStartDateChange(start);
              onEndDateChange(end);
              onShowFilterPanelChange(false);
            }}
            onClear={() => {
              onStartDateChange(undefined);
              onEndDateChange(undefined);
              onShowFilterPanelChange(false);
            }}
          />
        ) : activeFilter === 'method' ? (
          <MethodFilterPanel
            localTypeFilter={localTypeFilter}
            onLocalTypeFilterChange={onLocalTypeFilterChange}
            onTypeFilterChange={onTypeFilterChange}
            onShowFilterPanelChange={onShowFilterPanelChange}
            t={t}
          />
        ) : (
          <CurrencyFilterPanel
            localCurrencyFilter={localCurrencyFilter}
            onLocalCurrencyFilterChange={onLocalCurrencyFilterChange}
            onCurrencyFilterChange={onCurrencyFilterChange}
            onShowFilterPanelChange={onShowFilterPanelChange}
            t={t}
          />
        )}
      </FilterPanel>
    </div>
  );
};
