'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  transactionsLength: number;
  total: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onFetchNextPage: () => void;
  t: (key: string) => string;
}

export const PaginationControls = ({
  transactionsLength,
  total,
  hasNextPage,
  isFetchingNextPage,
  onFetchNextPage,
  t,
}: PaginationControlsProps) => {
  return (
    <div className="hidden md:flex items-center gap-4">
      <span className="text-sm text-neutral-600">
        1-{Math.min(transactionsLength, total)} {t('pagination.of')} {total}
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
          onClick={onFetchNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          <ChevronRight className="w-5 h-5 text-neutral-600" />
        </button>
      </div>
    </div>
  );
};
