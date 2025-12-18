import React from 'react';

import { NextIntlClientProvider } from 'next-intl';

import { DatePicker } from '../DatePicker';

const LOCALE_PT_BR = 'pt-BR';
const MOCK_MESSAGES = {};
const getOnChangeStub = () => cy.stub();
const DATE_INPUT_SELECTOR = 'input[type="date"]';
const DATA_LABEL = 'Data';
const CAMPO_OBRIGATORIO = 'Campo obrigatório';
const SELECIONE_UMA_DATA = 'Selecione uma data';
const CUSTOM_CLASS = 'custom-class';
const BE_VISIBLE = 'be.visible';

const createDatePickerProps = () => ({
  onChange: getOnChangeStub(),
});

describe('<DatePicker />', () => {
  it('should render date picker', () => {
    const { onChange } = createDatePickerProps();
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DatePicker onChange={onChange} />
      </NextIntlClientProvider>
    );
    cy.get(DATE_INPUT_SELECTOR).should(BE_VISIBLE);
  });

  it('should render with label', () => {
    const { onChange } = createDatePickerProps();
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DatePicker label={DATA_LABEL} onChange={onChange} />
      </NextIntlClientProvider>
    );
    cy.contains(DATA_LABEL).should(BE_VISIBLE);
  });

  it('should show required indicator when required', () => {
    const { onChange } = createDatePickerProps();
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DatePicker label={DATA_LABEL} required onChange={onChange} />
      </NextIntlClientProvider>
    );
    cy.contains('*').should(BE_VISIBLE);
  });

  it('should display error message', () => {
    const { onChange } = createDatePickerProps();
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DatePicker error={CAMPO_OBRIGATORIO} onChange={onChange} />
      </NextIntlClientProvider>
    );
    cy.contains(CAMPO_OBRIGATORIO).should(BE_VISIBLE);
  });

  it('should display helper text when no error', () => {
    const { onChange } = createDatePickerProps();
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DatePicker helperText={SELECIONE_UMA_DATA} onChange={onChange} />
      </NextIntlClientProvider>
    );
    cy.contains(SELECIONE_UMA_DATA).should(BE_VISIBLE);
  });

  it('should accept custom className', () => {
    const { onChange } = createDatePickerProps();
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DatePicker className={CUSTOM_CLASS} onChange={onChange} />
      </NextIntlClientProvider>
    );
    cy.get(`.${CUSTOM_CLASS}`).should('exist');
  });

  it('should handle date value', () => {
    const onChange = getOnChangeStub();
    const testDate = new Date('2024-01-15');
    cy.mount(
      <NextIntlClientProvider locale={LOCALE_PT_BR} messages={MOCK_MESSAGES}>
        <DatePicker value={testDate} onChange={onChange} />
      </NextIntlClientProvider>
    );
    cy.get(DATE_INPUT_SELECTOR).should('have.value', '2024-01-15');
  });
});
