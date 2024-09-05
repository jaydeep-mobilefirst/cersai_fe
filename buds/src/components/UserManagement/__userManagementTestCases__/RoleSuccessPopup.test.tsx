import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RoleSuccessPopup from "../RoleSuccessPopup";

describe("RoleSuccessPopup", () => {
    it("renders without errors", () => {
        render(<RoleSuccessPopup closePopup={() => {}} SuccessPopup={() => {}} />);
    });

    it("calls closePopup when the add image is clicked", () => {
        const closePopupMock = jest.fn();
        const { getByAltText } = render(
            <RoleSuccessPopup closePopup={closePopupMock} SuccessPopup={() => {}} />
        );

        fireEvent.click(getByAltText("cross"));
        expect(closePopupMock).toHaveBeenCalled();
    });

    it("calls SuccessPopup when the Okay button is clicked", () => {
        const SuccessPopupMock = jest.fn();
        const { getByText } = render(
            <RoleSuccessPopup closePopup={() => {}} SuccessPopup={SuccessPopupMock} />
        );

        fireEvent.click(getByText("Okay"));
        expect(SuccessPopupMock).toHaveBeenCalled();
    });
});

