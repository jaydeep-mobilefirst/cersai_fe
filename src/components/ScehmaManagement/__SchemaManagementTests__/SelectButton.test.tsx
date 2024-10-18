import { render, screen, fireEvent } from "@testing-library/react";
import SelectButtonTask from "../SelectButton";
import React from "react";

describe("SelectButtonTask Component", () => {
  const mockSetOption = jest.fn();
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  test("renders with placeholder text", () => {
    render(
      <SelectButtonTask
        setOption={mockSetOption}
        options={options}
        placeholder="Select an option"
      />
    );

    const placeholderElement = screen.getByText("Select an option");
    expect(placeholderElement).toBeInTheDocument();
  });

  test("renders with the selected option", () => {
    render(
      <SelectButtonTask
        setOption={mockSetOption}
        options={options}
        selectedOption="Option 1"
        placeholder="Select an option"
      />
    );

    const selectedOptionElement = screen.getByText("Option 1");
    expect(selectedOptionElement).toBeInTheDocument();
  });

  test("displays dropdown options when button is clicked", () => {
    render(
      <SelectButtonTask
        setOption={mockSetOption}
        options={options}
        placeholder="Select an option"
      />
    );

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    options.forEach((option) => {
      const optionElement = screen.getByText(option.label);
      expect(optionElement).toBeInTheDocument();
    });
  });

  test("hides dropdown options when clicking outside", () => {
    render(
      <div>
        <SelectButtonTask
          setOption={mockSetOption}
          options={options}
          placeholder="Select an option"
        />
        <div data-testid="outside-element">Outside element</div>
      </div>
    );

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    const outsideElement = screen.getByTestId("outside-element");
    fireEvent.mouseDown(outsideElement);

    options.forEach((option) => {
      const optionElement = screen.queryByText(option.label);
      expect(optionElement).not.toBeInTheDocument();
    });
  });

  test("calls setOption when an option is clicked", () => {
    render(
      <SelectButtonTask
        setOption={mockSetOption}
        options={options}
        placeholder="Select an option"
      />
    );

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    const optionElement = screen.getByText("Option 2");
    fireEvent.click(optionElement);

    expect(mockSetOption).toHaveBeenCalledWith("option2");
  });

  test("renders with custom background color", () => {
    render(
      <SelectButtonTask
        setOption={mockSetOption}
        options={options}
        placeholder="Select an option"
        bgColor="#FFD700"
      />
    );

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveStyle("background-color: #FFD700");
  });

  test("renders with custom border color", () => {
    render(
      <SelectButtonTask
        setOption={mockSetOption}
        options={options}
        placeholder="Select an option"
        borderColor="#FF0000"
      />
    );

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveStyle("border: 1px solid #FF0000");
  });

  test("renders with custom width in medium screens", () => {
    render(
      <SelectButtonTask
        setOption={mockSetOption}
        options={options}
        placeholder="Select an option"
        mdWidth="md:w-[300px]"
      />
    );

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("md:w-[300px]");
  });
});
