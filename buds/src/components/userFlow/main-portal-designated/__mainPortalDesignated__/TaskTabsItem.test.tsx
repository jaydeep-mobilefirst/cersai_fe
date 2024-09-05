import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TaskTabsItem from "../TaskTabItems";

test("renders TaskTabsItem component", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
        <TaskTabsItem text="Test Text" isActive={true} onClick={onClickMock} />
    );

    const listItem = getByText("Test Text");
    fireEvent.click(listItem);

    expect(listItem).toBeInTheDocument();
    expect(onClickMock).toHaveBeenCalled();
});
