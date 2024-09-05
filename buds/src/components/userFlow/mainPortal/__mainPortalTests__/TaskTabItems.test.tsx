import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TaskTabsItem from "../TaskTabItems";

describe("TaskTabsItem", () => {
    test("renders correctly", () => {
        const props = {
            text: "Task 1",
            isActive: true,
            onClick: jest.fn(),
        };

        const { getByText } = render(<TaskTabsItem {...props} />);

        const taskText = getByText("Task 1");
        expect(taskText).toBeInTheDocument();

        fireEvent.click(taskText);
        expect(props.onClick).toHaveBeenCalled();
    });
});
