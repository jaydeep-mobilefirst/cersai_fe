import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EditRolePopup from "../EditRolePopup";

describe("EditRolePopup", () => {
    const roleData = {
        sno: "1",
        depositTakerName: "Test Role",
        status: "Active",
        action: true,
    };

    it("renders without errors", () => {
        render(<EditRolePopup roleData={roleData} onClose={() => {}} />);
    });

    it("displays the role name correctly", () => {
        const { getByLabelText } = render(
            <EditRolePopup roleData={roleData} onClose={() => {}} />
        );
        const roleNameInput = getByLabelText("Role") as HTMLInputElement;
        expect(roleNameInput.value).toBe(roleData.depositTakerName);
    });
    
    it("updates the role name when input value changes", () => {
        const { getByLabelText } = render(
            <EditRolePopup roleData={roleData} onClose={() => {}} />
        );
        const roleNameInput = getByLabelText("Role") as HTMLInputElement;
        fireEvent.change(roleNameInput, { target: { value: "New Role" } });
        expect(roleNameInput.value).toBe("New Role");
    });
    
    it("displays the functionality dropdown correctly", () => {
        const { getByLabelText } = render(
            <EditRolePopup roleData={roleData} onClose={() => {}} />
        );
        const functionalityDropdown = getByLabelText("Functionalities mapped") as HTMLSelectElement;
        expect(functionalityDropdown.value).toBe("");
    });

    it("updates the selected functionality when dropdown value changes", () => {
        const { getByLabelText } = render(
            <EditRolePopup roleData={roleData} onClose={() => {}} />
        );
        const functionalityDropdown = getByLabelText("Functionalities mapped") as HTMLSelectElement;
        fireEvent.change(functionalityDropdown, {
            target: { value: "Functionality 2" },
        });
        expect(functionalityDropdown.value).toBe("Functionality 2");
    });
    it("calls the onClose function when Cancel button is clicked", () => {
        const onClose = jest.fn();
        const { getByText } = render(
            <EditRolePopup roleData={roleData} onClose={onClose} />
        );
        const cancelButton = getByText("Cancel");
        fireEvent.click(cancelButton);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls the handleSave function when Save button is clicked", () => {
        const { getByText } = render(
            <EditRolePopup roleData={roleData} onClose={() => {}} />
        );
        const saveButton = getByText("Save");
        fireEvent.click(saveButton);
        // Add your assertions for handleSave function here
    });
});
