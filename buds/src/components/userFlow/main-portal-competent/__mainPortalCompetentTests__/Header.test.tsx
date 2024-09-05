import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
    beforeEach(() => {
        // Mock sessionStorage and localStorage values
        sessionStorage.setItem("firstName", "John");
        sessionStorage.setItem("lastName", "Doe");
        sessionStorage.setItem("entityType", "CA");
        localStorage.setItem("current_tab", "Some Tab");
    });

    afterEach(() => {
        // Clear sessionStorage and localStorage values
        sessionStorage.clear();
        localStorage.clear();
    });

    test("renders header with correct title", () => {
        render(<Header />);
        const titleElement = screen.getByText("Competent Authority");
        expect(titleElement).toBeInTheDocument();
    });

    test("renders header with correct user name", () => {
        render(<Header />);
        const userNameElement = screen.getByText("John Doe");
        expect(userNameElement).toBeInTheDocument();
    });

    test("renders header with correct entity name", () => {
        render(<Header />);
        const entityNameElement = screen.getByText("CERSAI");
        expect(entityNameElement).toBeInTheDocument();
    });

    test("toggles dropdown menu when clicked", () => {
        render(<Header />);
        const dropdownButton = screen.getByTestId("dropdown-button");
        fireEvent.click(dropdownButton);
        const dropdownMenu = screen.getByTestId("dropdown-menu");
        expect(dropdownMenu).toBeInTheDocument();
    });
});
