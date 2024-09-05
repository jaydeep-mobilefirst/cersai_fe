import { render, screen, fireEvent } from "@testing-library/react";
import EditRolePopup from "../EditRolePopup";
import React from "react";

describe("EditRolePopup", () => {
    const roleData = {
        id: "1",
        compositeRoleName: "Admin",
        status: "Active",
        isActive: true,
    };

    const onClose = jest.fn();

    beforeEach(() => {
        render(<EditRolePopup roleData={roleData} onClose={onClose} />);
    });

    test("renders Edit Role title", () => {
        const titleElement = screen.getByText("Edit Role");
        expect(titleElement).toBeInTheDocument();
    });

    test("renders role name input", () => {
        const roleNameInput = screen.getByLabelText("Role *");
        expect(roleNameInput).toBeInTheDocument();
    });

    test("updates role name when input value changes", () => {
        const roleNameInput = screen.getByLabelText("Role *") as HTMLInputElement;
        fireEvent.change(roleNameInput, { target: { value: "New Role" } });
        expect(roleNameInput.value).toBe("New Role");
    });

    test("renders functionality dropdown", () => {
        const functionalityDropdown = screen.getByLabelText("Functionalities mapped *");
        expect(functionalityDropdown).toBeInTheDocument();
    });

    test("updates selected functionality when dropdown value changes", () => {
        const functionalityDropdown = screen.getByLabelText("Functionalities mapped *") as HTMLSelectElement;
        fireEvent.change(functionalityDropdown, { target: { value: "Functionality 2" } });
        expect(functionalityDropdown.value).toBe("Functionality 2");
    });

    test("calls onClose when Cancel button is clicked", () => {
        const cancelButton = screen.getByText("Cancel");
        fireEvent.click(cancelButton);
        expect(onClose).toHaveBeenCalled();
    });

    test("calls handleSave when Save button is clicked", () => {
        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);
        // Add assertions for the expected behavior when Save button is clicked
    });
});

