import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SchemeDetails from "../../ScehmaManagement/AuditTrail";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import React from "react";

// Mock modules that you don't want to test directly
jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

jest.mock("@tanstack/table-core", () => ({
  createColumnHelper: jest.fn(() => ({
    accessor: jest.fn((id, options) => options),
  })),
}));

jest.mock("../../utils/screenSize", () => ({
  useScreenWidth: jest.fn(() => 1024), // Mock the screen width if necessary
}));

describe("SchemeDetails Component", () => {
  const setupMockForm = (errors = {}, handleSubmitMock = jest.fn()) => {
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: handleSubmitMock,
      formState: { errors },
      reset: jest.fn(),
    });
  };

  beforeEach(() => {
    setupMockForm();
  });

  it("renders the form with all fields", () => {
    render(<SchemeDetails />);

    // Check that all fields are rendered
    expect(screen.getByLabelText(/Scheme Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Scheme Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Scheme Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last day to enter scheme/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Minimum Investment amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Maximum Investment amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Regulator Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Investers/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Scheme Act/i)).toBeInTheDocument();
  });

  it("validates and shows errors on form submission", async () => {
    // Simulate validation error by passing error messages
    setupMockForm({
      addressLine1: { message: "Scheme name is required" },
    });

    const handleSubmitMock = jest.fn();
    render(<SchemeDetails />);

    // Submit the form
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(handleSubmitMock).toHaveBeenCalled();
    });

    // Check validation error
    expect(screen.getByText(/Scheme name is required/i)).toBeInTheDocument();
  });

  it("renders the table with the correct data", () => {
    render(<SchemeDetails />);

    // Check if the table renders correctly
    expect(screen.getByText(/Sr. No./i)).toBeInTheDocument();
    expect(screen.getByText(/Branch Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Address Line 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Address Line 2/i)).toBeInTheDocument();
    expect(screen.getByText(/State/i)).toBeInTheDocument();
    expect(screen.getByText(/District/i)).toBeInTheDocument();

    // Check data rendering
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Department of PR")).toBeInTheDocument();
    expect(screen.getByText("123 Main St")).toBeInTheDocument();
    expect(screen.getByText("Apt 101")).toBeInTheDocument();
    expect(screen.getByText("California")).toBeInTheDocument();
    expect(screen.getByText("Los Angeles")).toBeInTheDocument();
  });

  it("submits form data successfully", async () => {
    const handleSubmitMock = jest.fn();
    setupMockForm({}, handleSubmitMock);

    render(<SchemeDetails />);

    // Simulate form submission
    fireEvent.submit(screen.getByRole("form"));

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(handleSubmitMock).toHaveBeenCalled();
    });

    // Check if form is submitted successfully
    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Form submitted successfully!/i)).toBeInTheDocument();
  });
});
