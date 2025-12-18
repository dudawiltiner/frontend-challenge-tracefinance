import React from 'react';

import { TableProps } from './Table.types';

export function Table<
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  columns,
  data,
  emptyMessage = 'Nenhum dado disponível',
  className = '',
}: TableProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-text-tertiary">{emptyMessage}</div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-6 pt-4 pb-3 text-left text-xs font-light text-text-tertiary tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-background-light">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`hover:bg-neutral-50 ${
                rowIndex > 0 ? 'border-t border-neutral-200' : ''
              }`}
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className="px-6 py-4 whitespace-nowrap align-middle"
                >
                  {column.render
                    ? column.render(row[column.key as keyof T], row)
                    : String((row[column.key as keyof T] as unknown) ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
