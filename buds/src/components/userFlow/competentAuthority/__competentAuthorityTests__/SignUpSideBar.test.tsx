import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from "@testing-library/user-event";

import SignUpSideBar from "../SignUpSideBar";

describe("SignUpSideBar", () => {
    test("renders the component", () => {
        render( <Router>
            <SignUpSideBar />
        </Router>);
        // Add your assertions here
    });

    test("renders the Competent Authority heading", () => {
        render(<SignUpSideBar />);
        const heading = screen.getByText("Competent Authority");
        expect(heading).toBeInTheDocument();
    });

    test("renders the completion percentage", () => {
        render(<SignUpSideBar />);
        const percentage = screen.getByText(/% Completed/);
        expect(percentage).toBeInTheDocument();
    });

    test("renders the sidebar items", () => {
        render(<SignUpSideBar />);
        const sidebarItems = screen.getAllByRole("listitem");
        expect(sidebarItems.length).toBeGreaterThan(0);
    });

    test("handles click on sidebar item", () => {
        render(<SignUpSideBar />);
        const sidebarItem = screen.getByText("Sidebar Item");
        userEvent.click(sidebarItem);
        // Add your assertions here
    });
});
