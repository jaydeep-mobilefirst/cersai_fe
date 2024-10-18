import { render, screen, fireEvent } from '@testing-library/react';
import SuccessPopup from '../SuccessPopUp';
import React from 'react';

test('renders SuccessPopup component', () => {
    render(<SuccessPopup closePopup={() => {}} showPopup={() => {}} toggle={true} />);
    const successPopupElement = screen.getByTestId('success-popup');
    expect(successPopupElement).toBeInTheDocument();
});

test('calls closePopup function when Okay button is clicked', () => {
    const closePopupMock = jest.fn();
    render(<SuccessPopup closePopup={closePopupMock} showPopup={() => {}} toggle={true} />);
    const okayButton = screen.getByText('Okay');
    fireEvent.click(okayButton);
    expect(closePopupMock).toHaveBeenCalled();
});
