// InputFieldPassword.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputFieldPassword from "../InputFieldPassword"; // Update path as necessary

describe("InputFieldPassword Component", () => {
  it("renders the input field correctly", () => {
    render(<InputFieldPassword placeholder="Enter password" />);
    
    // Check if the input field is in the document
    const inputElement = screen.getByPlaceholderText(/Enter password/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "password"); // Default is password
  });

  it("toggles password visibility when the button is clicked", () => {
    render(<InputFieldPassword placeholder="Enter password" />);
    
    const inputElement = screen.getByPlaceholderText(/Enter password/i);
    const toggleButton = screen.getByRole("button");
    
    // Initially, the input type should be 'password'
    expect(inputElement).toHaveAttribute("type", "password");
    
    // Click the toggle button to show password
    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute("type", "text"); // Now it should be text
    
    // Click again to hide password
    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute("type", "password"); // Back to password
  });

  it("applies error styling when error prop is true", () => {
    render(<InputFieldPassword error placeholder="Enter password" />);
    
    const inputElement = screen.getByPlaceholderText(/Enter password/i);
    expect(inputElement).toHaveClass("border-[red]");
    expect(inputElement).toHaveClass("text-[red]");
  });
});
