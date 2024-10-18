import { render, screen, fireEvent } from "@testing-library/react";
import RoleSuccessPopup from "../RoleSuccessPopup"; // Adjust the import path as necessary
import React from "react";

describe("RoleSuccessPopup Component", () => {
  const closePopupMock = jest.fn();
  const successPopupMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("renders the RoleSuccessPopup correctly", () => {
    render(<RoleSuccessPopup closePopup={closePopupMock} SuccessPopup={successPopupMock} />);

    // Check for the presence of key elements
    expect(screen.getByText(/Role Created Successfully/i)).toBeInTheDocument();
    expect(screen.getByText(/A new role has been added successfully/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Okay/i })).toBeInTheDocument();
  });

  test("calls closePopup function when close button is clicked", () => {
    render(<RoleSuccessPopup closePopup={closePopupMock} SuccessPopup={successPopupMock} />);
    
    const closeButton = screen.getByAltText(/cross/i);
    fireEvent.click(closeButton);

    expect(closePopupMock).toHaveBeenCalledTimes(1);
  });

  test("calls SuccessPopup function when Okay button is clicked", () => {
    render(<RoleSuccessPopup closePopup={closePopupMock} SuccessPopup={successPopupMock} />);
    
    const okayButton = screen.getByRole("button", { name: /Okay/i });
    fireEvent.click(okayButton);

    expect(successPopupMock).toHaveBeenCalledTimes(1);
  });
});
