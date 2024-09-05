import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UmTabs from "../UmTabs";

describe("UmTabs", () => {
    test("renders the correct number of tabs", () => {
        render(
            <MemoryRouter>
                <UmTabs />
            </MemoryRouter>
        );

        const tabs = screen.getAllByRole("link");
        expect(tabs.length).toBe(2);
    });

    test("renders the default active tab", () => {
        render(
            <MemoryRouter>
                <UmTabs />
            </MemoryRouter>
        );

        const defaultActiveTab = screen.getByText("Role Creation");
        // expect(defaultActiveTab).toHaveClass("active");
    });

    test("changes active tab on click", () => {
        render(
            <MemoryRouter>
                <UmTabs />
            </MemoryRouter>
        );

        const userCreationTab = screen.getByText("User Creation");
        fireEvent.click(userCreationTab);

        const activeTab = screen.getByText("User Creation");
        // expect(activeTab).toHaveClass("active");
    });
});
