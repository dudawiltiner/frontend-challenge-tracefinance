'use client';

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

interface MonthGridProps {
  selectedYear: number;
  selectedMonths: Array<{ month: number; year: number }>;
  onMonthClick: (monthIndex: number) => void;
}

export const MonthGrid = ({
  selectedYear,
  selectedMonths,
  onMonthClick,
}: MonthGridProps) => {
  const isMonthSelected = (monthIndex: number) => {
    return selectedMonths.some(
      (m) => m.month === monthIndex && m.year === selectedYear
    );
  };

  const isMonthInRange = (monthIndex: number) => {
    if (selectedMonths.length !== 2) return false;
    const [start, end] = selectedMonths;
    const currentDate = new Date(selectedYear, monthIndex, 1);
    const startDate = new Date(start.year, start.month, 1);
    const endDate = new Date(end.year, end.month, 1);
    return currentDate > startDate && currentDate < endDate;
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {months.map((month, index) => {
        const isSelected = isMonthSelected(index);
        const isInRange = isMonthInRange(index);
        return (
          <button
            key={month}
            onClick={() => onMonthClick(index)}
            className={`px-2 py-1.5 rounded font-sans font-normal text-sm leading-[1.3] transition-colors ${
              isSelected
                ? 'bg-primary-500 text-text-dark'
                : isInRange
                  ? 'bg-primary-50 text-text-dark'
                  : 'bg-background-light text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            {month}
          </button>
        );
      })}
    </div>
  );
};
