import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DashboardProfileSidebarRegulator from "../DashboardProfileSidebar";
import React from "react";

test("renders sidebar with user name and CERSAI", () => {
    render(
        <BrowserRouter>
            <DashboardProfileSidebarRegulator />
        </BrowserRouter>
    );

    const userName = screen.getByText(/John Doe/i);
    const cersaiText = screen.getByText(/CERSAI/i);

    expect(userName).toBeInTheDocument();
    expect(cersaiText).toBeInTheDocument();
});

test("sidebar options change percentage on click", () => {
    render(
        <BrowserRouter>
            <DashboardProfileSidebarRegulator />
        </BrowserRouter>
    );

    const option1 = screen.getByText(/Option 1/i);
    const option2 = screen.getByText(/Option 2/i);

    fireEvent.click(option1);
    expect(screen.getByText(/25%/i)).toBeInTheDocument();

    fireEvent.click(option2);
    expect(screen.getByText(/50%/i)).toBeInTheDocument();
});

test("sidebar toggle button opens and closes the sidebar", () => {
    render(
        <BrowserRouter>
            <DashboardProfileSidebarRegulator />
        </BrowserRouter>
    );

    const toggleButton = screen.getByRole("button", { name: /Open sidebar/i });
    const sidebar = screen.getByLabelText("Sidebar");

    fireEvent.click(toggleButton);
    expect(sidebar).toHaveClass("translate-x-0");

    fireEvent.click(toggleButton);
    expect(sidebar).toHaveClass("-translate-x-full");
});
