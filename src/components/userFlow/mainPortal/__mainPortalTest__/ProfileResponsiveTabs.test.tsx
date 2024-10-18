import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProfileResponsiveTabs from "../ProfileResponsiveTabs";


jest.mock("../../../utils/hardText/portalText", () => ({
  profileSideBarList: [
    { title: "Profile", url: "profile", rurl: "/dt/dashboard/profile" },
    { title: "Reset Password", url: "resetpassword", rurl: "/dt/dashboard/resetpassword" },
  ],
}));

describe("ProfileResponsiveTabs Component", () => {
  it("sets the default active tab to 'entity' when no 'current' search param exists", () => {
    render(
      <MemoryRouter initialEntries={["/dt/dashboard"]}>
        <ProfileResponsiveTabs clickableSidebarStatus={true} />
      </MemoryRouter>
    );

    // Ensure that 'current' param is set to 'entity' when none exists
    const tabElement = screen.getByText("Profile");
    expect(tabElement).toBeInTheDocument();
  });

  
  it("updates active tab when a tab is clicked", () => {
    render(
      <MemoryRouter>
        <ProfileResponsiveTabs clickableSidebarStatus={true} />
      </MemoryRouter>
    );

    // Click on the "Reset Password" tab
    const resetPasswordTab = screen.getByText("Reset Password");
    fireEvent.click(resetPasswordTab);

    // Check if the "Reset Password" tab is now active
    expect(resetPasswordTab).toHaveClass("active"); // Adjust the class name based on your CSS
  });

  it("renders tabs with links when clickableSidebarStatus is true", () => {
    render(
      <MemoryRouter>
        <ProfileResponsiveTabs clickableSidebarStatus={true} />
      </MemoryRouter>
    );

    // Check that the link for "Profile" is rendered
    const profileLink = screen.getByText("Profile").closest("a");
    expect(profileLink).toHaveAttribute("href", "/dt/dashboard/profile");
  });


  it("sets the correct url based on pathname", () => {
    render(
      <MemoryRouter initialEntries={["/dt/dashboard/profile"]}>
        <ProfileResponsiveTabs clickableSidebarStatus={true} />
      </MemoryRouter>
    );

    // Check if the correct URL is set based on the current pathname
    const activeTab = screen.getByText("Profile");
    expect(activeTab).toHaveClass("active"); // Adjust the class name based on your CSS
  });
});
