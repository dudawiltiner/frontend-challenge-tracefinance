import React from 'react';

import { Textarea } from '../Textarea';

const CUSTOM_CLASS = 'custom-class';
const TEXTAREA_SELECTOR = 'textarea';
const BE_VISIBLE = 'be.visible';

describe('<Textarea />', () => {
  it('should render textarea with default props', () => {
    cy.mount(<Textarea placeholder="Enter text" />);
    cy.get(TEXTAREA_SELECTOR).should(BE_VISIBLE);
    cy.get(TEXTAREA_SELECTOR).should('have.attr', 'placeholder', 'Enter text');
  });

  it('should render textarea with label', () => {
    cy.mount(<Textarea label="Description" placeholder="Enter description" />);
    cy.contains('label', 'Description').should(BE_VISIBLE);
    cy.get(TEXTAREA_SELECTOR).should(BE_VISIBLE);
  });

  it('should show required indicator when required', () => {
    cy.mount(<Textarea label="Message" required />);
    cy.contains('label', 'Message').should(BE_VISIBLE);
    cy.contains('*').should('be.visible');
  });

  it('should display error message', () => {
    cy.mount(<Textarea error="This field is required" />);
    cy.contains('This field is required').should(BE_VISIBLE);
    cy.get(TEXTAREA_SELECTOR).should('have.class', 'border-status-error-text');
  });

  it('should display helper text when no error', () => {
    cy.mount(<Textarea helperText="Enter your message" />);
    cy.contains('Enter your message').should(BE_VISIBLE);
  });

  it('should not display helper text when error exists', () => {
    cy.mount(<Textarea error="Error" helperText="Helper text" />);
    cy.contains('Error').should(BE_VISIBLE);
    cy.contains('Helper text').should('not.exist');
  });

  it('should accept custom className', () => {
    cy.mount(<Textarea className={CUSTOM_CLASS} />);
    cy.get(TEXTAREA_SELECTOR).should('have.class', CUSTOM_CLASS);
  });

  it('should handle textarea value', () => {
    cy.mount(<Textarea value="test value" onChange={() => {}} />);
    cy.get(TEXTAREA_SELECTOR).should('have.value', 'test value');
  });

  it('should accept rows prop', () => {
    cy.mount(<Textarea rows={5} />);
    cy.get(TEXTAREA_SELECTOR).should('have.attr', 'rows', '5');
  });
});
