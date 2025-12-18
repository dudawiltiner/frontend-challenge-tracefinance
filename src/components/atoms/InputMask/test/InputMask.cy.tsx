import React from 'react';

import { InputMaskComponent } from '../InputMask';

const CPF_MASK = '999.999.999-99';
const CPF_LABEL = 'CPF';
const ENTER_CPF_PLACEHOLDER = 'Enter CPF';
const INPUT_SELECTOR = 'input';
const BE_VISIBLE = 'be.visible';

describe('<InputMask />', () => {
  it('should render input mask with default props', () => {
    cy.mount(
      <InputMaskComponent mask={CPF_MASK} placeholder={ENTER_CPF_PLACEHOLDER} />
    );
    cy.get(INPUT_SELECTOR).should(BE_VISIBLE);
    cy.get(INPUT_SELECTOR).should(
      'have.attr',
      'placeholder',
      ENTER_CPF_PLACEHOLDER
    );
  });

  it('should render input mask with label', () => {
    cy.mount(
      <InputMaskComponent
        mask={CPF_MASK}
        label={CPF_LABEL}
        placeholder={ENTER_CPF_PLACEHOLDER}
      />
    );
    cy.contains('label', CPF_LABEL).should(BE_VISIBLE);
    cy.get(INPUT_SELECTOR).should(BE_VISIBLE);
  });

  it('should show required indicator when required', () => {
    cy.mount(<InputMaskComponent mask={CPF_MASK} label={CPF_LABEL} required />);
    cy.contains('label', CPF_LABEL).should(BE_VISIBLE);
    cy.contains('*').should(BE_VISIBLE);
  });

  it('should display error message', () => {
    const ERROR_MESSAGE = 'This field is required';
    cy.mount(<InputMaskComponent mask={CPF_MASK} error={ERROR_MESSAGE} />);
    cy.contains(ERROR_MESSAGE).should(BE_VISIBLE);
    cy.get(INPUT_SELECTOR).should('have.class', 'border-status-error-text');
  });

  it('should display helper text when no error', () => {
    const HELPER_TEXT = 'Enter your CPF';
    cy.mount(<InputMaskComponent mask={CPF_MASK} helperText={HELPER_TEXT} />);
    cy.contains(HELPER_TEXT).should(BE_VISIBLE);
  });

  it('should not display helper text when error exists', () => {
    const ERROR_MESSAGE = 'Error';
    const HELPER_TEXT = 'Helper text';
    cy.mount(
      <InputMaskComponent
        mask={CPF_MASK}
        error={ERROR_MESSAGE}
        helperText={HELPER_TEXT}
      />
    );
    cy.contains(ERROR_MESSAGE).should(BE_VISIBLE);
    cy.contains(HELPER_TEXT).should('not.exist');
  });

  it('should accept custom className', () => {
    const CUSTOM_CLASS_NAME = 'custom-class';
    cy.mount(
      <InputMaskComponent mask={CPF_MASK} className={CUSTOM_CLASS_NAME} />
    );
    cy.get(INPUT_SELECTOR).should('have.class', CUSTOM_CLASS_NAME);
  });

  it('should handle mask formatting', () => {
    cy.mount(<InputMaskComponent mask={CPF_MASK} value="12345678901" />);
    cy.get(INPUT_SELECTOR).should('exist');
  });

  it('should handle different mask patterns', () => {
    cy.mount(<InputMaskComponent mask="99/99/9999" placeholder="Date" />);
    cy.get(INPUT_SELECTOR).should(BE_VISIBLE);
  });
});
