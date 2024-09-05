import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RoleSuccessPopup from "../RoleSuccessPopup";

describe("RoleSuccessPopup", () => {
    test("renders RoleSuccessPopup component", () => {
        render(<RoleSuccessPopup closePopup={() => {}} SuccessPopup={() => {}} />);
        
        // Assert that the RoleSuccessPopup component is rendered
        const roleSuccessPopup = screen.getByTestId("role-success-popup");
        expect(roleSuccessPopup).toBeInTheDocument();
    });

    test("calls closePopup function when add image is clicked", () => {
        const closePopupMock = jest.fn();
        render(<RoleSuccessPopup closePopup={closePopupMock} SuccessPopup={() => {}} />);
        
        // Simulate a click on the add image
        const addImage = screen.getByAltText("cross");
        fireEvent.click(addImage);
        
        // Assert that the closePopup function is called
        expect(closePopupMock).toHaveBeenCalled();
    });

    test("calls SuccessPopup function when Okay button is clicked", () => {
        const successPopupMock = jest.fn();
        render(<RoleSuccessPopup closePopup={() => {}} SuccessPopup={successPopupMock} />);
        
        // Simulate a click on the Okay button
        const okayButton = screen.getByText("Okay");
        fireEvent.click(okayButton);
        
        // Assert that the SuccessPopup function is called
        expect(successPopupMock).toHaveBeenCalled();
    });
});
