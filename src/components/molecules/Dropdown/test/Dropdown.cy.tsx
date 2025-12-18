import React from 'react';

import { Button } from '@atoms/Button';

import { Dropdown } from '../Dropdown';

describe('<Dropdown />', () => {
  it('should render dropdown trigger', () => {
    const onClose = cy.stub();
    cy.mount(
      <Dropdown
        isOpen={false}
        onClose={onClose}
        trigger={<Button>Open</Button>}
      >
        <div>Dropdown content</div>
      </Dropdown>
    );
    cy.contains('Open').should('be.visible');
  });

  it('should show dropdown content when isOpen is true', () => {
    const onClose = cy.stub();
    cy.mount(
      <Dropdown isOpen={true} onClose={onClose} trigger={<Button>Open</Button>}>
        <div>Dropdown content</div>
      </Dropdown>
    );
    cy.contains('Dropdown content').should('be.visible');
  });

  it('should hide dropdown content when isOpen is false', () => {
    const onClose = cy.stub();
    cy.mount(
      <Dropdown
        isOpen={false}
        onClose={onClose}
        trigger={<Button>Open</Button>}
      >
        <div>Dropdown content</div>
      </Dropdown>
    );
    cy.contains('Dropdown content').should('not.exist');
  });

  it('should accept custom className', () => {
    const onClose = cy.stub();
    cy.mount(
      <Dropdown
        isOpen={false}
        onClose={onClose}
        trigger={<Button>Open</Button>}
        className="custom-class"
      >
        <div>Content</div>
      </Dropdown>
    );
    cy.get('.custom-class').should('exist');
  });
});
