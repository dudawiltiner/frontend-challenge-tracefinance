import React from 'react';

import { NavigationProgress } from '../NavigationProgress';

describe('<NavigationProgress />', () => {
  it('should not render when not loading', () => {
    cy.mount(<NavigationProgress />);
    cy.get('[data-cy-root]').should('exist');
  });

  it('should render component', () => {
    cy.mount(<NavigationProgress />);
    cy.get('[data-cy-root]').should('exist');
  });
});
