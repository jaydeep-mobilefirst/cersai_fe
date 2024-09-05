import { render, screen, fireEvent } from "@testing-library/react";
import PasswordUpdateModel from "../PasswordUpdateModel";
import React from "react";

describe("PasswordUpdateModel", () => {
    test("renders without errors", () => {
        render(<PasswordUpdateModel />);
        // Assert that the component renders without throwing any errors
    });

    test("displays the 'Password Updated !' heading", () => {
        render(<PasswordUpdateModel />);
        const headingElement = screen.getByText("Password Updated !");
        expect(headingElement).toBeInTheDocument();
    });

    test("calls the closeUpdatePasswordModel function when the cross icon is clicked", () => {
        const closeUpdatePasswordModel = jest.fn();
        render(<PasswordUpdateModel closeUpdatePasswordModel={closeUpdatePasswordModel} />);
        const crossIcon = screen.getByAltText("CrossIcon");
        fireEvent.click(crossIcon);
        expect(closeUpdatePasswordModel).toHaveBeenCalled();
    });

    test("navigates to the login page when 'Back to Login' is clicked", () => {
        const navigate = jest.fn();
        render(<PasswordUpdateModel closeUpdatePasswordandShowLogin={navigate} />);
        const backToLoginLink = screen.getByText("Back to Login");
        fireEvent.click(backToLoginLink);
        expect(navigate).toHaveBeenCalledWith("/");
    });
});
