'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import {
  ArrowLeftRight,
  Calendar,
  ChevronRight,
  DollarSign,
} from 'lucide-react';

import { FilterPanelProps } from './FilterPanel.types';

export const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  activeFilter,
  onFilterSelect,
  children,
}) => {
  const t = useTranslations('transactions.filters');

  if (!isOpen) return null;

  const activeButtonClass = 'bg-neutral-200';
  const inactiveButtonClass = 'hover:bg-neutral-100';

  return (
    <div className="absolute top-full left-0 mt-2 bg-background-light rounded-lg shadow-xl border border-neutral-200 z-50 w-full md:w-[650px] min-h-[400px] md:min-h-[500px] flex flex-col md:flex-row">
      <div className="flex flex-col md:flex-row flex-1 min-h-[400px] md:min-h-[500px]">
        <div className="w-full md:w-48 bg-neutral-50 p-2 flex-shrink-0 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible min-h-[60px] md:min-h-[500px]">
          <button
            onClick={() => onFilterSelect('date')}
            className={`md:mb-2 flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 text-left transition-colors rounded-lg whitespace-nowrap ${
              activeFilter === 'date' ? activeButtonClass : inactiveButtonClass
            }`}
          >
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-text-secondary" />
            <span className="font-sans font-normal text-xs md:text-sm leading-[1.3] align-middle text-text-primary">
              {t('date')}
            </span>
            {activeFilter === 'date' && (
              <ChevronRight className="hidden md:block w-3 h-3 md:w-4 md:h-4 ml-auto text-text-secondary" />
            )}
          </button>
          <button
            onClick={() => onFilterSelect('method')}
            className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 mx-1 md:mx-0 my-0 md:my-2 px-3 md:px-4 py-2 md:py-3 text-left transition-colors rounded-lg whitespace-nowrap ${
              activeFilter === 'method'
                ? activeButtonClass
                : inactiveButtonClass
            }`}
          >
            <ArrowLeftRight className="w-4 h-4 md:w-5 md:h-5 text-text-secondary" />
            <span className="font-sans font-normal text-xs md:text-sm leading-[1.3] align-middle text-text-primary">
              {t('method')}
            </span>
            {activeFilter === 'method' && (
              <ChevronRight className="hidden md:block w-3 h-3 md:w-4 md:h-4 ml-auto text-text-secondary" />
            )}
          </button>
          <button
            onClick={() => onFilterSelect('currency')}
            className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 mx-1 md:mx-0 my-0 md:my-2 px-3 md:px-4 py-2 md:py-3 text-left transition-colors rounded-lg whitespace-nowrap ${
              activeFilter === 'currency'
                ? activeButtonClass
                : inactiveButtonClass
            }`}
          >
            <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-text-secondary" />
            <span className="font-sans font-normal text-xs md:text-sm leading-[1.3] align-middle text-text-primary">
              {t('currency')}
            </span>
            {activeFilter === 'currency' && (
              <ChevronRight className="hidden md:block w-3 h-3 md:w-4 md:h-4 ml-auto text-text-secondary" />
            )}
          </button>
        </div>
        <div className="flex-1 flex flex-col min-w-0 h-full">{children}</div>
      </div>
    </div>
  );
};
