import { render, screen, fireEvent } from "@testing-library/react";
import SelectButtonUserManagement from "../SelectButtonManagement"; // Adjust the import path as necessary
import React from "react";

// Define all text elements in an object
const texts = {
  placeholder: "Select an option",
  options: [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ],
};

describe("SelectButtonUserManagement Component", () => {
  const setOptionMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("renders the SelectButtonUserManagement correctly", () => {
    render(
      <SelectButtonUserManagement
        setOption={setOptionMock}
        options={texts.options}
        placeholder={texts.placeholder}
        bgColor="#FFFFFF"
        borderColor="#E6E6E6"
      />
    );

    // Check if the placeholder is displayed correctly
    expect(screen.getByText(new RegExp(texts.placeholder, "i"))).toBeInTheDocument();
  });

  test("opens the dropdown when button is clicked", () => {
    render(
      <SelectButtonUserManagement
        setOption={setOptionMock}
        options={texts.options}
        placeholder={texts.placeholder}
      />
    );

    // Click the dropdown button
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Check if the dropdown options are visible
    texts.options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test("calls setOption with the correct value when an option is clicked", () => {
    render(
      <SelectButtonUserManagement
        setOption={setOptionMock}
        options={texts.options}
        placeholder={texts.placeholder}
      />
    );

    // Open the dropdown
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Click on the first option
    const firstOption = screen.getByText(texts.options[0].label);
    fireEvent.click(firstOption);

    // Check if setOption is called with the correct value
    expect(setOptionMock).toHaveBeenCalledWith(texts.options[0]);
  });

  // Uncomment and adjust if necessary
  // test("closes the dropdown when an option is selected", () => {
  //   render(
  //     <SelectButtonUserManagement
  //       setOption={setOptionMock}
  //       options={texts.options}
  //       placeholder={texts.placeholder}
  //     />
  //   );

  //   // Open the dropdown
  //   const button = screen.getByRole("button");
  //   fireEvent.click(button);

  //   // Click on the first option
  //   const firstOption = screen.getByText(texts.options[0].label);
  //   fireEvent.click(firstOption);

  //   // Verify that the dropdown is closed
  //   expect(screen.queryByText(texts.options[0].label)).not.toBeVisible();
  // });

  test("closes the dropdown when clicking outside", () => {
    render(
      <SelectButtonUserManagement
        setOption={setOptionMock}
        options={texts.options}
        placeholder={texts.placeholder}
      />
    );

    // Open the dropdown
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Click outside the dropdown to close it
    fireEvent.mouseDown(document);

    // Verify that the dropdown is closed
    expect(screen.queryByText(texts.options[0].label)).not.toBeVisible();
  });
});
