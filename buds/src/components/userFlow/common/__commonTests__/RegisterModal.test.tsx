import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RegisterModel from '../RegisterModal';

describe('RegisterModel', () => {
    it('renders without crashing', () => {
        render(<RegisterModel closeModal={() => { } } fetchFormFields={function (): void {
            throw new Error('Function not implemented.');
        } } navigateToSideBarPage={function (): void {
            throw new Error('Function not implemented.');
        } } />);
    });

    it('calls closeModal function when cancel button is clicked', () => {
        const closeModalMock = jest.fn();
        const { getByText } = render(<RegisterModel closeModal={closeModalMock} fetchFormFields={function (): void {
            throw new Error('Function not implemented.');
        } } navigateToSideBarPage={function (): void {
            throw new Error('Function not implemented.');
        } } />);
        const cancelButton = getByText('Cancel');
        fireEvent.click(cancelButton);
        expect(closeModalMock).toHaveBeenCalled();
    });

    it('calls fetchFormFields function and navigateToSideBarPage function when select button is clicked', () => {
        const fetchFormFieldsMock = jest.fn();
        const navigateToSideBarPageMock = jest.fn();
        const { getByText } = render(
            <RegisterModel
                closeModal={() => {}}
                fetchFormFields={fetchFormFieldsMock}
                navigateToSideBarPage={navigateToSideBarPageMock}
            />
        );
        const selectButton = getByText('Select');
        fireEvent.click(selectButton);
        expect(fetchFormFieldsMock).toHaveBeenCalled();
        expect(navigateToSideBarPageMock).toHaveBeenCalled();
    });

    it('renders radio buttons correctly', () => {
        const { getByLabelText } = render(<RegisterModel closeModal={() => { } } fetchFormFields={function (): void {
            throw new Error('Function not implemented.');
        } } navigateToSideBarPage={function (): void {
            throw new Error('Function not implemented.');
        } } />);
        const radioButton = getByLabelText('Deposit Taker');
        expect(radioButton).toBeInTheDocument();
    });

    it('updates the selected radio button when clicked', () => {
        const { getByLabelText } = render(<RegisterModel closeModal={() => { } } fetchFormFields={function (): void {
            throw new Error('Function not implemented.');
        } } navigateToSideBarPage={function (): void {
            throw new Error('Function not implemented.');
        } } />);
        const radioButton = getByLabelText('Deposit Taker') as HTMLInputElement;
        fireEvent.click(radioButton);
        expect(radioButton.checked).toBe(true);
    });
});
