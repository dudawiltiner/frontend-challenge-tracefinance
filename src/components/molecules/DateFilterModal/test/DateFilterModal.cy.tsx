import React from 'react';

import { NextIntlClientProvider } from 'next-intl';

import { DateFilterModal } from '../DateFilterModal';

const mockMessages = {};

describe('<DateFilterModal />', () => {
  it('should not render when isOpen is false', () => {
    const onClose = cy.stub();
    const onApply = cy.stub();
    cy.mount(
      <NextIntlClientProvider locale="pt-BR" messages={mockMessages}>
        <DateFilterModal isOpen={false} onClose={onClose} onApply={onApply} />
      </NextIntlClientProvider>
    );
    cy.get('[data-cy-root]').should('exist');
    cy.contains('View transactions of').should('not.exist');
  });

  it('should render when isOpen is true', () => {
    const onClose = cy.stub();
    const onApply = cy.stub();
    cy.mount(
      <NextIntlClientProvider locale="pt-BR" messages={mockMessages}>
        <DateFilterModal isOpen={true} onClose={onClose} onApply={onApply} />
      </NextIntlClientProvider>
    );
    cy.contains('View transactions of').should('be.visible');
  });

  it('should display year selector', () => {
    const onClose = cy.stub();
    const onApply = cy.stub();
    cy.mount(
      <NextIntlClientProvider locale="pt-BR" messages={mockMessages}>
        <DateFilterModal isOpen={true} onClose={onClose} onApply={onApply} />
      </NextIntlClientProvider>
    );
    cy.get('button').should('be.visible');
  });

  it('should call onClose when cancel button is clicked', () => {
    const onClose = cy.stub();
    const onApply = cy.stub();
    cy.mount(
      <NextIntlClientProvider locale="pt-BR" messages={mockMessages}>
        <DateFilterModal isOpen={true} onClose={onClose} onApply={onApply} />
      </NextIntlClientProvider>
    );
    cy.contains('Cancel').click();
    cy.wrap(onClose).should('have.been.called');
  });
});
