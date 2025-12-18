import React from 'react';

import { X } from 'lucide-react';

import { FilterBadgeProps } from './FilterBadge.types';

export const FilterBadge: React.FC<FilterBadgeProps> = ({
  label,
  onRemove,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1 p-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-white rounded-full text-xs font-medium border border-border-input ${className}`}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 text-neutral-500 dark:text-neutral-300 hover:text-neutral-700 dark:hover:text-white focus:outline-none"
          type="button"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};
