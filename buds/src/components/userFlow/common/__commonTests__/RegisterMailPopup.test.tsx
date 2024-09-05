import { render, screen, fireEvent } from "@testing-library/react";
import RegisterMailPopup from "../RegisterMailPopup";
import React from "react";

describe("RegisterMailPopup", () => {
    test("renders without errors", () => {
        render(<RegisterMailPopup closeRegisterMailPopup={function (): void {
            throw new Error("Function not implemented.");
        } } showLoginPopup={function (): void {
            throw new Error("Function not implemented.");
        } } />);
        // Add your assertions here
    });

    test("closes the popup when close button is clicked", () => {
        const closeRegisterMailPopup = jest.fn();
        render(<RegisterMailPopup closeRegisterMailPopup={closeRegisterMailPopup} showLoginPopup={function (): void {
            throw new Error("Function not implemented.");
        } } />);
        const closeButton = screen.getByAltText("CrossIcon");
        fireEvent.click(closeButton);
        expect(closeRegisterMailPopup).toHaveBeenCalled();
    });

    test("navigates to login page when 'Back to Login' is clicked", () => {
        const showLoginPopup = jest.fn();
        render(<RegisterMailPopup showLoginPopup={showLoginPopup} closeRegisterMailPopup={function (): void {
            throw new Error("Function not implemented.");
        } } />);
        const backButton = screen.getByText("Back to Login");
        fireEvent.click(backButton);
        expect(showLoginPopup).toHaveBeenCalled();
    });

    // Add more test cases as needed
});

