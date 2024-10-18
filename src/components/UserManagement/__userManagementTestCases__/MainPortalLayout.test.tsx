import { render } from "@testing-library/react";
import MainPortalLayout from "../MainPortalLayout";
import React from "react";

test("renders MainPortalLayout component", () => {
    render(<MainPortalLayout />);
    // Add your assertions here
});

test("renders MainPortalSidebar component", () => {
    render(<MainPortalLayout />);
    // Add your assertions here to check if MainPortalSidebar is rendered
});

test("renders FormHandlerProviders component", () => {
    render(<MainPortalLayout />);
    // Add your assertions here to check if FormHandlerProviders is rendered
});

test("renders Outlet component", () => {
    render(<MainPortalLayout />);
    // Add your assertions here to check if Outlet is rendered
});
