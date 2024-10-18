import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginModel from "../LoginModel";

describe("LoginModel", () => {
    it("renders without errors", () => {
        render(<LoginModel closeModal={() => {}} showRegisterModel={() => {}} />);
        // Assert that the component renders without throwing any errors
    });

    it("displays the login form", () => {
        render(<LoginModel closeModal={() => {}} showRegisterModel={() => {}} />);
        // Assert that the login form elements are displayed on the screen
        expect(screen.getByLabelText("Select Entity")).toBeInTheDocument();
        expect(screen.getByLabelText("Email id / Mobile no.")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it("calls the closeModal function when the close button is clicked", () => {
        const closeModalMock = jest.fn();
        render(
            <LoginModel
                closeModal={closeModalMock}
                showRegisterModel={() => {}}
            />
        );
        fireEvent.click(screen.getByAltText("CrossIcon"));
        // Assert that the closeModal function is called when the close button is clicked
        expect(closeModalMock).toHaveBeenCalled();
    });

    // Add more test cases as needed...
});
