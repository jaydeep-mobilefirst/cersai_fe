import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectButtonV2 from '../SelectButtonV2';

const mockSetOption = jest.fn();
const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('SelectButtonV2', () => {
  beforeEach(() => {
    mockSetOption.mockClear();
  });



  it('renders selected options in multiselect mode', () => {
    const allSelectedOptions = [{ value: '1', label: 'Option 1' }];
    render(
      <SelectButtonV2
        setOption={mockSetOption}
        options={options}
        placeholder="Select options"
        multiselect={true}
        allSelectedOptions={allSelectedOptions}
      />
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });


  it('removes selected option in multiselect mode when clicking the remove button', () => {
    const mockRemove = jest.fn();
    const allSelectedOptions = [{ value: '1', label: 'Option 1' }];
    render(
      <SelectButtonV2
        setOption={mockSetOption}
        options={options}
        multiselect={true}
        allSelectedOptions={allSelectedOptions}
        remove={mockRemove} placeholder={''}      />
    );

    const removeButton = screen.getByText('X');
    fireEvent.click(removeButton);
    expect(mockRemove).toHaveBeenCalledWith({ value: '1', label: 'Option 1' });
  });
});
