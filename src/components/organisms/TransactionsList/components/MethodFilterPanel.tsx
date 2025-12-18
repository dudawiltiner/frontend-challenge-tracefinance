'use client';

import { TransactionType } from '@transaction-types/transaction';

interface MethodFilterPanelProps {
  localTypeFilter: TransactionType[];
  onLocalTypeFilterChange: (value: TransactionType[]) => void;
  onTypeFilterChange: (value: TransactionType[]) => void;
  onShowFilterPanelChange: (value: boolean) => void;
  onClearAllFilters?: () => void;
  t: (key: string) => string;
}

export const MethodFilterPanel = ({
  localTypeFilter,
  onLocalTypeFilterChange,
  onTypeFilterChange,
  onShowFilterPanelChange,
  onClearAllFilters,
  t,
}: MethodFilterPanelProps) => {
  return (
    <div className="p-4 flex flex-col h-full min-h-[400px] md:min-h-[500px] relative">
      <h3 className="font-sans font-normal text-xs leading-normal align-middle text-text-placeholder mb-3">
        {t('filters.transactionType')}
      </h3>
      <div className="space-y-2 flex-1 pb-20">
        {Object.values(TransactionType).map((type) => (
          <label key={type} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={localTypeFilter.includes(type)}
              onChange={() => {
                if (localTypeFilter.includes(type)) {
                  onLocalTypeFilterChange(
                    localTypeFilter.filter((t) => t !== type)
                  );
                } else {
                  onLocalTypeFilterChange([...localTypeFilter, type]);
                }
              }}
              className="w-4 h-4 appearance-none border-2 border-border-input rounded cursor-pointer checked:bg-primary-700 checked:border-primary-700 focus:ring-2 focus:ring-primary-700 focus:ring-offset-0 relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-background-light checked:after:text-xs checked:after:font-bold"
            />
            <span className="text-sm text-text-primary font-normal">
              {type}
            </span>
          </label>
        ))}
      </div>
      <div className="absolute bottom-4 right-4 left-4 flex justify-end gap-2 pt-4 border-t border-neutral-200 bg-background-light">
        <button
          onClick={() => {
            if (onClearAllFilters) {
              onClearAllFilters();
            } else {
              onLocalTypeFilterChange([]);
              onTypeFilterChange([]);
              onShowFilterPanelChange(false);
            }
          }}
          className="px-4 py-2 border border-border-input/50 text-text-primary rounded-lg hover:bg-neutral-100 font-sans font-medium text-xs leading-normal text-center align-middle"
        >
          {t('filters.clear')}
        </button>
        <button
          onClick={() => {
            onTypeFilterChange(localTypeFilter);
            onShowFilterPanelChange(false);
          }}
          className="px-4 py-2 bg-primary-500 text-text-dark rounded-lg hover:bg-primary-600 font-sans font-medium text-xs leading-normal text-center align-middle"
        >
          {t('filters.apply')}
        </button>
      </div>
    </div>
  );
};
