import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UmTabs from "../UmTabs";

test("renders UmTabs component with default active tab", () => {
    render(
        <BrowserRouter>
            <UmTabs />
        </BrowserRouter>
    );

    const defaultActiveTab = screen.getByText("Role Creation");
    expect(defaultActiveTab).toBeInTheDocument();
    expect(defaultActiveTab).toHaveClass("active");
});

test("changes active tab when a different tab is clicked", () => {
    render(
        <BrowserRouter>
            <UmTabs />
        </BrowserRouter>
    );

    const userCreationTab = screen.getByText("User Creation");
    expect(userCreationTab).not.toHaveClass("active");

    userCreationTab.click();

    expect(userCreationTab).toHaveClass("active");
});
