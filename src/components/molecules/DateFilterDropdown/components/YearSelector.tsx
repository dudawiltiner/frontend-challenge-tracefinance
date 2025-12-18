'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export const YearSelector = ({
  selectedYear,
  onYearChange,
}: YearSelectorProps) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <button
        onClick={() => onYearChange(selectedYear - 1)}
        className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
      >
        <ChevronLeft className="w-4 h-4 text-text-secondary" />
      </button>
      <span className="font-sans font-normal text-xs leading-[1.3] text-center text-text-secondary">
        {selectedYear}
      </span>
      <button
        onClick={() => onYearChange(selectedYear + 1)}
        className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
      >
        <ChevronRight className="w-4 h-4 text-text-secondary" />
      </button>
    </div>
  );
};
