import React from 'react';

import { Table } from '../Table';
import { TableColumn } from '../Table.types';

interface TestData extends Record<string, unknown> {
  id: string;
  name: string;
  age: number;
}

const CUSTOM_CLASS_NAME = 'custom-class';

const MOCK_COLUMNS: TableColumn<TestData>[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
];

const MOCK_DATA: TestData[] = [
  { id: '1', name: 'John', age: 30 },
  { id: '2', name: 'Jane', age: 25 },
];
const TABLE_SELECTOR = 'table';
const TBODY_TR_SELECTOR = 'tbody tr';
const THEAD_SELECTOR = 'thead';
const THEAD_TR_SELECTOR = 'thead tr';
const THEAD_TH_SELECTOR = 'thead th';
const BE_VISIBLE = 'be.visible';
const HAVE_LENGTH = 'have.length';

describe('<Table />', () => {
  it('should render table with data', () => {
    cy.mount(<Table columns={MOCK_COLUMNS} data={MOCK_DATA} />);
    cy.get(TABLE_SELECTOR).should(BE_VISIBLE);
    cy.contains('ID').should(BE_VISIBLE);
    cy.contains('Name').should(BE_VISIBLE);
    cy.contains('Age').should(BE_VISIBLE);
  });

  it('should render table rows', () => {
    cy.mount(<Table columns={MOCK_COLUMNS} data={MOCK_DATA} />);
    cy.get(TBODY_TR_SELECTOR).should(HAVE_LENGTH, 2);
    cy.contains('John').should(BE_VISIBLE);
    cy.contains('Jane').should(BE_VISIBLE);
  });

  it('should render empty message when data is empty', () => {
    cy.mount(<Table columns={MOCK_COLUMNS} data={[]} />);
    cy.contains('Nenhum dado disponível').should(BE_VISIBLE);
  });

  it('should render custom empty message', () => {
    cy.mount(
      <Table columns={MOCK_COLUMNS} data={[]} emptyMessage="No records found" />
    );
    cy.contains('No records found').should(BE_VISIBLE);
  });

  it('should render custom cell content with render function', () => {
    const columnsWithRender: TableColumn<TestData>[] = [
      { key: 'id', label: 'ID' },
      {
        key: 'name',
        label: 'Name',
        render: (value) => <strong>{String(value)}</strong>,
      },
    ];

    cy.mount(<Table columns={columnsWithRender} data={MOCK_DATA} />);
    cy.contains('John').should(BE_VISIBLE);
  });

  it('should accept custom className', () => {
    cy.mount(
      <Table
        columns={MOCK_COLUMNS}
        data={MOCK_DATA}
        className={CUSTOM_CLASS_NAME}
      />
    );
    cy.get(`.${CUSTOM_CLASS_NAME}`).should('exist');
  });

  it('should render table headers', () => {
    cy.mount(<Table columns={MOCK_COLUMNS} data={MOCK_DATA} />);
    cy.get(THEAD_SELECTOR).should(BE_VISIBLE);
    cy.get(THEAD_TR_SELECTOR).should(HAVE_LENGTH, 1);
    cy.get(THEAD_TH_SELECTOR).should(HAVE_LENGTH, 3);
  });
});
