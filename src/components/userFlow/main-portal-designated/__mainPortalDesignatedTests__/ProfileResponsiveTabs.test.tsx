import { render, screen } from "@testing-library/react";
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

    // Check if the hamburger menu button is rendered
    const toggleButton = screen.getByAltText("hamburger menu");
    expect(toggleButton).toBeInTheDocument();
  });

  test("renders the logo in the sidebar", () => {
    renderComponent();

    // Check if the logo is rendered in the sidebar
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });

 

  test("renders the collapse button", () => {
    renderComponent();

    // Check if the collapse button is rendered
    const collapseButton = screen.getByAltText("collapsed");
    expect(collapseButton).toBeInTheDocument();
  });

  test("renders the layout content", () => {
    renderComponent();

    // Check if the layout content passed as a prop is rendered
    const layoutContent = screen.getByText("Test Layout Content");
    expect(layoutContent).toBeInTheDocument();
  });

  test("renders the sidebar toggle button", () => {
    renderComponent();

    // Check if the sidebar toggle button is rendered
    const sidebarToggleButton = screen.getByLabelText("Open sidebar");
    expect(sidebarToggleButton).toBeInTheDocument();
  });
});
