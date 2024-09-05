import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TaskTabs from "../TaskTabs";
import React from "react";

test("renders TaskTabs component", () => {
    render(
        <BrowserRouter>
            <TaskTabs />
        </BrowserRouter>
    );

    // Assert that the component renders without errors
    const taskTabsElement = screen.getByTestId("task-tabs");
    expect(taskTabsElement).toBeInTheDocument();
});

test("renders correct number of tabs", () => {
    render(
        <BrowserRouter>
            <TaskTabs />
        </BrowserRouter>
    );

    // Assert that the correct number of tabs are rendered
    const tabElements = screen.getAllByTestId("tab-item");
    expect(tabElements.length).toBe(1);
});

test("sets active tab correctly", () => {
    render(
        <BrowserRouter>
            <TaskTabs />
        </BrowserRouter>
    );

    // Assert that the active tab is set correctly
    const activeTabElement = screen.getByTestId("active-tab");
    expect(activeTabElement).toHaveTextContent("Scheme Creation");
});

test("handles tab click correctly", () => {
    render(
        <BrowserRouter>
            <TaskTabs />
        </BrowserRouter>
    );

    // Simulate a tab click
    const tabElement = screen.getByTestId("tab-item");
    fireEvent.click(tabElement);

    // Assert that the active tab is updated correctly
    const activeTabElement = screen.getByTestId("active-tab");
    expect(activeTabElement).toHaveTextContent("Scheme Creation");
});
