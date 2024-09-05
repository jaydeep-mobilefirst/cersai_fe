import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SelectButtonUserManagement, { Option } from "../SelectButtonManagement";

describe("SelectButtonUserManagement", () => {
    const options: Option[] = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    test("renders without errors", () => {
        render(
            <SelectButtonUserManagement
                setOption={() => {}}
                options={options}
                placeholder="Select an option"
            />
        );
    });

    test("displays the placeholder when no option is selected", () => {
        const { getByText } = render(
            <SelectButtonUserManagement
                setOption={() => {}}
                options={options}
                placeholder="Select an option"
            />
        );

        expect(getByText("Select an option")).toBeInTheDocument();
    });

    test("displays the selected option", () => {
        const { getByText } = render(
            <SelectButtonUserManagement
                setOption={() => {}}
                options={options}
                selectedOption="option2"
                placeholder="Select an option"
            />
        );

        expect(getByText("Option 2")).toBeInTheDocument();
    });

    test("calls setOption when an option is clicked", () => {
        const setOption = jest.fn();
        const { getByText } = render(
            <SelectButtonUserManagement
                setOption={setOption}
                options={options}
                placeholder="Select an option"
            />
        );

        fireEvent.click(getByText("Option 1"));

        expect(setOption).toHaveBeenCalledWith({ value: "option1", label: "Option 1" });
    });

    test("toggles the dropdown when the button is clicked", () => {
        const { getByText } = render(
            <SelectButtonUserManagement
                setOption={() => {}}
                options={options}
                placeholder="Select an option"
            />
        );

        fireEvent.click(getByText("Select an option"));

        expect(getByText("Option 1")).toBeInTheDocument();
        expect(getByText("Option 2")).toBeInTheDocument();
        expect(getByText("Option 3")).toBeInTheDocument();

        fireEvent.click(getByText("Select an option"));

        expect(getByText("Option 1")).not.toBeInTheDocument();
        expect(getByText("Option 2")).not.toBeInTheDocument();
        expect(getByText("Option 3")).not.toBeInTheDocument();
    });
});
