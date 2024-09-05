import { render, screen, fireEvent } from "@testing-library/react";
import DashboardProfileSidebar from "../DashboardProfileSidebar";
import React from "react";

describe("DashboardProfileSidebar", () => {
    test("renders sidebar with user name and CERSAI", () => {
        render(<DashboardProfileSidebar />);
        const userName = screen.getByText(/John Doe/i);
        const cersaiText = screen.getByText(/CERSAI/i);
        expect(userName).toBeInTheDocument();
        expect(cersaiText).toBeInTheDocument();
    });

    test("opens sidebar when button is clicked", () => {
        render
        (<DashboardProfileSidebar />);
        const sidebarButton = screen.getByRole("button", { name: /Open sidebar/i });
        fireEvent.click(sidebarButton);
        const sidebar = screen.getByLabelText("Sidebar");
        expect(sidebar).toHaveClass("translate-x-0");
    });

    test("navigates back when goBackRoute is called", () => {
        const mockNavigate = jest.fn();
        jest.mock("react-router-dom", () => ({
            ...jest.requireActual("react-router-dom"),
            useNavigate: () => mockNavigate,
        }));
        render(<DashboardProfileSidebar />);
        const goBackButton = screen.getByRole("button", { name: /Go back/i });
        fireEvent.click(goBackButton);
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    test("updates percentage when option is clicked", () => {
        render(<DashboardProfileSidebar />);
        const option = screen.getByText(/Option 1/i);
        fireEvent.click(option);
        const percentText = screen.getByText(/25%/i);
        expect(percentText).toBeInTheDocument();
    });
});
