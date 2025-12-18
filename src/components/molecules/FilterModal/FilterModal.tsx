'use client';

import React from 'react';

import { FilterModalProps } from './FilterModal.types';

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-background-light rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-text-primary">
                {title}
              </h3>
            </div>
          )}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </>
  );
};
