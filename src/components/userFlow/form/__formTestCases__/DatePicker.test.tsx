import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DatePicker from "../DatePicker";

// Mock Calendar component
jest.mock("./svgs/Calender", () => () => <svg data-testid="calendar-icon" />);

describe("DatePicker Component", () => {
  test("renders the DatePicker with 'Select Date' when no userValue is provided", () => {
    render(<DatePicker />);
    expect(screen.getByText("Select Date")).toBeInTheDocument();
    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
  });

  test("renders with the correct userValue formatted", () => {
    render(<DatePicker userValue="2023-10-03" />);
    expect(screen.getByText("03-10-2023")).toBeInTheDocument();
  });

  test("calls onChange when a date is selected", () => {
    const mockOnChange = jest.fn();
    render(<DatePicker onChange={mockOnChange} />);
    
    const dateInput = screen.getByRole("textbox", { hidden: true });
    fireEvent.change(dateInput, { target: { value: "2023-10-03" } });
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  test("disables the date picker when disabled prop is true", () => {
    render(<DatePicker disabled />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  test("maxDate is correctly applied for predefined values", () => {
    render(<DatePicker maxDate="startDate" />);
    const dateInput = screen.getByRole("textbox", { hidden: true });
    expect(dateInput).toHaveAttribute("max", new Date().toISOString().split("T")[0]);
  });

  test("sets min date when maxDate is 'lastDate' and startDate is provided", () => {
    const startDate = "2023-10-01";
    const mockStore = {
      setAllFormData: jest.fn(),
      setAllDocumentData: jest.fn(),
      allFormData: {
        formFields: {
          form_fields: [{ key: "startDateByCARG", userInput: startDate }],
        },
      },
    };
    jest.spyOn(require("../../../zust/deposit-taker-registration/registrationStore"), "useDepositTakerRegistrationStore").mockReturnValue(mockStore);
    
    render(<DatePicker maxDate="lastDate" />);
    
    const dateInput = screen.getByRole("textbox", { hidden: true });
    const expectedMinDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1))
      .toISOString()
      .split("T")[0];
    expect(dateInput).toHaveAttribute("min", expectedMinDate);
  });

  test("applies backgroundColor prop correctly", () => {
    render(<DatePicker backgroundColor="lightblue" />);
    const button = screen.getByRole("button");
    expect(button).toHaveStyle("background-color: lightblue");
  });

  test("sets hidden input type to date", () => {
    render(<DatePicker />);
    const dateInput = screen.getByRole("textbox", { hidden: true });
    expect(dateInput).toHaveAttribute("type", "date");
  });
});
