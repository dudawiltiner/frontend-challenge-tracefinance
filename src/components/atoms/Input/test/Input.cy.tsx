import React from 'react';

import { Input } from '../Input';

const CUSTOM_CLASS = 'custom-class';
const INPUT_SELECTOR = 'input';
const BE_VISIBLE = 'be.visible';

describe('<Input />', () => {
  it('should render input with default props', () => {
    cy.mount(<Input placeholder="Enter text" />);
    cy.get(INPUT_SELECTOR).should(BE_VISIBLE);
    cy.get(INPUT_SELECTOR).should('have.attr', 'placeholder', 'Enter text');
  });

  it('should render input with label', () => {
    cy.mount(<Input label="Name" placeholder="Enter name" />);
    cy.contains('label', 'Name').should(BE_VISIBLE);
    cy.get(INPUT_SELECTOR).should(BE_VISIBLE);
  });

  it('should show required indicator when required', () => {
    cy.mount(<Input label="Email" required />);
    cy.contains('label', 'Email').should(BE_VISIBLE);
    cy.contains('*').should(BE_VISIBLE);
  });

  it('should display error message', () => {
    cy.mount(<Input error="This field is required" />);
    cy.contains('This field is required').should(BE_VISIBLE);
    cy.get(INPUT_SELECTOR).should('have.class', 'border-status-error-text');
  });

  it('should display helper text when no error', () => {
    cy.mount(<Input helperText="Enter your email address" />);
    cy.contains('Enter your email address').should(BE_VISIBLE);
  });

  it('should not display helper text when error exists', () => {
    cy.mount(<Input error="Error" helperText="Helper text" />);
    cy.contains('Error').should('be.visible');
    cy.contains('Helper text').should('not.exist');
  });

  it('should accept custom className', () => {
    cy.mount(<Input className={CUSTOM_CLASS} />);
    cy.get(INPUT_SELECTOR).should('have.class', CUSTOM_CLASS);
  });

  it('should handle input value', () => {
    cy.mount(<Input value="test value" onChange={() => {}} />);
    cy.get(INPUT_SELECTOR).should('have.value', 'test value');
  });
});
