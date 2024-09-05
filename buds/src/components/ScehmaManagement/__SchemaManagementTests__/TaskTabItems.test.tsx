import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TaskTabsItem from "../TaskTabItems";

describe("TaskTabsItem", () => {
    test("renders correctly", () => {
        const props = {
            text: "Test Item",
            isActive: true,
            onClick: jest.fn(),
        };

        const { getByText } = render(<TaskTabsItem {...props} />);

        const itemText = getByText("Test Item");
        expect(itemText).toBeInTheDocument();

        const activeClass = itemText.classList.contains("font-bold");
        expect(activeClass).toBe(true);
    });

    test("calls onClick when clicked", () => {
        const props = {
            text: "Test Item",
            isActive: false,
            onClick: jest.fn(),
        };

        const { getByText } = render(<TaskTabsItem {...props} />);

        const item = getByText("Test Item");
        fireEvent.click(item);

        expect(props.onClick).toHaveBeenCalled();
    });
});

