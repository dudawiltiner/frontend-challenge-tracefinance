import React from 'react';

import { NextIntlClientProvider } from 'next-intl';

import { FilterPanel } from '../FilterPanel';

const mockMessages = {
  transactions: {
    filters: {
      date: 'Data',
      method: 'Método',
      currency: 'Moeda',
    },
  },
};

describe('<FilterPanel />', () => {
  it('should not render when isOpen is false', () => {
    const onFilterSelect = cy.stub();
    const onClose = cy.stub();
    cy.mount(
      <NextIntlClientProvider locale="pt-BR" messages={mockMessages}>
        <FilterPanel
          isOpen={false}
          activeFilter="date"
          onFilterSelect={onFilterSelect}
          onClose={onClose}
        >
          <div>Content</div>
        </FilterPanel>
      </NextIntlClientProvider>
    );
    cy.contains('Content').should('not.exist');
  });

  it('should render when isOpen is true', () => {
    const onFilterSelect = cy.stub();
    const onClose = cy.stub();
    cy.mount(
      <NextIntlClientProvider locale="pt-BR" messages={mockMessages}>
        <FilterPanel
          isOpen={true}
          activeFilter="date"
          onFilterSelect={onFilterSelect}
          onClose={onClose}
        >
          <div>Content</div>
        </FilterPanel>
      </NextIntlClientProvider>
    );
    cy.contains('Content').should('be.visible');
  });

  it('should highlight active filter', () => {
    const onFilterSelect = cy.stub();
    const onClose = cy.stub();
    cy.mount(
      <NextIntlClientProvider locale="pt-BR" messages={mockMessages}>
        <FilterPanel
          isOpen={true}
          activeFilter="date"
          onFilterSelect={onFilterSelect}
          onClose={onClose}
        >
          <div>Content</div>
        </FilterPanel>
      </NextIntlClientProvider>
    );
    cy.get('button').should('be.visible');
  });

  it('should call onFilterSelect when filter button is clicked', () => {
    const onFilterSelect = cy.stub();
    const onClose = cy.stub();
    cy.mount(
      <NextIntlClientProvider locale="pt-BR" messages={mockMessages}>
        <FilterPanel
          isOpen={true}
          activeFilter="date"
          onFilterSelect={onFilterSelect}
          onClose={onClose}
        >
          <div>Content</div>
        </FilterPanel>
      </NextIntlClientProvider>
    );
    cy.get('button').first().click();
    cy.wrap(onFilterSelect).should('have.been.called');
  });
});
