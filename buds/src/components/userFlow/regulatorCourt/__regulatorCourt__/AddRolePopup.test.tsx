import { render, screen, fireEvent } from "@testing-library/react";
import AddRolePopup from "../AddRolePopup";
import React from "react";

describe("AddRolePopup", () => {
    test("renders without error", () => {
        render(<AddRolePopup onClose={() => {}} />);
        // Assert that the component renders without throwing an error
    });

    test("displays 'Add new role' heading", () => {
        render(<AddRolePopup onClose={() => {}} />);
        const headingElement = screen.getByText("Add new role");
        expect(headingElement).toBeInTheDocument();
    });

    test("calls onClose when Cancel button is clicked", () => {
        const onCloseMock = jest.fn();
        render(<AddRolePopup onClose={onCloseMock} />);
        const cancelButton = screen.getByText("Cancel");
        fireEvent.click(cancelButton);
        expect(onCloseMock).toHaveBeenCalled();
    });

    test("calls handleSave when Save button is clicked", () => {
        const handleSaveMock = jest.fn();
        render(<AddRolePopup onClose={() => {}} />);
        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);
        expect(handleSaveMock).toHaveBeenCalled();
    });

    test("opens RoleSuccessPopup when roleFunctionality is not empty", () => {
        render(<AddRolePopup onClose={() => {}} />);
        const selectElement = screen.getByLabelText("Functionalities mapped");
        fireEvent.change(selectElement, { target: { value: "Functionality 1" } });
        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);
        const successPopup = screen.getByText("Role Success Popup");
        expect(successPopup).toBeInTheDocument();
    });
});
