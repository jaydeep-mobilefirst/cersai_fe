import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskTabsItem from "../TaskTabItems";

describe("TaskTabsItem Component", () => {
  it("renders the correct text", () => {
    render(<TaskTabsItem text="Profile" isActive={false} onClick={() => {}} />);

    const listItem = screen.getByText("Profile");
    expect(listItem).toBeInTheDocument();
  });

  it("applies the active styles when isActive is true", () => {
    render(<TaskTabsItem text="Profile" isActive={true} onClick={() => {}} />);

    const listItem = screen.getByText("Profile");

    // Check if the text has the active styles
    expect(listItem).toHaveClass("font-bold");
    expect(listItem).toHaveClass("text-[#1C468E]");
  });

  it("does not apply the active styles when isActive is false", () => {
    render(<TaskTabsItem text="Profile" isActive={false} onClick={() => {}} />);

    const listItem = screen.getByText("Profile");

    // Check if the text does not have the active styles
    expect(listItem).not.toHaveClass("font-bold");
    expect(listItem).toHaveClass("text-[#666666]");
  });

  it("calls the onClick function when clicked", () => {
    const handleClick = jest.fn();
    render(<TaskTabsItem text="Profile" isActive={false} onClick={handleClick} />);

    const listItem = screen.getByText("Profile");

    // Simulate a click event
    fireEvent.click(listItem);

    // Check if the onClick handler was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders the correct background color for the active state", () => {
    render(<TaskTabsItem text="Profile" isActive={true} onClick={() => {}} />);

    const activeIndicator = screen.getByRole("listitem").querySelector("div + div");

    // Check if the background is active when isActive is true
    expect(activeIndicator).toHaveClass("bg-[#1C468E]");
  });

  it("renders the correct background color for the inactive state", () => {
    render(<TaskTabsItem text="Profile" isActive={false} onClick={() => {}} />);

    const inactiveIndicator = screen.getByRole("listitem").querySelector("div + div");

    // Check if the background is inactive when isActive is false
    expect(inactiveIndicator).toHaveClass("bg-white");
  });
});
