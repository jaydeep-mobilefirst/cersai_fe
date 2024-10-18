import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SchemeSearchTabsContainer from '../schemeSearchTabs';
import SchemeSearchTab from '../schemeSearchTab';

// Mock the SchemeSearchTab component
jest.mock('./SchemeSearchTab', () => {
  return jest.fn(() => <div data-testid="mocked-scheme-search-tab" />);
});

describe('SchemeSearchTabsContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<SchemeSearchTabsContainer />);
    expect(screen.getByTestId('scheme-search-tabs-container')).toBeInTheDocument();
  });

  it('renders the correct number of SchemeSearchTab components', () => {
    render(<SchemeSearchTabsContainer />);
    const tabs = screen.getAllByTestId('mocked-scheme-search-tab');
    expect(tabs).toHaveLength(4);
  });

  it('passes the correct props to SchemeSearchTab components', () => {
    render(<SchemeSearchTabsContainer />);
    
    expect(SchemeSearchTab).toHaveBeenCalledWith(
      {
        text: 'Scheme Registered',
        value: undefined,
        bgColor: true,
      },
      expect.anything()
    );

    expect(SchemeSearchTab).toHaveBeenCalledWith(
      {
        text: 'Banned',
        value: undefined,
        bgColor: false,
      },
      expect.anything()
    );

    expect(SchemeSearchTab).toHaveBeenCalledWith(
      {
        text: 'Active',
        value: undefined,
        bgColor: true,
      },
      expect.anything()
    );

    expect(SchemeSearchTab).toHaveBeenCalledWith(
      {
        text: 'Under litigation',
        value: undefined,
        bgColor: false,
      },
      expect.anything()
    );
  });

  it('renders with the correct CSS classes', () => {
    render(<SchemeSearchTabsContainer />);
    const container = screen.getByTestId('scheme-search-tabs-container');
    expect(container).toHaveClass('bg-[#E7F0FF]');
    expect(container).toHaveClass('rounded-[24px]');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('gap-8');
    expect(container).toHaveClass('flex-wrap');
    expect(container).toHaveClass('px-[26px]');
    expect(container).toHaveClass('py-[24px]');
    expect(container).toHaveClass('2xl:justify-between');
  });
});