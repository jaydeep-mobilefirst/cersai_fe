import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectButton from "../SelectButton";

describe("SelectButton Component", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];

  test("renders the SelectButton with placeholder text", () => {
    render(<SelectButton placeholder="Select an option" options={options} />);

    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  test("renders options correctly when dropdown is clicked", () => {
    render(<SelectButton placeholder="Select an option" options={options} />);

    const button = screen.getByText("Select an option");
    fireEvent.click(button);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  test("closes the dropdown when an option is clicked", () => {
    render(<SelectButton placeholder="Select an option" options={options} />);

    const button = screen.getByText("Select an option");
    fireEvent.click(button);

    const option = screen.getByText("Option 1");
    fireEvent.click(option);

    expect(option).not.toBeInTheDocument();
  });

  test("renders search input if enableSearch is true", () => {
    render(
      <SelectButton
        placeholder="Select an option"
        options={options}
        enableSearch={true}
      />
    );

    const button = screen.getByText("Select an option");
    fireEvent.click(button);

    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();
  });

  test("renders disabled button when disabled prop is true", () => {
    render(
      <SelectButton
        placeholder="Select an option"
        options={options}
        disabled={true}
      />
    );

    const button = screen.getByText("Select an option");
    expect(button).toBeDisabled();
  });

  test("displays selected option label when an option is selected", () => {
    render(
      <SelectButton
        placeholder="Select an option"
        options={options}
        selectedOption="option1"
      />
    );

    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  test("renders custom background color when provided", () => {
    render(
      <SelectButton
        placeholder="Select an option"
        options={options}
        backgroundColor="lightblue"
      />
    );

    const button = screen.getByText("Select an option");
    expect(button).toHaveStyle("background-color: lightblue");
  });

  test("shows arrow toggle correctly when dropdown is opened and closed", () => {
    render(<SelectButton placeholder="Select an option" options={options} />);

    const button = screen.getByText("Select an option");
    fireEvent.click(button);
    const upArrow = screen.getByRole("img", { hidden: true });
    expect(upArrow).toBeInTheDocument();

    fireEvent.click(button);
    const downArrow = screen.getByRole("img", { hidden: true });
    expect(downArrow).toBeInTheDocument();
  });
});
