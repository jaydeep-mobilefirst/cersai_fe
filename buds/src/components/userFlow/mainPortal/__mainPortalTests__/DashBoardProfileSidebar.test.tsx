import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DashboardProfileSidebar from "../DashboardProfileSidebar";
import React from "react";

test("renders sidebar with user name and CERSAI", () => {
    render(
        <BrowserRouter>
            <DashboardProfileSidebar />
        </BrowserRouter>
    );

    const userName = screen.getByText(/John Doe/i);
    const cersaiText = screen.getByText(/CERSAI/i);

    expect(userName).toBeInTheDocument();
    expect(cersaiText).toBeInTheDocument();
});

test("clicking on sidebar option updates the percentage", () => {
    render(
        <BrowserRouter>
            <DashboardProfileSidebar />
        </BrowserRouter>
    );

    const option = screen.getByText(/Option 1/i);
    fireEvent.click(option);

    const completedText = screen.getByText(/50%/i);
    expect(completedText).toBeInTheDocument();
});
