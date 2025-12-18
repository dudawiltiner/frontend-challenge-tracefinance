import React from 'react';

export interface TableColumn<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
}
