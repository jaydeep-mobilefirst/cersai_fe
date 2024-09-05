import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TopDetail from "../TopDetail";

describe("TopDetail component", () => {
    test("renders logo", () => {
        render(<TopDetail />);
        const logo = screen.getByAltText("logo");
        expect(logo).toBeInTheDocument();
    });

    test("renders contact details", () => {
        render(<TopDetail />);
        const contactDetails = screen.getAllByTestId("contact-detail");
        expect(contactDetails.length).toBeGreaterThan(0);
    });

    test("opens modal on button click", () => {
        render(<TopDetail />);
        const button = screen.getByText("Register");
        fireEvent.click(button);
        const modal = screen.getByTestId("register-modal");
        expect(modal).toBeInTheDocument();
    });

    // Add more test cases as needed
});
