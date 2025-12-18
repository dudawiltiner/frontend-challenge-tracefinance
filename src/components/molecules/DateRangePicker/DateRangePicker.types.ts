export interface DateRangePickerProps {
  label?: string;
  startDate?: Date;
  endDate?: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  error?: string;
  className?: string;
}
