import React from 'react';

import { NextIntlClientProvider } from 'next-intl';

import { DateRangePicker } from '../DateRangePicker';

const LOCALE_PT_BR = 'pt-BR';
const MOCK_MESSAGES = {};
const getOnStartDateChangeStub = () => cy.stub();
const getOnEndDateChangeStub = () => cy.stub();
const DATE_INPUT_SELECTOR = 'input[type="date"]';
const CUSTOM_CLASS = 'custom-class';
const PERIODO_LABEL = 'Período';
const DE_LABEL = 'De';
const ATE_LABEL = 'Até';
const PERIODO_INVALIDO = 'Período inválido';

const createDateRangePickerProps = () => ({
  onStartDateChange: getOnStartDateChangeStub(),
  onEndDateChange: getOnEndDateChangeStub(),
});

describe('<DateRangePicker />', () => {
  it('should render date range picker', () => {
    const { onStartDateChange, onEndDateChange } = createDateRangePickerProps();
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DateRangePicker
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
      </NextIntlClientProvider>
    );
    cy.get(DATE_INPUT_SELECTOR).should('have.length', 2);
  });

  it('should render with label', () => {
    const { onStartDateChange, onEndDateChange } = createDateRangePickerProps();
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DateRangePicker
          label={PERIODO_LABEL}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
      </NextIntlClientProvider>
    );
    cy.contains(PERIODO_LABEL).should('be.visible');
  });

  it('should display start and end date labels', () => {
    const { onStartDateChange, onEndDateChange } = createDateRangePickerProps();
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DateRangePicker
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
      </NextIntlClientProvider>
    );
    cy.contains(DE_LABEL).should('be.visible');
    cy.contains(ATE_LABEL).should('be.visible');
  });

  it('should display error message', () => {
    const { onStartDateChange, onEndDateChange } = createDateRangePickerProps();
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DateRangePicker
          error={PERIODO_INVALIDO}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
      </NextIntlClientProvider>
    );
    cy.contains(PERIODO_INVALIDO).should('be.visible');
  });

  it('should accept custom className', () => {
    const { onStartDateChange, onEndDateChange } = createDateRangePickerProps();
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DateRangePicker
          className={CUSTOM_CLASS}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
      </NextIntlClientProvider>
    );
    cy.get(`.${CUSTOM_CLASS}`).should('exist');
  });
});
