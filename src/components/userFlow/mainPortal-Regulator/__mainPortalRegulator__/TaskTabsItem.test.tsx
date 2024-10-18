import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'; // for extra matchers like "toHaveClass"
import TaskTabsItem from "../TaskTabItem";
import React from "react";

describe("TaskTabsItem Component", () => {
  const mockOnClick = jest.fn(); // Mock function for click events
  const defaultText = "Test Tab";

  afterEach(() => {
    jest.clearAllMocks(); // Clears any mock function calls after each test
  });

  test("renders the tab text correctly", () => {
    render(<TaskTabsItem text={defaultText} isActive={false} onClick={mockOnClick} />);
    
    // Check if the text is rendered
    expect(screen.getByText(defaultText)).toBeInTheDocument();
  });

  test("applies active styles when isActive is true", () => {
    render(<TaskTabsItem text={defaultText} isActive={true} onClick={mockOnClick} />);

    const tabItem = screen.getByText(defaultText);
    
    // Check if active styles are applied
    expect(tabItem).toHaveClass("font-bold");
    expect(tabItem).toHaveClass("text-[#1C468E]");
  });

  test("applies inactive styles when isActive is false", () => {
    render(<TaskTabsItem text={defaultText} isActive={false} onClick={mockOnClick} />);

    const tabItem = screen.getByText(defaultText);
    
    // Check if inactive styles are applied
    expect(tabItem).not.toHaveClass("font-bold");
    expect(tabItem).toHaveClass("text-[#666666]");
  });

  test("renders the bottom bar with active styles when isActive is true", () => {
    render(<TaskTabsItem text={defaultText} isActive={true} onClick={mockOnClick} />);
    
    const activeBar = screen.getByText(defaultText).nextSibling;
    
    // Check if the active bottom bar is shown
    expect(activeBar).toHaveClass("bg-[#1C468E]");
  });

  test("renders the bottom bar with inactive styles when isActive is false", () => {
    render(<TaskTabsItem text={defaultText} isActive={false} onClick={mockOnClick} />);
    
    const inactiveBar = screen.getByText(defaultText).nextSibling;
    
    // Check if the inactive bottom bar is shown
    expect(inactiveBar).toHaveClass("bg-white");
  });

  test("calls onClick when clicked", () => {
    render(<TaskTabsItem text={defaultText} isActive={false} onClick={mockOnClick} />);

    // Click on the tab item
    fireEvent.click(screen.getByText(defaultText));

    // Check if the click handler was called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
