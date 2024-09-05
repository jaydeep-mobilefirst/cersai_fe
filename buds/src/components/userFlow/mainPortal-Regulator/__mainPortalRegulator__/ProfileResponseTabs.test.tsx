import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProfileResponsiveTabs from "../ProfileResponsiveTabs";
import React from "react";

test("renders profile tabs correctly", () => {
    render(
        <MemoryRouter>
            <ProfileResponsiveTabs />
        </MemoryRouter>
    );

    // Assert that the profile tabs are rendered correctly
    const profileTab = screen.getByText("Profile");
    const resetPasswordTab = screen.getByText("Reset Password");

    expect(profileTab).toBeInTheDocument();
    expect(resetPasswordTab).toBeInTheDocument();
});

test("changes active tab on click", () => {
    render(
        <MemoryRouter>
            <ProfileResponsiveTabs />
        </MemoryRouter>
    );

    // Assert that the initial active tab is "regulator"
    const activeTab = screen.getByText("Profile");
    expect(activeTab).toHaveClass("active");

    // Click on the "Reset Password" tab
    const resetPasswordTab = screen.getByText("Reset Password");
    fireEvent.click(resetPasswordTab);

    // Assert that the active tab is now "resetpassword"
    expect(activeTab).not.toHaveClass("active");
    expect(resetPasswordTab).toHaveClass("active");
});
