'use client';

import React from 'react';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button } from '@atoms/Button';

import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface ErrorBoundaryScreenProps {
  error: Error | null;
  onReset: () => void;
}

export const ErrorBoundaryScreen: React.FC<ErrorBoundaryScreenProps> = ({
  error,
  onReset,
}) => {
  const t = useTranslations('errorBoundary');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-bg-dark flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-background-light dark:bg-bg-card rounded-lg shadow-lg p-6 md:p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-status-error-bg dark:bg-status-error-bg p-4">
              <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-status-error-text" />
            </div>
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-text-primary dark:text-text-primary mb-3">
            {t('title')}
          </h1>

          <p className="text-sm md:text-base text-text-secondary dark:text-text-secondary mb-6">
            {t('description')}
          </p>

          {process.env.NODE_ENV === 'development' && error && (
            <div className="mb-6 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-left">
              <p className="text-xs md:text-sm font-mono text-status-error-text break-all">
                {error.message || error.toString()}
              </p>
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-xs text-text-secondary dark:text-text-secondary cursor-pointer">
                    {t('showStack')}
                  </summary>
                  <pre className="mt-2 text-xs font-mono text-text-secondary dark:text-text-secondary overflow-auto max-h-40">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button
              onClick={onReset}
              variant="primary"
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {t('retry')}
            </Button>
            <Link href={`/${locale}/transactions`} className="w-full sm:w-auto">
              <Button
                variant="ghost"
                className="w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                {t('goHome')}
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-xs text-text-tertiary dark:text-text-tertiary">
            {t('helpText')}
          </p>
        </div>
      </div>
    </div>
  );
};
