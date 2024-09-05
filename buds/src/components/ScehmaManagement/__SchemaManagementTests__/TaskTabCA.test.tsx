import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TaskTabsRg from "../TaskTabsRg";
import React from "react";

test("renders TaskTabsRg component", () => {
    render(
        <BrowserRouter>
            <TaskTabsRg />
        </BrowserRouter>
    );

    // Assert that the component renders without throwing any errors
    expect(screen.getByText("Deposit Takers")).toBeInTheDocument();
    expect(screen.getByText("Schemes")).toBeInTheDocument();
});
