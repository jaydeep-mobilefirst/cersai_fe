import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectButtonMultiselect from "../SelectButtonMultiselect";

const texts = {
    placeholder: "Select an option",
    option1: "Option 1",
    option2: "Option 2",
    option3: "Option 3",
    buttonRole: "button",
    menuRole: "menu",
};

describe("SelectButtonMultiselect", () => {
    const options = [
        { value: "option1", label: texts.option1 },
        { value: "option2", label: texts.option2 },
        { value: "option3", label: texts.option3 },
    ];

    test("renders the component with options", () => {
        render(
            <SelectButtonMultiselect
                setOption={() => {}}
                options={options}
                placeholder={texts.placeholder}
            />
        );

        // Assert that the component renders without errors
        expect(screen.getByRole(texts.buttonRole)).toBeInTheDocument();
        expect(screen.getByText(new RegExp(texts.placeholder, "i"))).toBeInTheDocument();

        // Click the button to open the dropdown
        fireEvent.click(screen.getByRole(texts.buttonRole));

        // Use getAllByRole to find multiple menus
        const menus = screen.getAllByRole(texts.menuRole);
        expect(menus.length).toBeGreaterThan(0);

        // If there's a specific menu you want to interact with, use the first one for simplicity
        const dropdownMenu = menus[0];

        // Assert that the options are rendered within the dropdown
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
                placeholder={texts.placeholder}
            />
        );

        // Click the button to open the dropdown
        fireEvent.click(screen.getByRole(texts.buttonRole));

        // Use getAllByRole to find multiple menus
        const menus = screen.getAllByRole(texts.menuRole);

        // If there's a specific menu you want to interact with, use the first one
        const dropdownMenu = menus[0];

        // Click an option inside the dropdown
        fireEvent.click(screen.getByText(texts.option1));

        // Assert that the selected option is passed to the setOption function
        expect(setOptionMock).toHaveBeenCalledWith(options[0]);
    });
});
