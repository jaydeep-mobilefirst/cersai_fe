import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactTable from '../ReactTable'; // Adjust the path as needed

// Sample column definition for the table
const columns = [
  {
    header: 'Name',
    footer: 'Name Footer',
    accessorKey: 'name',
  },
  {
    header: 'Age',
    footer: 'Age Footer',
    accessorKey: 'age',
  },
];

// Sample data for the table
const defaultData = [
  { name: 'John Doe', age: 28 },
  { name: 'Jane Doe', age: 26 },
];

describe('ReactTable Component', () => {
  test('renders table body with data-testid', () => {
    render(
      <ReactTable
        columns={columns}
        defaultData={defaultData}
        borderB={true}
        lineHeight={false}
      />
    );

    // Assert that the table body is rendered with the data-testid
    const tableBody = screen.getByTestId('table-body');
    expect(tableBody).toBeInTheDocument();
  });

  test('renders correct number of rows', () => {
    render(
      <ReactTable
        columns={columns}
        defaultData={defaultData}
        borderB={true}
        lineHeight={false}
      />
    );

    // Assert that the correct number of rows are rendered
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(4); // 1 for header + 2 for data rows
  });
});
