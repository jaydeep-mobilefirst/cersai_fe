import { render, screen, fireEvent } from "@testing-library/react";
import AddRolePopup from "../AddRolePopup";
import React from "react";

describe("AddRolePopup", () => {
    test("renders AddRolePopup component", () => {
        render(<AddRolePopup onClose={() => {}} functionalities={[]} entityType="DT" />);
        const addRolePopupElement = screen.getByText(/Add new role/i);
        expect(addRolePopupElement).toBeInTheDocument();
    });

    test("calls onClose when Cancel button is clicked", () => {
        const onCloseMock = jest.fn();
        render(<AddRolePopup onClose={onCloseMock} functionalities={[]} entityType="DT" />);
        const cancelButton = screen.getByText(/Cancel/i);
        fireEvent.click(cancelButton);
        expect(onCloseMock).toHaveBeenCalled();
    });

    test("displays error message when no role name is entered", () => {
        render(<AddRolePopup onClose={() => {}} functionalities={[]} entityType="DT" />);
        const saveButton = screen.getByText(/Save/i);
        fireEvent.click(saveButton);
        const errorMessage = screen.getByText(/Please enter name/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test("displays error message when no functionality is selected", () => {
        render(<AddRolePopup onClose={() => {}} functionalities={[]} entityType="DT" />);
        const saveButton = screen.getByText(/Save/i);
        fireEvent.click(saveButton);
        const errorMessage = screen.getByText(/Please select at least 1 functionality/i);
        expect(errorMessage).toBeInTheDocument();
    });

    // Add more test cases as needed...
});

