import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SelectButtonV2 from "../SelectButtonV2";

describe("SelectButtonV2", () => {
    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    it("renders without errors", () => {
        render(
            <SelectButtonV2
                setOption={() => {}}
                options={options}
                placeholder="Select an option"
            />
        );
    });

    it("displays the placeholder when no option is selected", () => {
        const { getByText } = render(
            <SelectButtonV2
                setOption={() => {}}
                options={options}
                placeholder="Select an option"
            />
        );

        expect(getByText("Select an option")).toBeInTheDocument();
    });

    it("displays the selected option", () => {
        const { getByText } = render(
            <SelectButtonV2
                setOption={() => {}}
                options={options}
                selectedOption="option1"
                placeholder="Select an option"
            />
        );

        expect(getByText("Option 1")).toBeInTheDocument();
    });

    it("calls the setOption function when an option is clicked", () => {
        const setOption = jest.fn();
        const { getByText } = render(
            <SelectButtonV2
                setOption={setOption}
                options={options}
                placeholder="Select an option"
            />
        );

        fireEvent.click(getByText("Option 1"));
        expect(setOption).toHaveBeenCalledWith({
            value: "option1",
            label: "Option 1",
        });
    });

    // Add more test cases as needed...
});
