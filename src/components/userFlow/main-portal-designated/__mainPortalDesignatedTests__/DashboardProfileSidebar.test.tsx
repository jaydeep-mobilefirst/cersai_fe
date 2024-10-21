import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import DashboardProfileSidebar from "../DashboardProfileSidebar";
import React from "react";

// Mock sessionStorage to return firstName and lastName
beforeAll(() => {
  sessionStorage.setItem("firstName", "John");
  sessionStorage.setItem("lastName", "Doe");
});

describe("DashboardProfileSidebar Component (Static)", () => {
  const mockFetchFormFields = jest.fn();

  // Define expected text content as variables
  const expectedFullName = "JohnDoe";
  const expectedOrganizationName = "CERSAI";
  const expectedCompletionText = "0% Completed";
  const expectedProgressBarClass = "w-5"; // Adjust as needed based on the actual class used

  const renderComponent = () =>
    render(
      <Router>
        <DashboardProfileSidebar fetchFormFields={mockFetchFormFields} />
      </Router>
    );

  test("renders the user's first and last name", () => {
    renderComponent();

    const firstNameLastName = screen.getByText(expectedFullName);
    expect(firstNameLastName).toBeInTheDocument();
  });

  test("renders organization name", () => {
    renderComponent();

    const organizationName = screen.getByText(expectedOrganizationName);
    expect(organizationName).toBeInTheDocument();
  });

  

  test("renders progress bar with correct initial width", () => {
    renderComponent();

    // The progress bar is expected to have a class based on the initial percentage of 0
    const progressBar = screen.getByRole("progressbar", { hidden: true });
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveClass("w-5"); // This should match the class for 0% in widthPercentage
  });

  test("renders sidebar toggle button", () => {
    renderComponent();

    const toggleButton = screen.getByText("Open sidebar");
    expect(toggleButton).toBeInTheDocument();
  });
});
