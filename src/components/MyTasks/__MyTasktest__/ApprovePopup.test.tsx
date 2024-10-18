import { render, fireEvent, waitFor } from "@testing-library/react";
import ApprovePopup from "../ApprovePopup";
import "@testing-library/jest-dom";
import React from "react";

// Mocking necessary dependencies
jest.mock("react-router-dom", () => ({
  useLocation: jest.fn().mockReturnValue({
    state: { depositTakerId: 123, status: "PENDING" },
  }),
  useNavigate: jest.fn(),
}));

jest.mock("../../utils/axios", () => ({
  axiosTokenInstance: {
    post: jest.fn(),
  },
}));

describe("ApprovePopup Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the modal with the correct text", () => {
    const { getByText, getByAltText } = render(
      <ApprovePopup onClose={mockOnClose} onSave={mockOnSave} />
    );

    expect(getByText("Are you sure you want to")).toBeInTheDocument();
    expect(getByText("approve this application ?")).toBeInTheDocument();
    expect(getByAltText("ErrorCircle ")).toBeInTheDocument();
  });

  it("should call onClose when the close button is clicked", () => {
    const { getByAltText } = render(
      <ApprovePopup onClose={mockOnClose} onSave={mockOnSave} />
    );

    const closeButton = getByAltText("icon");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should handle form submission and display success message on API success", async () => {
    const { axiosTokenInstance } = require("../../utils/axios");
    axiosTokenInstance.post.mockResolvedValueOnce({ status: 201 });

    const { getByText, getByRole } = render(
      <ApprovePopup onClose={mockOnClose} onSave={mockOnSave} />
    );

    const confirmButton = getByRole("button", { name: "Confirm" });
    fireEvent.submit(confirmButton);

    await waitFor(() =>
      expect(getByText("Deposit taker status updated successfully")).toBeInTheDocument()
    );
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockOnSave).toHaveBeenCalled();
  });

  it("should handle form submission and display error message on API error", async () => {
    const { axiosTokenInstance } = require("../../utils/axios");
    axiosTokenInstance.post.mockRejectedValueOnce(new Error("Internal Server Error"));

    const { getByText, getByRole } = render(
      <ApprovePopup onClose={mockOnClose} onSave={mockOnSave} />
    );

    const confirmButton = getByRole("button", { name: "Confirm" });
    fireEvent.submit(confirmButton);

    await waitFor(() =>
      expect(getByText("Internal Server Error")).toBeInTheDocument()
    );
  });

  it("should display loader while form is submitting", async () => {
    const { axiosTokenInstance } = require("../../utils/axios");
    axiosTokenInstance.post.mockImplementation(() => new Promise(() => {})); // Simulate long API call

    const { getByRole } = render(
      <ApprovePopup onClose={mockOnClose} onSave={mockOnSave} />
    );

    const confirmButton = getByRole("button", { name: "Confirm" });
    fireEvent.submit(confirmButton);

    expect(confirmButton).toHaveAttribute("disabled");
  });
});
