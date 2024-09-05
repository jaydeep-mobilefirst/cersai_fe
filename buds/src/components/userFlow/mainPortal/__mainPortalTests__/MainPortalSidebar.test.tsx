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

        const logo = screen.getByAltText("logo");
        expect(logo).toBeInTheDocument();
    });

    test("opens sidebar on hamburger menu click", () => {
        render(
            <BrowserRouter>
                <MainPortalSidebar layout={null} />
            </BrowserRouter>
        );

        const hamburgerMenu = screen.getByAltText("hamburger menu");
        fireEvent.click(hamburgerMenu);

        const sidebar = screen.getByLabelText("Sidebar");
        expect(sidebar).toHaveClass("translate-x-0");
    });

    test("closes sidebar on close button click", () => {
        render(
            <BrowserRouter>
                <MainPortalSidebar layout={null} />
            </BrowserRouter>
        );

        const hamburgerMenu = screen.getByAltText("hamburger menu");
        fireEvent.click(hamburgerMenu);

        const closeButton = screen.getByAltText("Close sidebar");
        fireEvent.click(closeButton);

        const sidebar = screen.getByLabelText("Sidebar");
        expect(sidebar).toHaveClass("-translate-x-full");
    });

    // Add more test cases as needed
});
