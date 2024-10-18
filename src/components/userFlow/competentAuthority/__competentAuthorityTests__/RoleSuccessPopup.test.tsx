import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RoleSuccessPopup from "../RoleSuccessPopup";

describe("RoleSuccessPopup", () => {
    it("renders the success message correctly", () => {
        render(<RoleSuccessPopup closePopup={() => {}} SuccessPopup={() => {}} />);

        // Assert that the success message is rendered
        expect(screen.getByText("Role Created Successfully")).toBeInTheDocument();
        expect(
            screen.getByText("A new role has been added successfully")
        ).toBeInTheDocument();
    });

    it("calls the closePopup function when the close button is clicked", () => {
        const closePopupMock = jest.fn();
        render(
            <RoleSuccessPopup closePopup={closePopupMock} SuccessPopup={() => {}} />
        );

        // Simulate a click on the close button
        fireEvent.click(screen.getByAltText("cross"));

        // Assert that the closePopup function is called
        expect(closePopupMock).toHaveBeenCalled();
    });

    it("calls the SuccessPopup function when the Okay button is clicked", () => {
        const successPopupMock = jest.fn();
        render(
            <RoleSuccessPopup closePopup={() => {}} SuccessPopup={successPopupMock} />
        );

        // Simulate a click on the Okay button
        fireEvent.click(screen.getByText("Okay"));

        // Assert that the SuccessPopup function is called
        expect(successPopupMock).toHaveBeenCalled();
    });
});
