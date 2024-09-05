import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SelectButtonV3 from "../SelectButtonV3";

describe("SelectButtonV3", () => {
    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    test("renders without error", () => {
        render(
            <SelectButtonV3
                setOption={() => {}}
                options={options}
                placeholder="Select an option"
            />
        );
    });

    test("displays placeholder when no option is selected", () => {
        const { getByText } = render(
            <SelectButtonV3
                setOption={() => {}}
                options={options}
                placeholder="Select an option"
            />
        );

        expect(getByText("Select an option")).toBeInTheDocument();
    });

    test("displays selected option when an option is selected", () => {
        const { getByText } = render(
            <SelectButtonV3
                setOption={() => {}}
                options={options}
                selectedOption="option1"
                placeholder="Select an option"
            />
        );

        expect(getByText("Option 1")).toBeInTheDocument();
    });

    test("toggles dropdown when button is clicked", () => {
        const { getByRole } = render(
            <SelectButtonV3
                setOption={() => {}}
                options={options}
                placeholder="Select an option"
            />
        );

        const button = getByRole("button");
        fireEvent.click(button);

        const dropdown = getByRole("menu");
        expect(dropdown).toBeInTheDocument();
    });

    test("calls setOption when an option is clicked", () => {
        const setOptionMock = jest.fn();
        const { getByText } = render(
            <SelectButtonV3
                setOption={setOptionMock}
                options={options}
                placeholder="Select an option"
            />
        );

        const option = getByText("Option 1");
        fireEvent.click(option);

        expect(setOptionMock).toHaveBeenCalledWith(options[0]);
    });
});
