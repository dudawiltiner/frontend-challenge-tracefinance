/// <reference types="cypress" />
import { mount } from 'cypress/react';

declare global {
  // eslint-disable-next-line no-var
  var cy: Cypress.cy & typeof Cypress;

  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

export {};
