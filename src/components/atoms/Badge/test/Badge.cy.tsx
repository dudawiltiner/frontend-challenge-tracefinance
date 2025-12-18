import React from 'react';

import { Badge } from '../Badge';

const DEFAULT_BADGE_TEXT = 'Default Badge';
const BADGE_TEXT = 'Badge';
const CUSTOM_CLASS = 'custom-class';
const SUCCESS_TEXT = 'Success';
const WARNING_TEXT = 'Warning';
const DANGER_TEXT = 'Danger';
const CUSTOM_TEXT = 'Custom';
const BE_VISIBLE = 'be.visible';
const HAVE_CLASS = 'have.class';

describe('<Badge />', () => {
  it('should render badge with default props', () => {
    cy.mount(<Badge>{DEFAULT_BADGE_TEXT}</Badge>);
    const badgeElement = cy.contains(DEFAULT_BADGE_TEXT);
    badgeElement.should(BE_VISIBLE);
    badgeElement.should(HAVE_CLASS, 'bg-neutral-100');
  });

  it('should render badge with all variant variations', () => {
    const variants = [
      'default',
      'success',
      'warning',
      'danger',
      'info',
    ] as const;

    variants.forEach((variant) => {
      cy.mount(<Badge variant={variant}>{BADGE_TEXT}</Badge>);
      cy.contains(BADGE_TEXT).should(BE_VISIBLE);
    });
  });

  it('should render success variant', () => {
    cy.mount(<Badge variant="success">{SUCCESS_TEXT}</Badge>);
    cy.contains(SUCCESS_TEXT).should(HAVE_CLASS, 'bg-status-success-bg');
  });

  it('should render warning variant', () => {
    cy.mount(<Badge variant="warning">{WARNING_TEXT}</Badge>);
    cy.contains(WARNING_TEXT).should(HAVE_CLASS, 'bg-status-warning-bg');
  });

  it('should render danger variant', () => {
    cy.mount(<Badge variant="danger">{DANGER_TEXT}</Badge>);
    cy.contains(DANGER_TEXT).should(HAVE_CLASS, 'bg-status-error-bg');
  });

  it('should accept custom className', () => {
    cy.mount(<Badge className={CUSTOM_CLASS}>{CUSTOM_TEXT}</Badge>);
    cy.contains(CUSTOM_TEXT).should(HAVE_CLASS, CUSTOM_CLASS);
  });
});
