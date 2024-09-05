import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProfileResponsiveTabs from "../ProfileResponsiveTabs";
import React from "react";

test("renders ProfileResponsiveTabs component", () => {
    render(
        <BrowserRouter>
            <ProfileResponsiveTabs />
        </BrowserRouter>
    );

    // Assert that the component renders without throwing any errors
    expect(screen.getByText("ProfileResponsiveTabs")).toBeInTheDocument();
});

test("handles tab click correctly", () => {
    render(
        <BrowserRouter>
            <ProfileResponsiveTabs />
        </BrowserRouter>
    );

    // Simulate a tab click
    fireEvent.click(screen.getByText("Tab 1"));

    // Assert that the active tab is set correctly
    expect(screen.getByText("Tab 1")).toHaveClass("active");
});

// Add more test cases as needed
