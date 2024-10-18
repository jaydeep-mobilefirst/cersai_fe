import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SelectButtonUserManagement, { Option } from "../SelectButtonManagement";

describe("SelectButtonUserManagement", () => {
    const options: Option[] = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
    ];

    test("renders with default props", () => {
        const setOption = jest.fn();
        const { getByText } = render(
            <SelectButtonUserManagement
                setOption={setOption}
                options={options}
                placeholder="Select an option"
            />
        );

        const placeholderText = getByText("Select an option");
        expect(placeholderText).toBeInTheDocument();
    });

    test("renders with selected option", () => {
        const setOption = jest.fn();
        const { getByText } = render(
            <SelectButtonUserManagement
                setOption={setOption}
                options={options}
                selectedOption="Option 2"
                placeholder="Select an option"
            />
        );

        const selectedOptionText = getByText("Option 2");
        expect(selectedOptionText).toBeInTheDocument();
    });

    // test("calls setOption when an option is clicked", () => {
    //     const setOption = jest.fn();
    //     const { getByText } = render(
    //         <SelectButtonUserManagement
    //             setOption={setOption}
    //             options={options}
    //             placeholder="Select an option"
    //         />
    //     );

    //     const option2 = getByText("Option 2");
    //     fireEvent.click(option2);

    //     expect(setOption).toHaveBeenCalledWith({ value: "2", label: "Option 2" });
    // });

    test("toggles dropdown when button is clicked", () => {
        const setOption = jest.fn();
        const { getByRole, getByText } = render(
            <SelectButtonUserManagement
                setOption={setOption}
                options={options}
                placeholder="Select an option"
            />
        );

        const button = getByRole("button");
        fireEvent.click(button);

        const option1 = getByText("Option 1");
        expect(option1).toBeInTheDocument();

        fireEvent.click(button);

        // const option1AfterToggle = getByText("Option 1");
        // expect(option1AfterToggle).not.toBeInTheDocument();
    });
});
