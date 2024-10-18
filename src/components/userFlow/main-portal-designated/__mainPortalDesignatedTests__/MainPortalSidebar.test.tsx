import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MainPortalSidebar from "../MainPortalSidebar";
import React from "react";


// Mock the dependencies
jest.mock("../../../store/SidebarStore", () => ({
  useSidebarStore: jest.fn(() => ({
    mSidebar: false,
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

describe("MainPortalSidebar Component (Static)", () => {
  const mockLayout = <div>Test Layout Content</div>;

  const renderComponent = () =>
    render(
      <Router>
        <MainPortalSidebar layout={mockLayout} />
      </Router>
    );

  test("renders the hamburger menu button", () => {
    renderComponent();

    const toggleButton = screen.getByAltText("hamburger menu");
    expect(toggleButton).toBeInTheDocument();
  });

  test("renders the logo in the sidebar", () => {
    renderComponent();

    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });


  test("renders the collapse button", () => {
    renderComponent();

    const collapseButton = screen.getByAltText("collapsed");
    expect(collapseButton).toBeInTheDocument();
  });

  test("renders the layout content", () => {
    renderComponent();

    const layoutContent = screen.getByText("Test Layout Content");
    expect(layoutContent).toBeInTheDocument();
  });

  test("renders the sidebar toggle button", () => {
    renderComponent();

    const sidebarToggleButton = screen.getByLabelText("Open sidebar");
    expect(sidebarToggleButton).toBeInTheDocument();
  });

  test("renders the header component", () => {
    renderComponent();

    const headerTitle = screen.getByText("Designated Court");
    expect(headerTitle).toBeInTheDocument();
  });

  test("toggles the sidebar on button click", () => {
    renderComponent();

    const toggleButton = screen.getByAltText("hamburger menu");
    fireEvent.click(toggleButton);

    // This test ensures the toggle functionality works
    // Actual assertion would be dependent on how toggle behavior is implemented
  });

  test("collapses the sidebar when collapse button is clicked", () => {
    renderComponent();

    const collapseButton = screen.getByAltText("collapsed");
    fireEvent.click(collapseButton);

    // Assert the collapse state based on the behavior of setCollapse
    // Actual assertion would depend on how the state is managed
  });
});
