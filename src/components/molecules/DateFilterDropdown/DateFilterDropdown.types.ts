export interface DateFilterDropdownProps {
  startDate?: Date;
  endDate?: Date;
  onApply: (start: Date, end: Date) => void;
  onClear?: () => void;
}
