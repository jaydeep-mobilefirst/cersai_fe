import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RoleDetails from "../RoleDetails"; // Adjust the import path as necessary
import { useForm } from "react-hook-form";
import React from "react";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(),
}));

describe("RoleDetails Component", () => {
  const mockRegister = jest.fn();
  const mockHandleSubmit = jest.fn((fn) => fn());
  const mockReset = jest.fn();
  
  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      reset: mockReset,
      formState: { errors: {} },
    });
  });

  test("renders the RoleDetails component correctly", () => {
    render(<RoleDetails />);

    // Check for existence of key elements
    expect(screen.getByText(/Scheme Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Scheme Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Scheme Start Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Last day to enter scheme/i)).toBeInTheDocument();
  });

  test("displays input fields and labels correctly", () => {
    render(<RoleDetails />);

    const schemeNameInput = screen.getByPlaceholderText(/ABCD Scheme/i);
    expect(schemeNameInput).toBeInTheDocument();

    const schemeDescriptionInput = screen.getByPlaceholderText(/Scheme  Description/i);
    expect(schemeDescriptionInput).toBeInTheDocument();
  });

  test("handles form submission and resets the form", async () => {
    render(<RoleDetails />);

    const submitButton = screen.getByRole("button", { name: /submit/i }); // Adjust based on your button
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockReset).toHaveBeenCalled();
      expect(screen.getByText(/Form submitted successfully/i)).toBeInTheDocument(); // Change the alert based on your implementation
    });
  });

  test("validates required fields", async () => {
    (useForm as jest.Mock).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      reset: mockReset,
      formState: { errors: { addressLine1: { message: "Address is required" } } },
    });

    render(<RoleDetails />);

    const schemeNameInput = screen.getByPlaceholderText(/ABCD Scheme/i);
    fireEvent.blur(schemeNameInput); // Simulate losing focus to trigger validation

    expect(screen.getByText(/Address is required/i)).toBeInTheDocument();
  });

  test("updates state on user input", () => {
    render(<RoleDetails />);

    const schemeNameInput = screen.getByPlaceholderText(/ABCD Scheme/i);
    fireEvent.change(schemeNameInput, { target: { value: "New Scheme" } });
    expect(schemeNameInput).toHaveValue("New Scheme");
  });

  test("displays the ReactTable with default data", () => {
    render(<RoleDetails />);

    expect(screen.getByText(/Department of PR/i)).toBeInTheDocument();
    expect(screen.getByText(/Department of HR/i)).toBeInTheDocument();
    expect(screen.getByText(/California/i)).toBeInTheDocument();
  });
});
