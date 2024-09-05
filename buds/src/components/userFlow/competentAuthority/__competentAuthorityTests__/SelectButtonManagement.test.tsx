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

    test("displays placeholder when no option is selected", () => {
        const { getByText } = render(
            <SelectButtonUserManagement
                setOption={() => {}}
                options={options}
                placeholder="Select an option"
            />
        );

        expect(getByText("Select an option")).toBeInTheDocument();
    });

    test("displays selected option when an option is selected", () => {
        const { getByText } = render(
            <SelectButtonUserManagement
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
            <SelectButtonUserManagement
                setOption={setOption}
                options={options}
                placeholder="Select an option"
            />
        );

        fireEvent.click(getByText("Option 1"));

        expect(setOption).toHaveBeenCalledWith({ value: "option1", label: "Option 1" });
    });

    test("toggles dropdown when button is clicked", () => {
        const { getByRole } = render(
            <SelectButtonUserManagement
                setOption={() => {}}
                options={options}
                placeholder="Select an option"
            />
        );

        const button = getByRole("button");

        fireEvent.click(button);

        expect(button.getAttribute("aria-expanded")).toBe("true");

        fireEvent.click(button);

        expect(button.getAttribute("aria-expanded")).toBe("false");
    });
});
