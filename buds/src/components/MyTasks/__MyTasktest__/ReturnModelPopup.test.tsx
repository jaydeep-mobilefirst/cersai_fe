import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ReturnModelPopup from "../ReturnModelPopup";

describe("ReturnModelPopup", () => {
    it("should render without errors", () => {
        render(<ReturnModelPopup onClose={() => {}} onSave={() => {}} />);
    });

    it("should call onClose when modal is closed", () => {
        const onCloseMock = jest.fn();
        const { getByLabelText } = render(
            <ReturnModelPopup onClose={onCloseMock} onSave={() => {}} />
        );

        fireEvent.click(getByLabelText("modal close button"));

        expect(onCloseMock).toHaveBeenCalled();
    });

    it("should call onSave when form is submitted", () => {
        const onSaveMock = jest.fn();
        const { getByLabelText, getByText } = render(
            <ReturnModelPopup onClose={() => {}} onSave={onSaveMock} />
        );

        fireEvent.change(getByLabelText("Return Reasons"), {
            target: { value: "Some reason" },
        });
        fireEvent.change(getByLabelText("Reasons"), {
            target: { value: "Some remarks" },
        });
        fireEvent.click(getByText("Submit & return"));

        expect(onSaveMock).toHaveBeenCalled();
    });
});
