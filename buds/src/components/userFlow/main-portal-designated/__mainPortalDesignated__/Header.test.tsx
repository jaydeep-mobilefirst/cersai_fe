import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
    beforeEach(() => {
        // Mock sessionStorage and localStorage values
        jest.spyOn(sessionStorage, "getItem").mockReturnValue("John");
        jest.spyOn(sessionStorage, "getItem").mockReturnValue("Doe");
        jest.spyOn(sessionStorage, "getItem").mockReturnValue("DC");
        jest.spyOn(localStorage, "getItem").mockReturnValue("current_tab");
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("renders header with user information", () => {
        render(<Header />);
        
        // Assert that user's name is displayed
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        // Assert that entity type is displayed
        expect(screen.getByText("CERSAI")).toBeInTheDocument();
    });

    test("renders header with title when entityType is 'DC'", () => {
        render(<Header />);
        
        // Assert that title is displayed
        expect(screen.getByText("Designated Court")).toBeInTheDocument();
    });

    test("does not render title when entityType is not 'DC'", () => {
        jest.spyOn(sessionStorage, "getItem").mockReturnValue("CA");
        
        render(<Header />);
        
        // Assert that title is not displayed
        expect(screen.queryByText("Designated Court")).toBeNull();
    });

    test("toggles dropdown menu when clicked", () => {
        render(<Header />);
        
        // Assert that dropdown menu is initially closed
        expect(screen.queryByTestId("dropdown-menu")).not.toBeInTheDocument();
        
        // Click on user logo to toggle dropdown menu
        fireEvent.click(screen.getByAltText("user logo"));
        
        // Assert that dropdown menu is now open
        expect(screen.getByTestId("dropdown-menu")).toBeInTheDocument();
        
        // Click on user logo again to close dropdown menu
        fireEvent.click(screen.getByAltText("user logo"));
        
        // Assert that dropdown menu is now closed
        expect(screen.queryByTestId("dropdown-menu")).not.toBeInTheDocument();
    });
});
