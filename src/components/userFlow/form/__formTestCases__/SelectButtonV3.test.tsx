import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SelectButtonV3 from "../SelectButtonV3";

describe("SelectButtonV3 Component", () => {
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ];

  const setOptionMock = jest.fn();

  it("renders the SelectButton with placeholder text", () => {
    render(
      <SelectButtonV3
        setOption={setOptionMock}
        options={options}
        placeholder="Select an option"
      />
    );

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Select an option");
  });

  it("displays the selected option when selected", () => {
    render(
      <SelectButtonV3
        setOption={setOptionMock}
        options={options}
        placeholder="Select an option"
        selectedOption="Option 1"
      />
    );

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveTextContent("Option 1");
  });

  it("toggles the dropdown when the button is clicked", () => {
    render(
      <SelectButtonV3
        setOption={setOptionMock}
        options={options}
        placeholder="Select an option"
      />
    );

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

   
  });

  it("calls setOption when an option is selected", () => {
    render(
      <SelectButtonV3
        setOption={setOptionMock}
        options={options}
        placeholder="Select an option"
      />
    );

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    const optionElement = screen.getByText("Option 1");
    fireEvent.click(optionElement);

    expect(setOptionMock).toHaveBeenCalledWith(options[0]);
  });

  
});
