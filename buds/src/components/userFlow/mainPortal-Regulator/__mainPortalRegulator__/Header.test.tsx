import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
    beforeEach(() => {
        // Mock sessionStorage and localStorage values
        sessionStorage.setItem("firstName", "John");
        sessionStorage.setItem("lastName", "Doe");
        sessionStorage.setItem("entityType", "RG");
        localStorage.setItem("current_tab", "Some Tab");
    });

    afterEach(() => {
        // Clear sessionStorage and localStorage values
        sessionStorage.clear();
        localStorage.clear();
    });

    test("renders header with correct title", () => {
        render(<Header />);
        const titleElement = screen.getByText("Regulator");
        expect(titleElement).toBeInTheDocument();
    });

    test("renders user information correctly", () => {
        render(<Header />);
        const firstNameElement = screen.getByText("John");
        const lastNameElement = screen.getByText("Doe");
        const entityTypeElement = screen.getByText("CERSAI");

        expect(firstNameElement).toBeInTheDocument();
        expect(lastNameElement).toBeInTheDocument();
        expect(entityTypeElement).toBeInTheDocument();
    });

    test("toggles dropdown menu on click", () => {
        render(<Header />);
        const dropdownButton = screen.getByTestId("dropdown-button");
        fireEvent.click(dropdownButton);
        const dropdownMenu = screen.getByTestId("dropdown-menu");
        expect(dropdownMenu).toBeInTheDocument();
    });
});
