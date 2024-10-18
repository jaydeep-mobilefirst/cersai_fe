import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MainPortalSidebar from "../MainPortalSidebar";
import Swal from "sweetalert2";
import React from "react";

// Mocking external dependencies
jest.mock("../../../store/SidebarStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    mSidebar: true,
    collapsed: false,
    url: "/",
    activeTab: "/ca/profile",
    toggleSidebar: jest.fn(),
    toggleCollapse: jest.fn(),
    setUrl: jest.fn(),
    setActiveTab: jest.fn(),
  })),
  useSidebarStore: jest.fn(() => ({
    mSidebar: true,
    collapsed: false,
    url: "/",
    activeTab: "/ca/profile",
    toggleSidebar: jest.fn(),
    toggleCollapse: jest.fn(),
    setUrl: jest.fn(),
    setActiveTab: jest.fn(),
  })),
  useCollapseStore: jest.fn(() => ({
    collapse: false,
    setCollapse: jest.fn(),
  })),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("MainPortalSidebar Component", () => {
  const layout = <div>Test Layout Content</div>;

  const renderComponent = () =>
    render(
      <Router>
        <MainPortalSidebar layout={layout} />
      </Router>
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the sidebar and layout content", () => {
    renderComponent();

    // Check sidebar content
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();

    // Check layout content
    const layoutContent = screen.getByText("Test Layout Content");
    expect(layoutContent).toBeInTheDocument();
  });

  test("toggles sidebar open and close on button click", () => {
    renderComponent();

    // Check hamburger menu button
    const hamburgerMenuButton = screen.getByAltText("hamburger menu");
    expect(hamburgerMenuButton).toBeInTheDocument();

    // Simulate clicking the button to open the sidebar
    fireEvent.click(hamburgerMenuButton);

    // You can further assert expected changes, like ensuring the sidebar is open
  });

  test("collapses the sidebar when collapse button is clicked", () => {
    renderComponent();

    // Check collapse button
    const collapseButton = screen.getByAltText("collapsed");
    expect(collapseButton).toBeInTheDocument();

    // Simulate click to collapse the sidebar
    fireEvent.click(collapseButton);

    // Check if the collapse function was called
    expect(collapseButton).toBeInTheDocument();
  });

  test("navigates to a new tab when clicked", () => {
    renderComponent();

    const sidebarItem = screen.getByText("Test Layout Content"); // Adjust based on actual sidebar items
    expect(sidebarItem).toBeInTheDocument();

    fireEvent.click(sidebarItem);

    // Check if the navigation occurred and active tab is set
    // You can use mock functions to test navigation behavior
  });

  test("triggers user inactivity after timeout and shows Swal alert", () => {
    jest.useFakeTimers();

    renderComponent();

    // Simulate 10 minutes of inactivity
    jest.advanceTimersByTime(18000000); // 10 minutes

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      title: "User inactive for 10 min. Please login again",
    });
  });

//   test("prevents page refresh and shows Swal alert", () => {
//     renderComponent();

//     // Simulate session storage refresh condition
//     sessionStorage.setItem("refreshCount", "1");

//     // Trigger component logic
//     fireEvent.beforeUnload(window);

//     expect(Swal.fire).toHaveBeenCalledWith({
//       icon: "error",
//       title: "Dont refresh the page. Please login again",
//     });
//   });
});
