import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SelectButton from "../SelectButton";

describe("SelectButton", () => {
    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    it("should render the placeholder when no option is selected", () => {
        const { getByText } = render(
            <SelectButton options={options} placeholder="Select an option" />
        );

        expect(getByText("Select an option")).toBeInTheDocument();
    });

    it("should render the selected option label", () => {
        const { getByText } = render(
            <SelectButton
                options={options}
                placeholder="Select an option"
                selectedOption="option2"
            />
        );

        expect(getByText("Option 2")).toBeInTheDocument();
    });

    it("should call the onSelect callback when an option is selected", () => {
        const onSelect = jest.fn();
        const { getByText } = render(
            <SelectButton
                options={options}
                placeholder="Select an option"
                onSelect={onSelect}
            />
        );

        fireEvent.click(getByText("Option 1"));

        expect(onSelect).toHaveBeenCalledWith({
            value: "option1",
            label: "Option 1",
        });
    });

    // Add more test cases as needed
});
