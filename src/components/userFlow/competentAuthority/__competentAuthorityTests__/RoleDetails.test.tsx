import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoleDetails from '../RoleDetails';

// // Mock the dependencies
// jest.mock('@tanstack/table-core', () => ({
//   createColumnHelper: jest.fn(() => ({
//     accessor: jest.fn(),
//   })),
// }));
// jest.mock('../../userFlow/common/InputField', () => 'InputField');
// jest.mock('../../userFlow/form/TextArea', () => 'TextArea');
// jest.mock('../../userFlow/form/DatePicker', () => 'DatePicker');
// jest.mock('../../userFlow/form/SelectButton', () => 'SelectButton');
// jest.mock('../../userFlow/common/ReactTable', () => 'ReactTable');
// jest.mock('../../../utils/screenSize', () => ({
//   useScreenWidth: jest.fn(() => 1920),
// }));

describe('RoleDetails Component', () => {
  it('renders without crashing', () => {
    render(<RoleDetails />);
    expect(screen.getByText('Scheme Name')).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<RoleDetails />);
    expect(screen.getByText('Scheme Name')).toBeInTheDocument();
    expect(screen.getByText('Scheme Description')).toBeInTheDocument();
    expect(screen.getByText('Scheme Start Date')).toBeInTheDocument();
    expect(screen.getByText('Last day to enter scheme')).toBeInTheDocument();
    expect(screen.getByText('Minimum Investment amount')).toBeInTheDocument();
    expect(screen.getByText('Maximum Investment amount')).toBeInTheDocument();
    expect(screen.getByText('Regulator Name')).toBeInTheDocument();
    expect(screen.getByText('Branch')).toBeInTheDocument();
    expect(screen.getByText('Scheme Act')).toBeInTheDocument();
    expect(screen.getByText('Number of investers')).toBeInTheDocument();
  });

  it('renders ReactTable component', () => {
    render(<RoleDetails />);
    expect(screen.getByText('ReactTable')).toBeInTheDocument();
  });

  it('renders correct column headers', () => {
    render(<RoleDetails />);
    expect(screen.getByText('Sr. No.')).toBeInTheDocument();
    expect(screen.getByText('Branch Name')).toBeInTheDocument();
    expect(screen.getByText('Address Line 1')).toBeInTheDocument();
    expect(screen.getByText('Address Line 2')).toBeInTheDocument();
    expect(screen.getByText('State')).toBeInTheDocument();
    expect(screen.getByText('District')).toBeInTheDocument();
  });

  it('renders SelectButton components with correct props', () => {
    render(<RoleDetails />);
    const selectButtons = screen.getAllByText('SelectButton');
    expect(selectButtons).toHaveLength(4);
    selectButtons.forEach((button) => {
      expect(button).toHaveAttribute('placeholder', 'Select');
      expect(button).toHaveAttribute('showSearchInput', 'true');
    });
  });

  it('renders DatePicker components', () => {
    render(<RoleDetails />);
    const datePickers = screen.getAllByText('DatePicker');
    expect(datePickers).toHaveLength(2);
  });

  it('renders TextArea components with correct props', () => {
    render(<RoleDetails />);
    const textAreas = screen.getAllByText('TextArea');
    expect(textAreas).toHaveLength(2);
    textAreas.forEach((textArea) => {
      expect(textArea).toHaveAttribute('backgroundColor', 'bg-[#F2F2F2]');
    });
  });

  it('renders InputField components with correct props', () => {
    render(<RoleDetails />);
    const inputFields = screen.getAllByText('InputField');
    expect(inputFields).toHaveLength(3);
    inputFields.forEach((inputField) => {
      expect(inputField).toHaveAttribute('className', 'bg-[#F2F2F2]');
    });
  });
});