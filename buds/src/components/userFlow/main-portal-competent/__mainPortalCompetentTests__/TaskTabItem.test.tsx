import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TaskTabsItem from "../TaskTabItems";

describe("TaskTabsItem", () => {
    it("renders the component correctly", () => {
        const onClick = jest.fn();
        const { getByText } = render(
            <TaskTabsItem text="Test Text" isActive={true} onClick={onClick} />
        );

        const textElement = getByText("Test Text");
        expect(textElement).toBeInTheDocument();

        fireEvent.click(textElement);
        expect(onClick).toHaveBeenCalled();
    });
});
