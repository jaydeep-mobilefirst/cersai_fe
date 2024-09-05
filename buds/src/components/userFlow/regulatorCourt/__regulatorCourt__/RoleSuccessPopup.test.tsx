import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RoleSuccessPopup from "../RoleSuccessPopup";

describe("RoleSuccessPopup", () => {
    it("renders without crashing", () => {
        render(<RoleSuccessPopup closePopup={() => {}} SuccessPopup={() => {}} />);
    });

    it("calls closePopup when the add image is clicked", () => {
        const closePopupMock = jest.fn();
        const { getByAltText } = render(
            <RoleSuccessPopup closePopup={closePopupMock} SuccessPopup={() => {}} />
        );

        const addImage = getByAltText("cross");
        fireEvent.click(addImage);

        expect(closePopupMock).toHaveBeenCalled();
    });

    it("calls SuccessPopup when the Okay button is clicked", () => {
        const successPopupMock = jest.fn();
        const { getByText } = render(
            <RoleSuccessPopup closePopup={() => {}} SuccessPopup={successPopupMock} />
        );

        const okayButton = getByText("Okay");
        fireEvent.click(okayButton);

        expect(successPopupMock).toHaveBeenCalled();
    });
});

