import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UmTabsItem from '../UmTabItems';

describe('UmTabsItem', () => {
  test('renders text correctly', () => {
    const text = 'Test Text';
    const { getByText } = render(<UmTabsItem text={text} isActive={false} onClick={() => {}} />);
    const textElement = getByText(text);
    expect(textElement).toBeInTheDocument();
  });

  test('applies active styles when isActive is true', () => {
    const text = 'Test Text';
    const { container } = render(<UmTabsItem text={text} isActive={true} onClick={() => {}} />);
    
    // Get the div inside the li that contains the active styles
    const activeDiv = container.querySelector('div');

    expect(activeDiv).toHaveClass('text-[#1C468E]');
    expect(activeDiv).toHaveClass('font-bold');

    // Check the bottom bar
    const bottomBar = container.querySelector('div.self-stretch');
    expect(bottomBar).toHaveClass('bg-[#1C468E]');
  });

  test('applies inactive styles when isActive is false', () => {
    const text = 'Test Text';
    const { container } = render(<UmTabsItem text={text} isActive={false} onClick={() => {}} />);
    
    // Get the div inside the li that contains the inactive styles
    const inactiveDiv = container.querySelector('div');

    expect(inactiveDiv).not.toHaveClass('text-[#1C468E]');
    expect(inactiveDiv).toHaveClass('text-[#666666]');

    // Check the bottom bar
    const bottomBar = container.querySelector('div.self-stretch');
    expect(bottomBar).toHaveClass('bg-white');
  });

  test('calls onClick function when clicked', () => {
    const text = 'Test Text';
    const onClick = jest.fn();
    const { getByText } = render(<UmTabsItem text={text} isActive={false} onClick={onClick} />);
    const listItem = getByText(text);
    fireEvent.click(listItem);
    expect(onClick).toHaveBeenCalled();
  });
});
