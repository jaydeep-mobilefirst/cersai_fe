import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ProfileResponsiveTabs from "../ProfileResponsiveTabs";
import React from "react";
import { profileSideBarListCompetent } from "../../../../utils/hardText/portalText";

describe("ProfileResponsiveTabs Component", () => {
  const renderComponent = () =>
    render(
      <Router>
        <ProfileResponsiveTabs />
      </Router>
    );

  test("renders the tabs from profileSideBarListCompetent", () => {
    renderComponent();

    // Check if all the menu items are rendered based on the profileSideBarListCompetent
    profileSideBarListCompetent.forEach((menuItem) => {
      expect(screen.getByText(menuItem.title)).toBeInTheDocument();
    });
  });

  test("activates the correct tab based on current searchParams", () => {
    renderComponent();

    // Check if the active tab is correctly marked
    const activeTab = screen.getByText(profileSideBarListCompetent[0].title); // Assuming the first one is active by default
    expect(activeTab).toHaveClass("font-bold", "text-[#1C468E]");

    // Check the other tabs are not active
    profileSideBarListCompetent.slice(1).forEach((menuItem) => {
      const inactiveTab = screen.getByText(menuItem.title);
      expect(inactiveTab).not.toHaveClass("font-bold", "text-[#1C468E]");
    });
  });

  test("updates the active tab on click", () => {
    renderComponent();

    // Simulate clicking on the second tab
    const secondTab = screen.getByText(profileSideBarListCompetent[1].title);
    fireEvent.click(secondTab);

    // Check if the second tab becomes active
    expect(secondTab).toHaveClass("font-bold", "text-[#1C468E]");
  });
});
