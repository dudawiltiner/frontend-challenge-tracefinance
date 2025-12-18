import React from 'react';

import { ErrorBoundary } from '../ErrorBoundary';

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('<ErrorBoundary />', () => {
  it('should render children when there is no error', () => {
    cy.mount(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );
    cy.contains('Test content').should('be.visible');
  });

  it('should render fallback when error occurs', () => {
    cy.mount(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );
    cy.contains('No error').should('be.visible');
  });
});
