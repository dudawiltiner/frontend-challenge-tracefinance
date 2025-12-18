import React from 'react';

import { FileText } from 'lucide-react';

import { EmptyStateProps } from './EmptyState.types';

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="max-w-md mx-auto">
        <FileText className="mx-auto h-12 w-12 text-neutral-400 dark:text-neutral-500" />
        <h3 className="mt-2 text-sm font-medium text-text-primary">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        )}
        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  );
};
