import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectButtonMultiselect from "../SelectButtonMultiselect";

describe("SelectButtonMultiselect", () => {
    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    test("renders the component with options", () => {
        render(
            <SelectButtonMultiselect
                setOption={() => {}}
                options={options}
                placeholder="Select an option"
            />
        );

        // Assert that the component renders without errors
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByText("Select")).toBeInTheDocument();

        // Click the button to open the dropdown
        fireEvent.click(screen.getByRole("button"));

        // Assert that the dropdown is visible
        expect(screen.getByRole("menu")).toBeInTheDocument();

        // Assert that the options are rendered
        options.forEach((option) => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    test("selects an option", () => {
        const setOptionMock = jest.fn();

        render(
            <SelectButtonMultiselect
                setOption={setOptionMock}
                options={options}
                placeholder="Select an option"
            />
        );

        // Click the button to open the dropdown
        fireEvent.click(screen.getByRole("button"));

        // Click an option
        fireEvent.click(screen.getByText("Option 1"));

        // Assert that the selected option is passed to the setOption function
        expect(setOptionMock).toHaveBeenCalledWith(options[0]);
    });
});

