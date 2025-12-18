'use client';

import React from 'react';

import { ErrorBoundary } from '@organisms/ErrorBoundary';

interface ErrorBoundaryProviderProps {
  children: React.ReactNode;
}

export const ErrorBoundaryProvider: React.FC<ErrorBoundaryProviderProps> = ({
  children,
}) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};
