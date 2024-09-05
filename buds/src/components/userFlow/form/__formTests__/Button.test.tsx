import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "../Button";

describe("Button", () => {
    test("renders with correct label", () => {
        const label = "Submit";
        render(<Button type="submit" label={label} />);
        const buttonElement = screen.getByText(label);
        expect(buttonElement).toBeInTheDocument();
    });

    test("renders with correct type", () => {
        const type = "button";
        render(<Button type={type} label="Click me" />);
        const buttonElement = screen.getByRole("button");
        expect(buttonElement).toHaveAttribute("type", type);
    });

    // Add more test cases as needed
});
