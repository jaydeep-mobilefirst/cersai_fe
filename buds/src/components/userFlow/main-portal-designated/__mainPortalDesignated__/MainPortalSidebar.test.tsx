import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MainPortalSidebar from "../MainPortalSidebar";
import React from "react";

describe("MainPortalSidebar", () => {
    test("renders sidebar logo", () => {
        render(
            <BrowserRouter>
                <MainPortalSidebar layout={null} />
            </BrowserRouter>
        );

        const logoElement = screen.getByAltText("logo");
        expect(logoElement).toBeInTheDocument();
    });

    test("toggles sidebar when hamburger menu is clicked", () => {
        render(
            <BrowserRouter>
                <MainPortalSidebar layout={null} />
            </BrowserRouter>
        );

        const hamburgerMenuButton = screen.getByAltText("hamburger menu");
        fireEvent.click(hamburgerMenuButton);

        const sidebarElement = screen.getByLabelText("Sidebar");
        expect(sidebarElement).toHaveClass("translate-x-0");

        fireEvent.click(hamburgerMenuButton);
        expect(sidebarElement).toHaveClass("-translate-x-full");
    });

    test("navigates to the correct URL when sidebar item is clicked", () => {
        render(
            <BrowserRouter>
                <MainPortalSidebar layout={null} />
            </BrowserRouter>
        );

        const sidebarItem = screen.getByText("Sidebar Item Title");
        fireEvent.click(sidebarItem);

        // Add your assertions for URL navigation here
    });

    // Add more test cases as needed
});
