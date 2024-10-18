import { render, screen, fireEvent } from '@testing-library/react';
import AddRolePopup from '../AddRolePopup';
import React from 'react';

describe('AddRolePopup Component (Static Part)', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(<AddRolePopup onClose={mockOnClose} />);
  });

  test('renders the popup with the correct heading', () => {
    const heading = screen.getByText('Add new role');
    expect(heading).toBeInTheDocument();
  });

  test('renders the role input field with placeholder text', () => {
    const roleInput = screen.getByPlaceholderText('Type input');
    expect(roleInput).toBeInTheDocument();
  });

  test('renders the functionalities dropdown with the correct label', () => {
    const functionalityLabel = screen.getByText('Functionalities mapped');
    expect(functionalityLabel).toBeInTheDocument();
    
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    // Verify default option
    const defaultOption = screen.getByText('Select functionality');
    expect(defaultOption).toBeInTheDocument();
  });

  test('renders all functionality options', () => {
    const option1 = screen.getByText('Functionality 1');
    const option2 = screen.getByText('Functionality 2');
    const option3 = screen.getByText('Functionality 3');

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });

  test('renders the cancel and save buttons', () => {
    const cancelButton = screen.getByText('Cancel');
    const saveButton = screen.getByText('Save');

    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  test('renders the popup container with correct class', () => {
    const popupContainer = screen.getByRole('dialog');
    expect(popupContainer).toHaveClass('fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-200');
  });

  test('clicking the cancel button triggers onClose', () => {
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
