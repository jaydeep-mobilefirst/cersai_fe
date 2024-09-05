import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SchemeCreationSuccess from "../SchemeCrationSucess";

describe("SchemeCreationSuccess", () => {
    test("renders the success message", () => {
        render(<SchemeCreationSuccess closePopup={() => {}} SuccessPopup={() => {}} />);
        const successMessage = screen.getByText("Scheme Creation Successful");
        expect(successMessage).toBeInTheDocument();
    });

    test("calls closePopup when the close button is clicked", () => {
        const closePopupMock = jest.fn();
        render(<SchemeCreationSuccess closePopup={closePopupMock} SuccessPopup={() => {}} />);
        const closeButton = screen.getByAltText("cross");
        fireEvent.click(closeButton);
        expect(closePopupMock).toHaveBeenCalled();
    });

    test("calls SuccessPopup when the Okay button is clicked", () => {
        const successPopupMock = jest.fn();
        render(<SchemeCreationSuccess closePopup={() => {}} SuccessPopup={successPopupMock} />);
        const okayButton = screen.getByText("Okay");
        fireEvent.click(okayButton);
        expect(successPopupMock).toHaveBeenCalled();
    });
});

