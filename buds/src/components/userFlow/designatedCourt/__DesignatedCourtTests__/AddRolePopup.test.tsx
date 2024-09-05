import { render, screen, fireEvent } from "@testing-library/react";
import AddRolePopup from "../AddRolePopup";
import React from "react";

describe("AddRolePopup", () => {
    test("renders AddRolePopup component", () => {
        render(<AddRolePopup onClose={() => {}} />);
        const addRolePopupElement = screen.getByText("Add new role");
        expect(addRolePopupElement).toBeInTheDocument();
    });

    test("displays role name input field", () => {
        render(<AddRolePopup onClose={() => {}} />);
        const roleNameInput = screen.getByLabelText("Role");
        expect(roleNameInput).toBeInTheDocument();
    });

    test("displays functionality select field", () => {
        render(<AddRolePopup onClose={() => {}} />);
        const functionalitySelect = screen.getByLabelText("Functionalities mapped");
        expect(functionalitySelect).toBeInTheDocument();
    });

    test("displays cancel button", () => {
        render(<AddRolePopup onClose={() => {}} />);
        const cancelButton = screen.getByText("Cancel");
        expect(cancelButton).toBeInTheDocument();
    });

    test("displays save button", () => {
        render(<AddRolePopup onClose={() => {}} />);
        const saveButton = screen.getByText("Save");
        expect(saveButton).toBeInTheDocument();
    });

    test("calls onClose when cancel button is clicked", () => {
        const onCloseMock = jest.fn();
        render(<AddRolePopup onClose={onCloseMock} />);
        const cancelButton = screen.getByText("Cancel");
        fireEvent.click(cancelButton);
        expect(onCloseMock).toHaveBeenCalled();
    });

    test("calls handleSave when save button is clicked", () => {
        const handleSaveMock = jest.fn();
        render(<AddRolePopup onClose={() => {}} />);
        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);
        expect(handleSaveMock).toHaveBeenCalled();
    });
});
