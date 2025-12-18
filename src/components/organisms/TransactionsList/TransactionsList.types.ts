import {
  Currency,
  Transaction,
  TransactionStatus,
  TransactionType,
} from '@transaction-types/transaction';

export interface TransactionsListProps {
  transactions: Transaction[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onFetchNextPage: () => void;
  observerTarget: React.RefObject<HTMLDivElement>;
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: TransactionType[];
  onTypeFilterChange: (value: TransactionType[]) => void;
  statusFilter: TransactionStatus | 'ALL';
  onStatusFilterChange: (value: TransactionStatus | 'ALL') => void;
  currencyFilter: Currency[];
  onCurrencyFilterChange: (value: Currency[]) => void;
  showFilterPanel: boolean;
  onShowFilterPanelChange: (value: boolean) => void;
  activeFilter: 'date' | 'method' | 'currency';
  onActiveFilterChange: (value: 'date' | 'method' | 'currency') => void;
  startDate: Date | undefined;
  onStartDateChange: (value: Date | undefined) => void;
  endDate: Date | undefined;
  onEndDateChange: (value: Date | undefined) => void;
  localTypeFilter: TransactionType[];
  onLocalTypeFilterChange: (value: TransactionType[]) => void;
  localCurrencyFilter: Currency[];
  onLocalCurrencyFilterChange: (value: Currency[]) => void;
  filterPanelRef: React.RefObject<HTMLDivElement>;
}
