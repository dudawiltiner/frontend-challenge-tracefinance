'use client';

import React, { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { DateFilterDropdownProps } from './DateFilterDropdown.types';
import { FilterActions } from './components/FilterActions';
import { MonthGrid } from './components/MonthGrid';
import { YearSelector } from './components/YearSelector';

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

export const DateFilterDropdown: React.FC<DateFilterDropdownProps> = ({
  startDate,
  endDate,
  onApply,
  onClear,
}) => {
  const t = useTranslations('transactions.filters');
  const [selectedYear, setSelectedYear] = useState(
    startDate ? startDate.getFullYear() : new Date().getFullYear()
  );
  const [selectedMonths, setSelectedMonths] = useState<
    Array<{ month: number; year: number }>
  >(() => {
    if (startDate && endDate) {
      return [
        { month: startDate.getMonth(), year: startDate.getFullYear() },
        { month: endDate.getMonth(), year: endDate.getFullYear() },
      ].sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return a.month - b.month;
      });
    }
    return [];
  });
  const [period, setPeriod] = useState('');
  const [localStartDate, setLocalStartDate] = useState<Date | undefined>(
    startDate
  );
  const [localEndDate, setLocalEndDate] = useState<Date | undefined>(endDate);

  useEffect(() => {
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
    if (startDate && endDate) {
      setSelectedMonths(
        [
          { month: startDate.getMonth(), year: startDate.getFullYear() },
          { month: endDate.getMonth(), year: endDate.getFullYear() },
        ].sort((a, b) => {
          if (a.year !== b.year) return a.year - b.year;
          return a.month - b.month;
        })
      );
    } else {
      // Reset estados locais quando as datas são limpas
      setSelectedMonths([]);
      setPeriod('');
      setSelectedYear(new Date().getFullYear());
    }
  }, [startDate, endDate]);

  const handleMonthClick = (monthIndex: number) => {
    setSelectedMonths((prev) => {
      const clickedMonth = { month: monthIndex, year: selectedYear };
      const existingIndex = prev.findIndex(
        (m) => m.month === monthIndex && m.year === selectedYear
      );

      if (existingIndex !== -1) {
        return prev.filter((_, index) => index !== existingIndex);
      }

      if (prev.length < 2) {
        return [...prev, clickedMonth].sort((a, b) => {
          if (a.year !== b.year) return a.year - b.year;
          return a.month - b.month;
        });
      }

      return [clickedMonth];
    });
  };

  const getSelectedMonthsDisplay = () => {
    if (selectedMonths.length === 0) return { from: '', to: '' };
    if (selectedMonths.length === 1) {
      const { month, year } = selectedMonths[0];
      return { from: `${months[month]} ${year}`, to: '' };
    }
    const [start, end] = selectedMonths;
    return {
      from: `${months[start.month]} ${start.year}`,
      to: `${months[end.month]} ${end.year}`,
    };
  };

  const { from: fromMonth, to: toMonth } = getSelectedMonthsDisplay();

  const handleApply = () => {
    if (selectedMonths.length === 2) {
      const [start, end] = selectedMonths;
      const startDateObj = new Date(start.year, start.month, 1);
      const endDateObj = new Date(end.year, end.month + 1, 0);
      onApply(startDateObj, endDateObj);
    } else if (period) {
      const today = new Date();
      let start: Date;
      let end: Date = today;

      switch (period) {
        case 'last-month':
          start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          end = new Date(today.getFullYear(), today.getMonth(), 0);
          break;
        case 'last-3-months':
          start = new Date(today.getFullYear(), today.getMonth() - 3, 1);
          break;
        case 'last-6-months':
          start = new Date(today.getFullYear(), today.getMonth() - 6, 1);
          break;
        case 'last-year':
          start = new Date(today.getFullYear() - 1, today.getMonth(), 1);
          break;
        default:
          return;
      }
      onApply(start, end);
    } else if (localStartDate || localEndDate) {
      onApply(localStartDate || new Date(), localEndDate || new Date());
    }
  };

  return (
    <div className="p-4 flex flex-col h-full  min-h-[400px] md:min-h-[500px] relative">
      <div className="space-y-4 flex-1 pb-20">
        <div>
          <h3 className="font-sans font-normal text-xs leading-[1.3] align-middle text-text-placeholder mb-3">
            {t('viewTransactionsOf')}
          </h3>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className={`w-full px-3 py-3 border border-border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500/50 appearance-none bg-background-light font-sans font-normal text-xs leading-[1.3] align-middle ${
              period === '' ? 'text-text-placeholder' : 'text-text-secondary'
            }`}
          >
            <option value="" disabled>
              {t('selectPeriod')}
            </option>
            <option value="last-month">Último mês</option>
            <option value="last-3-months">Últimos 3 meses</option>
            <option value="last-6-months">Últimos 6 meses</option>
            <option value="last-year">Último ano</option>
          </select>
        </div>

        <div className="border-t border-neutral-200 my-4"></div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <input
            type="text"
            value={fromMonth}
            readOnly
            placeholder={t('from')}
            className="flex-1 w-full sm:w-auto px-3 py-3 border border-border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500/50 font-sans font-normal text-xs leading-[1.3] align-middle text-text-secondary placeholder:text-text-placeholder bg-background-light"
          />
          <span className="text-text-secondary font-sans font-normal text-xs text-center sm:text-left">
            -
          </span>
          <input
            type="text"
            value={toMonth}
            readOnly
            placeholder={t('to')}
            className="flex-1 w-full sm:w-auto px-3 py-3 border border-border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500/50 font-sans font-normal text-xs leading-[1.3] align-middle text-text-secondary placeholder:text-text-placeholder bg-background-light"
          />
        </div>

        <div>
          <YearSelector
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
          <MonthGrid
            selectedYear={selectedYear}
            selectedMonths={selectedMonths}
            onMonthClick={handleMonthClick}
          />
        </div>
      </div>

      <FilterActions onClear={onClear} onApply={handleApply} t={t} />
    </div>
  );
};
