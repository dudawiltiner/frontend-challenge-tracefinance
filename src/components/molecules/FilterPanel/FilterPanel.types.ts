import { ReactNode } from 'react';

export type FilterType = 'date' | 'method' | 'currency';

export interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilter: FilterType;
  onFilterSelect: (filter: FilterType) => void;
  children: ReactNode;
}
