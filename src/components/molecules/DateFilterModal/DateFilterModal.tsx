'use client';

import React, { useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { FilterModal } from '../FilterModal';
import { DateFilterModalProps } from './DateFilterModal.types';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const DateFilterModal: React.FC<DateFilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  startDate,
  endDate,
}) => {
  const [selectedYear, setSelectedYear] = useState(2021);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  const [period, setPeriod] = useState('');

  const handleMonthClick = (monthIndex: number) => {
    setSelectedMonths((prev) => {
      if (prev.includes(monthIndex)) {
        return prev.filter((m) => m !== monthIndex);
      }
      if (prev.length < 2) {
        return [...prev, monthIndex].sort((a, b) => a - b);
      }
      return [monthIndex];
    });
  };

  const handleApply = () => {
    if (selectedMonths.length === 2) {
      const [start, end] = selectedMonths;
      const startDateObj = new Date(selectedYear, start, 1);
      const endDateObj = new Date(selectedYear, end + 1, 0);
      onApply(startDateObj, endDateObj);
    }
    onClose();
  };

  return (
    <FilterModal isOpen={isOpen} onClose={onClose} title="View transactions of">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Select a period
          </label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full px-3 py-2 border border-border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select a period</option>
            <option value="last-month">Last month</option>
            <option value="last-3-months">Last 3 months</option>
            <option value="last-6-months">Last 6 months</option>
            <option value="last-year">Last year</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Of
            </label>
            <input
              type="date"
              value={startDate ? startDate.toISOString().split('T')[0] : ''}
              onChange={(e) => {
                if (e.target.value) {
                  onApply(new Date(e.target.value), endDate);
                }
              }}
              className="w-full px-3 py-2 border border-border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <input
              type="date"
              value={endDate ? endDate.toISOString().split('T')[0] : ''}
              onChange={(e) => {
                if (e.target.value) {
                  onApply(startDate, new Date(e.target.value));
                }
              }}
              className="w-full px-3 py-2 border border-border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setSelectedYear(selectedYear - 1)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-lg font-semibold text-text-primary">
              {selectedYear}
            </span>
            <button
              onClick={() => setSelectedYear(selectedYear + 1)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {months.map((month, index) => {
              const isSelected = selectedMonths.includes(index);
              return (
                <button
                  key={month}
                  onClick={() => handleMonthClick(index)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-primary-500 text-text-dark'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {month}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-primary hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-primary-500 text-text-dark rounded-lg hover:bg-primary-600"
          >
            Apply
          </button>
        </div>
      </div>
    </FilterModal>
  );
};
