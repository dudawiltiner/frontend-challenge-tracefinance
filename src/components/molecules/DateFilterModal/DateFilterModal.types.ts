export interface DateFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (startDate: Date | undefined, endDate: Date | undefined) => void;
  startDate?: Date;
  endDate?: Date;
}
