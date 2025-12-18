'use client';

import { TransactionStatus } from '@transaction-types/transaction';

interface StatusTabsProps {
  statusFilter: TransactionStatus | 'ALL';
  onStatusFilterChange: (value: TransactionStatus | 'ALL') => void;
  t: (key: string) => string;
}

export const StatusTabs = ({
  statusFilter,
  onStatusFilterChange,
  t,
}: StatusTabsProps) => {
  return (
    <div className="border-b border-neutral-200 overflow-hidden">
      <div
        className="flex gap-3 md:gap-6 scrollbar-hide"
        style={
          {
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          } as React.CSSProperties
        }
      >
        {(['ALL', ...Object.values(TransactionStatus)] as const).map(
          (status) => (
            <button
              key={status}
              onClick={() => onStatusFilterChange(status)}
              className={`pb-2 px-1 transition-colors font-sans text-xs md:text-sm leading-normal whitespace-nowrap flex-shrink-0 ${
                statusFilter === status
                  ? 'text-text-primary font-light border-b border-primary-500'
                  : 'text-neutral-400 font-light hover:text-text-primary border-b-0'
              }`}
            >
              {status === 'ALL'
                ? t('status.all')
                : t(`status.${status.toLowerCase()}`)}
            </button>
          )
        )}
      </div>
    </div>
  );
};
