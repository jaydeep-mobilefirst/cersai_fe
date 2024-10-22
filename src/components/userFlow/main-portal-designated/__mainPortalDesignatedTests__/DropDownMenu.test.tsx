import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import DashboardProfileSidebar from "../DashboardProfileSidebar";
import React from "react";

// Texts used in the component
const sideBarText = "Open sidebar";
const completionText = "0% Completed";
const firstName = "John";
const lastName = "Doe";
const organizationNameText = "CERSAI";
const fullNameText = `${firstName}${lastName}`;

// Mock sessionStorage to return firstName and lastName
beforeAll(() => {
  sessionStorage.setItem("firstName", firstName);
  sessionStorage.setItem("lastName", lastName);
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
    const firstNameLastName = screen.getByText(fullNameText);
    expect(firstNameLastName).toBeInTheDocument();
  });

  test("renders organization name", () => {
    renderComponent();

    // Ensure the organization name is displayed
    const organizationName = screen.getByText(organizationNameText);
    expect(organizationName).toBeInTheDocument();
  });

  

  test("renders sidebar toggle button", () => {
    renderComponent();

    // Ensure the sidebar toggle button is present
    const toggleButton = screen.getByText(sideBarText);
    expect(toggleButton).toBeInTheDocument();
  });
});
