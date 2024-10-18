import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button"; // Adjust the import based on your file structure

// Mock LoaderSpin by returning a simple placeholder
jest.mock("../../LoaderSpin", () => () => <div>Loading...</div>); 

describe("Button Component", () => {
  it("renders with the correct label", () => {
    render(<Button label="Click Me" variant="filled" />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("applies the correct styles for filled variant", () => {
    const { container } = render(<Button label="Click Me" variant="filled" />);
    expect(container.firstChild).toHaveClass("bg-[#1c468e] text-white");
  });

  it("applies the correct styles for outlined variant", () => {
    const { container } = render(<Button label="Click Me" variant="outlined" />);
    expect(container.firstChild).toHaveClass("border border-[#1c468e] text-[#1c468e]");
  });

  it("disables the button when disabled prop is true", () => {
    render(<Button label="Click Me" variant="filled" disabled={true} />);
    const button = screen.getByText("Click Me");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("cursor-not-allowed opacity-50");
  });

  it("calls onClick function when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" variant="filled" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows loader when loader prop is true", () => {
    render(<Button label="Click Me" variant="filled" loader={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Click Me")).not.toBeInTheDocument();
  });
});
