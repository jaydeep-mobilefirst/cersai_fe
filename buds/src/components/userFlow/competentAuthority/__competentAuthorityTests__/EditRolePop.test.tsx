import { render, screen, fireEvent } from "@testing-library/react";
import EditRolePopup from "../EditRolePopup";
import React from "react";

describe("EditRolePopup", () => {
    const roleData = {
        sno: "1",
        depositTakerName: "Test Role",
        status: "Active",
        action: true,
    };

    it("should render the EditRolePopup component", () => {
        render(<EditRolePopup roleData={roleData} onClose={() => {}} />);
        // Add your assertions here
    });

    it("should update the role name when input value changes", () => {
        render(<EditRolePopup roleData={roleData} onClose={() => {}} />);
        const roleNameInput = screen.getByLabelText("Role *");
        fireEvent.change(roleNameInput, { target: { value: "New Role" } });
        // Add your assertions here
    });

    it("should update the selected functionality when dropdown value changes", () => {
        render(<EditRolePopup roleData={roleData} onClose={() => {}} />);
        const functionalityDropdown = screen.getByLabelText("Functionalities mapped *");
        fireEvent.change(functionalityDropdown, { target: { value: "Functionality 2" } });
        // Add your assertions here
    });

    it("should display an error message if role name is empty", () => {
        render(<EditRolePopup roleData={roleData} onClose={() => {}} />);
        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);
        // Add your assertions here
    });

    it("should display an error message if no functionality is selected", () => {
        render(<EditRolePopup roleData={roleData} onClose={() => {}} />);
        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);
        // Add your assertions here
    });

    it("should open the success popup when save button is clicked with valid inputs", () => {
        render(<EditRolePopup roleData={roleData} onClose={() => {}} />);
        const roleNameInput = screen.getByLabelText("Role *");
        const functionalityDropdown = screen.getByLabelText("Functionalities mapped *");
        const saveButton = screen.getByText("Save");

        fireEvent.change(roleNameInput, { target: { value: "New Role" } });
        fireEvent.change(functionalityDropdown, { target: { value: "Functionality 2" } });
        fireEvent.click(saveButton);

        // Add your assertions here
    });
});
