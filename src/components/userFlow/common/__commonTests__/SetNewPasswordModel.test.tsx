import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SetNewPasswordModel from "../SetNewPasswordModel";

describe("SetNewPasswordModel", () => {
    test("renders without error", () => {
        render(<SetNewPasswordModel handleClose={function (): void {
            throw new Error("Function not implemented.");
        } } />);
        // Assert that the component renders without throwing an error
    });

    test("displays the 'Set new password' title", () => {
        render(<SetNewPasswordModel handleClose={function (): void {
            throw new Error("Function not implemented.");
        } } />);
        const titleElement = screen.getByText("Set new password");
        expect(titleElement).toBeInTheDocument();
    });

    test("calls the handleClose function when the close button is clicked", () => {
        const handleClose = jest.fn();
        render(<SetNewPasswordModel handleClose={handleClose} />);
        const closeButton = screen.getByAltText("CrossIcon");
        fireEvent.click(closeButton);
        expect(handleClose).toHaveBeenCalled();
    });

    // Add more test cases as needed...
});
