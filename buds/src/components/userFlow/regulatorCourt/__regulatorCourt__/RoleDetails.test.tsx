import { render, screen } from "@testing-library/react";
import RoleDetails from "../RoleDetails";
import React from "react";

test("renders RoleDetails component", () => {
    render(<RoleDetails />);
    // Add your assertions here
});

test("displays Scheme Name label", () => {
    render(<RoleDetails />);
    const schemeNameLabel = screen.getByText("Scheme Name");
    expect(schemeNameLabel).toBeInTheDocument();
    // Add more assertions for this test case
});

test("displays Scheme Description label", () => {
    render(<RoleDetails />);
    const schemeDescriptionLabel = screen.getByText("Scheme Description");
    expect(schemeDescriptionLabel).toBeInTheDocument();
    // Add more assertions for this test case
});

// Add more test cases for other parts of your component
