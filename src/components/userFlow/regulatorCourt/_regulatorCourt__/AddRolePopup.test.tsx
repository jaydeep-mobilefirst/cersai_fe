import { render, screen, fireEvent } from "@testing-library/react";
import AddRolePopup from "../AddRolePopup";
import RoleSuccessPopup from "../RoleSuccessPopup";
import React from "react";

// Mock RoleSuccessPopup component
jest.mock("./RoleSuccessPopup", () => ({ closePopup }: any) => (
  <div data-testid="success-popup">
    <button onClick={closePopup}>Close Success Popup</button>
  </div>
));

describe("AddRolePopup Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test("renders the form and UI elements correctly", () => {
    render(<AddRolePopup onClose={mockOnClose} />);

    expect(screen.getByText("Add new role")).toBeInTheDocument();
    expect(screen.getByLabelText("Role")).toBeInTheDocument();
    expect(screen.getByLabelText("Functionalities mapped")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test("handles role input change", () => {
    render(<AddRolePopup onClose={mockOnClose} />);

    const roleInput = screen.getByPlaceholderText("Type input");
    fireEvent.change(roleInput, { target: { value: "Admin" } });

    expect(roleInput).toHaveValue("Admin");
  });

  test("handles role functionality dropdown change", () => {
    render(<AddRolePopup onClose={mockOnClose} />);

    const dropdown = screen.getByLabelText("Functionalities mapped");
    fireEvent.change(dropdown, { target: { value: "Functionality 2" } });

    expect(dropdown).toHaveValue("Functionality 2");
  });

  test("displays the success popup when save is clicked and role functionality is selected", () => {
    render(<AddRolePopup onClose={mockOnClose} />);

    const dropdown = screen.getByLabelText("Functionalities mapped");
    fireEvent.change(dropdown, { target: { value: "Functionality 1" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(screen.getByTestId("success-popup")).toBeInTheDocument();
  });

  test("does not display the success popup when role functionality is not selected", () => {
    render(<AddRolePopup onClose={mockOnClose} />);

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(screen.queryByTestId("success-popup")).not.toBeInTheDocument();
  });

  test("closes the AddRolePopup when the cancel button is clicked", () => {
    render(<AddRolePopup onClose={mockOnClose} />);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("closes the success popup when the close button inside it is clicked", () => {
    render(<AddRolePopup onClose={mockOnClose} />);

    // Set the role functionality to open the success popup
    const dropdown = screen.getByLabelText("Functionalities mapped");
    fireEvent.change(dropdown, { target: { value: "Functionality 1" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    // Close success popup
    const closeSuccessPopupButton = screen.getByText("Close Success Popup");
    fireEvent.click(closeSuccessPopupButton);

    expect(screen.queryByTestId("success-popup")).not.toBeInTheDocument();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
