import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TaskTabsDc from "../TaskTabsDc";
import React from "react";

test("renders TaskTabsDc component", () => {
    render(
        <BrowserRouter>
            <TaskTabsDc />
        </BrowserRouter>
    );

    // Assert that the component renders without errors
    const taskTabsDcElement = screen.getByTestId("task-tabs-dc");
    expect(taskTabsDcElement).toBeInTheDocument();

    // Add more assertions as needed
});
