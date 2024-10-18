import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SelectField, { Option } from "../SelectField";

describe("SelectField", () => {
  const options: Option[] = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  test("renders the placeholder when no option is selected", () => {
    const { getByText } = render(
      <SelectField
        setOption={() => {}}
        options={options}
        placeholder="Select an option"
        height="40px"
      />
    );

    expect(getByText("Select an option")).toBeInTheDocument();
  });


  test("toggles the dropdown when the button is clicked", () => {
    const { getByText } = render(
      <SelectField
        setOption={() => {}}
        options={options}
        placeholder="Select an option"
        height="40px"
      />
    );

    const button = getByText("Select an option");
    fireEvent.click(button);

    expect(getByText("Option 1")).toBeInTheDocument();
    expect(getByText("Option 2")).toBeInTheDocument();
    expect(getByText("Option 3")).toBeInTheDocument();
  });

  test("calls the setOption function when an option is clicked", () => {
    const setOption = jest.fn();
    const { getByText } = render(
      <SelectField
        setOption={setOption}
        options={options}
        placeholder="Select an option"
        height="40px"
      />
    );

    const button = getByText("Select an option");
    fireEvent.click(button);

    const option2 = getByText("Option 2");
    fireEvent.click(option2);

    // Expect the full object to be passed to setOption
    expect(setOption).toHaveBeenCalledWith({ label: "Option 2", value: "option2" });
  });
});
