import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header"; // Assuming your Header component is in the same folder
import { BrowserRouter } from "react-router-dom";
import DropdownMenu from "../DropdownMenu";
import { MouseEventHandler } from "react";
import React from "react";

// Mocking the DropdownMenu component
jest.mock("./DropdownMenu", () => (props: { toggleDropdown: MouseEventHandler<HTMLDivElement> | undefined; isOpen: any; }) => (
  <div data-testid="dropdown-menu" onClick={props.toggleDropdown}>
    Dropdown Menu {props.isOpen ? "Open" : "Closed"}
  </div>
));

describe("Header Component", () => {
  beforeEach(() => {
    // Mocking localStorage and sessionStorage
    localStorage.setItem("current_tab", "CA");
    sessionStorage.setItem("firstName", "John");
    sessionStorage.setItem("lastName", "Doe");
    sessionStorage.setItem("entityType", "CA");
  });

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

  test("renders title from session storage correctly", () => {
    renderComponent();

    const titleElement = screen.getByText("Competent Authority");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders user first and last name from session storage", () => {
    renderComponent();

    const firstNameLastName = screen.getByText("John Doe");
    expect(firstNameLastName).toBeInTheDocument();
  });

  test("renders organization name correctly", () => {
    renderComponent();

    const organizationName = screen.getByText("CERSAI");
    expect(organizationName).toBeInTheDocument();
  });

  test("renders settings icon with link", () => {
    renderComponent();

    const settingsLink = screen.getByRole("link", {
      name: /setting/i,
    });
    expect(settingsLink).toHaveAttribute("href", "/ca/profile?current=competent");
  });

  test("toggles dropdown menu when clicked", () => {
    renderComponent();

    const userProfileArea = screen.getByText("John Doe");
    fireEvent.click(userProfileArea);

    const dropdownMenu = screen.getByTestId("dropdown-menu");
    expect(dropdownMenu).toHaveTextContent("Open");

    fireEvent.click(userProfileArea);
    expect(dropdownMenu).toHaveTextContent("Closed");
  });

  test("renders dropdown menu when isOpen is true", () => {
    renderComponent();

    const userProfileArea = screen.getByText("John Doe");
    fireEvent.click(userProfileArea); // Opens dropdown

    const dropdownMenu = screen.getByTestId("dropdown-menu");
    expect(dropdownMenu).toBeInTheDocument();
    expect(dropdownMenu).toHaveTextContent("Open");
  });
});
