import { render, screen, fireEvent } from "@testing-library/react";
import DropdownMenu from "../DropdownMenu"; // Assuming your DropdownMenu component is in the same folder
import { BrowserRouter } from "react-router-dom";
import React from "react";

describe("DropdownMenu Component", () => {
  let toggleDropdownMock: jest.Mock<any, any, any>, setIsOpenMock: jest.Mock<any, any, any>;

  beforeEach(() => {
    // Mocking functions
    toggleDropdownMock = jest.fn();
    setIsOpenMock = jest.fn();
  });

  const renderComponent = (isOpen = false) => {
    return render(
      <BrowserRouter>
        <DropdownMenu
          toggleDropdown={toggleDropdownMock}
          isOpen={isOpen}
          setIsOpen={setIsOpenMock}
        />
      </BrowserRouter>
    );
  };

  test("renders toggle button and calls toggleDropdown when clicked", () => {
    renderComponent();

    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();

    // Simulate button click
    fireEvent.click(toggleButton);

    expect(toggleDropdownMock).toHaveBeenCalledTimes(1);
  });

  test("renders menu when isOpen is true", () => {
    renderComponent(true);

    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
  });

  test("doesn't render menu when isOpen is false", () => {
    renderComponent(false);

    const menu = screen.queryByRole("menu");
    expect(menu).toBeNull();
  });

  test("calls setIsOpen and navigate when handleLogOut is triggered", async () => {
    renderComponent(true);

    const logoutButton = screen.getByText("Logout");

    // Mock sessionStorage and axios
    sessionStorage.setItem = jest.fn();
    sessionStorage.clear = jest.fn();

    fireEvent.click(logoutButton);

    // Simulate the loader and the API call to logout
    const loader = await screen.findByText(/Logout/);
    expect(loader).toBeInTheDocument();

    expect(sessionStorage.clear).toHaveBeenCalled();
  });

  test("closes menu when clicking outside", () => {
    renderComponent(true);

    // Simulate clicking outside the dropdown
    fireEvent.mouseDown(document);

    expect(toggleDropdownMock).toHaveBeenCalled();
  });
});
