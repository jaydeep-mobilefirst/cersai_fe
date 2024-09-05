import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserCreatedPopUp from "../UserCreatedPopUp";

describe("UserCreatedPopUp", () => {
    test("renders UserCreatedPopUp component", () => {
        render(<UserCreatedPopUp closePopup={() => {}} SuccessPopup={() => {}} />);
        
        // Assert that the component is rendered
        const userCreatedPopUpElement = screen.getByTestId("user-created-popup");
        expect(userCreatedPopUpElement).toBeInTheDocument();
    });

    test("calls closePopup when add image is clicked", () => {
        const closePopupMock = jest.fn();
        render(<UserCreatedPopUp closePopup={closePopupMock} SuccessPopup={() => {}} />);
        
        // Simulate a click on the add image
        const addImageElement = screen.getByAltText("cross");
        fireEvent.click(addImageElement);
        
        // Assert that closePopup is called
        expect(closePopupMock).toHaveBeenCalled();
    });

    test("calls SuccessPopup when Okay button is clicked", () => {
        const successPopupMock = jest.fn();
        render(<UserCreatedPopUp closePopup={() => {}} SuccessPopup={successPopupMock} />);
        
        // Simulate a click on the Okay button
        const okayButtonElement = screen.getByText("Okay");
        fireEvent.click(okayButtonElement);
        
        // Assert that SuccessPopup is called
        expect(successPopupMock).toHaveBeenCalled();
    });
});
