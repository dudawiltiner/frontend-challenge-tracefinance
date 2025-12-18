import { ReactNode } from 'react';

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}
