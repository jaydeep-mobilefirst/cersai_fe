import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../Header";
import React from "react";

// Mock sessionStorage to return firstName, lastName, and entityType
beforeAll(() => {
  sessionStorage.setItem("firstName", "John");
  sessionStorage.setItem("lastName", "Doe");
  sessionStorage.setItem("entityType", "DC");
});

describe("Header Component (Static)", () => {
  const renderComponent = () =>
    render(
      <Router>
        <Header />
      </Router>
    );

  test("renders the title based on the entityType", () => {
    renderComponent();

    const titleElement = screen.getByText("Designated Court");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the user's first and last name", () => {
    renderComponent();

    const userName = screen.getByText("John Doe");
    expect(userName).toBeInTheDocument();
  });

  test("renders the organization name", () => {
    renderComponent();

    const organizationName = screen.getByText("CERSAI");
    expect(organizationName).toBeInTheDocument();
  });

  test("renders the setting icon with link", () => {
    renderComponent();

    const settingLink = screen.getByRole("link", {
      name: /setting/i,
    });
    expect(settingLink).toHaveAttribute("href", "/dc/profile?current=court");

    const settingIcon = screen.getByAltText("Setting");
    expect(settingIcon).toBeInTheDocument();
  });

  test("renders the user logo", () => {
    renderComponent();

    const userLogo = screen.getByAltText("user logo");
    expect(userLogo).toBeInTheDocument();
  });
});
