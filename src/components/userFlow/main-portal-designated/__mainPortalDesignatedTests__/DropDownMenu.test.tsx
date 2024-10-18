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

  const renderComponent = () =>
    render(
      <Router>
        <DashboardProfileSidebar fetchFormFields={mockFetchFormFields} />
      </Router>
    );

  test("renders the user's first and last name", () => {
    renderComponent();

    // Ensure that the first and last names are displayed
    const firstNameLastName = screen.getByText("JohnDoe");
    expect(firstNameLastName).toBeInTheDocument();
  });

  test("renders organization name", () => {
    renderComponent();

    // Ensure the organization name "CERSAI" is displayed
    const organizationName = screen.getByText("CERSAI");
    expect(organizationName).toBeInTheDocument();
  });

  test("renders completion percentage text", () => {
    renderComponent();

    // Ensure the completion percentage text is displayed
    const completionText = screen.getByText("0% Completed");
    expect(completionText).toBeInTheDocument();
  });

 

  test("renders sidebar toggle button", () => {
    renderComponent();

    // Ensure the sidebar toggle button is present
    const toggleButton = screen.getByLabelText("Open sidebar");
    expect(toggleButton).toBeInTheDocument();
  });
});
