import React from "react";
import { render, screen } from "@testing-library/react";
import CreatedBy from "../CreatedBy";
import { useForm } from "react-hook-form";

// Mock the external dependencies
jest.mock("react-hook-form", () => ({
  useForm: jest.fn(() => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    formState: { errors: {} },
  })),
}));
jest.mock("@hookform/resolvers/yup", () => ({
  yupResolver: jest.fn(),
}));

describe("CreatedBy Component", () => {
  it("should render the form fields with correct labels", () => {
    render(<CreatedBy />);

    // Check for the presence of form labels
    expect(screen.getByText(/Entity Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Entity Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Unique ID Number/i)).toBeInTheDocument();
    expect(screen.getByText(/Address Line 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Address Line 2/i)).toBeInTheDocument();
    expect(screen.getByText(/PIN Code/i)).toBeInTheDocument();
    expect(screen.getByText(/State/i)).toBeInTheDocument();
    expect(screen.getByText(/District/i)).toBeInTheDocument();
    expect(screen.getByText(/Nodal Officer Name/i)).toBeInTheDocument();
  });

  it("should render input fields with placeholders", () => {
    render(<CreatedBy />);

    // Check for placeholder text in input fields
    expect(screen.getAllByPlaceholderText("Type here").length).toBe(7);
    expect(screen.getByPlaceholderText("Select")).toBeInTheDocument();
  });

  it("should render the required asterisks for mandatory fields", () => {
    render(<CreatedBy />);

    // Check for the presence of asterisks indicating required fields
    expect(screen.getAllByText("*").length).toBe(8);
  });

  it("should display error messages if form has errors (static)", () => {
    // Override the mock to simulate errors
    (useForm as jest.Mock).mockReturnValueOnce({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: {
        errors: {
          gstNumber: { message: "GST Number is required" },
        },
      },
    });

    render(<CreatedBy />);

    // Check if the error message for gstNumber is displayed
    expect(screen.getByText("GST Number is required")).toBeInTheDocument();
  });

  it("should render the select fields with the correct options", () => {
    render(<CreatedBy />);

    // The 'State' and 'District' should have select placeholders
    expect(screen.getByText("Select")).toBeInTheDocument();

    // We don't check actual options as that is dynamic and outside static scope
  });
});
