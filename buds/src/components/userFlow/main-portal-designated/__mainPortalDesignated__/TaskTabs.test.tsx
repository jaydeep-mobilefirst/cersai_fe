import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TaskTabsDesignated from "../TaskTabItems";
import React from "react";

describe("TaskTabsDesignated", () => {
    test("renders the correct number of tabs", () => {
        render(
            <BrowserRouter>
                <TaskTabsDesignated text={""} isActive={false} onClick={function (): void {
                    throw new Error("Function not implemented.");
                } } />
            </BrowserRouter>
        );

        const tabs = screen.getAllByRole("link");
        expect(tabs.length).toBe(2);
    });

    test("renders the active tab correctly", () => {
        render(
            <BrowserRouter>
                <TaskTabsDesignated text={""} isActive={false} onClick={function (): void {
                    throw new Error("Function not implemented.");
                } } />
            </BrowserRouter>
        );

        const activeTab = screen.getByText("Profile");
        expect(activeTab).toHaveClass("active");
    });

    test("changes the active tab on click", () => {
        render(
            <BrowserRouter>
                <TaskTabsDesignated text={""} isActive={false} onClick={function (): void {
                    throw new Error("Function not implemented.");
                } } />
            </BrowserRouter>
        );

        const resetPasswordTab = screen.getByText("Reset Password");
        fireEvent.click(resetPasswordTab);

        const activeTab = screen.getByText("Reset Password");
        expect(activeTab).toHaveClass("active");
    });
});
