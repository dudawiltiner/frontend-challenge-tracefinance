import React from 'react';

import { Skeleton } from '../Skeleton';

const DATA_CY_ROOT_SELECTOR = '[data-cy-root]';
const FIRST_DIV_SELECTOR = `${DATA_CY_ROOT_SELECTOR} > div`;
const CUSTOM_CLASS = 'custom-class';

describe('<Skeleton />', () => {
  it('should render skeleton with default variant', () => {
    cy.mount(<Skeleton />);
    cy.get(FIRST_DIV_SELECTOR).should('exist');
    cy.get(FIRST_DIV_SELECTOR).should('have.class', 'h-4');
  });

  it('should render skeleton with text variant', () => {
    cy.mount(<Skeleton variant="text" />);
    cy.get(FIRST_DIV_SELECTOR).should('have.class', 'h-4');
  });

  it('should render skeleton with circular variant', () => {
    cy.mount(<Skeleton variant="circular" />);
    cy.get(FIRST_DIV_SELECTOR).should('have.class', 'rounded-full');
  });

  it('should render skeleton with rectangular variant', () => {
    cy.mount(<Skeleton variant="rectangular" />);
    cy.get(FIRST_DIV_SELECTOR).should('exist');
  });

  it('should accept custom width', () => {
    cy.mount(<Skeleton width="200px" />);
    cy.get(FIRST_DIV_SELECTOR).should('have.css', 'width', '200px');
  });

  it('should accept custom height', () => {
    cy.mount(<Skeleton height="50px" />);
    cy.get(FIRST_DIV_SELECTOR).should('have.css', 'height', '50px');
  });

  it('should accept custom className', () => {
    cy.mount(<Skeleton className={CUSTOM_CLASS} />);
    cy.get(FIRST_DIV_SELECTOR).should('have.class', CUSTOM_CLASS);
  });

  it('should accept numeric width and height', () => {
    cy.mount(<Skeleton width={100} height={50} />);
    cy.get(FIRST_DIV_SELECTOR).should('have.css', 'width', '100px');
    cy.get(FIRST_DIV_SELECTOR).should('have.css', 'height', '50px');
  });
});
