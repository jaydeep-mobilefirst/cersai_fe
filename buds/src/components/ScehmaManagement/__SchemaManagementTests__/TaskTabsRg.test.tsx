import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TaskTabsRg from "../TaskTabsRg";
import React from "react";

test("renders TaskTabsRg component", () => {
    render(
        <BrowserRouter>
            <TaskTabsRg />
        </BrowserRouter>
    );

    // Assert that the component renders without errors
    const taskTabsRgElement = screen.getByTestId("task-tabs-rg");
    expect(taskTabsRgElement).toBeInTheDocument();
});

test("renders correct number of tabs", () => {
    render(
        <BrowserRouter>
            <TaskTabsRg />
        </BrowserRouter>
    );

    // Assert that the component renders the correct number of tabs
    const tabElements = screen.getAllByTestId("task-tab-item");
    expect(tabElements.length).toBe(2);
});

test("sets active tab correctly", () => {
    render(
        <BrowserRouter>
            <TaskTabsRg />
        </BrowserRouter>
    );

    // Assert that the active tab is set correctly
    const activeTabElement = screen.getByTestId("active-tab");
    expect(activeTabElement).toHaveTextContent("Schemes");
});

test("changes active tab on click", () => {
    render(
        <BrowserRouter>
            <TaskTabsRg />
        </BrowserRouter>
    );

    // Click on the first tab
    const firstTabElement = screen.getByText("Deposit Takers");
    fireEvent.click(firstTabElement);

    // Assert that the active tab has changed
    const activeTabElement = screen.getByTestId("active-tab");
    expect(activeTabElement).toHaveTextContent("Deposit Takers");
});
