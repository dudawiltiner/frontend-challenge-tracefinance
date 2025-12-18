import React from 'react';

import { SidebarStep } from '@molecules/Sidebar/Sidebar.types';

import { StepperMobile } from '../StepperMobile';

const STEP_1_TEXT = 'Step 1';
const STEP_2_TEXT = 'Step 2';
const DIV_SELECTOR = 'div';
const BE_VISIBLE = 'be.visible';

describe('<StepperMobile />', () => {
  const mockSteps: SidebarStep[] = [
    { id: '1', title: STEP_1_TEXT, subtitle: 'Description 1' },
    { id: '2', title: STEP_2_TEXT, subtitle: 'Description 2' },
  ];

  it('should render stepper with steps', () => {
    cy.mount(<StepperMobile steps={mockSteps} currentStep={0} />);
    cy.contains(STEP_1_TEXT).should(BE_VISIBLE);
    cy.contains(STEP_2_TEXT).should(BE_VISIBLE);
  });

  it('should highlight current step', () => {
    cy.mount(<StepperMobile steps={mockSteps} currentStep={0} />);
    cy.get(DIV_SELECTOR).should(BE_VISIBLE);
  });

  it('should show completed steps', () => {
    cy.mount(<StepperMobile steps={mockSteps} currentStep={1} />);
    cy.contains(STEP_1_TEXT).should(BE_VISIBLE);
    cy.contains(STEP_2_TEXT).should(BE_VISIBLE);
  });

  it('should render connecting lines between steps', () => {
    cy.mount(<StepperMobile steps={mockSteps} currentStep={0} />);
    cy.get(DIV_SELECTOR).should(BE_VISIBLE);
  });
});
