import React from 'react';

import { Button } from '@atoms/Button';

import { EmptyState } from '../EmptyState';

const NO_DATA_TITLE = 'No data';
const CUSTOM_CLASS = 'custom-class';
const NO_DATA_FOUND = 'No data found';
const THERE_ARE_NO_ITEMS = 'There are no items to display';
const ADD_ITEM = 'Add Item';
const TEST_TITLE = 'Test';
const TITLE_ONLY = 'Title only';

describe('<EmptyState />', () => {
  it('should render empty state with title', () => {
    cy.mount(<EmptyState title={NO_DATA_FOUND} />);
    cy.contains(NO_DATA_FOUND).should('be.visible');
  });

  it('should render empty state with description', () => {
    cy.mount(
      <EmptyState title={NO_DATA_TITLE} description={THERE_ARE_NO_ITEMS} />
    );
    cy.contains(NO_DATA_TITLE).should('be.visible');
    cy.contains(THERE_ARE_NO_ITEMS).should('be.visible');
  });

  it('should render empty state with action', () => {
    cy.mount(
      <EmptyState title={NO_DATA_TITLE} action={<Button>{ADD_ITEM}</Button>} />
    );
    cy.contains(NO_DATA_TITLE).should('be.visible');
    cy.contains(ADD_ITEM).should('be.visible');
  });

  it('should accept custom className', () => {
    cy.mount(<EmptyState title={TEST_TITLE} className={CUSTOM_CLASS} />);
    cy.get(`.${CUSTOM_CLASS}`).should('exist');
  });

  it('should render without description', () => {
    cy.mount(<EmptyState title={TITLE_ONLY} />);
    cy.contains(TITLE_ONLY).should('be.visible');
  });
});
