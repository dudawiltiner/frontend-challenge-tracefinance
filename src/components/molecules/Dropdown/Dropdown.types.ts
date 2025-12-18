import { ReactNode } from 'react';

export interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  trigger: ReactNode;
  className?: string;
}
