import { render, screen, fireEvent } from "@testing-library/react";
import PasswordUpdateModel from "../PasswordUpdateModel";
import { BrowserRouter as Router } from "react-router-dom"; // For useNavigate mock
import React from "react";

// Mocking assets to avoid issues with image imports
jest.mock("../../../assets/images/Login-bud.svg", () => "mocked-login-icon");
jest.mock("../../../assets/images/CrossIcon.svg", () => "mocked-cross-icon");
jest.mock("../../../assets/images/MobileIcon.svg", () => "mocked-mobile-icon");
jest.mock("../../../assets/images/Login-tick-circle.svg", () => "mocked-ticket-circle");

// Mocking useNavigate to test navigation functionality
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("PasswordUpdateModel Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the modal and displays password update message", () => {
    render(
      <Router>
        <PasswordUpdateModel />
      </Router>
    );

    const modalTitle = screen.getByText(/Password Updated/i);
    expect(modalTitle).toBeInTheDocument();

    const successMessage = screen.getByText(/Your new password has been updated Successfully!/i);
    expect(successMessage).toBeInTheDocument();
  });

  test("renders the cross icon and handles close button click", () => {
    render(
      <Router>
        <PasswordUpdateModel />
      </Router>
    );

    const crossIcon = screen.getByAltText("CrossIcon");
    expect(crossIcon).toBeInTheDocument();

    // Simulate click event on cross icon
    fireEvent.click(crossIcon);
    // Add assertions if there is a close handler implemented
    // e.g., expect(mockCloseHandler).toHaveBeenCalled();
  });

  test("navigates to login page on 'Back to Login' click", () => {
    render(
      <Router>
        <PasswordUpdateModel />
      </Router>
    );

    const backToLoginLink = screen.getByText(/Back to Login/i);
    expect(backToLoginLink).toBeInTheDocument();

    fireEvent.click(backToLoginLink);
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });

  test("renders the correct images for desktop and mobile views", () => {
    render(
      <Router>
        <PasswordUpdateModel />
      </Router>
    );

    // Check desktop image
    const desktopImage = screen.getByAltText("LoginPageIcon");
    expect(desktopImage).toBeInTheDocument();

    // Check mobile image
    const mobileImage = screen.getByAltText("MobileIcon");
    expect(mobileImage).toBeInTheDocument();
  });

  test("renders the modal container and its structure", () => {
    render(
      <Router>
        <PasswordUpdateModel />
      </Router>
    );

    const modalContainer = screen.getByRole("dialog");
    expect(modalContainer).toBeInTheDocument();

    const heading = screen.getByText(/Password Updated !/i);
    expect(heading).toBeInTheDocument();

    const buttonText = screen.getByText(/Back to Login/i);
    expect(buttonText).toBeInTheDocument();
  });
});
