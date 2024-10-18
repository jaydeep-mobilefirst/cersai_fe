import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectButtonUserManagement from "../SelectButtonManagement";

describe("SelectButtonUserManagement", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  
  const setOptionMock = jest.fn();

  test("renders the component with placeholder text", () => {
    render(
      <SelectButtonUserManagement
        setOption={setOptionMock}
        options={options}
        placeholder="Select an option"
      />
    );

    const button = screen.getByText("Select an option");
    expect(button).toBeInTheDocument();
  });

  test("displays the selected option when an option is selected", () => {
    render(
      <SelectButtonUserManagement
        setOption={setOptionMock}
        options={options}
        selectedOption="Option 1"
        placeholder="Select an option"
      />
    );

    const button = screen.getByText("Option 1");
    expect(button).toBeInTheDocument();
  });

  test("opens the dropdown when the button is clicked", () => {
    render(
      <SelectButtonUserManagement
        setOption={setOptionMock}
        options={options}
        placeholder="Select an option"
      />
    );

    const button = screen.getByText("Select an option");
    fireEvent.click(button);

    // Check if the dropdown appears
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  test("calls setOption when an option is clicked", () => {
    render(
      <SelectButtonUserManagement
        setOption={setOptionMock}
        options={options}
        placeholder="Select an option"
      />
    );

    // Open the dropdown
    const button = screen.getByText("Select an option");
    fireEvent.click(button);

    // Click the second option
    const option2 = screen.getByText("Option 2");
    fireEvent.click(option2);

    // Check if setOption was called with the correct value
    expect(setOptionMock).toHaveBeenCalledWith({ value: "option2", label: "Option 2" });
  });

  test("closes the dropdown when an option is selected", () => {
    render(
      <SelectButtonUserManagement
        setOption={setOptionMock}
        options={options}
        placeholder="Select an option"
      />
    );

    // Open the dropdown
    const button = screen.getByText("Select an option");
    fireEvent.click(button);

    // Click an option
    const option1 = screen.getByText("Option 1");
    fireEvent.click(option1);

    // The dropdown should now be closed
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });

  test("closes the dropdown when clicking outside", () => {
    render(
      <SelectButtonUserManagement
        setOption={setOptionMock}
        options={options}
        placeholder="Select an option"
      />
    );

    // Open the dropdown
    const button = screen.getByText("Select an option");
    fireEvent.click(button);

    // Check dropdown is visible
    expect(screen.getByText("Option 1")).toBeInTheDocument();

    // Click outside the dropdown
    fireEvent.mouseDown(document);

    // Dropdown should now be closed
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
  });
});
