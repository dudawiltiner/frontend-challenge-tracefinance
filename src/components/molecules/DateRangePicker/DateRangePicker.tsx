'use client';

import React from 'react';

import { DatePicker } from '../DatePicker';
import { DateRangePickerProps } from './DateRangePicker.types';

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  label,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  error,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <h3 className="text-sm font-medium text-gray-700 mb-2">{label}</h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          label="De"
          value={startDate}
          onChange={onStartDateChange}
          error={error}
        />
        <DatePicker label="Até" value={endDate} onChange={onEndDateChange} />
      </div>
    </div>
  );
};
