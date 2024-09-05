import { render, screen, fireEvent } from "@testing-library/react";
import InputFieldPassword from "../InputFieldPassword";
import React from "react";

describe("InputFieldPassword", () => {
    test("renders without error", () => {
        render(<InputFieldPassword />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toBeInTheDocument();
    });

    test("toggles password visibility on button click", () => {
        render(<InputFieldPassword />);
        const inputElement = screen.getByRole("textbox");
        const buttonElement = screen.getByRole("button");

        // Password should be hidden by default
        expect(inputElement.getAttribute("type")).toBe("password");

        // Click the button to toggle password visibility
        fireEvent.click(buttonElement);

        // Password should be visible
        expect(inputElement.getAttribute("type")).toBe("text");

        // Click the button again to toggle password visibility
        fireEvent.click(buttonElement);

        // Password should be hidden again
        expect(inputElement.getAttribute("type")).toBe("password");
    });

    test("applies error styles when error prop is true", () => {
        render(<InputFieldPassword error />);
        const inputElement = screen.getByRole("textbox");

        expect(inputElement).toHaveClass("border-[red] text-[red]");
    });
});
