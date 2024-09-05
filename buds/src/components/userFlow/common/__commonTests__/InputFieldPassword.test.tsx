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
        const inputElement = screen.getByRole("textbox") as HTMLInputElement;
        const toggleButton = screen.getByRole("button");
    
        // Password should be hidden by default
        expect(inputElement.type).toBe("password");
    
        // Click the toggle button
        fireEvent.click(toggleButton);
    
        // Password should be visible
        expect(inputElement.type).toBe("text");
    
        // Click the toggle button again
        fireEvent.click(toggleButton);
    
        // Password should be hidden again
        expect(inputElement.type).toBe("password");
    });

    test("applies error classes when error prop is true", () => {
        render(<InputFieldPassword error />);
        const inputElement = screen.getByRole("textbox");

        expect(inputElement).toHaveClass("border-red-500");
        expect(inputElement).toHaveClass("text-red-500");
    });

    test("does not apply error classes when error prop is false", () => {
        render(<InputFieldPassword />);
        const inputElement = screen.getByRole("textbox");

        expect(inputElement).not.toHaveClass("border-red-500");
        expect(inputElement).not.toHaveClass("text-red-500");
    });

    test("disables input when disabled prop is true", () => {
        render(<InputFieldPassword disabled />);
        const inputElement = screen.getByRole("textbox");

        expect(inputElement).toBeDisabled();
    });

    test("does not disable input when disabled prop is false", () => {
        render(<InputFieldPassword />);
        const inputElement = screen.getByRole("textbox");

        expect(inputElement).not.toBeDisabled();
    });
});
