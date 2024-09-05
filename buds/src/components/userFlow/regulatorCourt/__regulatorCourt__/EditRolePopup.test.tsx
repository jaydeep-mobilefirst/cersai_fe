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

    it("should render without errors", () => {
        render(<EditRolePopup roleData={roleData} onClose={() => {}} />);
    });

    it("should update the role name when input value changes", () => {
        const { getByLabelText } = render(
            <EditRolePopup roleData={roleData} onClose={() => {}} />
        );

        const roleNameInput = getByLabelText("Role *") as HTMLInputElement;
        fireEvent.change(roleNameInput, { target: { value: "New Role" } });

        expect(roleNameInput.value).toBe("New Role");
    });

    it("should update the selected functionality when dropdown value changes", () => {
        const { getByLabelText } = render(
            <EditRolePopup roleData={roleData} onClose={() => {}} />
        );

        const functionalityDropdown = getByLabelText(
            "Functionalities mapped *"
        ) as HTMLSelectElement;
        fireEvent.change(functionalityDropdown, {
            target: { value: "Functionality 2" },
        });

        expect(functionalityDropdown.value).toBe("Functionality 2");
    });

    it("should call onClose when Cancel button is clicked", () => {
        const onClose = jest.fn();
        const { getByText } = render(
            <EditRolePopup roleData={roleData} onClose={onClose} />
        );

        const cancelButton = getByText("Cancel");
        fireEvent.click(cancelButton);

        expect(onClose).toHaveBeenCalled();
    });

    it("should call handleSave when Save button is clicked", () => {
        const handleSave = jest.fn();
        const { getByText } = render(
            <EditRolePopup roleData={roleData} onClose={() => {}} />
        );

        const saveButton = getByText("Save");
        fireEvent.click(saveButton);

        expect(handleSave).toHaveBeenCalled();
    });
});

