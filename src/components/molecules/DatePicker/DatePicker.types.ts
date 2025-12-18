export interface DatePickerProps {
  label?: string;
  value?: Date;
  onChange: (date: Date) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}
