'use client';

import { Currency } from '@transaction-types/transaction';

interface CurrencyFilterPanelProps {
  localCurrencyFilter: Currency[];
  onLocalCurrencyFilterChange: (value: Currency[]) => void;
  onCurrencyFilterChange: (value: Currency[]) => void;
  onShowFilterPanelChange: (value: boolean) => void;
  onClearAllFilters?: () => void;
  t: (key: string) => string;
}

export const CurrencyFilterPanel = ({
  localCurrencyFilter,
  onLocalCurrencyFilterChange,
  onCurrencyFilterChange,
  onShowFilterPanelChange,
  onClearAllFilters,
  t,
}: CurrencyFilterPanelProps) => {
  return (
    <div className="p-4 flex flex-col h-full min-h-[400px] md:min-h-[500px] relative">
      <h3 className="font-sans font-normal text-xs leading-normal align-middle text-text-placeholder mb-3">
        {t('filters.currency')}
      </h3>
      <div className="space-y-2 flex-1 pb-20">
        {Object.values(Currency).map((currency) => (
          <label
            key={currency}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={localCurrencyFilter.includes(currency)}
              onChange={() => {
                if (localCurrencyFilter.includes(currency)) {
                  onLocalCurrencyFilterChange(
                    localCurrencyFilter.filter((c) => c !== currency)
                  );
                } else {
                  onLocalCurrencyFilterChange([
                    ...localCurrencyFilter,
                    currency,
                  ]);
                }
              }}
              className="w-4 h-4 appearance-none border-2 border-border-input rounded cursor-pointer checked:bg-primary-700 checked:border-primary-700 focus:ring-2 focus:ring-primary-700 focus:ring-offset-0 relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-background-light checked:after:text-xs checked:after:font-bold"
            />
            <span className="text-sm text-text-primary font-normal">
              {t(`currencies.${currency.toLowerCase()}`)}
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
              onLocalCurrencyFilterChange([]);
              onCurrencyFilterChange([]);
              onShowFilterPanelChange(false);
            }
          }}
          className="px-4 py-2 border border-border-input/50 text-text-primary rounded-lg hover:bg-neutral-100 font-sans font-medium text-xs leading-normal text-center align-middle"
        >
          {t('filters.clear')}
        </button>
        <button
          onClick={() => {
            onCurrencyFilterChange(localCurrencyFilter);
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
