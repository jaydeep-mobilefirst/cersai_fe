
// Unit tests for: AddRolePopup


import { fireEvent, render, screen } from '@testing-library/react';
import AddRolePopup from '../AddRolePopup';
import "@testing-library/jest-dom";
import React from "react";

// Mocking RoleSuccessPopup
const MockRoleSuccessPopup: React.FC<{ closePopup: () => void }> = ({ closePopup }) => (
  <div>
    <button onClick={closePopup}>Close Success Popup</button>
  </div>
);

jest.mock("../RoleSuccessPopup", () => MockRoleSuccessPopup as any);

describe('AddRolePopup() AddRolePopup method', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Happy Path Tests
  describe('Happy Path', () => {
    it('should render the AddRolePopup component correctly', () => {
      render(<AddRolePopup onClose={mockOnClose} />);
      expect(screen.getByText('Add new role')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Type input')).toBeInTheDocument();
      expect(screen.getByText('Select functionality')).toBeInTheDocument();
    });

    it('should open success popup when a functionality is selected and save is clicked', () => {
      render(<AddRolePopup onClose={mockOnClose} />);
      fireEvent.change(screen.getByLabelText('Functionalities mapped'), { target: { value: 'Functionality 1' } });
      fireEvent.click(screen.getByText('Save'));
      expect(screen.getByText('Close Success Popup')).toBeInTheDocument();
    });

    it('should close the AddRolePopup when cancel is clicked', () => {
      render(<AddRolePopup onClose={mockOnClose} />);
      fireEvent.click(screen.getByText('Cancel'));
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should close the success popup and AddRolePopup when close button in success popup is clicked', () => {
      render(<AddRolePopup onClose={mockOnClose} />);
      fireEvent.change(screen.getByLabelText('Functionalities mapped'), { target: { value: 'Functionality 1' } });
      fireEvent.click(screen.getByText('Save'));
      fireEvent.click(screen.getByText('Close Success Popup'));
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should not open success popup if no functionality is selected and save is clicked', () => {
      render(<AddRolePopup onClose={mockOnClose} />);
      fireEvent.click(screen.getByText('Save'));
      expect(screen.queryByText('Close Success Popup')).not.toBeInTheDocument();
    });

    it('should handle multiple functionalities and select the correct one', () => {
      render(<AddRolePopup onClose={mockOnClose} />);
      const select = screen.getByLabelText('Functionalities mapped');
      fireEvent.change(select, { target: { value: 'Functionality 2' } });
      expect(select).toHaveValue('Functionality 2');
    });
  });
});

// End of unit tests for: AddRolePopup
