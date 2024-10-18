import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../Navbar"; // Import the Navbar component

jest.mock("../../zust/useLandingStore", () => ({
  useLandingStore: () => ({
    homePageData: {
      homePageData: {
        navbar: [
          { text: "Home" },
          { text: "FAQ" },
          { text: "Notifications" },
          { text: "Downloads" },
          { text: "Training" },
          { text: "Contact Us" },
        ],
      },
    },
  }),
}));

jest.mock("../../zust/useOperatingGuidelinesStore", () => ({
  useOperatingGuidelinesStore: () => ({
    guidelinesPageData: {
      operatingGuidelinesData: [],
    },
  }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    pathname: "/faq", // Simulate the current path
  }),
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear(); // Clear the mock navigation before each test
  });

  test("renders Navbar component with menu items", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Check if the menu items are rendered
    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("NOTIFICATIONS")).toBeInTheDocument();
    expect(screen.getByText("DOWNLOADS")).toBeInTheDocument();
    expect(screen.getByText("TRAINING")).toBeInTheDocument();
    expect(screen.getByText("CONTACT US")).toBeInTheDocument();
  });

  test("activates the correct tab based on the current path", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Check that the correct tab is active based on the simulated path
    expect(screen.getByText("FAQ")).toHaveClass("active");
  });

  test("navigates to correct page when a menu item is clicked", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Simulate clicking the "Home" menu item
    fireEvent.click(screen.getByText("HOME"));

    // Verify navigation to the correct route
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("shows and hides the mobile menu on hamburger click", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Check that the hamburger menu is rendered initially
    const hamburgerMenu = screen.getByAltText("hamburger icon");
    expect(hamburgerMenu).toBeInTheDocument();

    // Simulate clicking the hamburger icon to open the mobile menu
    fireEvent.click(hamburgerMenu);
    expect(screen.getByText("FAQ")).toBeVisible(); // Mobile menu should be visible now

    // Simulate closing the mobile menu
    const closeButton = screen.getByAltText("close icon");
    fireEvent.click(closeButton);
    expect(screen.queryByText("FAQ")).not.toBeVisible(); // Mobile menu should be hidden
  });

  test("clicking on menu items in mobile closes the menu", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Simulate clicking the hamburger icon to open the mobile menu
    fireEvent.click(screen.getByAltText("hamburger icon"));

    // Simulate clicking a menu item (e.g., "FAQ")
    fireEvent.click(screen.getByText("FAQ"));

    // Check that the menu item has been clicked and menu closed
    expect(mockNavigate).toHaveBeenCalledWith("/faq");
    expect(screen.queryByText("FAQ")).not.toBeVisible(); // Menu should close after navigation
  });
});
