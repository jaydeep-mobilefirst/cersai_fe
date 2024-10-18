import { render, screen, fireEvent } from "@testing-library/react";
import TaskTabsItem from "../TaskTabItems";
import React from "react";

describe("TaskTabsItem Component (Static)", () => {
  const mockOnClick = jest.fn();

  const renderComponent = (isActive = false) => {
    return render(
      <TaskTabsItem text="Profile" isActive={isActive} onClick={mockOnClick} />
    );
  };

  test("renders the tab text", () => {
    renderComponent();

    // Check if the tab text is rendered
    const tabText = screen.getByText("Profile");
    expect(tabText).toBeInTheDocument();
  });

  test("applies active class when isActive is true", () => {
    renderComponent(true);

    // Check if the tab has the active class when isActive is true
    const activeTab = screen.getByText("Profile");
    expect(activeTab).toHaveClass("font-bold");
    expect(activeTab).toHaveClass("text-[#1C468E]");
  });

  test("applies inactive class when isActive is false", () => {
    renderComponent(false);

    // Check if the tab has the inactive class when isActive is false
    const inactiveTab = screen.getByText("Profile");
    expect(inactiveTab).not.toHaveClass("font-bold");
    expect(inactiveTab).toHaveClass("text-[#666666]");
  });

  test("triggers onClick when the tab is clicked", () => {
    renderComponent();

    const tabItem = screen.getByText("Profile");
    fireEvent.click(tabItem);

    // Check if onClick is triggered when the tab is clicked
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
