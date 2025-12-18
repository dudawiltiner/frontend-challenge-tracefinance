import React from 'react';

import { Button } from '../Button';

describe('Button Component', () => {
  it('should render button with text', () => {
    cy.mount(<Button>Click me</Button>);
    cy.contains('Click me').should('be.visible');
  });

  it('should handle click events', () => {
    const onClick = cy.stub();
    cy.mount(<Button onClick={onClick}>Click me</Button>);
    cy.contains('Click me').click();
    cy.wrap(onClick).should('have.been.called');
  });

  it('should be disabled when disabled prop is true', () => {
    cy.mount(<Button disabled>Disabled</Button>);
    cy.contains('Disabled').should('be.disabled');
  });

  it('should apply primary variant styles', () => {
    cy.mount(<Button variant="primary">Primary</Button>);
    cy.contains('Primary').should('have.class', 'bg-primary-500');
  });
});
