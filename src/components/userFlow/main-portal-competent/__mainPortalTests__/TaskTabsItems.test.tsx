import { render, screen, fireEvent } from "@testing-library/react";
import TaskTabsItem from "../TaskTabItems"; // Assuming the TaskTabsItem component is in the same folder
import React from "react";

describe("TaskTabsItem Component", () => {
  const mockOnClick = jest.fn();

  const renderComponent = (isActive = false) => {
    return render(
      <TaskTabsItem text="Profile" isActive={isActive} onClick={mockOnClick} />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders TaskTabsItem with correct text", () => {
    renderComponent();

    const tabItem = screen.getByText("Profile");
    expect(tabItem).toBeInTheDocument();
  });

  test("applies active class when isActive is true", () => {
    renderComponent(true);

    const activeTab = screen.getByText("Profile");
    expect(activeTab).toHaveClass("font-bold");
    expect(activeTab).toHaveClass("text-[#1C468E]");
  });

  test("applies inactive class when isActive is false", () => {
    renderComponent(false);

    const inactiveTab = screen.getByText("Profile");
    expect(inactiveTab).toHaveClass("text-[#666666]");
    expect(inactiveTab).not.toHaveClass("font-bold");
  });

  test("triggers onClick when the tab is clicked", () => {
    renderComponent();

    const tabItem = screen.getByText("Profile");
    fireEvent.click(tabItem);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
