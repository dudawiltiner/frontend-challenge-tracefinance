import React from 'react';

import { Select } from '../Select';

const MOCK_OPTIONS = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];
const CUSTOM_CLASS = 'custom-class';
const SELECT_SELECTOR = 'select';
const SELECT_OPTION_SELECTOR = 'select option';
const BE_VISIBLE = 'be.visible';

describe('<Select />', () => {
  it('should render select with options', () => {
    cy.mount(<Select options={MOCK_OPTIONS} />);
    cy.get(SELECT_SELECTOR).should(BE_VISIBLE);
    cy.get(SELECT_OPTION_SELECTOR).should('have.length', 3);
  });

  it('should render select with label', () => {
    cy.mount(<Select label="Choose option" options={MOCK_OPTIONS} />);
    cy.contains('label', 'Choose option').should(BE_VISIBLE);
    cy.get(SELECT_SELECTOR).should(BE_VISIBLE);
  });

  it('should show required indicator when required', () => {
    cy.mount(<Select label="Category" required options={MOCK_OPTIONS} />);
    cy.contains('label', 'Category').should(BE_VISIBLE);
    cy.contains('*').should(BE_VISIBLE);
  });

  it('should display placeholder option', () => {
    cy.mount(<Select placeholder="Select an option" options={MOCK_OPTIONS} />);
    cy.get(SELECT_OPTION_SELECTOR)
      .first()
      .should('have.text', 'Select an option');
    cy.get(SELECT_OPTION_SELECTOR).first().should('be.disabled');
  });

  it('should display error message', () => {
    cy.mount(<Select error="This field is required" options={MOCK_OPTIONS} />);
    cy.contains('This field is required').should('be.visible');
    cy.get(SELECT_SELECTOR).should('have.class', 'border-status-error-text');
  });

  it('should display helper text when no error', () => {
    cy.mount(<Select helperText="Choose one option" options={MOCK_OPTIONS} />);
    cy.contains('Choose one option').should(BE_VISIBLE);
  });

  it('should accept custom className', () => {
    cy.mount(<Select className={CUSTOM_CLASS} options={MOCK_OPTIONS} />);
    cy.get(SELECT_SELECTOR).should('have.class', CUSTOM_CLASS);
  });

  it('should handle selected value', () => {
    cy.mount(<Select value="2" options={MOCK_OPTIONS} />);
    cy.get(SELECT_SELECTOR).should('have.value', '2');
  });
});
