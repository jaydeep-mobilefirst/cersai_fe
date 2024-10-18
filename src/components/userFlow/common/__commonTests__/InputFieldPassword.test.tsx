import { render, screen, fireEvent } from "@testing-library/react";
import InputFieldPassword from "../InputFieldPassword";
import React from "react";

// Mock images to avoid issues during testing with imports
jest.mock("../../../assets/images/eye2.svg", () => "mocked-eye-icon");
jest.mock("../../../assets/images/eye-slash.svg", () => "mocked-eye-hide-icon");

describe("InputFieldPassword Component", () => {
  test("renders the password input field", () => {
    render(<InputFieldPassword placeholder="Enter password" />);
    const inputElement = screen.getByPlaceholderText("Enter password");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "password");
  });

  test("renders the toggle password visibility button", () => {
    render(<InputFieldPassword />);
    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();
    const toggleIcon = screen.getByAltText("Toggle visibility");
    expect(toggleIcon).toBeInTheDocument();
  });

  test("toggles password visibility when the button is clicked", () => {
    render(<InputFieldPassword placeholder="Enter password" />);
    const inputElement = screen.getByPlaceholderText("Enter password");
    const toggleButton = screen.getByRole("button");

    // Initially the input type is 'password'
    expect(inputElement).toHaveAttribute("type", "password");

    // Simulate button click to show password (type changes to 'text')
    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute("type", "text");

    // Simulate another button click to hide password (type changes back to 'password')
    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute("type", "password");
  });

  test("applies error styles when error prop is true", () => {
    render(<InputFieldPassword error={true} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass("border-red-500");
    expect(inputElement).toHaveClass("text-red-500");
  });

  test("applies default styles when error prop is false", () => {
    render(<InputFieldPassword error={false} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass("border-gray-300");
    expect(inputElement).toHaveClass("text-gray-700");
  });

  test("disables the input field when disabled prop is true", () => {
    render(<InputFieldPassword disabled={true} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeDisabled();
  });

  test("does not disable the input field when disabled prop is false", () => {
    render(<InputFieldPassword disabled={false} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).not.toBeDisabled();
  });

  test("renders with custom class names", () => {
    render(<InputFieldPassword className="custom-class" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass("custom-class");
  });
});
