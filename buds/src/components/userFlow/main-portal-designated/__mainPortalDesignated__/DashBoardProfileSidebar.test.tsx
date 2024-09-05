import { render, screen, fireEvent } from "@testing-library/react";
import DashboardProfileSidebar from "../DashboardProfileSidebar";
import React from "react";

test("renders sidebar with user name and CERSAI", () => {
    render(<DashboardProfileSidebar />);
    const userName = screen.getByText(/John Doe/i);
    const cersaiText = screen.getByText(/CERSAI/i);
    expect(userName).toBeInTheDocument();
    expect(cersaiText).toBeInTheDocument();
});

test("sidebar opens and closes on button click", () => {
    render(<DashboardProfileSidebar />);
    const sidebarButton = screen.getByRole("button", { name: /Open sidebar/i });
    fireEvent.click(sidebarButton);
    const sidebar = screen.getByLabelText("Sidebar");
    expect(sidebar).toHaveClass("translate-x-0");
    fireEvent.click(sidebarButton);
    expect(sidebar).toHaveClass("-translate-x-full");
});

test("clicking on sidebar option updates the percentage", () => {
    render(<DashboardProfileSidebar />);
    const sidebarOption = screen.getByText(/Option 1/i);
    fireEvent.click(sidebarOption);
    const completedPercentage = screen.getByText(/50%/i);
    expect(completedPercentage).toBeInTheDocument();
});
