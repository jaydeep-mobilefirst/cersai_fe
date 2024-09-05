import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SelectButtonUserManagement from "../SelectButtonManagement";

describe("SelectButtonUserManagement", () => {
    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    test("renders with default props", () => {
        const { getByText } = render(
            <SelectButtonUserManagement
                setOption={() => {}}
                options={options}
                placeholder="Select an option"
            />
        );

        const placeholderText = getByText("Select an option");
        expect(placeholderText).toBeInTheDocument();
    });

    test("renders with selected option", () => {
        const { getByText } = render(
            <SelectButtonUserManagement
                setOption={() => {}}
                options={options}
                selectedOption="option2"
                placeholder="Select an option"
            />
        );

        const selectedOptionText = getByText("Option 2");
        expect(selectedOptionText).toBeInTheDocument();
    });

    test("opens dropdown on button click", () => {
        const { getByRole } = render(
            <SelectButtonUserManagement
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

    test("closes dropdown on outside click", () => {
        const { getByRole } = render(
            <SelectButtonUserManagement
                setOption={() => {}}
                options={options}
                placeholder="Select an option"
            />
        );

        const button = getByRole("button");
        fireEvent.click(button);

        const dropdown = getByRole("menu");
        expect(dropdown).toBeInTheDocument();

        fireEvent.mouseDown(document.body);

        expect(dropdown).not.toBeInTheDocument();
    });

    test("calls setOption when an option is clicked", () => {
        const setOptionMock = jest.fn();
        const { getByText } = render(
            <SelectButtonUserManagement
                setOption={setOptionMock}
                options={options}
                placeholder="Select an option"
            />
        );

        const button = getByText("Select an option");
        fireEvent.click(button);

        const option = getByText("Option 1");
        fireEvent.click(option);

        expect(setOptionMock).toHaveBeenCalledWith(options[0]);
    });
});
