import React from 'react';

import { NextIntlClientProvider } from 'next-intl';

import { DateFilterDropdown } from '../DateFilterDropdown';

const LOCALE_PT_BR = 'pt-BR';
const MOCK_MESSAGES = {
  transactions: {
    filters: {
      apply: 'Aplicar',
      clear: 'Limpar',
    },
  },
};

const getOnApplyStub = () => cy.stub();
const DIV_SELECTOR = 'div';
const BUTTON_SELECTOR = 'button';

const createDateFilterDropdownProps = () => ({
  onApply: getOnApplyStub(),
});

const BE_VISIBLE = 'be.visible';

describe('<DateFilterDropdown />', () => {
  it('should render date filter dropdown', () => {
    const { onApply } = createDateFilterDropdownProps();
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DateFilterDropdown onApply={onApply} />
      </NextIntlClientProvider>
    );
    cy.get(DIV_SELECTOR).should(BE_VISIBLE);
  });

  it('should display year selector', () => {
    const { onApply } = createDateFilterDropdownProps();
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DateFilterDropdown onApply={onApply} />
      </NextIntlClientProvider>
    );
    cy.get(BUTTON_SELECTOR).should(BE_VISIBLE);
  });

  it('should display month grid', () => {
    const { onApply } = createDateFilterDropdownProps();
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DateFilterDropdown onApply={onApply} />
      </NextIntlClientProvider>
    );
    cy.get(DIV_SELECTOR).should(BE_VISIBLE);
  });

  it('should call onApply when apply button is clicked', () => {
    const { onApply } = createDateFilterDropdownProps();
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DateFilterDropdown onApply={onApply} />
      </NextIntlClientProvider>
    );
    cy.get(BUTTON_SELECTOR).contains('Jan').click();
    cy.get(BUTTON_SELECTOR).contains('Feb').click();
    cy.contains('Aplicar').click();
    cy.wrap(onApply).should('have.been.called');
  });

  it('should call onClear when clear button is clicked', () => {
    const { onApply } = createDateFilterDropdownProps();
    const onClear = cy.stub();
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DateFilterDropdown onApply={onApply} onClear={onClear} />
      </NextIntlClientProvider>
    );
    cy.contains('Limpar').click();
    cy.wrap(onClear).should('have.been.called');
  });

  it('should accept startDate and endDate props', () => {
    const { onApply } = createDateFilterDropdownProps();
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-31');
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DateFilterDropdown
          startDate={startDate}
          endDate={endDate}
          onApply={onApply}
        />
      </NextIntlClientProvider>
    );
    cy.get(DIV_SELECTOR).should('be.visible');
  });
});
