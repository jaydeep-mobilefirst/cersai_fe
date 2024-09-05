import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DatePicker from '../DatePicker';

describe('DatePicker', () => {
    it('renders without crashing', () => {
        render(<DatePicker />);
    });

    it('displays the default text when no date is selected', () => {
        const { getByText } = render(<DatePicker />);
        expect(getByText('Select Date')).toBeInTheDocument();
    });

    it('displays the selected date', () => {
        const { getByText, getByLabelText } = render(<DatePicker userValue="2022-01-01" />);
        expect(getByText('2022-01-01')).toBeInTheDocument();
        expect(getByLabelText('Date')).toHaveValue('2022-01-01');
    });

    it('calls the onChange function when a date is selected', () => {
        const handleChange = jest.fn();
        const { getByLabelText } = render(<DatePicker onChange={handleChange} />);
        fireEvent.change(getByLabelText('Date'), { target: { value: '2022-01-01' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
    });

    it('disables the button and input when disabled prop is true', () => {
        const { getByRole, getByLabelText } = render(<DatePicker disabled />);
        expect(getByRole('button')).toBeDisabled();
        expect(getByLabelText('Date')).toBeDisabled();
    });

    it('applies the specified background color', () => {
        const { getByRole } = render(<DatePicker backgroundColor="red" />);
        expect(getByRole('button')).toHaveStyle('background-color: red');
    });
});
