import React from 'react';

import { FilterBadge } from '../FilterBadge';

const FILTER_PIX_LABEL = 'Filter: PIX';
const BUTTON_SELECTOR = 'button';
const CUSTOM_CLASS = 'custom-class';

describe('<FilterBadge />', () => {
  it('should render filter badge with label', () => {
    cy.mount(<FilterBadge label={FILTER_PIX_LABEL} />);
    cy.contains(FILTER_PIX_LABEL).should('be.visible');
  });

  it('should render filter badge without remove button when onRemove is not provided', () => {
    cy.mount(<FilterBadge label={FILTER_PIX_LABEL} />);
    cy.contains(FILTER_PIX_LABEL).should('be.visible');
    cy.get(BUTTON_SELECTOR).should('not.exist');
  });

  it('should render filter badge with remove button when onRemove is provided', () => {
    const onRemove = cy.stub();
    cy.mount(<FilterBadge label={FILTER_PIX_LABEL} onRemove={onRemove} />);
    cy.contains(FILTER_PIX_LABEL).should('be.visible');
    cy.get(BUTTON_SELECTOR).should('be.visible');
  });

  it('should call onRemove when remove button is clicked', () => {
    const onRemove = cy.stub();
    cy.mount(<FilterBadge label={FILTER_PIX_LABEL} onRemove={onRemove} />);
    cy.get(BUTTON_SELECTOR).click();
    cy.wrap(onRemove).should('have.been.called');
  });

  it('should accept custom className', () => {
    cy.mount(<FilterBadge label="Filter" className={CUSTOM_CLASS} />);
    cy.get(`.${CUSTOM_CLASS}`).should('exist');
  });
});
