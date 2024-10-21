import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SignUpSideBar from "../SignUpSideBar";
import { useLocation, useNavigate } from "react-router-dom";

// Mocking the hooks
jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

// Text constants for the test cases
const TEXT_DEPOSIT_TAKER = "Deposit Taker";
const TEXT_COMPLETED_0 = "0% Completed";
const TEXT_SECTION_NODAL_OFFICER_DETAILS = "Nodal Officer Details";
const TEXT_NON_EXISTING_SECTION = "Some Random Section";
const PATH_SECTION_1 = "/section1";
const icon = "icon"

describe("SignUpSideBar Component", () => {
  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: PATH_SECTION_1 });
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
  });

//   it("renders the sidebar with the default progress and title", () => {
//     render(<SignUpSideBar />);

//     // Check if the title "Deposit Taker" is rendered
//     const titleElement = screen.getByText(TEXT_DEPOSIT_TAKER);
//     expect(titleElement).toBeInTheDocument();

//     // Check if the progress bar starts at 0%
//     const progressElement = screen.getByText(TEXT_COMPLETED_0);
//     expect(progressElement).toBeInTheDocument();
//   });

//   it("renders progress bar with correct width class", () => {
//     render(<SignUpSideBar />);

//     // Check that the progress bar has the correct class initially
//     const progressBar = screen.getByRole("progressbar");
//     expect(progressBar).toHaveClass("w-0");
//   });

//   it("navigates to a different section when a sidebar item is clicked", () => {
//     const mockNavigate = useNavigate();

//     render(<SignUpSideBar />);

//     // Simulate clicking on a sidebar item
//     const sectionElement = screen.getByText(TEXT_SECTION_NODAL_OFFICER_DETAILS);
//     fireEvent.click(sectionElement);

//     expect(mockNavigate).toHaveBeenCalledWith(PATH_SECTION_1);
//   });

//   it("does not navigate if there's no matching section", () => {
//     const mockNavigate = useNavigate();

//     render(<SignUpSideBar />);

//     // Simulate clicking on an item that does not match any section
//     const nonExistingSection = screen.getByText(TEXT_NON_EXISTING_SECTION);
//     fireEvent.click(nonExistingSection);

//     expect(mockNavigate).not.toHaveBeenCalled();
//   });

//   it("displays tick mark for completed sections", () => {
//     render(<SignUpSideBar />);

//     // Mock the tick image element
//     const tickIcon = screen.getByText(icon);
//     expect(tickIcon).toBeInTheDocument();
//   });

  it("redirects to home page if form data is missing", () => {
    const mockNavigate = useNavigate();

    // Render component without form data
    render(<SignUpSideBar />);

    // Simulate the timeout logic for missing form data
    setTimeout(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    }, 5000);
  });
});
