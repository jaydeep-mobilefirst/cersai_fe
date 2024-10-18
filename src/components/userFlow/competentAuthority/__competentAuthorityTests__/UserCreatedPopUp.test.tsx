import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserCreatedPopUp from "../UserCreatedPopUp";

describe("UserCreatedPopUp", () => {
    test("renders UserCreatedPopUp component", () => {
        render(<UserCreatedPopUp closePopup={() => {}} SuccessPopup={() => {}} />);
        
        // Assert that the component renders without throwing any errors
        expect(screen.getByText("User Created Successfully")).toBeInTheDocument();
    });

    test("calls closePopup when the add image is clicked", () => {
        const closePopupMock = jest.fn();
        render(<UserCreatedPopUp closePopup={closePopupMock} SuccessPopup={() => {}} />);
        
        // Simulate a click on the add image
        fireEvent.click(screen.getByAltText("cross"));
        
        // Assert that the closePopup function is called
        expect(closePopupMock).toHaveBeenCalled();
    });

    test("calls SuccessPopup when the Okay button is clicked", () => {
        const SuccessPopupMock = jest.fn();
        render(<UserCreatedPopUp closePopup={() => {}} SuccessPopup={SuccessPopupMock} />);
        
        // Simulate a click on the Okay button
        fireEvent.click(screen.getByText("Okay"));
        
        // Assert that the SuccessPopup function is called
        expect(SuccessPopupMock).toHaveBeenCalled();
    });
});
