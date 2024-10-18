import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DropdownMenu from "../DropdownMenu";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Mocking axios and useNavigate
jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("DropdownMenu Component", () => {
  const mockNavigate = jest.fn();
  const mockSetIsOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    sessionStorage.clear();
  });

  it("toggles the dropdown when the button is clicked", () => {
    render(
      <MemoryRouter>
        <DropdownMenu isOpen={false} toggleDropdown={mockSetIsOpen} setIsOpen={mockSetIsOpen} />
      </MemoryRouter>
    );

    // Initially, the dropdown should not be visible
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();

    // Click to open the dropdown
    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    // Check if the setIsOpen function is called
    expect(mockSetIsOpen).toHaveBeenCalled();
  });

  it("closes the dropdown when clicking outside", () => {
    render(
      <MemoryRouter>
        <DropdownMenu isOpen={true} toggleDropdown={mockSetIsOpen} setIsOpen={mockSetIsOpen} />
      </MemoryRouter>
    );

    // Ensure the dropdown is initially open
    expect(screen.getByText("Logout")).toBeInTheDocument();

    // Simulate clicking outside the dropdown
    fireEvent.mouseDown(document);

    // Ensure the toggleDropdown function is called to close the dropdown
    expect(mockSetIsOpen).toHaveBeenCalled();
  });

  

  it("navigates to the regulator profile settings page when settings is clicked", () => {
    render(
      <MemoryRouter>
        <DropdownMenu isOpen={true} toggleDropdown={mockSetIsOpen} setIsOpen={mockSetIsOpen} />
      </MemoryRouter>
    );

    // Simulate clicking the settings button (if settings button is included)
    const settingsButton = screen.getByText("Setting");
    fireEvent.click(settingsButton);

    // Check if the dropdown is closed and user is redirected
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    expect(mockNavigate).toHaveBeenCalledWith("/rg/profile?current=regulator");
  });
});
