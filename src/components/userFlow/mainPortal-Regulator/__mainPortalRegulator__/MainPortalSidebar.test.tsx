import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainPortalSidebar from "../MainPortalSidebar";
import Swal from "sweetalert2";
import React from "react";

// Mock the sidebar store hooks
jest.mock("../../../store/SidebarStore", () => ({
  __esModule: true,
  default: jest.fn(),
  useSidebarStore: jest.fn(),
  useCollapseStore: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("MainPortalSidebar", () => {
  const mockSetUrl = jest.fn();
  const mockSetActiveTab = jest.fn();
  const mockToggleSidebar = jest.fn();
  const mockToggleCollapse = jest.fn();
  const mockSetCollapse = jest.fn();

 

  

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <MainPortalSidebar layout={<div>Test Layout</div>} />
      </MemoryRouter>
    );

  it("should render sidebar and header", () => {
    renderComponent();
    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByText("Test Layout")).toBeInTheDocument();
  });

  it("should toggle sidebar open and close on hamburger icon click", () => {
    renderComponent();
    const hamburgerIcon = screen.getByAltText("hamburger menu");
    fireEvent.click(hamburgerIcon);
    expect(mockToggleSidebar).toHaveBeenCalled();
  });

  it("should call toggle collapse function when collapse button is clicked", () => {
    renderComponent();
    const collapseButton = screen.getByAltText("collapsed");
    fireEvent.click(collapseButton);
    expect(mockSetCollapse).toHaveBeenCalledWith(true);
  });

  it("should change active tab when a sidebar item is clicked", () => {
    renderComponent();
    const sidebarLink = screen.getByRole("link", { name: /some-tab-title/i });
    fireEvent.click(sidebarLink);
    expect(mockSetActiveTab).toHaveBeenCalledWith("/some-tab-url");
  });

  it("should display SweetAlert when user is inactive", () => {
    jest.useFakeTimers();
    renderComponent();

    // Simulate user inactivity
    jest.advanceTimersByTime(18000000);

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      title: "User inactive for 10 min. Please login again",
    });

    jest.useRealTimers();
  });

  it("should clear session storage when refresh page count is 1", () => {
    sessionStorage.setItem("refreshCount", "1");
    renderComponent();
    expect(sessionStorage.clear).toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      title: "Dont refresh the page. Please login again",
    });
  });

  it("should update the URL when the component loads", () => {
    renderComponent();
    expect(mockSetUrl).toHaveBeenCalledWith("/some-url");
  });

  it("should remove event listeners on unmount", () => {
    const { unmount } = renderComponent();
    unmount();
    window.dispatchEvent(new Event("mousemove"));
    expect(mockSetActiveTab).not.toHaveBeenCalled();
  });
});
