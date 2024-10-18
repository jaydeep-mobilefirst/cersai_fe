import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import TaskTabsCompetent from "../TaskTabs";
import React from "react";

describe("TaskTabsCompetent Component (Static)", () => {
  const renderComponent = () => {
    return render(
      <Router>
        <TaskTabsCompetent />
      </Router>
    );
  };

  test("renders all static tabs", () => {
    renderComponent();

    // Check if all the menu items are rendered statically
    const tabs = ["Profile", "Reset Password", "Update DSC 3 Certificate"];
    tabs.forEach((tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  test("renders links with correct href attributes", () => {
    renderComponent();

    // Check if each tab is wrapped with the correct link
    const profileLink = screen.getByText("Profile").closest("a");
    const resetPasswordLink = screen.getByText("Reset Password").closest("a");
    const updateDSCLink = screen.getByText("Update DSC 3 Certificate").closest("a");

    expect(profileLink).toHaveAttribute("href", "/ca/profile");
    expect(resetPasswordLink).toHaveAttribute("href", "/ca/resetpassword");
    expect(updateDSCLink).toHaveAttribute("href", "/ca/uploaddsc3");
  });
});
