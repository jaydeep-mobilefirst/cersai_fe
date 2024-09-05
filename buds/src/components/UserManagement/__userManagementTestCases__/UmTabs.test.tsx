import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UmTabs from "../UmTabs";

describe("UmTabs", () => {
    test("renders the component with default props", () => {
        render(
            <BrowserRouter>
                <UmTabs entityType="DC" />
            </BrowserRouter>
        );

        // Add your assertions here
    });

    test("renders the component with custom props", () => {
        render(
            <BrowserRouter>
                <UmTabs entityType="DT" />
            </BrowserRouter>
        );

        // Add your assertions here
    });

    // Add more test cases as needed
});

