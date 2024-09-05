import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TaskTabsCompetent from "../TaskTabs";
import React from "react";

test("renders TaskTabsCompetent component", () => {
    render(
        <BrowserRouter>
            <TaskTabsCompetent />
        </BrowserRouter>
    );

    // Assert that the component renders without throwing an error
    const taskTabsCompetentElement = screen.getByTestId("task-tabs-competent");
    expect(taskTabsCompetentElement).toBeInTheDocument();
});

test("renders correct number of tabs", () => {
    render(
        <BrowserRouter>
            <TaskTabsCompetent />
        </BrowserRouter>
    );

    // Assert that the correct number of tabs are rendered
    const tabElements = screen.getAllByTestId("task-tab-item");
    expect(tabElements.length).toBe(2);
});

test("sets active tab correctly", () => {
    render(
        <BrowserRouter>
            <TaskTabsCompetent />
        </BrowserRouter>
    );

    // Assert that the initial active tab is set correctly
    const activeTabElement = screen.getByTestId("active-tab");
    expect(activeTabElement.textContent).toBe("Profile");

    // Click on the second tab
    const resetPasswordTab = screen.getByText("Reset Password");
    fireEvent.click(resetPasswordTab);

    // Assert that the active tab is updated correctly
    expect(activeTabElement.textContent).toBe("Reset Password");
});

test("sets URL correctly when clicking on a tab", () => {
    render(
        <BrowserRouter>
            <TaskTabsCompetent />
        </BrowserRouter>
    );

    // Assert that the initial URL is empty
    const urlElement = screen.getByTestId("url");
    expect(urlElement.textContent).toBe("");

    // Click on the first tab
    const profileTab = screen.getByText("Profile");
    fireEvent.click(profileTab);

    // Assert that the URL is updated correctly
    expect(urlElement.textContent).toBe("/ca/profile");
});
