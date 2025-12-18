import React from 'react';

import { PageLoader } from '../PageLoader';

const FIXED_DIV_SELECTOR = 'div.fixed';
const DIV_SELECTOR = 'div';

describe('<PageLoader />', () => {
  it('should render page loader', () => {
    cy.mount(<PageLoader />);
    cy.get(DIV_SELECTOR).should('be.visible');
  });

  it('should display loading text', () => {
    cy.mount(<PageLoader />);
    cy.contains('Carregando').should('be.visible');
  });

  it('should have fixed positioning', () => {
    cy.mount(<PageLoader />);
    cy.get(FIXED_DIV_SELECTOR).should('exist');
  });

  it('should have flex centering', () => {
    cy.mount(<PageLoader />);
    cy.get(FIXED_DIV_SELECTOR).should('have.class', 'flex');
    cy.get(FIXED_DIV_SELECTOR).should('have.class', 'items-center');
    cy.get(FIXED_DIV_SELECTOR).should('have.class', 'justify-center');
  });
});
