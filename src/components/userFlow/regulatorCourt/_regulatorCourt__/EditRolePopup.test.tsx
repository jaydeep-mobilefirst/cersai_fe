import { render, screen, fireEvent } from "@testing-library/react";
import EditRolePopup from "../EditRolePopup";
import React from "react";

const mockRoleData = {
  sno: "1",
  depositTakerName: "Admin Role",
  status: "Active",
  action: true,
};

const texts = {
  title: "Edit Role",
  roleLabel: "Role",
  functionalitiesLabel: "Functionalities mapped",
  cancelButton: "Cancel",
  saveButton: "Save",
  roleNamePlaceholder: "Type Role Name",
  emptyRoleError: "Role name is required.",
  emptyFunctionalityError: "You must select a functionality.",
};

describe("EditRolePopup Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test("renders the EditRolePopup and UI elements correctly", () => {
    render(<EditRolePopup roleData={mockRoleData} onClose={mockOnClose} />);

    expect(screen.getByText(new RegExp(texts.title, "i"))).toBeInTheDocument();
    expect(screen.getByLabelText(new RegExp(texts.roleLabel, "i"))).toBeInTheDocument();
    expect(
      screen.getByLabelText(new RegExp(texts.functionalitiesLabel, "i"))
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(texts.cancelButton, "i"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(texts.saveButton, "i"))).toBeInTheDocument();
  });

  test("pre-fills the role name input with the passed role data", () => {
    render(<EditRolePopup roleData={mockRoleData} onClose={mockOnClose} />);

    const roleInput = screen.getByPlaceholderText(texts.roleNamePlaceholder);
    expect(roleInput).toHaveValue("Admin Role");
  });

  test("handles role name input change", () => {
    render(<EditRolePopup roleData={mockRoleData} onClose={mockOnClose} />);

    const roleInput = screen.getByPlaceholderText(texts.roleNamePlaceholder);
    fireEvent.change(roleInput, { target: { value: "User Role" } });

    expect(roleInput).toHaveValue("User Role");
  });

  test("handles functionality selection from the dropdown", () => {
    render(<EditRolePopup roleData={mockRoleData} onClose={mockOnClose} />);

    const dropdown = screen.getByLabelText(new RegExp(texts.functionalitiesLabel, "i"));
    fireEvent.change(dropdown, { target: { value: "Functionality 2" } });

    expect(dropdown).toHaveValue("Functionality 2");
  });

  test("shows error message when saving with empty role name", () => {
    render(<EditRolePopup roleData={mockRoleData} onClose={mockOnClose} />);

    // Clear the role name field
    const roleInput = screen.getByPlaceholderText(texts.roleNamePlaceholder);
    fireEvent.change(roleInput, { target: { value: "" } });

    const saveButton = screen.getByText(texts.saveButton);
    fireEvent.click(saveButton);

    expect(screen.getByText(texts.emptyRoleError)).toBeInTheDocument();
  });

  test("shows error message when saving without selecting functionality", () => {
    render(<EditRolePopup roleData={mockRoleData} onClose={mockOnClose} />);

    const saveButton = screen.getByText(texts.saveButton);
    fireEvent.click(saveButton);

    expect(screen.getByText(texts.emptyFunctionalityError)).toBeInTheDocument();
  });

  test("triggers success action when role name and functionality are valid", () => {
    render(<EditRolePopup roleData={mockRoleData} onClose={mockOnClose} />);

    const roleInput = screen.getByPlaceholderText(texts.roleNamePlaceholder);
    fireEvent.change(roleInput, { target: { value: "User Role" } });

    const dropdown = screen.getByLabelText(new RegExp(texts.functionalitiesLabel, "i"));
    fireEvent.change(dropdown, { target: { value: "Functionality 1" } });

    const saveButton = screen.getByText(texts.saveButton);
    fireEvent.click(saveButton);

    // Success popup is expected, but since it's not part of this mock, we expect no error messages.
    expect(screen.queryByText(texts.emptyRoleError)).not.toBeInTheDocument();
    expect(screen.queryByText(texts.emptyFunctionalityError)).not.toBeInTheDocument();
  });

  test("closes the EditRolePopup when the cancel button is clicked", () => {
    render(<EditRolePopup roleData={mockRoleData} onClose={mockOnClose} />);

    const cancelButton = screen.getByText(texts.cancelButton);
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
