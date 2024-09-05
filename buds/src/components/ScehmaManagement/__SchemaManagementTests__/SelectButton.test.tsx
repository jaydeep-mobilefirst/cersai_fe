import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SelectButtonTask from "../SelectButton";
import { Option } from "../SelectButton";

describe("SelectButtonTask", () => {
    const options: Option[] = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    test("renders the placeholder when no option is selected", () => {
        const { getByText } = render(
            <SelectButtonTask
                setOption={() => {}}
                options={options}
                placeholder="Select an option"
            />
        );

        expect(getByText("Select an option")).toBeInTheDocument();
    });

    test("renders the selected option when an option is selected", () => {
        const { getByText } = render(
            <SelectButtonTask
                setOption={() => {}}
                options={options}
                selectedOption="option1"
                placeholder="Select an option"
            />
        );

        expect(getByText("Option 1")).toBeInTheDocument();
    });

    test("calls setOption when an option is clicked", () => {
        const setOption = jest.fn();
        const { getByText } = render(
            <SelectButtonTask
                setOption={setOption}
                options={options}
                placeholder="Select an option"
            />
        );

        fireEvent.click(getByText("Option 1"));

        expect(setOption).toHaveBeenCalledWith("option1");
    });

    // Add more test cases as needed
});
