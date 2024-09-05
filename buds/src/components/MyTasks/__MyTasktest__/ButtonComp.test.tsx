import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ButtonComp from "../ButtonComp";

describe("ButtonComp", () => {
    it("should call onClose when Cancel button is clicked", () => {
        const onCloseMock = jest.fn();
        const { getByText } = render(<ButtonComp onClose={onCloseMock} />);
        const cancelButton = getByText("Cancel");
        fireEvent.click(cancelButton);
        expect(onCloseMock).toHaveBeenCalled();
    });

    it("should call handleSave when Save button is clicked", () => {
        const handleSaveMock = jest.fn();
        const { getByText } = render(<ButtonComp onClose={() => {}} handleSave={handleSaveMock} />);
        const saveButton = getByText("Save");
        fireEvent.click(saveButton);
        expect(handleSaveMock).toHaveBeenCalled();
    });

    // Add more test cases as needed
});

