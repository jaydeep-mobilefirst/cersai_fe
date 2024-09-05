import { render, screen, fireEvent } from "@testing-library/react";
import MainPortalSidebar from "../MainPortalSidebar";
import React from "react";

describe("MainPortalSidebar", () => {
    test("renders sidebar logo", () => {
        render(<MainPortalSidebar layout={null} />);
        const logoElement = screen.getByAltText("logo");
        expect(logoElement).toBeInTheDocument();
    });

    test("toggles sidebar when hamburger menu is clicked", () => {
        render(<MainPortalSidebar layout={null} />);
        const hamburgerMenuButton = screen.getByAltText("hamburger menu");
        fireEvent.click(hamburgerMenuButton);
        const sidebarElement = screen.getByLabelText("Sidebar");
        expect(sidebarElement).toHaveClass("translate-x-0");
    });

    test("collapses sidebar when collapse button is clicked", () => {
        render(<MainPortalSidebar layout={null} />);
        const collapseButton = screen.getByAltText("collapsed");
        fireEvent.click(collapseButton);
        const sidebarElement = screen.getByLabelText("Sidebar");
        expect(sidebarElement).toHaveClass("w-[75px]");
    });

    test("navigates to the specified URL when a sidebar item is clicked", () => {
        render(<MainPortalSidebar layout={null} />);
        const sidebarItem = screen.getByText("Sidebar Item 1");
        fireEvent.click(sidebarItem);
        // Add your assertion for navigation here
    });
});
