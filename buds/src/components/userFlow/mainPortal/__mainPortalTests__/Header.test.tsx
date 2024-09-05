import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
    beforeEach(() => {
        sessionStorage.setItem("firstName", "John");
        sessionStorage.setItem("lastName", "Doe");
        sessionStorage.setItem("entityType", "DT");
    });

    afterEach(() => {
        sessionStorage.clear();
    });

    test("renders header with user information", () => {
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
        const dropdownMenu = screen.getByTestId("dropdown-menu");

        expect(dropdownMenu).not.toBeVisible();

        fireEvent.click(dropdownButton);

        expect(dropdownMenu).toBeVisible();

        fireEvent.click(dropdownButton);

        expect(dropdownMenu).not.toBeVisible();
    });
});
