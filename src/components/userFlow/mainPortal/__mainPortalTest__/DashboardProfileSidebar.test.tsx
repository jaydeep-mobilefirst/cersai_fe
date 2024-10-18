import { render, screen } from "@testing-library/react";
import DashboardProfileSidebar from "../DashboardProfileSidebar";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import React from "react";

// Mock data for profileSideBarList
jest.mock("../../../utils/hardText/portalText", () => ({
  profileSideBarList: [
    { title: "Entity Details", url: "entity", rurl: "/entity", percentage: 50 },
    { title: "Documents", url: "documents", rurl: "/documents", percentage: 75 },
  ],
}));

describe("DashboardProfileSidebar", () => {
  const fetchFormFields = jest.fn();

  beforeEach(() => {
    sessionStorage.setItem("firstName", "John");
    sessionStorage.setItem("lastName", "Doe");
  });

  it("renders the sidebar and displays user information", () => {
    render(
      <MemoryRouter>
        <DashboardProfileSidebar
          fetchFormFields={fetchFormFields}
          clickableSidebarStatus={true}
        />
      </MemoryRouter>
    );

    // Check if the first and last names are displayed
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();

    // Check if the CERSAI title is displayed
    expect(screen.getByText(/CERSAI/i)).toBeInTheDocument();
  });

  it("displays the correct completion percentage and progress bar", () => {
    render(
      <MemoryRouter initialEntries={["/entity"]}>
        <DashboardProfileSidebar
          fetchFormFields={fetchFormFields}
          clickableSidebarStatus={true}
        />
      </MemoryRouter>
    );

    // Check if the percentage value is displayed
    expect(screen.getByText(/50%/i)).toBeInTheDocument();

    // Check if the progress bar has the correct class for 50% width
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveClass("w-1/2");
  });

  it("renders sidebar list items from profileSideBarList", () => {
    render(
      <MemoryRouter initialEntries={["/entity"]}>
        <DashboardProfileSidebar
          fetchFormFields={fetchFormFields}
          clickableSidebarStatus={true}
        />
      </MemoryRouter>
    );

    // Check if all the list items from profileSideBarList are displayed
    expect(screen.getByText(/Entity Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Documents/i)).toBeInTheDocument();
  });

  it("renders the correct arrow icon for active/inactive states", () => {
    render(
      <MemoryRouter initialEntries={["/entity"]}>
        <DashboardProfileSidebar
          fetchFormFields={fetchFormFields}
          clickableSidebarStatus={true}
        />
      </MemoryRouter>
    );

    // Check if the white arrow is displayed for the active item
    const activeArrow = screen.getAllByRole("img")[0];
    expect(activeArrow).toHaveAttribute("src", expect.stringContaining("rightArrowWhiteallWhite.svg"));

    // Check if the normal arrow is displayed for the inactive item
    const inactiveArrow = screen.getAllByRole("img")[1];
    expect(inactiveArrow).toHaveAttribute("src", expect.stringContaining("ArrowDark.svg"));
  });
});
