import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import DashboardProfileSidebar from "../DashboardProfileSidebar";
import React from "react";
import { profileSideBarListDesignated } from "../../../../utils/hardText/portalText";


// Mock sessionStorage to return firstName and lastName
beforeAll(() => {
  sessionStorage.setItem("firstName", "John");
  sessionStorage.setItem("lastName", "Doe");
});

describe("DashboardProfileSidebar Component (Static)", () => {
  const mockFetchFormFields = jest.fn();

  const renderComponent = () =>
    render(
      <Router>
        <DashboardProfileSidebar fetchFormFields={mockFetchFormFields} />
      </Router>
    );

  test("renders the user's first and last name", () => {
    renderComponent();

    const firstNameLastName = screen.getByText("JohnDoe");
    expect(firstNameLastName).toBeInTheDocument();
  });

  test("renders organization name", () => {
    renderComponent();

    const organizationName = screen.getByText("CERSAI");
    expect(organizationName).toBeInTheDocument();
  });

  test("renders completion percentage", () => {
    renderComponent();

    const completionText = screen.getByText("0% Completed");
    expect(completionText).toBeInTheDocument();
  });

  test("renders progress bar with correct initial width", () => {
    renderComponent();

    const progressBar = screen.getByRole("progressbar", { hidden: true });
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveClass("w-5"); // Initially set to 0%
  });

  test("renders all static sidebar tabs", () => {
    renderComponent();

    // Check if all the static sidebar tabs are rendered
    profileSideBarListDesignated.forEach((tab) => {
      expect(screen.getByText(tab.title)).toBeInTheDocument();
    });
  });

  test("renders sidebar toggle button", () => {
    renderComponent();

    const toggleButton = screen.getByLabelText("Open sidebar");
    expect(toggleButton).toBeInTheDocument();
  });
});
