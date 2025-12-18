import React from 'react';

import { FilterModal } from '../FilterModal';

describe('<FilterModal />', () => {
  it('should not render when isOpen is false', () => {
    const onClose = cy.stub();
    cy.mount(
      <FilterModal isOpen={false} onClose={onClose}>
        <div>Content</div>
      </FilterModal>
    );
    cy.contains('Content').should('not.exist');
  });

  it('should render when isOpen is true', () => {
    const onClose = cy.stub();
    cy.mount(
      <FilterModal isOpen={true} onClose={onClose}>
        <div>Content</div>
      </FilterModal>
    );
    cy.contains('Content').should('be.visible');
  });

  it('should display title when provided', () => {
    const onClose = cy.stub();
    cy.mount(
      <FilterModal isOpen={true} onClose={onClose} title="Filter Title">
        <div>Content</div>
      </FilterModal>
    );
    cy.contains('Filter Title').should('be.visible');
  });

  it('should call onClose when backdrop is clicked', () => {
    const onClose = cy.stub();
    cy.mount(
      <FilterModal isOpen={true} onClose={onClose}>
        <div>Content</div>
      </FilterModal>
    );
    cy.get('.fixed.inset-0').first().click({ force: true });
    cy.wrap(onClose).should('have.been.called');
  });

  it('should not call onClose when modal content is clicked', () => {
    const onClose = cy.stub();
    cy.mount(
      <FilterModal isOpen={true} onClose={onClose}>
        <div>Content</div>
      </FilterModal>
    );
    cy.contains('Content').click();
    cy.wrap(onClose).should('not.have.been.called');
  });
});
