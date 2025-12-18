import React from 'react';

import { MobileHeader } from '../MobileHeader';

describe('<MobileHeader />', () => {
  it('should render mobile header', () => {
    const onMenuClick = cy.stub();
    cy.mount(<MobileHeader onMenuClick={onMenuClick} />);
    cy.get('div').should('be.visible');
  });

  it('should call onMenuClick when menu button is clicked', () => {
    const onMenuClick = cy.stub();
    cy.mount(<MobileHeader onMenuClick={onMenuClick} />);
    cy.get('button').click();
    cy.wrap(onMenuClick).should('have.been.called');
  });

  it('should display logo', () => {
    const onMenuClick = cy.stub();
    cy.mount(<MobileHeader onMenuClick={onMenuClick} />);
    cy.get('img').should('be.visible');
    cy.get('img').should('have.attr', 'alt', 'Trace Finance');
  });
});
