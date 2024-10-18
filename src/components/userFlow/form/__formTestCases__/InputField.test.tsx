import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputFields from "../InputField";

// Mock the Calendar SVG component
jest.mock("./svgs/Calender", () => () => <svg data-testid="calendar-icon" />);

describe("InputFields Component", () => {
  test("renders the text input field correctly", () => {
    render(<InputFields type="text" placeholder="Enter text" />);
    
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
  });

  test("renders the date picker correctly", () => {
    render(<InputFields type="date" />);

    const dateButton = screen.getByText("Select Date");
    expect(dateButton).toBeInTheDocument();
    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
  });

  test("renders custom background color for the text input", () => {
    render(<InputFields type="text" bgColor="bg-red-500" placeholder="Enter text" />);
    
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toHaveClass("bg-red-500");
  });

  test("displays default 'Select Date' text when no date is selected", () => {
    render(<InputFields type="date" />);
    
    const dateButton = screen.getByText("Select Date");
    expect(dateButton).toBeInTheDocument();
  });

  test("does not render hidden date input when type is text", () => {
    render(<InputFields type="text" placeholder="Enter text" />);

    const dateInput = screen.queryByLabelText("datePicker");
    expect(dateInput).toBeNull();
  });

  test("renders a hidden date input when type is date", () => {
    render(<InputFields type="date" />);

    const dateInput = screen.getByLabelText("datePicker");
    expect(dateInput).toHaveAttribute("type", "date");
    expect(dateInput).toHaveClass("absolute opacity-0 -z-10");
  });

  test("shows the calendar icon in date input mode", () => {
    render(<InputFields type="date" />);
    
    const calendarIcon = screen.getByTestId("calendar-icon");
    expect(calendarIcon).toBeInTheDocument();
  });
});
